# 💍 Wedzway - Destination Wedding Platform

> **A comprehensive Next.js platform connecting couples with verified wedding planners, venues, and vendors globally.**

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)

---

## 🌟 Overview

Wedzway is a destination wedding platform that helps couples plan their dream weddings by connecting them with:

- ✅ **Verified Wedding Planners** - Expert coordinators worldwide
- ✅ **Stunning Venues** - Palaces, resorts, and unique locations
- ✅ **Professional Vendors** - Photographers, videographers, decorators
- ✅ **Tourism Services** - Tours, visa assistance, flight booking
- ✅ **Wedding Marketplace** - Bridal wear, decor, accessories
- ✅ **Planning Tools** - Website builder, expense tracker, gift registry
- ✅ **Concierge Service** - Premium planning support (3 tiers with regional pricing: India/International)

### Top Markets
- 🇮🇳 **India (35%)** - Udaipur, Jaipur, Goa, Kerala
- 🌍 International destinations worldwide

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd wedzway-platform

# Install dependencies
npm install

# Run development server
npm run dev
```

### Access the Platform

1. Open browser: **http://localhost:3000**
2. Enter password: **wedzway2025**
3. Explore the platform!

---

## 📂 Project Structure

```
wedzway-platform/
├── app/                      # Next.js App Router (30+ routes)
│   ├── page.tsx              # Pitch deck (/)
│   ├── login/                # Password gate
│   ├── landing/              # Landing page
│   ├── destinations/         # Destination browsing
│   ├── venues/               # Venue discovery
│   ├── planners/             # Planner profiles
│   ├── vendors/              # Vendor directory
│   ├── marketplace/          # Wedding shopping
│   ├── wedding-builder/      # Website builder
│   └── account/              # Customer dashboard
│
├── components/               # React components
│   ├── TravelNav.tsx         # Navigation
│   ├── TravelFooter.tsx      # Footer
│   └── ui/                   # 60+ ShadCN components
│
├── styles/
│   └── globals.css           # Tailwind v4 + custom styles
│
├── middleware.ts             # Password protection
├── next.config.js            # Next.js config
└── package.json              # Dependencies
```

---

## 🔐 Authentication

### Password Protection

**Access Code:** `wedzway2025`
**Session:** 24 hours (cookie-based)

### Public Routes (No Password)

- `/wedding/[id]` - Public wedding invitations
- `/registry/[id]` - Public gift registries

All other routes require authentication.

---

## 🗺️ Routes

### Main Routes

| Route | Description |
|-------|-------------|
| `/` | Pitch deck (13 sections) |
| `/landing` | Marketing landing page |
| `/destinations` | Browse destinations |
| `/destinations/[id]` | Destination details |
| `/venues` | Browse venues |
| `/venues/[id]` | Venue details |
| `/planners` | Browse planners |
| `/planners/[id]` | Planner profile |
| `/vendors` | Browse vendors (tabs) |
| `/vendors/[type]/[id]` | Vendor profile |
| `/inspirations` | Real weddings |
| `/inspirations/[id]` | Wedding story |
| `/tours` | Tours & activities |
| `/tours/[id]` | Tour details |
| `/travel/visa` | Visa & flights |
| `/marketplace` | Shopping |
| `/marketplace/products/[id]` | Product details |
| `/marketplace/brands/[name]` | Brand profile |
| `/wedding-builder` | Website builder |
| `/expenses` | Budget tracker |
| `/account` | Customer dashboard |
| `/concierge` | Premium concierge service |

### Public Routes

| Route | Description |
|-------|-------------|
| `/wedding/[id]` | Wedding invitation |
| `/registry/[id]` | Gift registry |

---

## 🎨 Features

### For Couples

- 🔍 **Search & Discover** - Find venues, planners, vendors
- 💰 **Budget Management** - Track expenses and payments
- 🌐 **Wedding Website** - Build custom invitation pages
- 🎁 **Gift Registry** - Manage wedding gifts
- ✈️ **Travel Services** - Visa assistance, flight booking
- 📸 **Inspiration** - Browse real wedding stories
- 👑 **Concierge Service** - Premium planning support with 3 membership tiers and regional pricing:
  - **India**: Starter ₹50k, Pro ₹1L, Elite ₹1.5L
  - **International**: Starter €1.5k, Pro €3k, Elite €5k

### For Vendors

- ✅ **Verified Profiles** - Build trust with badges
- 📊 **Portfolio Showcase** - Display work & reviews
- 💼 **Business Tools** - Manage bookings & inquiries
- 🌍 **Global Reach** - Connect with destination couples

### For Tourism Boards

- 🏛️ **Destination Profiles** - Showcase attractions
- 🎟️ **Promotions** - Share coupons & packages
- 📅 **Event Booking** - Museums, tours, experiences

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS v4
- **Components:** ShadCN UI
- **Icons:** Lucide React
- **Animations:** Motion (Framer Motion)
- **Forms:** React Hook Form
- **Charts:** Recharts
- **Typography:** Volkhov (serif) + Poppins (sans-serif)
- **Images:** Unsplash API

---

## 📦 Scripts

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Other Platforms

```bash
# Build
npm run build

# Start
npm start
```

Supports: Vercel, Netlify, AWS, Google Cloud, any Node.js hosting

---

## 🎯 SEO Features

Every page includes:

- ✅ Unique page titles
- ✅ Meta descriptions
- ✅ Keywords
- ✅ Open Graph tags (social sharing)
- ✅ Twitter Cards
- ✅ Server-side rendering
- ✅ Fast load times
- ✅ Mobile responsive

---

## 🌈 Design System

### Colors

- **Primary Orange:** `#DF6951`
- **Secondary Yellow:** `#F1A501`
- **Warm gradients throughout**

### Fonts

- **Headings:** Volkhov (serif)
- **Body:** Poppins (sans-serif)

### Components

60+ ShadCN UI components including:
- Buttons, Cards, Dialogs
- Forms, Inputs, Selects
- Navigation, Tabs, Accordions
- Charts, Calendars, Carousels
- And more...

---

## 📱 Responsive Design

Optimized for all devices:

- 📱 Mobile (320px - 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (1024px+)

---

## 🔧 Configuration

### Environment Variables (Optional)

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_PASSWORD=wedzway2025
```

### Next.js Config

See `next.config.js` for:
- Image optimization settings
- Build configuration
- Deployment options

---

## 📖 Documentation

- 📘 **[Quick Start](./QUICK_START.md)** - Get running in 3 minutes
- 📗 **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Production deployment
- 📙 **[Migration Complete](./NEXTJS_MIGRATION_COMPLETE.md)** - Full conversion details
- 📕 **[Conversion Status](./CONVERSION_STATUS.md)** - Implementation checklist

---

## 🤝 Contributing

This is a proprietary platform. For access or inquiries, contact the Wedzway team.

---

## 📄 License

Proprietary - All rights reserved

---

## 🎉 Features Highlights

### Business Model

- **Commission-based** (15-20% from vendors)
- **Premium listings** for featured vendors
- **Subscription tiers** for planners
- **Marketplace commission** (10-15%)
- **Advertising** on platform

### Market Focus

1. **India (35%)** - Largest market
   - Udaipur - Lake Palace weddings
   - Jaipur - Royal palace weddings
   - Goa - Beach weddings
   - Kerala - Backwater weddings

2. **International Destinations**
   - Italy, Greece, Thailand, Bali
   - Caribbean, Maldives, Dubai

### Verified Ecosystem

- ✅ Background-checked vendors
- ✅ Verified reviews
- ✅ Quality guarantees
- ✅ Secure payments
- ✅ Dispute resolution

---

## 💼 For Investors

This is a **pitch deck platform** showcasing:

- ✅ Complete business model
- ✅ Market analysis (India 35%)
- ✅ Competitive advantages
- ✅ Revenue streams
- ✅ MVP features
- ✅ Roadmap
- ✅ Team presentation
- ✅ Financial projections

**Access:** Password-protected demo
**Purpose:** Investor presentations & stakeholder demos

---

## 🆘 Support

### Quick Help

- **Login Issues?** Use password: `wedzway2025`
- **Build Errors?** Run `npm install` then `npm run build`
- **Deploy Issues?** Check `DEPLOYMENT_GUIDE.md`

### Resources

- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com

---

## ✨ What Makes Wedzway Special

1. **🌍 Global Reach** - Connect couples worldwide
2. **✅ Verified Vendors** - Trust & quality guaranteed
3. **🎯 Complete Platform** - Everything in one place
4. **💡 Smart Tools** - Website builder, budget tracker
5. **🎨 Beautiful Design** - Modern travel aesthetic
6. **⚡ Fast & SEO** - Next.js optimization
7. **🔐 Secure** - Password-protected demo

---

## 📊 Platform Stats

- **30+ Routes** - Fully SEO-optimized
- **72 Files** - Clean architecture
- **60+ Components** - Reusable UI
- **100% Responsive** - All devices
- **Password Protected** - Secure demo
- **Public Pages** - Shareable weddings

---

## 🎊 Ready to Launch

Your Wedzway platform is production-ready!

```bash
npm install
npm run dev
```

Visit **http://localhost:3000** and login with **wedzway2025**

---

**Built with ❤️ for destination weddings worldwide**

*Making dream weddings a reality, one destination at a time.*
