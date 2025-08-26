@echo off
echo 🚀 Iniciando deploy para produção...

REM 1. Limpar instalações anteriores
echo 🧹 Limpando cache...
if exist node_modules rmdir /s /q node_modules
if exist dist rmdir /s /q dist

REM 2. Instalar dependências
echo 📦 Instalando dependências...
npm ci

REM 3. Build para produção
echo 🔨 Construindo aplicação...
npm run build

REM 4. Verificar se build foi criado
if exist dist (
    echo ✅ Build criado com sucesso!
    echo 📁 Arquivos prontos em ./dist/
    
    REM 5. Deploy opcional (descomente a linha desejada)
    REM vercel --prod
    REM netlify deploy --prod --dir=dist
    REM docker build -t mxs-solucoes .
    
    echo 🎉 Deploy concluído!
    pause
) else (
    echo ❌ Erro: Build não foi criado!
    pause
    exit /b 1
)
