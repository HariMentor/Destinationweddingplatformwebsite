#!/bin/bash

echo "🔍 Checking Development Server Status..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "   Please install Node.js 18.0.0 or higher"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found"
    echo "   Run: npm install"
    echo ""
fi

# Check if .next exists
if [ ! -d ".next" ]; then
    echo "ℹ️  .next folder not found (normal for first run)"
    echo ""
fi

# Check what's running on port 3000 (Next.js)
echo "🔍 Checking port 3000 (Next.js)..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Something is running on port 3000"
    echo "   Process: $(lsof -i :3000 | grep LISTEN | awk '{print $1}')"
else
    echo "⚠️  Nothing running on port 3000"
    echo "   This is where Next.js should run"
fi
echo ""

# Check what's running on port 5173 (Vite)
echo "🔍 Checking port 5173 (Vite)..."
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "❌ Vite is running on port 5173"
    echo "   ⚠️  THIS IS THE PROBLEM!"
    echo "   You need to stop Vite and run Next.js instead"
    echo ""
    echo "   To fix:"
    echo "   1. Stop the Vite server (Ctrl+C)"
    echo "   2. Run: npm run dev"
else
    echo "✅ Port 5173 is free (good - Vite is not running)"
fi
echo ""

# Check package.json scripts
echo "📋 package.json scripts:"
if [ -f "package.json" ]; then
    if grep -q '"dev": "next dev"' package.json; then
        echo "✅ 'dev' script is correctly set to 'next dev'"
    else
        echo "❌ 'dev' script is not set correctly"
    fi
else
    echo "❌ package.json not found"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 SUMMARY:"
echo ""

if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "❌ PROBLEM DETECTED!"
    echo "   You are running Vite (port 5173)"
    echo "   This is a Next.js project - you need to run Next.js"
    echo ""
    echo "   TO FIX:"
    echo "   1. Stop the current server (Ctrl+C)"
    echo "   2. Run: npm run dev"
    echo "   3. Open: http://localhost:5173"
elif lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ LOOKS GOOD!"
    echo "   Next.js appears to be running on port 3000"
    echo ""
    echo "   Open your browser at: http://localhost:5173"
    echo "   Password: wedzway2025"
else
    echo "ℹ️  NO SERVER RUNNING"
    echo ""
    echo "   TO START:"
    echo "   1. Run: npm install (if you haven't)"
    echo "   2. Run: npm run dev"
    echo "   3. Open: http://localhost:5173"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
