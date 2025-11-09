# ⚠️ IMPORTANT: Local Development Setup

## The Problem You're Experiencing

You're seeing a **blank page** because you're trying to run a **Next.js app** with a **Vite dev server**.

The error `process is not defined` happens because Next.js code is being served by Vite, which doesn't provide the same environment.

## ✅ Correct Setup

This is a **Next.js 14 application**, NOT a Vite app.

### Step 1: Clean Up (if you ran Vite before)

```bash
# Stop any running dev servers (Ctrl+C)

# Remove any Vite artifacts
rm -rf .vite dist

# Remove Next.js cache
rm -rf .next

# Remove node_modules (optional but recommended)
rm -rf node_modules
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Next.js Dev Server

```bash
npm run dev
```

**DO NOT RUN:**
- `npm run vite`
- `vite dev`
- Any other Vite commands

### Step 4: Open Browser

Navigate to: **http://localhost:3000**

Enter password: **wedzway2025**

## Package.json Scripts

Make sure your `package.json` has these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Verification

When running correctly, you should see:
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000
```

## Common Mistakes

❌ Running `vite` or `vite dev`
❌ Using port 5173 (that's Vite's default port)
❌ Seeing "?v=xxxxx" in browser console URLs (that's Vite's hot reload)

✅ Running `next dev`
✅ Using port 3000 (Next.js default)
✅ Clean URLs in browser console

## Still Having Issues?

1. **Check what's running:**
   ```bash
   lsof -i :3000
   lsof -i :5173
   ```

2. **Kill any processes on those ports:**
   ```bash
   kill -9 $(lsof -t -i:3000)
   kill -9 $(lsof -t -i:5173)
   ```

3. **Fresh install:**
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   npm run dev
   ```

## Need Help?

Contact: hello@wedzway.co
