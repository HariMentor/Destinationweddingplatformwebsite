# Loader Component Usage Guide

This document provides examples of how to use the various loader components throughout the Wedzway application.

## Available Loaders

### 1. Basic Loader
Simple spinning loader with optional text and customizable size.

```tsx
import { Loader } from "@/components/ui/loader";

// Small loader
<Loader size="sm" />

// Medium loader with text (default)
<Loader text="Loading destinations..." />

// Large loader
<Loader size="lg" text="Please wait..." />

// Extra large full-page loader
<Loader size="xl" text="Loading..." fullPage />
```

### 2. CardSkeletonLoader
Perfect for list views like destinations, venues, vendors, etc. Shows animated skeleton cards.

```tsx
import { CardSkeletonLoader } from "@/components/ui/loader";

// Default (6 cards)
<CardSkeletonLoader />

// Custom count
<CardSkeletonLoader count={3} />
```

### 3. VenueDetailSkeleton
Specialized skeleton loader for venue detail pages that matches the complex layout with hero image, info sections, packages, and enquiry form.

```tsx
import { VenueDetailSkeleton } from "@/components/ui/venue-detail-skeleton";

if (isLoading) {
  return <VenueDetailSkeleton />;
}
```

### 4. BrandedLoader
Branded loader with Wedzway's teal and orange colors, featuring animated rings.

```tsx
import { BrandedLoader } from "@/components/ui/loader";

<BrandedLoader text="Loading your wedding plans..." />
```

## Implementation Pattern

Here's the recommended pattern for implementing loaders in your pages:

```tsx
import { useState, useEffect } from "react";
import { CardSkeletonLoader } from "@/components/ui/loader";

export function MyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate data loading or fetch real data
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Your data fetching logic here
        const response = await fetchData();
        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <CardSkeletonLoader count={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <Card key={item.id}>
              {/* Your card content */}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Pages to Add Loaders

Consider adding loaders to these pages:

- ✅ **Destinations** (`/components/DestinationsPage.tsx`) - CardSkeletonLoader implemented
- ✅ **Venues Listing** (`/components/VenuePage.tsx`) - CardSkeletonLoader implemented
- ✅ **Venue Details** (`/components/VenueDetailsPageV2.tsx`) - VenueDetailSkeleton implemented
- **Planners** (`/components/PlannersPage.tsx`) - Use CardSkeletonLoader
- **Planner Details** - Create PlannerDetailSkeleton similar to VenueDetailSkeleton
- **Vendors** (`/components/VendorsPage.tsx`) - Use CardSkeletonLoader
- **Vendor Details** - Create VendorDetailSkeleton
- **Marketplace** (`/components/MarketplacePage.tsx`) - Use CardSkeletonLoader
- **Product Details** - Create ProductDetailSkeleton
- **Tours** (`/components/ToursPage.tsx`) - Use CardSkeletonLoader
- **Tour Details** - Create TourDetailSkeleton
- **Inspirations** (`/components/InspirationsPage.tsx`) - Use CardSkeletonLoader
- **Inspiration Details** - Create custom skeleton
- **Providers** (`/components/WeddingProvidersPage.tsx`) - Use CardSkeletonLoader
- **Account Pages** (when loading user data) - Use BrandedLoader or custom skeleton

## Styling Notes

- The basic `Loader` uses the brand teal color `#02542D`
- The `BrandedLoader` uses both teal (`#02542D`) and orange (`#DF6951`)
- All loaders include smooth animations and pulse effects
- Skeleton loaders match the card structure of the actual content for a seamless transition
