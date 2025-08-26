# Easy Panel Configuration

## ✅ SOLUÇÃO FUNCIONAL

### Build Command
```bash
npm ci && npm run build
```

### Start Command  
```bash
npm start
```

### Como Funciona
1. **Build:** Gera arquivos estáticos na pasta `dist/`
2. **Start:** Usa o pacote `serve` para servir os arquivos estáticos
3. **SPA:** Configurado para Single Page Application (React Router)

### Environment Variables
- PORT=3001 (padrão, será substituído pelo Easy Panel automaticamente)
- NODE_ENV=production

### Dependências Importantes
- `serve`: Para servir arquivos estáticos em produção
- `express`: Alternativa (não está sendo usada)

### Directory Structure
- Root: `/` (pasta do projeto)
- Build output: `/dist` (gerado pelo comando build)
- Static server: `serve` package

## 🔧 Configuração no Easy Panel

### 1. Repository
- Repository: seu-usuario/fornecedor-conecta
- Branch: main

### 2. Build Settings
- **Build Command:** `npm ci && npm run build`
- **Start Command:** `npm start`
- **Port:** 3001 (ou deixe vazio para auto-detect)

### 3. Environment
- NODE_ENV=production

## ✅ Teste Local
```bash
# Build
npm run build

# Start (igual ao que o Easy Panel fará)
npm start

# Acesse: http://localhost:3001
```

## 🚀 Deploy Steps
1. Easy Panel clona o repositório
2. Executa: `npm ci && npm run build`
3. Executa: `npm start`
4. Aplicação fica disponível na URL do Easy Panel

## ❗ Importante
- Certifique-se que o Easy Panel está configurado para executar `npm start` e não tentar executar como aplicação Node.js tradicional
- O projeto é uma SPA (Single Page Application) que precisa servir arquivos estáticos
- O pacote `serve` cuida automaticamente do roteamento do React Router
