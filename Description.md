# Identificação da Atividade de Recuperação

## Informações do Aluno

**Nome Completo**: VICTOR AUGUSTO DIAS MENDES DO VALLE

**Turma**: 42B7

**Disciplina**: Linguagem de Programação

**Atividade**: Recuperação - Cálculo de Juros Compostos

**Data de Entrega**: 16/11/2025

---

## Links de Produção

### Frontend (Aplicação)
```
https://compound-calculator-five-sigma.vercel.app/
```

### Backend (API)
```
https://compound-api-5i9n.onrender.com
```

### Repositório GitHub
```
https://github.com/victoraugusto3215/-lp-recuperacao-js-hs-compound
```

---

## Tag/Release
- **Tag**: v1.0-RECUP-LP-2025
- **Link**: https://github.com/victoraugusto3215/-lp-recuperacao-js-hs-compound/releases/tag/v1.0-RECUP-LP-2025

---

## Checklist de Entrega

- [x] Backend em Haskell funcionando
- [x] Frontend em JavaScript funcionando
- [x] API REST com endpoint POST /api/compound
- [x] Validação de inputs (400 para erros)
- [x] CORS habilitado
- [x] Deploy público do backend (Render)
- [x] Deploy público do frontend (Vercel)
- [x] README.md completo
- [x] Tag v1.0-RECUP-LP-2025 criada
- [x] Este arquivo preenchido
- [x] Estrutura /backend e /frontend
- [x] LICENSE e .gitignore
- [x] Aplicação testada e funcional

---

## Tecnologias Utilizadas

### Backend
- **Linguagem**: Haskell (GHC 9.6.3)
- **Framework**: Scotty 0.20.1
- **Build Tool**: Stack
- **Deploy**: Render (Docker)
- **Bibliotecas**: Aeson, wai-cors, http-types

### Frontend
- **Linguagem**: JavaScript (ES6+)
- **Markup**: HTML5
- **Estilo**: CSS3
- **Deploy**: Vercel

---

## Funcionalidades Implementadas

### Requisitos Funcionais
- [x] RF1: Cálculo de juros compostos com fórmula A = P · (1 + r/n)^(n·t)
- [x] RF2: Entradas pelo frontend (principal, rate, timesPerYear, years)
- [x] RF3: Endpoint POST /api/compound que recebe e responde JSON
- [x] RF4: Validação de inputs com retorno HTTP 400 para erros
- [x] RF5: Formatação de moeda BRL no frontend

### Requisitos Não Funcionais
- [x] RNF1: Hospedagem gratuita (Vercel + Render)
- [x] RNF2: CORS habilitado
- [x] RNF3: Segurança básica (sem chaves expostas, sem stack traces)
- [x] RNF4: README.md com instruções de build e deploy

---

## Testes Realizados

### Teste 1: Health Check
- **URL**: https://compound-api-5i9n.onrender.com/
- **Resultado**: ✅ Retorna `{"status":"ok","service":"compound-interest-api"}`

### Teste 2: Cálculo Básico
- **Input**: principal=1000, rate=0.12, timesPerYear=12, years=5
- **Resultado**: ✅ amount=1816.70, interest=816.70

### Teste 3: Validação de Erro
- **Input**: principal=-1000 (inválido)
- **Resultado**: ✅ HTTP 400 com mensagem de erro

### Teste 4: Frontend Completo
- **URL**: https://compound-calculator-five-sigma.vercel.app/
- **Resultado**: ✅ Formulário funcional, cálculo correto, formatação BRL

---

## Observações

Aplicação desenvolvida e testada com sucesso seguindo todos os requisitos especificados:

1. **Backend em Haskell** totalmente funcional com validações adequadas
2. **Frontend em JavaScript** com interface moderna e responsiva
3. **Integração completa** entre frontend e backend via API REST
4. **Deploy em produção** com URLs públicas acessíveis
5. **Documentação completa** com exemplos e instruções detalhadas
6. **Código organizado** em repositório GitHub com estrutura clara
7. **Tag de release** criada conforme especificado

A aplicação atende 100% dos requisitos funcionais e não funcionais da atividade.

---

**Data de Conclusão**: 16/11/2025  
**Status**: ✅ Concluído e Entregue
