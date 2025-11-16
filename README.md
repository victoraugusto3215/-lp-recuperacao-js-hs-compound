# 💰 Calculadora de Juros Compostos

**Atividade de Recuperação — Linguagem de Programação**

Sistema completo de cálculo de juros compostos com frontend em JavaScript e backend em Haskell.

---

## 👤 Autor

**Nome Completo**: VICTOR AUGUSTO DIAS MENDES DO VALLE

**Turma**: 42B7

**Disciplina**: Linguagem de Programação

**Atividade**: Recuperação - Cálculo de Juros Compostos

**Data de Entrega**: 16/11/2025

---

## 📝 Links de Produção

- **Frontend**: https://compound-calculator-five-sigma.vercel.app/
- **Backend**: https://compound-api-5i9n.onrender.com
- **Repositório**: https://github.com/victoraugusto3215/-lp-recuperacao-js-hs-compound
- **Tag/Release**: v1.0-RECUP-LP-2025

---

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
- **Deploy**: Render (Docker)

### Frontend (JavaScript)
- HTML5, CSS3 e JavaScript puro
- Comunicação via Fetch API
- Formatação de moeda em BRL (pt-BR)
- Validação de inputs no cliente
- Deploy: Vercel

### Estrutura do Projeto
```
.
├── backend/
│   ├── src/
│   │   └── Main.hs          # Código principal da API
│   ├── package.yaml         # Dependências Haskell
│   ├── stack.yaml           # Configuração Stack
│   └── Dockerfile           # Container Docker
├── frontend/
│   ├── index.html           # Interface do usuário
│   └── app.js               # Lógica do cliente
├── README.md                # Esta documentação
├── RECUP_LP_2025.md         # Identificação do aluno
├── LICENSE                  # Licença MIT
└── .gitignore               # Arquivos ignorados
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
  "amount": 1816.6967,
  "interest": 816.6967
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
- **GHC** 9.6.3
- **Docker** (para deploy)

### Backend

#### Desenvolvimento Local

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

#### Com Docker

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
curl https://compound-api-5i9n.onrender.com/

# Calcular juros
curl -X POST https://compound-api-5i9n.onrender.com/api/compound \
  -H "Content-Type: application/json" \
  -d '{
    "principal": 1000,
    "rate": 0.12,
    "timesPerYear": 12,
    "years": 5
  }'
```

### Frontend

#### Desenvolvimento Local

```bash
cd frontend

# Python 3
python -m http.server 3000

# Ou abrir diretamente o index.html no navegador
```

#### Configuração da API

O arquivo `app.js` já está configurado para produção:

```javascript
const API_URL = 'https://compound-api-5i9n.onrender.com/api/compound';
```

## 🌐 Deploy

### Backend (Render)

1. Conectar repositório GitHub ao Render
2. Criar Web Service com configurações:
   - **Name**: compound-api
   - **Root Directory**: backend
   - **Runtime**: Docker
   - **Instance Type**: Free
3. Deploy automático via Dockerfile

### Frontend (Vercel)

1. Importar repositório no Vercel
2. Configurar:
   - **Root Directory**: frontend
   - **Framework Preset**: Other
3. Deploy automático

## ✅ Validações Implementadas

### Backend (Haskell)
- ✅ Principal > 0
- ✅ Rate ≥ 0
- ✅ TimesPerYear ≥ 1
- ✅ Years > 0
- ✅ Retorna HTTP 400 para inputs inválidos
- ✅ Mensagens de erro descritivas em inglês

### Frontend (JavaScript)
- ✅ Validação antes de enviar requisição
- ✅ Tratamento de erros de rede
- ✅ Feedback visual (loading, erro, sucesso)
- ✅ Formatação monetária BRL (pt-BR)
- ✅ Interface responsiva e moderna
- ✅ Mensagens de erro em português

## 📦 Dependências e Versões

### Backend
- **Haskell**: GHC 9.6.3
- **Stack**: LTS 21.25 (resolver)
- **Scotty**: 0.20.1
- **Aeson**: 2.0+
- **wai-cors**: 0.2+
- **http-types**: 0.12+

### Frontend
- **JavaScript**: ES6+
- **HTML5** e **CSS3**
- Sem dependências externas

## 🔒 Segurança

- ✅ CORS habilitado para todas as origens
- ✅ Sem exposição de stack traces em produção
- ✅ Validação de inputs no backend e frontend
- ✅ Sem chaves ou segredos no código cliente
- ✅ HTTPS em produção (Render e Vercel)

## 🧪 Exemplos de Uso

### Caso 1: Investimento de Curto Prazo
```
Principal: R$ 5.000,00
Taxa: 8% ao ano
Capitalização: Mensal (12x)
Período: 2 anos
```
**Resultado**: R$ 5.867,46

### Caso 2: Poupança de Longo Prazo
```
Principal: R$ 10.000,00
Taxa: 6% ao ano
Capitalização: Mensal (12x)
Período: 10 anos
```
**Resultado**: R$ 18.194,07

### Caso 3: Investimento Agressivo
```
Principal: R$ 1.000,00
Taxa: 12% ao ano
Capitalização: Mensal (12x)
Período: 5 anos
```
**Resultado**: R$ 1.816,70

## 🐛 Troubleshooting

### Backend demora no primeiro acesso
- **Causa**: Render hiberna apps gratuitos após inatividade
- **Solução**: Aguarde 30-60 segundos. É esperado no plano Free.

### Erro de CORS
- **Causa**: Backend não configurado corretamente
- **Solução**: Já configurado no código. Se persistir, verifique os logs no Render.

### Frontend não conecta
1. Verifique se `API_URL` em `app.js` está correto
2. Teste o backend diretamente: https://compound-api-5i9n.onrender.com/
3. Abra console do navegador (F12) para ver erros detalhados

### Build do backend falha
- Certifique-se que não existem múltiplos arquivos `.cabal`
- Use "Clear build cache & deploy" no Render
- Verifique os logs de build para erros específicos

## 📄 Licença

MIT License - veja arquivo `LICENSE`

## 🎯 Status do Projeto

✅ **Backend**: Live em produção (Render)  
✅ **Frontend**: Live em produção (Vercel)  
✅ **Testes**: Passando  
✅ **Documentação**: Completa  
✅ **Tag**: v1.0-RECUP-LP-2025 criada

---

**Aplicação desenvolvida e testada com sucesso. Frontend e backend deployados e funcionais.**

**Data de conclusão**: 16/11/2025
