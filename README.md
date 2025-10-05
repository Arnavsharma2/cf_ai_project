# Project Atlas

A website security scanner and internet health monitor built for Cloudflare.

## What it does

This program scans websites to check their security and performance. It tells you if a website is safe, how fast it loads, and gives you suggestions to make it better.

## How to use it

1. Go to the website: https://c5c81774.cf-ai-project.pages.dev
2. Click "Scan Website Security"
3. Type in any website URL (like google.com or cloudflare.com)
4. Click the scan button
5. Wait a few seconds and see the results

## What you get

The scanner checks:
- SSL certificate (is the website secure?)
- Security headers (does it protect against attacks?)
- How fast the website loads
- Performance scores
- AI-powered recommendations

## Internet Health Dashboard

There's also a dashboard that shows the health of the internet around the world. You can see:
- Which regions have good internet
- How fast websites load in different countries
- Current security threats
- Traffic patterns

## Settings

You can customize how the scanner works:
- Change how often it checks websites
- Pick which regions to monitor
- Turn features on or off
- Set how long to remember results

## Technical stuff

The backend runs on Cloudflare Workers (serverless functions) and the frontend is a React app hosted on Cloudflare Pages. It uses OpenAI to give smart recommendations about website security.

## API

If you want to use this programmatically, the API is at https://cfai.arnavgamin.workers.dev

Main endpoints:
- POST /oracle - scan a website
- GET /health - check if the service is working
- GET /pulse - get internet health data

## Setup for developers

To run this locally:

1. Clone the repo
2. Run `npm install` in the root folder
3. Run `npx wrangler dev` to start the backend
4. Run `npm start` to start the frontend

You'll need an OpenAI API key to make the AI features work.

## Why I built this

I made this for a Cloudflare internship application. It shows how to build a real application using Cloudflare Workers, integrate AI, and create a useful tool for checking website security.

The goal was to create something that actually helps people understand if their websites are secure and fast, not just another demo project.