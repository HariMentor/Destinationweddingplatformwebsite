# 🔄 Dynamic SEO with Admin CMS - Implementation Guide

> **IMPORTANT NOTE:** This is a planning/reference document. The changes described here are NOT yet implemented.

---

## 📋 Current vs Future State

### Current Implementation (Static SEO)
- SEO metadata is **hardcoded** in `/lib/metadata.ts`
- Static metadata for all pages
- No API calls for SEO data
- Works for demo/pitch deck purposes

### Future Implementation (Dynamic SEO)
- SEO metadata comes from **Admin CMS/API**
- Dynamic metadata fetched at runtime
- Content creators manage SEO through admin panel
- API-driven approach

---

## 🎯 Architecture Overview

### How It Will Work

```
┌─────────────────┐
│   Admin CMS     │ ← Content creators manage SEO metadata
│  (Separate App) │    (titles, descriptions, keywords, OG images)
└────────┬────────┘
         │
         │ API Calls
         ↓
┌─────────────────┐
│   Backend API   │ ← Stores & serves SEO metadata
│  (Venue API,    │    GET /api/venues/123/seo
│   Content API)  │    GET /api/destinations/5/seo
└────────┬────────┘
         │
         │ HTTP Request
         ↓
┌─────────────────┐
│  Next.js App    │ ← Fetches SEO data during SSR
│  (This App)     │    Renders dynamic metadata
└─────────────────┘
```

### Data Flow

1. **Admin creates content** in CMS
   - Venue name, description, images
   - SEO title, meta description
   - Keywords, OG tags
   - Social media images

2. **Backend API stores data**
   - Database stores venue info + SEO metadata
   - API endpoints expose data

3. **Next.js fetches during SSR**
   - Server component calls API
   - Generates dynamic metadata
   - Renders SEO tags

4. **Search engines see optimized content**
   - Fully rendered HTML with metadata
   - Proper SEO tags
   - Social sharing works

---

## 📊 API Response Structure

### Example: Venue SEO Data

When fetching venue details, the API should return SEO metadata:

```json
// GET /api/venues/123

{
  "id": 123,
  "name": "Cliffside Resort & Spa",
  "location": "Santorini, Greece",
  "description": "Luxury wedding venue...",
  "images": [...],
  "amenities": [...],
  
  // SEO Metadata (managed in admin)
  "seo": {
    "title": "Cliffside Resort & Spa - Luxury Santorini Wedding Venue | Wedzway",
    "metaDescription": "Book the stunning Cliffside Resort in Santorini for your dream destination wedding. Panoramic Aegean views, luxury amenities, capacity 200 guests.",
    "keywords": [
      "Santorini wedding venue",
      "Greece luxury resort",
      "cliffside wedding",
      "Aegean Sea venue",
      "destination wedding Greece"
    ],
    "canonical": "https://wedzway.com/venues/123",
    "robots": "index, follow",
    
    // Open Graph (social sharing)
    "openGraph": {
      "title": "Cliffside Resort & Spa - Santorini Wedding Venue",
      "description": "Host your dream wedding at this luxury Santorini resort",
      "image": "https://cdn.wedzway.com/venues/123/og-image.jpg",
      "imageAlt": "Cliffside Resort wedding venue in Santorini",
      "type": "website",
      "locale": "en_US"
    },
    
    // Twitter Card
    "twitter": {
      "card": "summary_large_image",
      "title": "Cliffside Resort - Santorini Weddings",
      "description": "Luxury wedding venue with breathtaking Aegean views",
      "image": "https://cdn.wedzway.com/venues/123/twitter-card.jpg"
    },
    
    // Structured Data (Schema.org)
    "structuredData": {
      "@context": "https://schema.org",
      "@type": "EventVenue",
      "name": "Cliffside Resort & Spa",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Santorini",
        "addressCountry": "GR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "36.4618",
        "longitude": "25.3753"
      },
      "image": "https://cdn.wedzway.com/venues/123/main.jpg",
      "priceRange": "$$$",
      "maximumAttendeeCapacity": 200
    }
  }
}
```

### Example: Destination SEO Data

```json
// GET /api/destinations/5

{
  "id": 5,
  "name": "Santorini",
  "country": "Greece",
  "description": "Iconic Greek island...",
  
  "seo": {
    "title": "Santorini Destination Weddings - Greece | Wedzway",
    "metaDescription": "Plan your dream Santorini wedding with verified planners and stunning venues. Discover cliffside locations, white-washed churches, and Aegean sunsets.",
    "keywords": [
      "Santorini weddings",
      "Greece destination wedding",
      "Santorini wedding planner",
      "Greek island wedding"
    ],
    "canonical": "https://wedzway.com/destinations/5",
    "openGraph": {...},
    "twitter": {...},
    "structuredData": {...}
  }
}
```

---

## 🔧 Required Code Changes

### 1. Update API Client (Create New)

Create `/lib/api-client.ts`:

```typescript
// lib/api-client.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wedzway.com';

export interface SEOMetadata {
  title: string;
  metaDescription: string;
  keywords: string[];
  canonical: string;
  robots?: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    type: string;
    locale: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
  structuredData?: Record<string, any>;
}

export interface VenueWithSEO {
  id: number;
  name: string;
  location: string;
  description: string;
  // ... other venue fields
  seo: SEOMetadata;
}

export interface DestinationWithSEO {
  id: number;
  name: string;
  country: string;
  description: string;
  // ... other destination fields
  seo: SEOMetadata;
}

// Fetch venue data with SEO
export async function getVenue(id: string): Promise<VenueWithSEO> {
  const response = await fetch(`${API_BASE_URL}/api/venues/${id}`, {
    // Important: Next.js caching strategy
    next: { revalidate: 3600 } // Revalidate every hour
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch venue');
  }
  
  return response.json();
}

// Fetch destination data with SEO
export async function getDestination(id: string): Promise<DestinationWithSEO> {
  const response = await fetch(`${API_BASE_URL}/api/destinations/${id}`, {
    next: { revalidate: 3600 }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch destination');
  }
  
  return response.json();
}

// Similar functions for planners, vendors, tours, etc.
export async function getPlanner(id: string): Promise<any> { /* ... */ }
export async function getVendor(type: string, id: string): Promise<any> { /* ... */ }
export async function getTour(id: string): Promise<any> { /* ... */ }
export async function getInspiration(id: string): Promise<any> { /* ... */ }
```

---

### 2. Convert Metadata Helper (Update Existing)

Update `/lib/metadata.ts` to convert API data to Next.js Metadata format:

```typescript
// lib/metadata.ts

import { Metadata } from 'next';
import { SEOMetadata } from './api-client';

/**
 * Converts API SEO data to Next.js Metadata format
 */
export function apiSeoToMetadata(seo: SEOMetadata): Metadata {
  return {
    title: seo.title,
    description: seo.metaDescription,
    keywords: seo.keywords,
    
    // Canonical URL
    alternates: {
      canonical: seo.canonical,
    },
    
    // Robots
    robots: seo.robots || 'index, follow',
    
    // Open Graph
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      type: seo.openGraph.type as any,
      locale: seo.openGraph.locale,
      images: [
        {
          url: seo.openGraph.image,
          alt: seo.openGraph.imageAlt || seo.openGraph.title,
        },
      ],
    },
    
    // Twitter Card
    twitter: {
      card: seo.twitter.card as any,
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: [seo.twitter.image],
    },
  };
}

// Keep existing static metadata as fallbacks
export const defaultMetadata: Metadata = {
  title: 'Wedzway - Global Destination Wedding Platform',
  description: 'Connect with verified wedding planners, venues, and vendors worldwide.',
  // ... existing default metadata
};

// Static metadata for pages without dynamic content
export const landingMetadata: Metadata = { /* ... */ };
export const marketplaceMetadata: Metadata = { /* ... */ };
// etc.
```

---

### 3. Update Venue Detail Page (Example)

**Current:** `/app/venues/[id]/page.tsx` (static metadata)

```typescript
// CURRENT IMPLEMENTATION (Static)
import type { Metadata } from 'next';
import { venuesMetadata } from '@/lib/metadata';

export const metadata: Metadata = venuesMetadata; // Static!

export default function VenueDetailPage({ params }: Props) {
  return <VenueDetailClient venueId={params.id} />;
}
```

**Future:** `/app/venues/[id]/page.tsx` (dynamic metadata from API)

```typescript
// FUTURE IMPLEMENTATION (Dynamic from API)
import type { Metadata } from 'next';
import { getVenue } from '@/lib/api-client';
import { apiSeoToMetadata, defaultMetadata } from '@/lib/metadata';
import { VenueDetailClient } from './VenueDetailClient';

type Props = {
  params: { id: string };
};

// Dynamic metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // Fetch venue data from API (with SEO metadata)
    const venue = await getVenue(params.id);
    
    // Convert API SEO to Next.js Metadata format
    return apiSeoToMetadata(venue.seo);
  } catch (error) {
    console.error('Failed to load venue SEO metadata:', error);
    
    // Fallback to default metadata
    return {
      ...defaultMetadata,
      title: 'Venue Details | Wedzway',
      description: 'Explore this stunning wedding venue',
    };
  }
}

// Server component (can fetch data)
export default async function VenueDetailPage({ params }: Props) {
  // Fetch venue data (will be cached by Next.js)
  const venue = await getVenue(params.id);
  
  // Pass data to client component
  return <VenueDetailClient venue={venue} />;
}
```

---

### 4. Update Destination Detail Page (Example)

```typescript
// app/destinations/[id]/page.tsx

import type { Metadata } from 'next';
import { getDestination } from '@/lib/api-client';
import { apiSeoToMetadata, defaultMetadata } from '@/lib/metadata';
import { DestinationDetailClient } from './DestinationDetailClient';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const destination = await getDestination(params.id);
    
    // Convert API SEO + add structured data
    const metadata = apiSeoToMetadata(destination.seo);
    
    // Add structured data if provided
    if (destination.seo.structuredData) {
      // Inject as script tag (see section below)
    }
    
    return metadata;
  } catch (error) {
    return {
      ...defaultMetadata,
      title: 'Destination Details | Wedzway',
    };
  }
}

export default async function DestinationDetailPage({ params }: Props) {
  const destination = await getDestination(params.id);
  return <DestinationDetailClient destination={destination} />;
}
```

---

### 5. Add Structured Data Support

For Schema.org structured data (JSON-LD):

```typescript
// components/StructuredData.tsx

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Use in page:

```typescript
// app/venues/[id]/page.tsx

export default async function VenueDetailPage({ params }: Props) {
  const venue = await getVenue(params.id);
  
  return (
    <>
      {/* Structured data for SEO */}
      {venue.seo.structuredData && (
        <StructuredData data={venue.seo.structuredData} />
      )}
      
      {/* Main content */}
      <VenueDetailClient venue={venue} />
    </>
  );
}
```

---

### 6. Update Client Components

Client components need to accept data as props instead of fetching:

**Current:** Client component fetches data

```typescript
// CURRENT: Client fetches mock data
export function VenueDetailClient({ venueId }: { venueId: string }) {
  const [venue, setVenue] = useState(null);
  
  useEffect(() => {
    // Fetch venue data
    fetchVenue(venueId).then(setVenue);
  }, [venueId]);
  
  // Render...
}
```

**Future:** Server passes data to client

```typescript
// FUTURE: Server passes data
export function VenueDetailClient({ venue }: { venue: VenueWithSEO }) {
  // No fetching needed! Data comes from server
  
  // Render with venue data
  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
      {/* ... */}
    </div>
  );
}
```

---

## 🔄 Data Caching Strategy

### Next.js Cache Configuration

```typescript
// lib/api-client.ts

// Option 1: Time-based revalidation (ISR)
export async function getVenue(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/venues/${id}`, {
    next: { 
      revalidate: 3600  // Revalidate every 1 hour
    }
  });
  return response.json();
}

// Option 2: Tag-based revalidation
export async function getVenue(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/venues/${id}`, {
    next: { 
      tags: [`venue-${id}`]  // Can revalidate specific venue
    }
  });
  return response.json();
}

// Option 3: No caching (always fresh)
export async function getVenue(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/venues/${id}`, {
    cache: 'no-store'  // Always fetch fresh data
  });
  return response.json();
}
```

### Cache Invalidation

When content is updated in admin:

```typescript
// app/api/revalidate/route.ts

import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Verify secret token
  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 });
  }
  
  // Revalidate specific venue
  if (body.type === 'venue' && body.id) {
    revalidateTag(`venue-${body.id}`);
    revalidatePath(`/venues/${body.id}`);
  }
  
  // Revalidate destination
  if (body.type === 'destination' && body.id) {
    revalidateTag(`destination-${body.id}`);
    revalidatePath(`/destinations/${body.id}`);
  }
  
  return Response.json({ revalidated: true, now: Date.now() });
}
```

**Admin CMS triggers revalidation** after content update:

```javascript
// In Admin CMS (after saving venue)
await fetch('https://wedzway.com/api/revalidate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: 'YOUR_SECRET_TOKEN',
    type: 'venue',
    id: 123
  })
});
```

---

## 📝 Admin CMS Requirements

### What the Admin Panel Needs

For each content type (Venue, Destination, Planner, etc.), provide:

#### 1. Basic Content Fields
- Name, description, location
- Images, amenities, features
- Pricing, capacity, contact info

#### 2. SEO Management Section
- **Page Title** (50-60 chars)
  - Character counter
  - Preview how it looks in Google
  
- **Meta Description** (150-160 chars)
  - Character counter
  - Preview snippet
  
- **Keywords** (multi-select/tags)
  - Suggested keywords
  - Trending keywords
  
- **Canonical URL** (auto-generated, editable)

#### 3. Social Media Section
- **Open Graph Title** (default: page title)
- **Open Graph Description** (default: meta description)
- **Open Graph Image**
  - Upload custom image (1200x630px)
  - Or select from venue images
  - Image preview
  
- **Twitter Card** (similar fields)
  - Card type selector
  - Custom title/description
  - Custom image

#### 4. Advanced SEO
- **Robots Meta** (index/noindex, follow/nofollow)
- **Structured Data** (JSON editor for advanced users)
- **Alt Tags** for all images

#### 5. SEO Previews
- **Google Search Preview**
- **Facebook Share Preview**
- **Twitter Card Preview**

#### 6. SEO Score/Analysis
- Character count warnings
- Missing field alerts
- Keyword density
- Duplicate content check
- Image optimization check

---

## 🧪 Testing Dynamic SEO

### How to Verify SEO is Working

#### 1. View Source Test

```bash
# Fetch rendered HTML (should include SEO tags)
curl https://wedzway.com/venues/123 | grep "og:title"

# Should show:
# <meta property="og:title" content="Cliffside Resort & Spa..." />
```

#### 2. Social Media Debuggers

**Facebook Debugger:**
- URL: https://developers.facebook.com/tools/debug/
- Enter: https://wedzway.com/venues/123
- Should show title, description, image from API

**Twitter Card Validator:**
- URL: https://cards-dev.twitter.com/validator
- Enter venue URL
- Should show Twitter card preview

**LinkedIn Inspector:**
- URL: https://www.linkedin.com/post-inspector/
- Test sharing functionality

#### 3. Google Rich Results Test

- URL: https://search.google.com/test/rich-results
- Test structured data
- Verify Schema.org markup

#### 4. Lighthouse SEO Audit

```bash
# Run Lighthouse
lighthouse https://wedzway.com/venues/123 --view

# Check:
# - SEO score (should be 100)
# - Meta description present
# - Title tag present
# - All images have alt text
```

---

## ⚠️ Important Considerations

### 1. Server-Side Rendering (SSR) Required

- SEO metadata MUST be rendered on the server
- Search engines need fully rendered HTML
- Client-side fetching won't work for SEO
- That's why we use Server Components + `generateMetadata()`

### 2. Performance Impact

**Problem:** Every page load fetches from API

**Solutions:**
- Enable Next.js caching (ISR)
- Set appropriate revalidation times
- Use CDN for API responses
- Cache API responses in Redis/Memcached

### 3. Fallback Strategy

Always have fallback metadata if API fails:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await fetchFromAPI(params.id);
    return apiSeoToMetadata(data.seo);
  } catch (error) {
    // Log error for monitoring
    console.error('SEO API failed:', error);
    
    // Return sensible default
    return {
      title: 'Wedzway - Wedding Venue',
      description: 'Discover beautiful wedding venues on Wedzway',
    };
  }
}
```

### 4. SEO Validation in Admin

Admin CMS should validate SEO fields:

```typescript
// Admin validation rules
const SEO_VALIDATION = {
  title: {
    minLength: 30,
    maxLength: 60,
    required: true,
    warning: 'Title should be 50-60 characters for best SEO'
  },
  metaDescription: {
    minLength: 120,
    maxLength: 160,
    required: true,
    warning: 'Description should be 150-160 characters'
  },
  keywords: {
    minItems: 3,
    maxItems: 10,
    warning: 'Use 5-8 relevant keywords'
  },
  ogImage: {
    minWidth: 1200,
    minHeight: 630,
    aspectRatio: '1.91:1',
    required: true
  }
};
```

### 5. Content Security

- Sanitize all content from API
- Prevent XSS in meta tags
- Validate URLs
- Escape special characters

```typescript
// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeSEO(seo: SEOMetadata): SEOMetadata {
  return {
    title: DOMPurify.sanitize(seo.title, { ALLOWED_TAGS: [] }),
    metaDescription: DOMPurify.sanitize(seo.metaDescription, { ALLOWED_TAGS: [] }),
    // ... sanitize all fields
  };
}
```

---

## 📋 Implementation Checklist

When implementing dynamic SEO, complete these tasks:

### Backend/API
- [ ] Design SEO data structure
- [ ] Add SEO fields to database
- [ ] Create/update API endpoints to return SEO data
- [ ] Implement validation
- [ ] Add caching layer
- [ ] Set up cache invalidation webhooks

### Admin CMS
- [ ] Add SEO management UI
- [ ] Character counters for title/description
- [ ] Image upload for OG/Twitter images
- [ ] SEO preview components
- [ ] Validation rules
- [ ] Bulk SEO management
- [ ] SEO templates/presets
- [ ] Analytics integration

### Next.js App
- [ ] Create API client (`/lib/api-client.ts`)
- [ ] Update metadata helper (`/lib/metadata.ts`)
- [ ] Convert static pages to dynamic
- [ ] Implement `generateMetadata()` for each route
- [ ] Add structured data component
- [ ] Update client components to accept props
- [ ] Configure caching strategy
- [ ] Add revalidation API route
- [ ] Implement error handling/fallbacks
- [ ] Add loading states

### Testing
- [ ] Test SEO tags render correctly
- [ ] Verify social media previews
- [ ] Test cache invalidation
- [ ] Load testing (API performance)
- [ ] SEO audit with Lighthouse
- [ ] Structured data validation
- [ ] Mobile SEO testing
- [ ] Edge case testing (missing data, API failures)

### DevOps
- [ ] Set environment variables
- [ ] Configure API URL for different environments
- [ ] Set up monitoring/alerts for API failures
- [ ] CDN configuration
- [ ] Cache warming strategy
- [ ] Deployment process

---

## 🚀 Migration Path

### Phase 1: Preparation (Week 1)
1. Design API SEO data structure
2. Update backend to return SEO metadata
3. Create API client in Next.js
4. Test API endpoints

### Phase 2: Core Implementation (Week 2-3)
1. Update `/lib/metadata.ts` converter
2. Migrate high-traffic pages first (venues, destinations)
3. Implement caching strategy
4. Add error handling

### Phase 3: Admin CMS (Week 3-4)
1. Build SEO management UI
2. Add validation and previews
3. Test workflow with content team
4. Train content creators

### Phase 4: Testing & Rollout (Week 4-5)
1. Comprehensive SEO testing
2. Performance testing
3. Gradual rollout (% of traffic)
4. Monitor metrics
5. Full production deployment

---

## 📖 Example: Complete Venue Page Flow

### 1. Content Creator in Admin
```
1. Logs into Admin CMS
2. Creates new venue "Sunset Beach Resort"
3. Fills in details (name, location, images, amenities)
4. Goes to "SEO Settings" tab
5. Enters SEO Title: "Sunset Beach Resort - Bali Wedding Venue | Wedzway"
6. Enters Meta Description: "Book Sunset Beach Resort for..."
7. Uploads OG image (1200x630px)
8. Previews how it looks on Google/Facebook
9. Saves venue
10. Admin triggers revalidation webhook
```

### 2. Backend API
```json
// GET /api/venues/456
{
  "id": 456,
  "name": "Sunset Beach Resort",
  "location": "Bali, Indonesia",
  "seo": {
    "title": "Sunset Beach Resort - Bali Wedding Venue | Wedzway",
    "metaDescription": "Book Sunset Beach Resort for your dream Bali beach wedding...",
    "keywords": ["Bali wedding", "beach resort", "Indonesia wedding venue"],
    "openGraph": {
      "image": "https://cdn.wedzway.com/venues/456/og-image.jpg",
      // ... more fields
    }
  }
}
```

### 3. Next.js App
```typescript
// app/venues/[id]/page.tsx

export async function generateMetadata({ params }) {
  // Fetch from API (SSR)
  const venue = await getVenue(params.id);
  
  // Convert to Next.js metadata
  return apiSeoToMetadata(venue.seo);
}

export default async function VenueDetailPage({ params }) {
  const venue = await getVenue(params.id);
  return <VenueDetailClient venue={venue} />;
}
```

### 4. Rendered HTML
```html
<html>
<head>
  <title>Sunset Beach Resort - Bali Wedding Venue | Wedzway</title>
  <meta name="description" content="Book Sunset Beach Resort for your dream Bali beach wedding..." />
  <meta property="og:title" content="Sunset Beach Resort - Bali Wedding Venue" />
  <meta property="og:image" content="https://cdn.wedzway.com/venues/456/og-image.jpg" />
  <!-- All SEO tags from API -->
</head>
<body>
  <!-- Venue content -->
</body>
</html>
```

### 5. Search Engines
- Google crawls fully-rendered page
- Sees optimized SEO tags
- Indexes with proper title/description
- Shows in search results

### 6. Social Sharing
- User shares on Facebook
- Facebook fetches Open Graph tags
- Shows beautiful preview with image
- High engagement

---

## 🎯 Summary

### What Changes Are Needed

1. **Backend API** must return SEO metadata with content
2. **Admin CMS** for managing SEO fields
3. **Next.js pages** fetch from API during SSR
4. **Dynamic metadata** using `generateMetadata()`
5. **Caching strategy** for performance
6. **Revalidation webhooks** for updates

### Current State
✅ Structure is ready for dynamic SEO
✅ Server Components in place
✅ Metadata system configured
✅ Routes organized properly

### What's NOT Implemented Yet
❌ API client for fetching SEO data
❌ Dynamic `generateMetadata()` functions
❌ Admin CMS integration
❌ Cache invalidation
❌ API endpoints for SEO data

### When Ready to Implement

Refer to code examples in this document and follow the migration path. The current static SEO will continue working until dynamic SEO is implemented.

---

**This guide is a reference for future implementation. Do NOT implement these changes until backend API and Admin CMS are ready.**

---

## 📞 Questions for Backend/Admin Team

Before implementing, clarify:

1. What is the API endpoint structure?
2. What authentication is required for API calls?
3. What is the exact SEO data schema?
4. How will cache invalidation work?
5. What are the rate limits?
6. Is there a staging API for testing?
7. Who manages the Admin CMS development?

---

**Last Updated:** November 4, 2025
**Status:** Planning Document - NOT YET IMPLEMENTED
