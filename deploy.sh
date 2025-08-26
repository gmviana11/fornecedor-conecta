#!/bin/bash

echo "🚀 Iniciando deploy para produção (Easy Panel)..."

# 1. Instalar dependências
echo "📦 Instalando dependências..."
npm ci --only=production

# 2. Instalar dependências de desenvolvimento (necessárias para build)
echo "🔧 Instalando dependências de desenvolvimento..."
npm ci

# 3. Build para produção
echo "🔨 Construindo aplicação..."
npm run build

# 4. Verificar se build foi criado
if [ -d "dist" ]; then
    echo "✅ Build criado com sucesso!"
    echo "📁 Arquivos prontos em ./dist/"
    
    # 5. Instalar apenas dependências de produção
    echo "🧹 Limpando dependências de desenvolvimento..."
    npm ci --only=production
    
    echo "🎉 Deploy concluído!"
    echo "▶️  Para iniciar: npm start"
    echo "🌐 O servidor estará disponível na porta 3000"
else
    echo "❌ Erro: Build não foi criado!"
    exit 1
fi
