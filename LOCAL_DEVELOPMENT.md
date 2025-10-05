# Project Atlas - Local Development Guide

## 🚀 Quick Start

Project Atlas can be run locally with two components:
1. **Backend**: Cloudflare Worker (simulated locally)
2. **Frontend**: React development server

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account (for full deployment)

## 🛠️ Setup Instructions

### 1. Install Backend Dependencies
```bash
cd /Users/aps/Projects/cf_ai_project
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Start the Backend (Cloudflare Worker)
```bash
# From the root directory
npm run dev
```
This will start the Cloudflare Worker locally on `http://localhost:8787`

### 4. Start the Frontend (React App)
```bash
# From the frontend directory
cd frontend
npm start
```
This will start the React app on `http://localhost:3000`

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8787
- **Health Check**: http://localhost:8787/health
- **Global Pulse**: http://localhost:8787/pulse

## 🔧 API Endpoints (Local)

### The Oracle
- `POST http://localhost:8787/oracle` - AI-powered analysis
- `POST http://localhost:8787/watchtower` - Security analysis
- `GET http://localhost:8787/analyze?url=https://example.com` - Quick analysis

### The Global Pulse
- `GET http://localhost:8787/pulse` - Global internet health data

### The Storm-Seer
- `POST http://localhost:8787/threats` - Threat detection

## 🎯 Testing the Application

1. **Open the Frontend**: Navigate to http://localhost:3000
2. **Try The Oracle**: Enter a URL like `https://cloudflare.com`
3. **View Global Pulse**: Click the "Global Pulse" tab
4. **Test API Directly**: Use curl or Postman to test endpoints

### Example API Test
```bash
# Test health endpoint
curl http://localhost:8787/health

# Test analysis
curl -X POST http://localhost:8787/oracle \
  -H "Content-Type: application/json" \
  -d '{"url": "https://cloudflare.com"}'

# Test global pulse
curl http://localhost:8787/pulse
```

## 🔑 Environment Variables (Optional)

For full functionality, set these in `wrangler.toml`:
```toml
[vars]
OPENAI_API_KEY = "your-openai-api-key"
VIRUSTOTAL_API_KEY = "your-virustotal-api-key"
WEBPAGETEST_API_KEY = "your-webpagetest-api-key"
```

Without these, the app will work with simulated data.

## 🐛 Troubleshooting

### Frontend Won't Start
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check TypeScript version conflicts

### Backend Won't Start
- Ensure you're in the root directory
- Check if port 8787 is available
- Verify Cloudflare Workers CLI is installed: `npx wrangler --version`

### API Connection Issues
- Ensure backend is running on port 8787
- Check CORS settings in the Worker
- Verify the frontend is pointing to the correct API URL

## 🎨 Development Features

- **Hot Reload**: Both frontend and backend support hot reloading
- **TypeScript**: Full type checking and IntelliSense
- **Error Handling**: Comprehensive error boundaries and logging
- **Responsive Design**: Test on different screen sizes

## 🚀 Next Steps

1. **Customize**: Modify the UI, add new features
2. **Deploy**: Use `npm run deploy` to deploy to Cloudflare
3. **Scale**: Add more regions, enhance AI capabilities
4. **Monitor**: Use Cloudflare Analytics to track usage

---

*Project Atlas: Where local development meets global vision.*
