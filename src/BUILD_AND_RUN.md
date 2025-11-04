# 🏗️ Build and Run Guide - Wedzway Next.js Platform

> Complete instructions for building and running the Wedzway platform locally

---

## ✅ Prerequisites Checklist

Before you begin, ensure you have:

- [ ] **Node.js 18.17+** installed ([Download](https://nodejs.org/))
- [ ] **npm 9.0+** (comes with Node.js)
- [ ] Terminal/Command Prompt access
- [ ] Code editor (VS Code recommended)
- [ ] Modern web browser (Chrome/Edge/Firefox)

### Verify Your Environment

```bash
# Check Node.js version
node --version
# Expected output: v18.17.0 or higher

# Check npm version  
npm --version
# Expected output: 9.0.0 or higher
```

If versions are lower, please update Node.js before continuing.

---

## 📦 Step 1: Install Dependencies

Navigate to your project directory and install all required packages:

```bash
# Install all dependencies
npm install
```

**What this installs:**
- Next.js 14 (React framework)
- React 18 (UI library)
- TypeScript 5 (Type safety)
- Tailwind CSS v4 (Styling)
- ShadCN UI Components (60+ components)
- Motion / Framer Motion (Animations)
- Lucide React (Icons)
- Date-fns (Date utilities)
- Recharts (Charts)
- Sonner (Toast notifications)
- And more...

**Expected time:** 2-3 minutes (depending on internet speed)

**Output:** You should see:
```
added XXX packages in XXs
```

---

## 🚀 Step 2: Start Development Server

Run the development server with hot reload:

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.5s
```

**What this does:**
- Starts Next.js development server
- Enables hot module replacement (HMR)
- Watches for file changes
- Provides detailed error messages
- Optimizes for development

**Server features:**
- ⚡ **Fast Refresh** - See changes instantly
- 🔍 **Error Overlay** - Visual error messages
- 📊 **Performance Metrics** - Built-in analytics
- 🔄 **Auto Restart** - Restarts on critical changes

---

## 🌐 Step 3: Access the Platform

### Open Your Browser

1. Open your web browser
2. Navigate to: **http://localhost:3000**
3. You'll see the login page

### Login

- **Password:** `wedzway2025`
- **Session:** 24 hours
- Click "Access Platform"

**Success!** 🎉 You're now in the platform.

### Network Access (Optional)

Access from other devices on your network:
```
http://192.168.x.x:3000
```
(Check terminal for exact IP address)

Perfect for:
- Testing on mobile devices
- Sharing with team members
- Cross-device testing

---

## 🗺️ Step 4: Explore Key Routes

After logging in, explore these main sections:

### Business/Investor View
- `/` - Pitch Deck (13 sections)
  - Problem, Solution, Market
  - Business Model, Features
  - Roadmap, Team, Financials

### Customer-Facing Pages
- `/landing` - Marketing landing page
- `/destinations` - Browse wedding destinations
- `/venues` - Explore wedding venues
- `/planners` - Find wedding planners
- `/vendors` - Browse photographers, videographers, decorators
- `/inspirations` - Real wedding stories
- `/tours` - Tours and guest activities
- `/marketplace` - Shop wedding products

### Planning Tools
- `/wedding-builder` - Create wedding website
- `/expenses` - Budget tracker
- `/account` - Customer dashboard
- `/concierge` - Concierge service (3 tiers)

### Travel Services
- `/travel/visa` - Visa services
- `/travel/flights/booking` - Flight booking

### Public Pages (No Login Required)
- `/wedding/1` - Sample wedding invitation
- `/registry/1` - Sample gift registry
- `/blog` - Wedding blog

---

## 🔧 Step 5: Development Workflow

### Hot Reload

Make changes and see them instantly:

1. Open any file in `/app` or `/components`
2. Make changes
3. Save file (Ctrl+S / Cmd+S)
4. Browser automatically refreshes

**Example:**
```typescript
// Edit /components/TravelHero.tsx
<h1 className="text-4xl">
  Your Dream Wedding Awaits! {/* Add exclamation */}
</h1>
// Save - changes appear immediately
```

### Check Console

Monitor for errors and logs:

**Browser Console:**
- Press F12 or Right-click → Inspect
- Check Console tab
- Look for errors (red) or warnings (yellow)

**Terminal:**
- Watch for compilation messages
- Check for build errors
- Monitor server logs

### Common Development Tasks

**Type Checking:**
```bash
npm run type-check
```

**Linting:**
```bash
npm run lint
```

**Auto-fix linting issues:**
```bash
npm run lint:fix
```

---

## 🏗️ Step 6: Production Build

Before deploying, test a production build locally:

### Build for Production

```bash
npm run build
```

**What this does:**
- Compiles TypeScript
- Optimizes JavaScript bundles
- Generates static pages
- Creates production assets
- Minifies code
- Optimizes images

**Expected output:**
```
Route (app)                              Size     First Load JS
┌ ○ /                                   142 kB        193 kB
├ ○ /destinations                       178 kB        229 kB
├ ○ /venues                             165 kB        216 kB
└ ○ /planners                           152 kB        203 kB

○  (Static)  prerendered as static content
λ  (Dynamic) server-rendered on demand
```

**Build time:** ~30-60 seconds

### Test Production Build

```bash
npm start
```

**What this does:**
- Starts production server
- Serves optimized build
- Mimics production environment
- Tests performance

**Open:** http://localhost:3000

**Check:**
- All pages load correctly
- No console errors
- Fast page transitions
- Correct functionality

---

## 📊 Step 7: Verify Everything Works

### Testing Checklist

**Authentication:**
- [ ] Login page loads
- [ ] Password (wedzway2025) works
- [ ] Protected routes redirect to login
- [ ] Public pages work without login

**Navigation:**
- [ ] All menu items clickable
- [ ] Routes load correctly
- [ ] Back button works
- [ ] Breadcrumbs functional

**Functionality:**
- [ ] Forms submit
- [ ] Filters work (venues, vendors)
- [ ] Modals/dialogs open
- [ ] Image galleries work
- [ ] Toast notifications show

**Responsive Design:**
- [ ] Mobile view (375px - 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (1024px+)
- [ ] No horizontal scroll
- [ ] Readable text sizes

**SEO:**
- [ ] Page titles unique
- [ ] Meta descriptions present
- [ ] Open Graph tags (check view-source)
- [ ] Images have alt tags

### Quick Test Route

Visit each main section:
```
http://localhost:3000/
http://localhost:3000/landing
http://localhost:3000/destinations
http://localhost:3000/venues
http://localhost:3000/planners
http://localhost:3000/vendors
http://localhost:3000/marketplace
http://localhost:3000/account
```

---

## 🛠️ Troubleshooting

### Port Already in Use

**Error:** "Port 3000 is already in use"

**Solution 1 - Use different port:**
```bash
npm run dev -- -p 3001
# Then visit http://localhost:3001
```

**Solution 2 - Kill existing process:**

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Module Not Found

**Error:** "Cannot find module '@/components/...'"

**Solution:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

**Error:** Build fails with TypeScript errors

**Solution 1 - Check types:**
```bash
npm run type-check
```

**Solution 2 - Clear cache:**
```bash
rm -rf .next
npm run build
```

### Hydration Errors

**Error:** "Hydration failed"

**Cause:** Mismatch between server and client rendering

**Solution:**
- Check for random values in components
- Ensure consistent Date formatting
- Verify conditional rendering logic
- Check browser console for specific error

### Slow Performance

**Issue:** Dev server slow or laggy

**Solutions:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules cache
rm -rf node_modules/.cache

# Restart dev server
npm run dev

# Use Turbopack (experimental, faster)
npm run dev --turbo
```

### Environment Issues

**Error:** Various environment-related errors

**Solution - Create .env.local:**
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🎨 Customization (Optional)

### Change Password

Edit `/middleware.ts`:
```typescript
const isAuthenticated = request.cookies.get('wedzway_auth')?.value === 'authenticated';
```

Edit `/app/login/page.tsx`:
```typescript
const PASSWORD = 'your-new-password';
```

### Update Brand Colors

Edit `/styles/globals.css`:
```css
@theme {
  --color-primary-orange: #YOUR_COLOR;
  --color-primary-teal: #YOUR_COLOR;
}
```

### Modify SEO Metadata

Edit `/lib/metadata.ts`:
```typescript
export const venuesMetadata: Metadata = {
  title: 'Your Custom Title',
  description: 'Your description',
  // ... more fields
};
```

---

## 📦 Available Scripts

### Development
```bash
npm run dev          # Start dev server
npm run dev -- -p 3001  # Start on custom port
```

### Building
```bash
npm run build        # Production build
npm start            # Start production server
```

### Code Quality
```bash
npm run lint         # Check for linting issues
npm run lint:fix     # Auto-fix issues
npm run type-check   # TypeScript checking
```

### Deployment
```bash
vercel --prod        # Deploy to Vercel
npm run build        # Build for other platforms
```

---

## 🚀 Next Steps

After successful local setup:

1. ✅ **Explore the Platform**
   - Test all features
   - Check responsive design
   - Review code structure

2. ✅ **Read Documentation**
   - [NEXTJS_SETUP.md](./NEXTJS_SETUP.md) - Technical details
   - [SEO_IMPLEMENTATION.md](./SEO_IMPLEMENTATION.md) - SEO features
   - [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy guide

3. ✅ **Customize (Optional)**
   - Update content
   - Modify styles
   - Add features

4. ✅ **Deploy to Production**
   - Test production build
   - Choose hosting platform
   - Deploy!

---

## ✅ Success Criteria

Your setup is successful if:

- [x] Dependencies installed without errors
- [x] Dev server starts and runs
- [x] Can access http://localhost:3000
- [x] Login works with password
- [x] All routes are accessible
- [x] No console errors
- [x] Responsive design works
- [x] Production build succeeds
- [x] Production server runs

---

## 📚 Additional Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org/)

### Wedzway Docs
- [README.md](./README.md) - Platform overview
- [QUICK_START.md](./QUICK_START.md) - Quick reference
- [NEXTJS_SETUP.md](./NEXTJS_SETUP.md) - Detailed setup
- [SEO_IMPLEMENTATION.md](./SEO_IMPLEMENTATION.md) - SEO guide
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment

### VS Code Extensions (Recommended)
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Class autocomplete
- **TypeScript Vue Plugin** - Better TypeScript support
- **Error Lens** - Inline error display

---

## 🆘 Getting Help

### Common Questions

**Q: How long does installation take?**
A: 2-3 minutes for dependencies, 10 seconds for dev server

**Q: Can I use yarn or pnpm?**
A: Yes! Use `yarn install` or `pnpm install`

**Q: Do I need environment variables?**
A: No, the app works with defaults. .env.local is optional

**Q: How do I update dependencies?**
A: Run `npm update` (be careful with major versions)

**Q: Can I deploy to my own server?**
A: Yes! See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Still Having Issues?

1. Check terminal output for specific errors
2. Review browser console (F12)
3. Search error message in Next.js docs
4. Check [NEXTJS_SETUP.md](./NEXTJS_SETUP.md) troubleshooting section

---

## 🎉 Congratulations!

You've successfully set up and run the Wedzway Next.js platform locally!

### What You've Accomplished:

✅ Installed all dependencies
✅ Started development server
✅ Accessed the platform
✅ Explored key features
✅ Built for production
✅ Verified everything works

### You're Ready To:

- 🎨 Customize the platform
- 📝 Add new features
- 🚀 Deploy to production
- 📊 Analyze and optimize

---

## 🏁 Final Command Reference

```bash
# Quick Setup
npm install && npm run dev

# Full Workflow
npm install              # Install dependencies
npm run dev              # Start development
# ... make changes ...
npm run type-check       # Check types
npm run lint            # Check code quality
npm run build           # Build for production
npm start               # Test production build
vercel --prod           # Deploy to Vercel
```

---

**Your Wedzway platform is now running locally!** 💍

**Next:** Deploy to production using [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

*Making dream weddings a reality, one build at a time.* ✨
