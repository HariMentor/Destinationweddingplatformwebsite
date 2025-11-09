#!/bin/bash

echo "🔧 Fixing versioned imports in UI components..."

# Detect OS for sed compatibility
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  find ./components/ui -name "*.tsx" -type f -exec sed -i '' \
    -e 's/@radix-ui\/react-\([a-z-]*\)@[0-9.]*/@radix-ui\/react-\1/g' \
    -e 's/lucide-react@[0-9.]*/lucide-react/g' \
    -e 's/class-variance-authority@[0-9.]*/class-variance-authority/g' \
    {} \;
else
  # Linux
  find ./components/ui -name "*.tsx" -type f -exec sed -i \
    -e 's/@radix-ui\/react-\([a-z-]*\)@[0-9.]*/@radix-ui\/react-\1/g' \
    -e 's/lucide-react@[0-9.]*/lucide-react/g' \
    -e 's/class-variance-authority@[0-9.]*/class-variance-authority/g' \
    {} \;
fi

echo "✅ Fixed all imports!"
echo ""
echo "🧹 Cleaning up..."
rm -rf .next

echo "🚀 Starting development server..."
npm run dev