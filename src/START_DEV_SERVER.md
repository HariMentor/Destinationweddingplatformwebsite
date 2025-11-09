# 🚀 How to Start the Development Server

## ⚠️ CRITICAL: You're Running the Wrong Server!

Your error shows you're running **Vite**, but this is a **Next.js** project.

## The Error You're Seeing

```
ReferenceError: process is not defined
    at node_modules/next/dist/client/has-base-path.js
```

This happens because **Next.js code cannot run in a Vite environment**.

## ✅ SOLUTION: Run Next.js Dev Server

### Step-by-Step Instructions

1. **Stop ANY currently running dev server**
   - Press `Ctrl+C` or `Cmd+C` in your terminal
   - Close all terminal windows running dev servers

2. **Open a NEW terminal window** in your project directory

3. **Clean up (first time only):**
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   ```

4. **Start the CORRECT dev server:**
   ```bash
   npm run dev
   ```

5. **Wait for this message:**
   ```
     ▲ Next.js 14.2.0
     - Local:        http://localhost:3000
     - Environments: .env
   
     ✓ Ready in 2.5s
   ```

6. **Open browser at:**
   ```
   http://localhost:3000
   ```

7. **Enter password:** `wedzway2025`

## ❌ DO NOT RUN These Commands:

- `npm run vite`
- `vite`
- `vite dev`
- Any command that starts Vite

## ✅ ONLY RUN This Command:

```bash
npm run dev
```

This runs: `next dev`

## How to Verify You're Running Next.js (Not Vite)

### ✅ Correct (Next.js):
- Terminal shows: `▲ Next.js`
- URL is: `http://localhost:3000`
- Browser console shows clean URLs
- No `?v=xxxxxx` in console URLs

### ❌ Wrong (Vite):
- Terminal shows: `VITE v5.x.x`
- URL is: `http://localhost:5173`
- Browser console shows `?v=ce4f3654` in URLs
- Error: `process is not defined`

## Troubleshooting

### If port 3000 is already in use:

```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process (replace PID with actual number)
kill -9 PID
```

Or specify a different port:
```bash
npm run dev -- -p 3001
```

### If you see build errors:

```bash
# Clear everything and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### If changes don't appear:

- Make sure Fast Refresh is working
- Check terminal for errors
- Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`

## Project Structure Confirmation

This project has:
- ✅ `/app` directory (Next.js App Router)
- ✅ `/app/layout.tsx` (Root layout)
- ✅ `/app/page.tsx` (Home page)
- ✅ `next.config.js` (Next.js config)
- ❌ NO `index.html` (that's for Vite/CRA)
- ❌ NO `vite.config.js` (this isn't Vite)

## Final Checklist

- [ ] Stopped all dev servers
- [ ] Removed `.next` folder
- [ ] Ran `npm install`
- [ ] Running `npm run dev` (NOT vite)
- [ ] Seeing Next.js logo in terminal
- [ ] Browser at `localhost:3000`
- [ ] No `process is not defined` error

## Contact

If still having issues: hello@wedzway.co
