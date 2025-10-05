# Project Atlas: Deployment Guide

This guide will help you deploy Project Atlas as a public website.

## 🌐 **Option 1: Cloudflare Pages (Recommended)**

### **Why Cloudflare Pages?**
- ✅ **Free hosting** with global CDN
- ✅ **Automatic deployments** from GitHub
- ✅ **Perfect integration** with Cloudflare Workers
- ✅ **Custom domains** supported
- ✅ **HTTPS by default**

### **Step 1: Deploy Frontend to Cloudflare Pages**

1. **Go to Cloudflare Dashboard**: https://dash.cloudflare.com
2. **Navigate to Pages**: Click "Pages" in the sidebar
3. **Connect to Git**: Click "Connect to Git"
4. **Select Repository**: Choose your `cf_ai_project` repository
5. **Configure Build Settings**:
   - **Framework preset**: Create React App
   - **Build command**: `cd frontend && npm run build`
   - **Build output directory**: `frontend/build`
   - **Root directory**: `/` (leave empty)
6. **Deploy**: Click "Save and Deploy"

### **Step 2: Deploy Backend to Cloudflare Workers**

```bash
# In your project root
npx wrangler deploy
```

### **Step 3: Connect Frontend to Backend**

Update the frontend to use your deployed Worker URL:

1. **Get your Worker URL** from the Wrangler output
2. **Update frontend environment**:
   ```bash
   # In frontend directory
   echo "REACT_APP_API_URL=https://project-atlas.your-subdomain.workers.dev" > .env.production
   ```
3. **Redeploy** the frontend

---

## 🌐 **Option 2: Vercel (Alternative)**

### **Why Vercel?**
- ✅ **Excellent React support**
- ✅ **Automatic deployments**
- ✅ **Global CDN**
- ✅ **Free tier**

### **Deploy to Vercel**

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**:
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Deploy Backend**:
   ```bash
   cd .. # back to root
   npx wrangler deploy
   ```

4. **Update API URL** in Vercel environment variables

---

## 🌐 **Option 3: Netlify (Alternative)**

### **Deploy to Netlify**

1. **Build the project**:
   ```bash
   cd frontend && npm run build
   ```

2. **Drag and drop** the `frontend/build` folder to https://app.netlify.com/drop

3. **Deploy backend**:
   ```bash
   npx wrangler deploy
   ```

---

## 🔧 **Environment Configuration**

### **For Production Deployment**

Create these environment variables in your hosting platform:

```env
REACT_APP_API_URL=https://your-worker-url.workers.dev
```

### **For Cloudflare Workers**

Update `wrangler.toml` with your production settings:

```toml
name = "project-atlas"
main = "src/index.ts"
compatibility_date = "2025-10-05"

[vars]
OPENAI_API_KEY = "your-openai-key"  # Optional
VIRUSTOTAL_API_KEY = "your-virustotal-key"  # Optional
WEBPAGETEST_API_KEY = "your-webpagetest-key"  # Optional

# Uncomment for Cloudflare AI
# [[ai]]
# binding = "CLOUDFLARE_AI"
```

---

## 🎯 **Recommended Deployment Flow**

### **1. Deploy Backend First**
```bash
npx wrangler deploy
```
**Note the Worker URL** (e.g., `https://project-atlas.your-subdomain.workers.dev`)

### **2. Update Frontend Configuration**
```bash
cd frontend
echo "REACT_APP_API_URL=https://project-atlas.your-subdomain.workers.dev" > .env.production
npm run build
```

### **3. Deploy Frontend**
- **Cloudflare Pages**: Connect GitHub repo
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop build folder

### **4. Test Your Deployment**
- Visit your frontend URL
- Test The Oracle analysis
- Check Global Pulse functionality

---

## 🌟 **Custom Domain Setup**

### **Cloudflare Pages**
1. Go to Pages → Your project → Custom domains
2. Add your domain
3. Update DNS records as instructed

### **Vercel**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records

---

## 🚀 **Quick Start Commands**

```bash
# 1. Deploy backend
npx wrangler deploy

# 2. Update frontend config
cd frontend
echo "REACT_APP_API_URL=https://your-worker-url.workers.dev" > .env.production
npm run build

# 3. Deploy frontend (choose one)
# Cloudflare Pages: Connect via dashboard
# Vercel: vercel --prod
# Netlify: Drag build folder to netlify.com/drop
```

---

## 🎉 **Your Public Atlas Will Be Live At:**

- **Frontend**: `https://your-project.pages.dev` (Cloudflare Pages)
- **Backend**: `https://project-atlas.your-subdomain.workers.dev` (Workers)
- **Custom Domain**: `https://your-domain.com` (if configured)

**Project Atlas will be live and accessible to the world!** 🌐✨
