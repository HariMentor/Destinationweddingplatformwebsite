# 🚨 BLANK PAGE? START HERE! 🚨

## The Problem You're Experiencing

You're seeing a **blank page** with this error in the console:
```
ReferenceError: process is not defined
```

## The Cause

You're running a **Vite dev server** (`localhost:5173`) on a **Next.js project** (`localhost:3000`).

These are two different frameworks - they don't mix!

---

## ✅ THE SOLUTION (3 Steps)

### 1️⃣ Stop the Wrong Server

In your terminal, press:
- **Windows:** `Ctrl+C`
- **Mac:** `Cmd+C` or `Ctrl+C`

### 2️⃣ Run the Correct Command

```bash
npm run dev
```

**NOT:**
- ❌ `vite`
- ❌ `vite dev`
- ❌ `npm run vite`

### 3️⃣ Open the Correct URL

**Browser:** http://localhost:3000

**NOT:**
- ❌ `http://localhost:5173` (that's Vite)

---

## 🎯 Quick Checklist

**Follow these steps exactly:**

1. [ ] **Stop any running servers** (Ctrl+C)

2. [ ] **Install dependencies** (first time only):
   ```bash
   npm install
   ```

3. [ ] **Start Next.js dev server:**
   ```bash
   npm run dev
   ```

4. [ ] **Wait for this message:**
   ```
   ▲ Next.js 14.2.0
   - Local:   http://localhost:3000
   ✓ Ready
   ```

5. [ ] **Open browser at:** http://localhost:3000

6. [ ] **Enter password:** `wedzway2025`

7. [ ] **You should see:** The Wedzway pitch deck!

---

## 🔍 How to Verify It's Working

### ✅ CORRECT:

**Terminal:**
```
▲ Next.js 14.2.0
- Local:   http://localhost:3000
```

**Browser:**
- URL shows: `localhost:3000`
- You see a login page
- No errors in console

### ❌ WRONG:

**Terminal:**
```
VITE v5.x.x
➜ Local:   http://localhost:5173/
```

**Browser:**
- URL shows: `localhost:5173`
- Blank white page
- Console error: `process is not defined`

---

## 🛠️ Troubleshooting

### "Port 3000 is already in use"

**Mac/Linux:**
```bash
lsof -i :3000
kill -9 <PID>
```

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Module not found" errors

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Still having issues?

Run the diagnostic script:

**Mac/Linux:**
```bash
chmod +x check-server.sh
./check-server.sh
```

**Windows:**
```bash
check-server.bat
```

---

## 📚 Documentation

- **`LOCAL_SETUP.md`** - Complete setup guide
- **`START_DEV_SERVER.md`** - Detailed server instructions
- **`IMPORTANT_LOCAL_SETUP.md`** - Common issues and fixes

---

## 🎓 Key Facts

1. **This is a Next.js 14 project** (NOT Vite)
2. **Command to run:** `npm run dev`
3. **Correct port:** 3000 (NOT 5173)
4. **Password:** wedzway2025
5. **Entry point:** `/app/page.tsx` (NOT `index.html`)

---

## 💡 Why This Happens

Many developers are used to Vite's dev server because it's common in modern React projects. However, this project was specifically built with **Next.js** for:

- Server-side rendering (SSR)
- SEO optimization
- App Router architecture
- API routes
- Middleware authentication

Running it with Vite breaks all these features!

---

## ✨ What You Should See

When working correctly:

1. **Login page** with:
   - Gradient background (orange/pink/purple)
   - "Welcome to Wedzway" heading
   - Access code input
   - Sparkles icon

2. **After login:**
   - Full pitch deck website
   - Multiple sections scrolling smoothly
   - Beautiful wedding imagery
   - Smooth animations
   - Responsive design

---

## 🚀 Quick Reference

| Task | Command |
|------|---------|
| **Install dependencies** | `npm install` |
| **Start dev server** | `npm run dev` |
| **Build for production** | `npm run build` |
| **Run production** | `npm start` |
| **Lint code** | `npm run lint` |

---

## 📞 Need Help?

**Email:** hello@wedzway.co

**Before contacting:**
1. Try stopping all servers and running `npm run dev`
2. Check you're on `localhost:3000` not `localhost:5173`
3. Run the diagnostic script: `check-server.sh` or `check-server.bat`
4. Include screenshots of terminal output and browser console

---

## 🎉 Success!

When you see the login page and can log in with `wedzway2025`, you're all set!

Explore the pitch deck and enjoy the Wedzway platform!

---

**Remember:** Always use `npm run dev`, never `vite` ✨
