{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

module Main where

import Web.Scotty
import Data.Aeson (FromJSON, ToJSON, object, (.=))
import GHC.Generics
import Network.Wai.Middleware.Cors
import Network.HTTP.Types.Status (status400, status404)
import Control.Monad.IO.Class (liftIO)
import System.Environment (lookupEnv)
import Text.Read (readMaybe)

-- Estrutura de dados para request
data CompoundRequest = CompoundRequest
  { principal :: Double
  , rate :: Double
  , timesPerYear :: Int
  , years :: Double
  } deriving (Show, Generic)

instance FromJSON CompoundRequest
instance ToJSON CompoundRequest

-- Estrutura de dados para response de sucesso
data CompoundResponse = CompoundResponse
  { amount :: Double
  , interest :: Double
  } deriving (Show, Generic)

instance ToJSON CompoundResponse

-- Estrutura de dados para response de erro
data ErrorResponse = ErrorResponse
  { error :: String
  } deriving (Show, Generic)

instance ToJSON ErrorResponse

-- Função para calcular juros compostos
calculateCompound :: Double -> Double -> Int -> Double -> Double
calculateCompound p r n t = p * ((1 + r / fromIntegral n) ** (fromIntegral n * t))

-- Validação dos inputs
validateInput :: CompoundRequest -> Maybe String
validateInput req
  | principal req <= 0 = Just "Principal must be greater than 0"
  | rate req < 0 = Just "Rate cannot be negative"
  | timesPerYear req < 1 = Just "Times per year must be at least 1"
  | years req <= 0 = Just "Years must be greater than 0"
  | otherwise = Nothing

main :: IO ()
main = do
  portStr <- lookupEnv "PORT"
  let port = maybe 8080 (\p -> maybe 8080 id (readMaybe p)) portStr
  
  putStrLn $ "Starting server on port " ++ show port
  
  scotty port $ do
    -- Configurar CORS
    middleware $ cors $ const $ Just $ simpleCorsResourcePolicy
      { corsRequestHeaders = ["Content-Type"]
      , corsMethods = ["GET", "POST", "OPTIONS"]
      , corsOrigins = Nothing -- Permite todas as origens
      }
    
    -- Health check endpoint
    get "/" $ do
      json $ object ["status" .= ("ok" :: String), "service" .= ("compound-interest-api" :: String)]
    
    -- Endpoint principal
    post "/api/compound" $ do
      req <- jsonData :: ActionM CompoundRequest
      
      case validateInput req of
        Just errMsg -> do
          status status400
          json $ ErrorResponse errMsg
        
        Nothing -> do
          let p = principal req
              r = rate req
              n = timesPerYear req
              t = years req
              amount = calculateCompound p r n t
              interest = amount - p
          
          json $ CompoundResponse amount interest
    
    -- Capturar rotas não encontradas
    notFound $ do
      status status404
      json $ ErrorResponse "Endpoint not found"
