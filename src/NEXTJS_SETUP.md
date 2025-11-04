# 🔧 Next.js Setup Guide - Wedzway Platform

> Complete technical setup guide for the Wedzway Next.js application

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Configuration](#configuration)
5. [Development Workflow](#development-workflow)
6. [SEO Implementation](#seo-implementation)
7. [Routing System](#routing-system)
8. [Authentication](#authentication)
9. [Styling System](#styling-system)
10. [Components](#components)
11. [Build & Deploy](#build--deploy)
12. [Troubleshooting](#troubleshooting)

---

## 🖥️ System Requirements

### Minimum Requirements
- **Node.js:** 18.17 or higher
- **npm:** 9.0 or higher (or yarn 1.22+)
- **OS:** Windows 10+, macOS 10.15+, or Linux
- **RAM:** 4GB minimum, 8GB recommended
- **Disk Space:** 500MB for project + dependencies

### Recommended Setup
- **Node.js:** Latest LTS version (20.x)
- **Package Manager:** npm (comes with Node.js)
- **Editor:** VS Code with extensions
- **Browser:** Chrome/Edge with DevTools

### Check Your Environment

```bash
# Check Node.js version
node --version  # Should output v18.17.0 or higher

# Check npm version
npm --version   # Should output 9.0.0 or higher

# Check npm configuration
npm config list
```

---

## 📦 Installation

### 1. Clone Repository (if applicable)

```bash
git clone <repository-url>
cd wedzway-platform
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn (alternative)
yarn install

# Using pnpm (alternative)
pnpm install
```

**Installation includes:**
- Next.js 14.x
- React 18.x
- TypeScript 5.x
- Tailwind CSS 4.x
- ShadCN UI components
- Motion (Framer Motion)
- Lucide Icons
- Date-fns, Recharts, and more

**Time:** 2-3 minutes on average internet connection

### 3. Verify Installation

```bash
# Check if node_modules exists
ls node_modules

# Verify package.json scripts
npm run
```

---

## 📂 Project Structure

```
wedzway-platform/
│
├── 📁 app/                          # Next.js App Router
│   ├── layout.tsx                   # Root layout with fonts & providers
│   ├── page.tsx                     # Home/Pitch deck page
│   ├── HomePageClient.tsx           # Client component for home
│   │
│   ├── 📁 login/                    # Password gate
│   │   └── page.tsx
│   │
│   ├── 📁 landing/                  # Marketing landing
│   │   ├── page.tsx                 # Server component with metadata
│   │   └── LandingPageClient.tsx   # Client component
│   │
│   ├── 📁 destinations/             # Destinations pages
│   │   ├── page.tsx                 # List page with SEO
│   │   ├── DestinationsPageClient.tsx
│   │   └── 📁 [id]/                 # Dynamic route
│   │       ├── page.tsx
│   │       └── DestinationDetailClient.tsx
│   │
│   ├── 📁 venues/                   # Venues pages
│   │   ├── page.tsx
│   │   ├── VenuesPageClient.tsx
│   │   └── 📁 [id]/
│   │       ├── page.tsx
│   │       └── VenueDetailClient.tsx
│   │
│   ├── 📁 planners/                 # Planners pages
│   ├── 📁 vendors/                  # Vendors pages
│   ├── 📁 inspirations/             # Real weddings
│   ├── 📁 tours/                    # Tours & activities
│   ├── 📁 marketplace/              # Shopping
│   ├── 📁 wedding-builder/          # Website builder
│   ├── 📁 expenses/                 # Budget tracker
│   ├── 📁 concierge/                # Concierge service
│   ├── 📁 account/                  # Customer dashboard
│   ├── 📁 blog/                     # Public blog (SEO)
│   │   ├── page.tsx
│   │   └── 📁 [slug]/
│   │       └── page.tsx
│   │
│   ├── 📁 wedding/                  # Public invitations
│   │   └── 📁 [id]/
│   │       └── page.tsx
│   │
│   ├── 📁 registry/                 # Public registries
│   │   └── 📁 [id]/
│   │       └── page.tsx
│   │
│   └── 📁 travel/                   # Travel services
│       ├── 📁 visa/
│       └── 📁 flights/
│
├── 📁 components/                   # React components
│   ├── TravelNav.tsx               # Main navigation
│   ├── TravelFooter.tsx            # Footer
│   ├── CurrencyContext.tsx         # Currency provider
│   │
│   ├── 📁 ui/                      # ShadCN UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ... (60+ components)
│   │
│   └── 📁 figma/                   # Figma imports
│       └── ImageWithFallback.tsx
│
├── 📁 lib/                         # Utilities & configs
│   └── metadata.ts                 # SEO metadata configs
│
├── 📁 styles/                      # Styling
│   └── globals.css                 # Tailwind + custom styles
│
├── 📁 public/                      # Static assets
│   └── (images, icons, etc.)
│
├── middleware.ts                   # Auth middleware
├── next.config.js                  # Next.js config
├── tsconfig.json                   # TypeScript config
├── tailwind.config.js              # Tailwind config (v4)
└── package.json                    # Dependencies
```

### Key Patterns

**Server vs Client Components:**
- `page.tsx` files are Server Components (default)
- Files ending in `Client.tsx` use `'use client'` directive
- Server components for SEO metadata
- Client components for interactivity

**Route Organization:**
- Static routes: `/app/venues/page.tsx`
- Dynamic routes: `/app/venues/[id]/page.tsx`
- Nested layouts: `/app/layout.tsx` (root)

---

## ⚙️ Configuration

### Next.js Config (`next.config.js`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

### TypeScript Config (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]  // Path alias
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Tailwind Config (v4 in `styles/globals.css`)

Tailwind v4 uses CSS-based configuration:

```css
@import "tailwindcss";

/* Custom design tokens */
@theme {
  --font-volkhov: 'Volkhov', serif;
  --font-poppins: 'Poppins', sans-serif;
  
  --color-primary-orange: #DF6951;
  --color-primary-teal: #02542D;
  --color-secondary-yellow: #F1A501;
}
```

### Environment Variables (Optional)

Create `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Wedzway

# Authentication
NEXT_PUBLIC_PASSWORD=wedzway2025

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# API Keys (if needed)
# NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your-key
```

**Note:** Platform works without env variables using defaults.

---

## 💻 Development Workflow

### Starting Development Server

```bash
# Start with hot reload
npm run dev

# Start on custom port
npm run dev -- -p 3001

# Start with turbopack (faster)
npm run dev --turbo
```

### Development Features

**Hot Module Replacement (HMR):**
- Changes appear instantly without full reload
- React state preserved when possible
- CSS updates without refresh

**Fast Refresh:**
- Automatic error recovery
- Syntax error overlay
- Preserved component state

**Type Checking:**
```bash
# Run TypeScript compiler
npm run type-check

# Watch mode
npm run type-check -- --watch
```

**Linting:**
```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### File Watching

Next.js automatically watches:
- `/app/**/*.tsx` - Pages & routes
- `/components/**/*.tsx` - Components
- `/styles/**/*.css` - Styles
- `/lib/**/*.ts` - Utilities
- `middleware.ts` - Middleware

---

## 🎯 SEO Implementation

### Metadata System

All SEO metadata is centralized in `/lib/metadata.ts`:

```typescript
import { Metadata } from 'next';

// Pre-configured metadata for each page type
export const homeMetadata: Metadata = {
  title: 'Wedzway - Global Destination Wedding Platform',
  description: '...',
  keywords: ['...'],
  openGraph: { ... },
  twitter: { ... },
};
```

### Using Metadata in Pages

**Server Component (page.tsx):**
```typescript
import type { Metadata } from 'next';
import { venuesMetadata } from '@/lib/metadata';
import { VenuesPageClient } from './VenuesPageClient';

export const metadata: Metadata = venuesMetadata;

export default function VenuesPage() {
  return <VenuesPageClient />;
}
```

### Dynamic Metadata

For pages with dynamic content:

```typescript
import { generateVenueMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }): Promise<Metadata> {
  const venue = getVenue(params.id);
  return generateVenueMetadata(venue.name, venue.location);
}
```

### SEO Features Included

✅ **Unique Page Titles** - Every page has optimized title
✅ **Meta Descriptions** - 150-160 characters, keyword-rich
✅ **Keywords** - Relevant search terms
✅ **Open Graph** - Beautiful social media previews
✅ **Twitter Cards** - Enhanced Twitter sharing
✅ **Canonical URLs** - Prevent duplicate content
✅ **Robots Meta** - Control indexing
✅ **Structured Data** - JSON-LD (can be added)

### Testing SEO

```bash
# Build and analyze
npm run build

# Check meta tags in browser
# Open DevTools → Elements → <head>

# Test social sharing
# Use: https://www.opengraph.xyz/
# Or: https://cards-dev.twitter.com/validator
```

---

## 🗺️ Routing System

### App Router Structure

**Static Routes:**
```
/app/destinations/page.tsx → /destinations
/app/venues/page.tsx → /venues
```

**Dynamic Routes:**
```
/app/venues/[id]/page.tsx → /venues/1, /venues/2, etc.
/app/blog/[slug]/page.tsx → /blog/post-title
```

**Nested Routes:**
```
/app/destinations/[id]/tourism-board/[name]/page.tsx
→ /destinations/1/tourism-board/greece
```

**Route Groups (organization):**
```
/app/(auth)/login/page.tsx → /login
/app/(auth)/signup/page.tsx → /signup
```

### Navigation

**Using Link Component:**
```typescript
import Link from 'next/link';

<Link href="/destinations">Browse Destinations</Link>
```

**Programmatic Navigation:**
```typescript
'use client';
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/venues');
router.back();
router.refresh();
```

### Route Handlers (API Routes)

Create API endpoints:
```
/app/api/venues/route.ts → /api/venues
```

---

## 🔐 Authentication

### Middleware-Based Protection

File: `/middleware.ts`

```typescript
export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('wedzway_auth')?.value === 'authenticated';
  
  // Public routes
  if (request.nextUrl.pathname.startsWith('/wedding/') || 
      request.nextUrl.pathname.startsWith('/registry/') ||
      request.nextUrl.pathname === '/blog') {
    return NextResponse.next();
  }
  
  // Protected routes
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}
```

### Login Flow

1. User visits any protected route
2. Middleware redirects to `/login`
3. User enters password: `wedzway2025`
4. Cookie set: `wedzway_auth=authenticated`
5. Redirect to original destination
6. Cookie expires after 24 hours

### Public Routes

No password required:
- `/login` - Login page itself
- `/wedding/[id]` - Wedding invitations
- `/registry/[id]` - Gift registries
- `/blog` - Blog pages
- `/blog/[slug]` - Blog articles

---

## 🎨 Styling System

### Tailwind CSS v4

**Configuration in CSS:**
```css
/* styles/globals.css */
@import "tailwindcss";

@theme {
  /* Custom colors */
  --color-primary-orange: #DF6951;
  --color-primary-teal: #02542D;
  
  /* Custom fonts */
  --font-volkhov: 'Volkhov', serif;
  --font-poppins: 'Poppins', sans-serif;
}
```

**Using in Components:**
```tsx
<div className="bg-[#DF6951] text-white">
  <h1 style={{ fontFamily: 'Volkhov, serif' }}>Title</h1>
</div>
```

### Typography System

**Headings:** Volkhov (serif)
**Body:** Poppins (sans-serif)

Loaded in `/app/layout.tsx`:
```typescript
import { Volkhov, Poppins } from 'next/font/google';

const volkhov = Volkhov({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-volkhov',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});
```

### Responsive Breakpoints

```css
/* Mobile first */
sm:  /* @media (min-width: 640px) */
md:  /* @media (min-width: 768px) */
lg:  /* @media (min-width: 1024px) */
xl:  /* @media (min-width: 1280px) */
2xl: /* @media (min-width: 1536px) */
```

---

## 🧩 Components

### Component Architecture

**Server Components (default):**
- Can fetch data directly
- No JavaScript sent to client
- Better performance
- Use for pages, layouts

**Client Components ('use client'):**
- Interactive features
- Use hooks (useState, useEffect)
- Event handlers
- Browser APIs

### ShadCN UI Components (60+)

Located in `/components/ui/`:

**Form Components:**
- `button.tsx` - Buttons with variants
- `input.tsx` - Text inputs
- `textarea.tsx` - Multi-line inputs
- `select.tsx` - Dropdowns
- `checkbox.tsx` - Checkboxes
- `radio-group.tsx` - Radio buttons

**Layout Components:**
- `card.tsx` - Content cards
- `dialog.tsx` - Modals
- `sheet.tsx` - Side panels
- `tabs.tsx` - Tabbed content
- `accordion.tsx` - Collapsible sections

**Navigation:**
- `navigation-menu.tsx` - Nav bars
- `breadcrumb.tsx` - Breadcrumbs
- `pagination.tsx` - Page navigation

**Data Display:**
- `table.tsx` - Data tables
- `chart.tsx` - Recharts wrapper
- `calendar.tsx` - Date picker
- `avatar.tsx` - User avatars

**Feedback:**
- `toast.tsx` (sonner) - Notifications
- `alert.tsx` - Alerts
- `progress.tsx` - Progress bars
- `skeleton.tsx` - Loading placeholders

### Using Components

```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';

<Button variant="outline" size="lg">
  Click Me
</Button>

<Card className="p-6">
  <h2>Card Title</h2>
</Card>
```

---

## 🏗️ Build & Deploy

### Production Build

```bash
# Create optimized build
npm run build

# Output shows route information
Route (app)                    Size     First Load JS
┌ ○ /                         142 kB          193 kB
├ ○ /destinations             178 kB          229 kB
├ ○ /venues                   165 kB          216 kB
└ ○ /planners                 152 kB          203 kB

○  (Static)  prerendered as static content
λ  (Dynamic) server-rendered on demand
```

### Test Production Build

```bash
# Build
npm run build

# Start production server
npm start

# Visit
http://localhost:3000
```

### Deployment Options

**Vercel (Recommended):**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**
```bash
npm run build
# Deploy .next folder
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

**Static Export (Limited):**
```bash
# Not recommended due to dynamic features
# But possible for static pages
next export
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Port 3000 in use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

**Issue: Module not found**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Build fails**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Issue: TypeScript errors**
```bash
# Check types
npm run type-check

# Ignore type errors (not recommended)
# Add to next.config.js:
typescript: {
  ignoreBuildErrors: true,
}
```

**Issue: Hydration errors**
- Check for mismatched HTML between server/client
- Ensure consistent rendering
- Check console for specific error

**Issue: Slow builds**
```bash
# Use turbopack (experimental)
npm run dev --turbo

# Clear cache
rm -rf .next node_modules/.cache
```

### Debug Mode

```bash
# Enable debug logs
NODE_OPTIONS='--inspect' npm run dev

# Verbose output
npm run dev --verbose
```

### Performance Analysis

```bash
# Analyze bundle size
npm run build --profile

# Generate bundle analyzer
npm install -g @next/bundle-analyzer
```

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [ShadCN UI](https://ui.shadcn.com)

### Learning Resources
- [Next.js Learn](https://nextjs.org/learn)
- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools
- [Vercel](https://vercel.com) - Deployment
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance
- [React DevTools](https://react.dev/learn/react-developer-tools) - Debugging

---

## ✅ Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server runs (`npm run dev`)
- [ ] Can access http://localhost:3000
- [ ] Password login works
- [ ] All routes accessible
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No lint errors (`npm run lint`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Responsive design works (mobile/tablet/desktop)

---

## 🎉 Success!

Your Wedzway Next.js platform is fully configured and ready for development!

**Next Steps:**
1. Explore the codebase
2. Customize content
3. Add new features
4. Deploy to production

For deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Built with Next.js 14, React 18, and Tailwind CSS v4** 💍
