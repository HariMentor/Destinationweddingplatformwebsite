#!/bin/bash

echo "🔍 Checking Project Directory Structure..."
echo ""

echo "Current directory:"
pwd
echo ""

echo "Looking for key files/folders:"
echo ""

# Check for app directory
if [ -d "app" ]; then
    echo "✅ Found: app/"
else
    echo "❌ Missing: app/"
fi

# Check for components directory
if [ -d "components" ]; then
    echo "✅ Found: components/"
else
    echo "❌ Missing: components/"
fi

# Check for package.json
if [ -f "package.json" ]; then
    echo "✅ Found: package.json"
else
    echo "❌ Missing: package.json"
fi

# Check for next.config.js
if [ -f "next.config.js" ]; then
    echo "✅ Found: next.config.js"
else
    echo "❌ Missing: next.config.js"
fi

# Check for tsconfig.json
if [ -f "tsconfig.json" ]; then
    echo "✅ Found: tsconfig.json"
else
    echo "❌ Missing: tsconfig.json"
fi

# Check for styles directory
if [ -d "styles" ]; then
    echo "✅ Found: styles/"
else
    echo "❌ Missing: styles/"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check for problematic nested structure
if [ -d "Destinationweddingplatformwebsite" ]; then
    echo "⚠️  WARNING: Found 'Destinationweddingplatformwebsite' folder"
    echo "   This suggests you might be in the wrong directory"
    echo ""
    echo "   Try: cd Destinationweddingplatformwebsite"
    echo ""
fi

if [ -d "src" ]; then
    echo "⚠️  WARNING: Found 'src' folder"
    echo "   Next.js App Router doesn't use a 'src' folder by default"
    echo "   Your app should be in 'app/' directory at the root"
    echo ""
    
    if [ -d "src/app" ]; then
        echo "   ❌ Problem: You have src/app/ instead of app/"
        echo "   Solution: Move src/app/ to app/"
        echo "   Solution: Move src/components/ to components/"
        echo ""
    fi
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Count key items
app_count=$(find . -maxdepth 3 -type d -name "app" 2>/dev/null | wc -l)
echo "Found $app_count 'app' directories in project"

if [ $app_count -gt 1 ]; then
    echo "⚠️  Multiple 'app' directories found!"
    echo ""
    find . -maxdepth 3 -type d -name "app" 2>/dev/null
    echo ""
fi

echo ""
echo "RECOMMENDATION:"
echo ""

if [ -d "app" ] && [ -d "components" ] && [ -f "package.json" ]; then
    echo "✅ You're in the correct directory!"
    echo "   Run: npm run dev"
elif [ -d "Destinationweddingplatformwebsite" ]; then
    echo "❌ You're in the wrong directory"
    echo "   Run: cd Destinationweddingplatformwebsite"
    echo "   Then: npm run dev"
elif [ -d "src/app" ]; then
    echo "❌ Your project structure is incorrect"
    echo "   Files are in 'src/' but should be at root level"
    echo ""
    echo "   Quick fix:"
    echo "   1. mv src/app app"
    echo "   2. mv src/components components"
    echo "   3. mv src/styles styles"
    echo "   4. rm -rf src"
    echo "   5. npm run dev"
else
    echo "❓ Unable to determine project structure"
    echo "   Please check you're in the project root"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
