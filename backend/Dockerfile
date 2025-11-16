FROM haskell:9.6.3 AS builder

WORKDIR /app

# Copiar arquivos de configuração
COPY package.yaml stack.yaml ./

# Copiar código fonte
COPY src ./src

# Instalar dependências e compilar
RUN stack setup --no-terminal && \
    stack build --only-dependencies --no-terminal && \
    stack build --no-terminal --copy-bins --local-bin-path /app/bin

# Imagem final menor
FROM debian:bookworm-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libgmp10 \
    ca-certificates \
    netbase && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar binário compilado
COPY --from=builder /app/bin/compound-interest-api-exe /app/

ENV PORT=8080
EXPOSE 8080

CMD ["/app/compound-interest-api-exe"]
