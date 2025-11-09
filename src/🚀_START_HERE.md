# 🚀 WEDZWAY - START HERE

## 🚨 SEEING A BLANK PAGE?

**👉 You're running the wrong server! Follow the QUICK FIX below.**

---

## ⚡ QUICK FIX (30 seconds)

1. **Stop your current server:** Press `Ctrl+C`
2. **Run this command:** `npm run dev`
3. **Open browser:** http://localhost:3000
4. **Enter password:** `wedzway2025`

**✅ Done!** You should now see the Wedzway platform.

---

## 📚 Documentation Index

Choose your path based on what you need:

### 🆘 Having Issues?

| Issue | Read This |
|-------|-----------|
| **Blank page / process error** | [`QUICK_FIX.md`](/QUICK_FIX.md) |
| **Visual comparison** | [`VISUAL_GUIDE.md`](/VISUAL_GUIDE.md) |
| **Wrong server running** | [`README_START_HERE.md`](/README_START_HERE.md) |

### 🔧 Setup & Installation

| Task | Read This |
|------|-----------|
| **First time setup** | [`LOCAL_SETUP.md`](/LOCAL_SETUP.md) |
| **Starting dev server** | [`START_DEV_SERVER.md`](/START_DEV_SERVER.md) |
| **Important warnings** | [`IMPORTANT_LOCAL_SETUP.md`](/IMPORTANT_LOCAL_SETUP.md) |

### 🛠️ Diagnostic Tools

| Tool | Description |
|------|-------------|
| **`check-server.sh`** | Mac/Linux diagnostic script |
| **`check-server.bat`** | Windows diagnostic script |

---

## 🎯 What This Project Is

**Wedzway** is a destination wedding platform built with:

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **UI:** Shadcn/ui components
- **Language:** TypeScript
- **Auth:** Password-protected with middleware

---

## ✅ Correct Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Ran `npm install`
- [ ] Running `npm run dev` (NOT vite)
- [ ] Browser at `localhost:3000` (NOT 5173)
- [ ] See login page (not blank)
- [ ] Password `wedzway2025` works

---

## ❌ Common Mistakes

| ❌ Wrong | ✅ Right |
|---------|---------|
| Running `vite` | Run `npm run dev` |
| Port 5173 | Port 3000 |
| Blank page | Login page visible |
| `process is not defined` | No errors |

---

## 🔑 Access Information

**Password:** `wedzway2025`

This unlocks the full pitch deck and platform features.

---

## 🎨 What You Should See

### After Running `npm run dev`:

**Terminal:**
```
▲ Next.js 14.2.0
- Local:   http://localhost:3000
✓ Ready in 2.1s
```

**Browser:**
- Styled login page with gradient background
- "Welcome to Wedzway" heading
- Password input field
- No errors in console

### After Login:

- Full pitch deck website
- Navigation bar
- Hero section
- Multiple content sections
- Wedding imagery
- Smooth animations

---

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run diagnostics (Mac/Linux)
./check-server.sh

# Run diagnostics (Windows)
check-server.bat
```

---

## 🔍 Project Structure

```
/
├── app/                    # Next.js pages (App Router)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/page.tsx     # Login page
│   └── [routes]/          # Other routes
├── components/            # React components
│   ├── ui/               # Shadcn components
│   └── [features]/       # Feature components
├── lib/                   # Utilities
├── styles/               # Global CSS
└── package.json          # Dependencies
```

---

## 💡 Key Concepts

### This is Next.js, NOT Vite!

- **Next.js** = Server-side rendering, SEO, App Router
- **Vite** = Build tool for SPAs

They are **different** and **incompatible**.

### Port Numbers Matter

- **3000** = Next.js (correct)
- **5173** = Vite (wrong for this project)

### Authentication Flow

1. Visit any page
2. Middleware checks for auth cookie
3. Redirect to `/login` if not authenticated
4. Enter password: `wedzway2025`
5. Cookie set, redirect to requested page

---

## 🆘 Troubleshooting

### Still seeing blank page?

```bash
# Nuclear option - fresh start
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Port already in use?

```bash
# Mac/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module errors?

```bash
npm install
```

### TypeScript errors?

Most can be ignored in development. Next.js will still run.

---

## 📞 Support

**Email:** hello@wedzway.co

**Before contacting:**
1. ✅ Try `npm run dev`
2. ✅ Check you're on port 3000
3. ✅ Run diagnostic script
4. ✅ Include terminal output and console errors

---

## 🎉 Success Indicators

You know it's working when:

1. ✅ Terminal shows "▲ Next.js"
2. ✅ URL is `localhost:3000`
3. ✅ Login page displays
4. ✅ No console errors
5. ✅ Password works
6. ✅ Site loads after login
7. ✅ Images display
8. ✅ Smooth scrolling

---

## 📖 Additional Documentation

- `BUILD_AND_RUN.md` - Build instructions
- `DEPLOYMENT_GUIDE.md` - Deployment guide
- `SEO_IMPLEMENTATION.md` - SEO details
- `NEXTJS_MIGRATION_COMPLETE.md` - Migration notes

---

## 🎯 TL;DR

**Problem:** Running Vite on a Next.js project  
**Solution:** Stop Vite, run `npm run dev`  
**URL:** http://localhost:3000  
**Password:** wedzway2025  

---

**Remember:** Always use `npm run dev`, never `vite` 🚀

---

## 🌟 About Wedzway

Wedzway connects couples with verified wedding planners, venues, photographers, videographers, makeup artists, decorators, travel planners, and all wedding service providers globally. This is the concept pitch deck showcasing our complete business model.

**Top Market:** India (35%)  
**Destinations:** Udaipur, Jaipur, Goa, Kerala, and more  
**Brand Colors:** Teal (#02542D), Orange (#DF6951)  
**Fonts:** Volkhov (serif), Poppins (sans-serif)  

---

**Need help? Read `README_START_HERE.md` for detailed instructions! 📖**
