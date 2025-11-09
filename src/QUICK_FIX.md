# ⚡ QUICK FIX - Blank Page Issue

## 🚨 Problem
Blank page with error: `process is not defined`

## 🎯 Solution (30 seconds)

### 1. Stop Server
```bash
Ctrl+C
```

### 2. Run This
```bash
npm run dev
```

### 3. Open This
```
http://localhost:3000
```

### 4. Password
```
wedzway2025
```

## ✅ Done!

---

## 🔍 Why?

You were running **Vite** (wrong) instead of **Next.js** (right).

- ❌ Vite = Port 5173 = Blank page
- ✅ Next.js = Port 3000 = Working site

---

## 📋 Checklist

- [ ] Stopped Vite server (Ctrl+C)
- [ ] Ran `npm run dev`
- [ ] Opened `localhost:3000`
- [ ] See login page (not blank)
- [ ] Entered password: wedzway2025
- [ ] Site loads successfully

---

## 🆘 Still Broken?

```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📞 Help

See: `README_START_HERE.md` for detailed guide

**Email:** hello@wedzway.co
