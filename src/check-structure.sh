#!/bin/bash

echo "🔍 Checking Project Structure"
echo "=============================="
echo ""

echo "📍 Current directory:"
pwd
echo ""

echo "📂 Checking for app directories:"
echo ""

if [ -d "app" ]; then
    echo "✅ Found: ./app/"
    echo "   Files in app/:"
    ls -la app/ | head -10
else
    echo "❌ No ./app/ directory"
fi

echo ""

if [ -d "src/app" ]; then
    echo "✅ Found: ./src/app/"
    echo "   Files in src/app/:"
    ls -la src/app/ | head -10
else
    echo "❌ No ./src/app/ directory"
fi

echo ""
echo "📂 Checking for components directories:"
echo ""

if [ -d "components" ]; then
    echo "✅ Found: ./components/"
    echo "   Sample files:"
    ls components/ | head -5
else
    echo "❌ No ./components/ directory"
fi

echo ""

if [ -d "src/components" ]; then
    echo "✅ Found: ./src/components/"
    echo "   Sample files:"
    ls src/components/ | head -5
else
    echo "❌ No ./src/components/ directory"
fi

echo ""
echo "📂 Checking for styles:"
echo ""

if [ -d "styles" ]; then
    echo "✅ Found: ./styles/"
else
    echo "❌ No ./styles/ directory"
fi

if [ -d "src/styles" ]; then
    echo "✅ Found: ./src/styles/"
else
    echo "❌ No ./src/styles/ directory"
fi

echo ""
echo "📋 Summary:"
echo "==========="

if [ -d "src" ]; then
    echo "⚠️  You have a src/ directory"
    echo ""
    echo "Next.js prioritizes src/app/ over app/ when both exist."
    echo ""
    if [ -d "app" ] && [ -d "src/app" ]; then
        echo "🔴 PROBLEM: You have BOTH ./app/ and ./src/app/"
        echo ""
        echo "Next.js is using: ./src/app/"
        echo "But AI edited: ./app/"
        echo ""
        echo "SOLUTION: Delete the src/ directory and use only ./app/"
    fi
else
    echo "✅ No src/ directory - structure is correct"
fi
