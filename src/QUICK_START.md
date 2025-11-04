# 🚀 Wedzway Next.js - Quick Start Guide

## ⚡ Get Started in 3 Minutes

### Prerequisites

Before you begin, ensure you have:

- **Node.js 18.17 or higher** ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)
- Terminal/Command Prompt

Check your Node version:
```bash
node --version  # Should be 18.17 or higher
npm --version   # Should be 9.0 or higher
```

---

## 🎯 Installation Steps

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Tailwind CSS v4
- ShadCN UI components
- Motion (Framer Motion)
- All other dependencies

**Time:** ~2 minutes (depending on internet speed)

---

### Step 2: Run Development Server

```bash
npm run dev
```

You should see output like:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in Xms
```

**Time:** ~10 seconds

---

### Step 3: Access the Platform

1. Open your browser
2. Navigate to: **http://localhost:3000**
3. You'll see the login page
4. Enter password: **wedzway2025**
5. Click "Access Platform"

**You're in!** 🎉

---

## 🗺️ Key Routes to Explore

### Main Application (Password Required)

| Route | Description | Key Features |
|-------|-------------|--------------|
| `/` | Pitch Deck | 13 sections with business model |
| `/landing` | Landing Page | Hero, features, CTAs |
| `/destinations` | Destinations | Browse global wedding locations |
| `/destinations/1` | Destination Details | Santorini with venues, planners |
| `/venues` | Venues | Filter by type, location, capacity |
| `/venues/1` | Venue Details | Gallery, packages, enquiry form |
| `/planners` | Planners | Verified wedding planners |
| `/planners/1` | Planner Profile | Portfolio, reviews, booking |
| `/vendors` | Vendors | Photographers, videographers, etc. |
| `/inspirations` | Real Weddings | Browse wedding stories |
| `/tours` | Tours & Activities | Guest experiences |
| `/marketplace` | Shopping | Bridal wear, decor, accessories |
| `/wedding-builder` | Website Builder | Create wedding pages |
| `/expenses` | Budget Tracker | Track wedding expenses |
| `/concierge` | Concierge Service | 3 membership tiers |
| `/account` | Customer Dashboard | Manage bookings, favorites |

### Public Pages (No Password Required)

| Route | Description |
|-------|-------------|
| `/wedding/1` | Public Wedding Invitation |
| `/registry/1` | Public Gift Registry |
| `/blog` | Wedding Blog (SEO friendly) |
| `/blog/[slug]` | Blog Articles |

---

## 📦 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Production build (test before deployment)
npm run build

# Start production server (after build)
npm start
```

---

## 🎨 Testing Key Features

### 1. Browse Destinations
- Go to `/destinations`
- Click on "Santorini, Greece"
- Explore venues, planners, weather

### 2. View Venue Details
- Go to `/venues`
- Filter by "Palace Hotels"
- Click on "Cliffside Resort & Spa"
- Check packages, amenities, enquiry form

### 3. Create Wedding Website
- Go to `/wedding-builder`
- Click "Create New Wedding"
- Fill in couple details
- Choose template
- Publish and view

### 4. Track Expenses
- Go to `/expenses`
- Add expense categories
- Track budget vs actual
- Generate reports

### 5. Explore Marketplace
- Go to `/marketplace`
- Browse categories
- View products
- Check brand profiles

---

## 🔐 Authentication System

### Password Protection

- **Access Code:** `wedzway2025`
- **Session Duration:** 24 hours
- **Storage:** HTTP-only cookie
- **Protection:** Middleware-based

### Changing Password

Edit `/middleware.ts`:
```typescript
const isAuthenticated = request.cookies.get('wedzway_auth')?.value === 'authenticated';
```

Edit `/app/login/page.tsx`:
```typescript
const PASSWORD = 'your-new-password';
```

### Public Routes (No Password)

These routes are accessible without login:
- `/login` - Login page
- `/wedding/[id]` - Public wedding invitations
- `/registry/[id]` - Public gift registries  
- `/blog` - Blog pages
- `/blog/[slug]` - Blog articles

---

## 🎯 SEO Features (All Public Pages)

Every non-account page includes:

✅ **Unique page titles** - Optimized for search engines
✅ **Meta descriptions** - 150-160 characters
✅ **Keywords** - Relevant search terms
✅ **Open Graph tags** - Beautiful social media sharing
✅ **Twitter Cards** - Enhanced Twitter sharing
✅ **Server-side rendering** - Fast initial load
✅ **Semantic HTML** - Better crawling
✅ **Mobile responsive** - All device sizes

Example metadata location: `/lib/metadata.ts`

---

## 🔧 Troubleshooting

### Port Already in Use

If port 3000 is busy:
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors

```bash
# Check types
npm run type-check

# Auto-fix ESLint issues
npm run lint:fix
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🌐 Environment Variables (Optional)

Create `.env.local` for custom configuration:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Wedzway

# Authentication
NEXT_PUBLIC_PASSWORD=wedzway2025

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-ga-id

# API Keys (Optional)
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your-key
```

**Note:** Default configuration works without any env variables.

---

## 📱 Mobile Testing

Test responsive design:

```bash
# Desktop
http://localhost:3000

# Mobile simulation (Chrome DevTools)
1. Open DevTools (F12)
2. Click Toggle Device Toolbar (Ctrl+Shift+M)
3. Select device (iPhone 14, iPad, etc.)

# Network testing
# Visit from your phone on same WiFi
http://192.168.x.x:3000  # Check terminal for exact IP
```

---

## 🚀 Production Build Test

Before deploying, test production build locally:

```bash
# Build for production
npm run build

# Start production server
npm start

# Visit
http://localhost:3000
```

**Build should complete without errors!**

---

## 📊 Performance Metrics

Your Next.js app should show:

```
Route (app)                              Size     First Load JS
┌ ○ /                                   XXX kB        XXX kB
├ ○ /destinations                       XXX kB        XXX kB
├ ○ /venues                             XXX kB        XXX kB
└ ○ /planners                           XXX kB        XXX kB

○ (Static)  prerendered as static content
```

---

## 🎓 Next Steps

After successful setup:

1. ✅ Explore all routes listed above
2. ✅ Test responsive design (mobile/tablet/desktop)
3. ✅ Review SEO metadata in browser inspector
4. ✅ Check console for any warnings
5. ✅ Test all interactive features
6. ✅ Build for production (npm run build)
7. ✅ Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment

---

## 💡 Pro Tips

### Hot Reload
- Any code changes automatically refresh the browser
- No need to restart dev server
- Preserves React component state

### Fast Refresh
- Edit components and see changes instantly
- Syntax errors show helpful overlay
- Fixed automatically on save

### Logging
```bash
# Watch console for helpful logs
# Check browser console (F12)
# Review terminal for server logs
```

### VS Code Extensions (Recommended)
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Class autocomplete
- **ES7+ React/Redux/React-Native snippets** - Quick scaffolding

---

## 🆘 Getting Help

### Common Issues

**Issue:** "Cannot find module '@/components/...'"
**Fix:** Paths use `@/` alias. Check `tsconfig.json`

**Issue:** "Hydration failed"
**Fix:** Check for mismatched client/server rendering

**Issue:** "Module not found" after adding dependency
**Fix:** Restart dev server: `Ctrl+C` then `npm run dev`

### Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com
- **ShadCN UI:** https://ui.shadcn.com

---

## ✅ Success Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Can access http://localhost:3000
- [ ] Password login works (wedzway2025)
- [ ] Can navigate all routes
- [ ] No console errors
- [ ] Mobile responsive works
- [ ] Production build succeeds (`npm run build`)

---

## 🎉 You're Ready!

Your Wedzway platform is now running locally!

**Next:** Explore features, customize content, or deploy to production.

**Need more?** Check these guides:
- [README.md](./README.md) - Full platform overview
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy to production
- [NEXTJS_MIGRATION_COMPLETE.md](./NEXTJS_MIGRATION_COMPLETE.md) - Technical details

---

**Happy Building! 💍**

*Making dream weddings a reality, one destination at a time.*
