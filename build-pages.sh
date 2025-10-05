#!/bin/bash

# Build script for Cloudflare Pages deployment
echo "Building Project Atlas for Cloudflare Pages..."

# Build the frontend
cd frontend
npm ci
npm run build

# Copy redirects file to build directory
cp ../_redirects build/

# Create a simple index.html redirect if needed
echo "Build complete! Files are in frontend/build/"
echo "Make sure to set these in Cloudflare Pages:"
echo "- Build command: ./build-pages.sh"
echo "- Build output directory: frontend/build"
