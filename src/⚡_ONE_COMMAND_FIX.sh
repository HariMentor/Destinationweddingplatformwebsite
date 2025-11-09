#!/bin/bash

echo "🔧 Wedzway - Quick Fix Script"
echo "================================"
echo ""

# Navigate to the correct directory
cd ~/Documents/Documents\ -\ Arun\'s\ MacBook\ Pro/Code/WedzWay/NewCustomerAPP/Destinationweddingplatformwebsite

echo "📍 Current directory:"
pwd
echo ""

echo "📂 Files in this directory:"
ls -la | grep -E "(app|components|package.json|next.config)"
echo ""

echo "🔍 Checking project structure..."
if [ -f "package.json" ]; then
    echo "✅ Found package.json"
else
    echo "❌ package.json not found! You might be in the wrong directory."
    exit 1
fi

if [ -d "app" ]; then
    echo "✅ Found app/ directory (App Router structure)"
elif [ -d "src/app" ]; then
    echo "✅ Found src/app/ directory (src structure)"
else
    echo "❌ No app/ directory found!"
fi

if [ -d "components" ]; then
    echo "✅ Found components/ directory"
elif [ -d "src/components" ]; then
    echo "✅ Found src/components/ directory"
else
    echo "⚠️  No components/ directory found"
fi

echo ""
echo "🧹 Cleaning old builds and dependencies..."
rm -rf .next node_modules package-lock.json

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🚀 Starting development server..."
echo ""
echo "======================================"
echo "Once the server starts, open:"
echo "http://localhost:3000"
echo ""
echo "Password: wedzway2025"
echo "======================================"
echo ""

npm run dev
