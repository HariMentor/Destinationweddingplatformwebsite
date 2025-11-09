# 🚀 Wedzway Local Development Setup

## ⚠️ CRITICAL ISSUE: You're Running Vite Instead of Next.js!

### The Error You're Seeing:
```
ReferenceError: process is not defined
    at node_modules/next/dist/client/has-base-path.js
```

This happens because you're running a **Vite dev server** on a **Next.js project**.

---

## ✅ CORRECT Setup Instructions

### Prerequisites
- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Step 1: Stop ANY Running Dev Server

Press `Ctrl+C` (or `Cmd+C` on Mac) in your terminal

### Step 2: Clean Up (Important!)

```bash
# Remove build artifacts
rm -rf .next

# Optional but recommended: Fresh install
rm -rf node_modules package-lock.json
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start Next.js Dev Server

```bash
npm run dev
```

**⚠️ DO NOT RUN:**
- `vite`
- `vite dev`
- `npm run vite`
- Any Vite commands

### Step 5: Open Browser

Navigate to: **http://localhost:3000**

You should see a login page asking for an access code.

### Step 6: Enter Access Code

Password: **wedzway2025**

---

## How to Verify You're Running Correctly

### ✅ CORRECT (Next.js):

**Terminal Output:**
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  
  ✓ Ready in 2.5s
```

**Browser:**
- URL: `http://localhost:3000`
- Shows a styled login page with "Welcome to Wedzway"
- No console errors about `process`

### ❌ WRONG (Vite):

**Terminal Output:**
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

**Browser:**
- URL: `http://localhost:5173`
- Blank white page
- Console error: `process is not defined`
- URLs in console have `?v=xxxxxx` suffix

---

## Project Structure

This is a **Next.js 14 App Router** project:

```
/
├── app/                    # Next.js pages (App Router)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/page.tsx     # Login page
│   └── [routes]/          # Other pages
├── components/            # React components
├── lib/                   # Utilities
├── styles/               # CSS files
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

**Key Points:**
- ✅ Uses Next.js App Router (`/app` directory)
- ✅ No `index.html` (that's for Vite/CRA)
- ✅ Has `next.config.js`
- ❌ NO `vite.config.js`

---

## Available Scripts

```json
{
  "dev": "next dev",           // ← Run this for development
  "build": "next build",       // Build for production
  "start": "next start",       // Start production server
  "lint": "next lint"          // Run linter
}
```

---

## Authentication Flow

This project uses **Next.js Middleware** for authentication:

1. Visit `http://localhost:3000`
2. Middleware checks for `wedzway_auth` cookie
3. If not authenticated → Redirect to `/login`
4. Enter password: `wedzway2025`
5. On success → Sets cookie and redirects to home

---

## Troubleshooting

### Port 3000 is already in use

**Find what's using the port:**
```bash
lsof -i :3000
```

**Kill the process:**
```bash
kill -9 <PID>
```

**Or use a different port:**
```bash
npm run dev -- -p 3001
```

### Build Errors

```bash
# Clear everything
rm -rf .next node_modules package-lock.json

# Reinstall
npm install

# Try again
npm run dev
```

### TypeScript Errors

```bash
# Check all errors
npm run build

# Most errors can be ignored in dev mode
# Next.js will still run with warnings
```

### Hot Reload Not Working

- Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R`)
- Check terminal for errors
- Restart dev server

---

## Environment

- **Framework:** Next.js 14 (App Router)
- **React:** 18.3.0
- **TypeScript:** 5.0.0
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn/ui
- **Node:** 18.0.0+

---

## Common Mistakes

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| Running `vite` | Running `npm run dev` |
| Port 5173 | Port 3000 |
| Blank page | Login page |
| `process is not defined` | No errors |
| Browser URLs with `?v=xxx` | Clean URLs |

---

## Quick Verification Checklist

- [ ] Stopped all dev servers
- [ ] Deleted `.next` folder
- [ ] Ran `npm install`
- [ ] Running `npm run dev` (NOT vite)
- [ ] Terminal shows "Next.js" logo
- [ ] Browser at `localhost:3000`
- [ ] See login page (not blank)
- [ ] No `process is not defined` error
- [ ] Password `wedzway2025` works

---

## Access Code

**Password:** `wedzway2025`

This can be changed in:
- Client-side: `/components/AccessGate.tsx` (localStorage fallback)
- Server-side: `/app/login/page.tsx` (cookie-based auth)

---

## Support

For questions or issues:
- Email: hello@wedzway.co
- Check `/START_DEV_SERVER.md` for detailed instructions
- Check `/IMPORTANT_LOCAL_SETUP.md` for troubleshooting

---

## Success Indicators

When everything is working correctly:

1. **Terminal shows:**
   ```
   ▲ Next.js 14.2.0
   - Local:   http://localhost:3000
   ✓ Ready in 2.5s
   ```

2. **Browser shows:**
   - Styled login page with gradient background
   - "Welcome to Wedzway" heading
   - Access code input field
   - No console errors

3. **After login:**
   - Full pitch deck site loads
   - All sections scroll smoothly
   - Images load properly
   - No errors in console

---

**Remember:** This is a **Next.js** project, not Vite!
Always use `npm run dev` to start the development server.
