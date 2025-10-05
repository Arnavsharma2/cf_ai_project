#!/bin/bash

echo "🚀 Deploying AI-Powered Internet Health & Security Analyzer"

# Check if wrangler is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Deploy the Cloudflare Worker
echo "☁️ Deploying Cloudflare Worker..."
npx wrangler deploy

echo "✅ Deployment complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Set up your API keys in wrangler.toml:"
echo "   - OPENAI_API_KEY (optional, for AI insights)"
echo "   - VIRUSTOTAL_API_KEY (optional, for security scanning)"
echo "   - WEBPAGETEST_API_KEY (optional, for performance testing)"
echo ""
echo "2. Create KV namespace:"
echo "   npx wrangler kv:namespace create 'ANALYSIS_CACHE'"
echo ""
echo "3. Update the namespace ID in wrangler.toml"
echo ""
echo "4. Deploy frontend to your preferred static hosting service"
echo ""
echo "🎉 Your Internet Health Analyzer is ready!"
