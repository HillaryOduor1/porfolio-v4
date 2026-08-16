#!/bin/bash
# vercel-build.sh

echo "🔄 Running Vercel build script..."

# 1. Pull LFS files
echo "📥 Pulling Git LFS files..."
git lfs pull

# 2. Run the standard build
echo "🏗️ Building the project..."
npm run build

echo "✅ Build completed."