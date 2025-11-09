#!/bin/bash

echo "📦 Installing dependencies..."
npm install

echo "🧹 Cleaning up..."
rm -rf .next

echo "🚀 Starting Next.js development server..."
npm run dev