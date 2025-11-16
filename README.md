# 💰 Calculadora de Juros Compostos

**Atividade de Recuperação — Linguagem de Programação**

Sistema completo de cálculo de juros compostos com frontend em JavaScript e backend em Haskell.

## 📋 Descrição

Esta aplicação calcula o montante final de um investimento usando a fórmula de juros compostos:

```
A = P · (1 + r/n)^(n·t)
```

Onde:
- **A** = Montante final
- **P** = Principal (valor inicial)
- **r** = Taxa de juros anual (em decimal)
- **n** = Número de capitalizações por ano
- **t** = Tempo em anos

## 🏗️ Arquitetura

### Backend (Haskell)
- **Framework**: Scotty (servidor web)
- **JSON**: Aeson (serialização/deserialização)
- **CORS**: wai-cors (permitir requisições do frontend)
- **Build**: Stack

### Frontend (JavaScript)
- HTML5, CSS3 e JavaScript puro
- Comunicação via Fetch API
- Formatação de moeda em BRL (pt-BR)
- Validação de inputs no cliente

### Estrutura do Projeto
```
.
├── backend/
│   ├── Main.hs              # Código principal da API
│   ├── package.yaml         # Dependências Haskell
│   ├── stack.yaml          # Configuração Stack
│   └── Dockerfile          # Container Docker
├── frontend/
│   ├── index.html          # Interface do usuário
│   └── app.js              # Lógica do cliente
├── README.md               # Esta documentação
├── RECUP_LP_2025.md        # Identificação do aluno
├── LICENSE                 # Licença MIT
└── .gitignore             # Arquivos ignorados
```

## 🔌 API Endpoints

### POST /api/compound

Calcula o montante de juros compostos.

**Request:**
```json
{
  "principal": 1000.0,
  "rate": 0.12,
  "timesPerYear": 12,
  "years": 5.0
}
```

**Response (Sucesso - 200):**
```json
{
  "amount": 1816.70,
  "interest": 816.70
}
```

**Response (Erro - 400):**
```json
{
  "error": "Principal must be greater than 0"
}
```

### GET /

Health check do serviço.

**Response:**
```json
{
  "status": "ok",
  "service": "compound-interest-api"
}
```

## 🚀 Instruções de Build e Execução

### Pré-requisitos
- **Haskell Stack** (>= 2.9.1)
- **Node.js** (opcional, para servidor local do frontend)
- **Docker** (opcional, para containerização)

### Backend

#### Opção 1: Com Stack (Desenvolvimento)

```bash
cd backend

# Instalar dependências e compilar
stack setup
stack build

# Executar (porta 8080 por padrão)
stack exec compound-interest-api-exe

# Ou definir porta customizada
PORT=3000 stack exec compound-interest-api-exe
```

#### Opção 2: Com Docker

```bash
cd backend

# Build da imagem
docker build -t compound-api .

# Executar container
docker run -p 8080:8080 compound-api
```

#### Testar Backend

```bash
# Health check
curl http://localhost:8080/

# Calcular juros
curl -X POST http://localhost:8080/api/compound \
  -H "Content-Type: application/json" \
  -d '{
    "principal": 1000,
    "rate": 0.12,
    "timesPerYear": 12,
    "years": 5
  }'
```

### Frontend

#### Opção 1: Servidor Local Simples

```bash
cd frontend

# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000

# Node.js (com http-server)
npx http-server -p 3000
```

#### Opção 2: Abrir Diretamente

Abra o arquivo `frontend/index.html` no navegador.

**IMPORTANTE**: Atualize a variável `API_URL` em `app.js` com a URL do seu backend:

```javascript
const API_URL = 'https://seu-backend.onrender.com/api/compound';
```

## 🌐 Deploy

### Backend (Render / Railway / Fly.io)

#### Render
1. Conecte seu repositório GitHub
2. Crie novo **Web Service**
3. Configure:
   - Build Command: `stack build`
   - Start Command: `stack exec compound-interest-api-exe`
   - Ou use Dockerfile
4. Adicione variável de ambiente `PORT` (auto-configurada)

#### Railway
1. Conecte repositório
2. Configure Dockerfile
3. Deploy automático

#### Fly.io
```bash
fly launch
fly deploy
```

### Frontend (Vercel / Netlify)

#### Vercel
```bash
cd frontend
vercel
```

Ou via interface web:
1. Importe repositório
2. Configure root directory: `frontend`
3. Deploy

#### Netlify
1. Drag & drop da pasta `frontend`
2. Ou conecte repositório GitHub

**IMPORTANTE**: Após deploy do backend, atualize `API_URL` no `app.js`!

## ✅ Validações Implementadas

### Backend (Haskell)
- ✅ Principal > 0
- ✅ Rate ≥ 0
- ✅ TimesPerYear ≥ 1
- ✅ Years > 0
- ✅ Retorna HTTP 400 para inputs inválidos
- ✅ Mensagens de erro descritivas

### Frontend (JavaScript)
- ✅ Validação antes de enviar
- ✅ Tratamento de erros de rede
- ✅ Feedback visual (loading, erro, sucesso)
- ✅ Formatação monetária BRL
- ✅ Interface responsiva

## 📦 Versões

- **Haskell**: GHC 9.2.8
- **Stack**: LTS 21.25
- **Scotty**: 0.12+
- **Aeson**: 2.0+

## 🔒 Segurança

- ✅ CORS habilitado para todas as origens
- ✅ Sem exposição de stack traces
- ✅ Validação de inputs no backend
- ✅ Sem chaves ou segredos no frontend

## 📝 Links de Produção

- **Frontend**: [ADICIONAR URL APÓS DEPLOY]
- **Backend**: [ADICIONAR URL APÓS DEPLOY]

## 🧪 Exemplos de Uso

### Caso 1: Investimento de Curto Prazo
```
Principal: R$ 5.000,00
Taxa: 8% ao ano
Capitalização: Mensal (12x)
Período: 2 anos
```
**Resultado**: ~R$ 5.867,46

### Caso 2: Poupança de Longo Prazo
```
Principal: R$ 10.000,00
Taxa: 6% ao ano
Capitalização: Mensal (12x)
Período: 10 anos
```
**Resultado**: ~R$ 18.194,07

## 🐛 Troubleshooting

### Backend não inicia
```bash
# Limpar e rebuildar
stack clean
stack build
```

### Erro de CORS
Verifique se o backend permite a origem do frontend em produção.

### Frontend não conecta
1. Verifique se `API_URL` está correto em `app.js`
2. Teste o backend diretamente com curl
3. Verifique console do navegador (F12)

## 📄 Licença

MIT License - veja arquivo `LICENSE`

## 👤 Autor

**Nome Completo**: VICTOR AUGUSTO DIAS MENDES DO VALLE

**Turma**: 42B7

**Disciplina**: Linguagem de Programação

**Atividade**: Recuperação - Cálculo de Juros Compostos

**Data de Entrega**: 16/11/2025

---

## Links de Produção

### Frontend (Aplicação)
```
[https://seu-app.vercel.app](https://compound-calculator-five-sigma.vercel.app/)
```

### Backend (API)
```
[https://compound-api-5i9n.onrender.com](https://compound-api-5i9n.onrender.com)
```

### Repositório GitHub
```
https://github.com/victoraugusto3215/-lp-recuperacao-js-hs-compound
```

---

## Tag/Release
- **Tag**: v1.0-RECUP-LP-2025

---

## Observações

Aplicação desenvolvida e testada com sucesso. Frontend e backend deployados e funcionais.
