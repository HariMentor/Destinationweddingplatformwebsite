#!/bin/bash

echo "🔧 Wedzway - Lockfile Fix & Run"
echo "================================"
echo ""

# Save current directory
CURRENT_DIR=$(pwd)

# Get the project root (should be Destinationweddingplatformwebsite)
if [[ "$CURRENT_DIR" == *"Destinationweddingplatformwebsite" ]]; then
    echo "✅ You're in the project directory"
    PROJECT_DIR="$CURRENT_DIR"
    PARENT_DIR="$(dirname "$CURRENT_DIR")"
else
    echo "❌ Not in Destinationweddingplatformwebsite directory"
    echo "Looking for it..."
    if [ -d "Destinationweddingplatformwebsite" ]; then
        PROJECT_DIR="$(pwd)/Destinationweddingplatformwebsite"
        PARENT_DIR="$(pwd)"
        echo "✅ Found it at: $PROJECT_DIR"
    else
        echo "❌ Could not find Destinationweddingplatformwebsite directory"
        exit 1
    fi
fi

echo ""
echo "📂 Project directory: $PROJECT_DIR"
echo "📂 Parent directory: $PARENT_DIR"
echo ""

# Check for parent lockfile
if [ -f "$PARENT_DIR/package-lock.json" ]; then
    echo "🔍 Found lockfile in parent directory"
    echo "🗑️  Deleting: $PARENT_DIR/package-lock.json"
    rm "$PARENT_DIR/package-lock.json"
    echo "✅ Deleted!"
else
    echo "ℹ️  No lockfile in parent directory (that's good!)"
fi

echo ""
echo "📍 Navigating to project directory..."
cd "$PROJECT_DIR"

echo ""
echo "🧹 Cleaning build cache..."
rm -rf .next

echo ""
echo "📦 Checking package.json..."
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json not found! Are you in the right directory?"
    exit 1
fi

echo ""
echo "🚀 Starting development server..."
echo ""
echo "======================================"
echo "Once ready, open: http://localhost:3000"
echo "Password: wedzway2025"
echo "======================================"
echo ""

npm run dev
