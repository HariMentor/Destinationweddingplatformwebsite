import { Metadata } from 'next';

// Base metadata configuration
export const baseMetadata = {
  metadataBase: new URL('https://wedzway.com'),
  applicationName: 'Wedzway',
  authors: [{ name: 'Wedzway' }],
  generator: 'Next.js',
  keywords: [
    'destination weddings',
    'wedding planners',
    'wedding venues',
    'wedding services',
    'India weddings',
    'Udaipur weddings',
    'Jaipur weddings',
    'Goa weddings',
    'Kerala weddings',
    'wedding photographers',
    'wedding videographers',
    'wedding decorators',
    'wedding marketplace',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Wedzway',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@wedzway',
  },
};

// Home/Pitch Deck metadata
export const homeMetadata: Metadata = {
  title: 'Wedzway - Global Destination Wedding Platform',
  description: 'Transform your dream wedding into reality with Wedzway. Connect with verified planners, venues, photographers, and service providers for destination weddings globally. India\'s top wedding destinations: Udaipur, Jaipur, Goa, Kerala.',
  openGraph: {
    title: 'Wedzway - Global Destination Wedding Platform',
    description: 'Connect with verified wedding service providers globally for your dream destination wedding.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedzway - Global Destination Wedding Platform',
    description: 'Connect with verified wedding service providers globally.',
  },
};

// Venues metadata
export const venuesMetadata: Metadata = {
  title: 'Wedding Venues - Palaces, Resorts & Unique Locations | Wedzway',
  description: 'Discover stunning wedding venues worldwide. From luxurious palace hotels to beachfront resorts and unique destination venues for your dream wedding.',
  keywords: ['wedding venues', 'destination wedding venues', 'palace weddings', 'resort weddings', 'India wedding venues', 'beach weddings'],
  openGraph: {
    title: 'Wedding Venues | Wedzway',
    description: 'Discover stunning wedding venues worldwide for your dream destination wedding.',
    type: 'website',
  },
};

// Destinations metadata
export const destinationsMetadata: Metadata = {
  title: 'Wedding Destinations - Top Global Wedding Locations | Wedzway',
  description: 'Explore the world\'s most romantic wedding destinations. From India\'s majestic cities to exotic international locations. Find your perfect wedding destination.',
  keywords: ['wedding destinations', 'destination wedding locations', 'India wedding destinations', 'exotic wedding locations', 'romantic destinations'],
  openGraph: {
    title: 'Wedding Destinations | Wedzway',
    description: 'Explore the world\'s most romantic wedding destinations.',
    type: 'website',
  },
};

// Planners metadata
export const plannersMetadata: Metadata = {
  title: 'Wedding Planners - Expert Destination Wedding Planners | Wedzway',
  description: 'Connect with verified, experienced wedding planners worldwide. Get expert help planning your destination wedding with trusted professionals.',
  keywords: ['wedding planners', 'destination wedding planners', 'India wedding planners', 'wedding coordinators', 'event planners'],
  openGraph: {
    title: 'Wedding Planners | Wedzway',
    description: 'Connect with verified wedding planners worldwide.',
    type: 'website',
  },
};

// Vendors metadata
export const vendorsMetadata: Metadata = {
  title: 'Wedding Vendors - Photographers, Videographers, Decorators | Wedzway',
  description: 'Find and book top wedding photographers, videographers, makeup artists, decorators, and all wedding service providers. Verified vendors for your special day.',
  keywords: ['wedding vendors', 'wedding photographers', 'wedding videographers', 'wedding decorators', 'makeup artists', 'wedding services'],
  openGraph: {
    title: 'Wedding Vendors | Wedzway',
    description: 'Find verified wedding service providers for your special day.',
    type: 'website',
  },
};

// Inspirations metadata
export const inspirationsMetadata: Metadata = {
  title: 'Wedding Inspiration - Ideas, Themes & Real Weddings | Wedzway',
  description: 'Get inspired by real destination weddings, trending themes, décor ideas, and beautiful wedding stories from around the world.',
  keywords: ['wedding inspiration', 'wedding ideas', 'wedding themes', 'real weddings', 'wedding décor', 'wedding trends'],
  openGraph: {
    title: 'Wedding Inspiration | Wedzway',
    description: 'Get inspired by real destination weddings and trending themes.',
    type: 'website',
  },
};

// Tours metadata
export const toursMetadata: Metadata = {
  title: 'Wedding Tours - Venue Tours & Destination Packages | Wedzway',
  description: 'Book exclusive wedding venue tours and explore destination wedding packages. Visit potential wedding locations with expert guides.',
  keywords: ['wedding tours', 'venue tours', 'destination wedding packages', 'wedding travel', 'venue visits'],
  openGraph: {
    title: 'Wedding Tours | Wedzway',
    description: 'Book exclusive wedding venue tours and destination packages.',
    type: 'website',
  },
};

// Marketplace metadata
export const marketplaceMetadata: Metadata = {
  title: 'Wedding Marketplace - Shop Wedding Products & Services | Wedzway',
  description: 'Shop curated wedding products, décor, favors, and services. Discover top brands and unique items for your destination wedding.',
  keywords: ['wedding marketplace', 'wedding products', 'wedding shop', 'wedding décor', 'wedding favors', 'wedding brands'],
  openGraph: {
    title: 'Wedding Marketplace | Wedzway',
    description: 'Shop curated wedding products and services.',
    type: 'website',
  },
};

// Providers metadata
export const providersMetadata: Metadata = {
  title: 'Wedding Service Providers - Comprehensive Wedding Services | Wedzway',
  description: 'Browse verified wedding service providers offering complete wedding solutions. From planning to execution, find all services in one place.',
  keywords: ['wedding service providers', 'wedding services', 'wedding companies', 'full-service wedding', 'wedding solutions'],
  openGraph: {
    title: 'Wedding Service Providers | Wedzway',
    description: 'Browse verified wedding service providers worldwide.',
    type: 'website',
  },
};

// Visa Services metadata
export const visaServicesMetadata: Metadata = {
  title: 'Wedding Travel & Visa Services - Guest Travel Assistance | Wedzway',
  description: 'Simplify guest travel with visa assistance, flight bookings, and travel coordination for destination weddings worldwide.',
  keywords: ['wedding visa services', 'guest travel', 'destination wedding travel', 'visa assistance', 'wedding flights'],
  openGraph: {
    title: 'Wedding Travel & Visa Services | Wedzway',
    description: 'Simplify guest travel with visa and flight assistance.',
    type: 'website',
  },
};

// Concierge metadata
export const conciergeMetadata: Metadata = {
  title: 'Wedding Concierge Service - Personalized Planning Assistance | Wedzway',
  description: 'Get personalized wedding planning assistance with our dedicated concierge service. Expert support for every detail of your destination wedding.',
  keywords: ['wedding concierge', 'personalized wedding planning', 'wedding assistance', 'luxury wedding service', 'wedding support'],
  openGraph: {
    title: 'Wedding Concierge Service | Wedzway',
    description: 'Get personalized wedding planning assistance from experts.',
    type: 'website',
  },
};

// Wedding Builder metadata
export const weddingBuilderMetadata: Metadata = {
  title: 'Wedding Website Builder - Create Your Wedding Page | Wedzway',
  description: 'Create a beautiful, personalized wedding website. Share your story, event details, and registry with guests. Easy to build, easy to share.',
  keywords: ['wedding website builder', 'wedding page', 'wedding website', 'digital wedding invitation', 'wedding RSVP'],
  openGraph: {
    title: 'Wedding Website Builder | Wedzway',
    description: 'Create a beautiful wedding website for your special day.',
    type: 'website',
  },
};

// Expenses metadata
export const expensesMetadata: Metadata = {
  title: 'Wedding Budget & Expense Tracker - Plan Your Wedding Budget | Wedzway',
  description: 'Track wedding expenses, manage your budget, and plan finances for your destination wedding. Stay organized and on budget.',
  keywords: ['wedding budget', 'wedding expenses', 'wedding cost tracker', 'budget planner', 'wedding finance'],
  openGraph: {
    title: 'Wedding Budget Tracker | Wedzway',
    description: 'Track expenses and manage your wedding budget effectively.',
    type: 'website',
  },
};

// Blog metadata
export const blogMetadata: Metadata = {
  title: 'Wedding Blog - Tips, Trends & Destination Wedding Guides | Wedzway',
  description: 'Read expert wedding planning tips, destination guides, vendor insights, and the latest wedding trends. Your ultimate destination wedding resource.',
  keywords: ['wedding blog', 'wedding tips', 'destination wedding guide', 'wedding trends', 'wedding advice', 'planning tips'],
  openGraph: {
    title: 'Wedding Blog | Wedzway',
    description: 'Expert wedding planning tips and destination guides.',
    type: 'website',
  },
};

// Landing Page metadata
export const landingMetadata: Metadata = {
  title: 'Plan Your Dream Destination Wedding - Wedzway',
  description: 'Start planning your perfect destination wedding. Connect with top venues, planners, and vendors. Make your wedding dreams come true with Wedzway.',
  openGraph: {
    title: 'Plan Your Dream Destination Wedding | Wedzway',
    description: 'Start planning your perfect destination wedding today.',
    type: 'website',
  },
};

// Email Templates metadata
export const emailTemplatesMetadata: Metadata = {
  title: 'Wedding Email Templates - Professional Wedding Communications | Wedzway',
  description: 'Access professional wedding email templates for vendor communication, guest coordination, and wedding planning. Save time with ready-to-use templates.',
  keywords: ['wedding email templates', 'wedding communication', 'vendor emails', 'guest coordination', 'wedding templates'],
  openGraph: {
    title: 'Wedding Email Templates | Wedzway',
    description: 'Professional email templates for wedding planning.',
    type: 'website',
  },
};

// Brand Guidelines metadata
export const brandGuidelinesMetadata: Metadata = {
  title: 'Wedzway Brand Guidelines - Partner Resources',
  description: 'Official Wedzway brand guidelines for partners and vendors. Download logos, learn brand standards, and access marketing materials.',
  openGraph: {
    title: 'Wedzway Brand Guidelines',
    description: 'Official brand guidelines for partners and vendors.',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

// Generate dynamic metadata for individual pages
export function generateVenueMetadata(venueName: string, location: string): Metadata {
  return {
    title: `${venueName} - ${location} | Wedding Venues | Wedzway`,
    description: `Book ${venueName} in ${location} for your destination wedding. View photos, packages, amenities, and reviews. Get pricing and availability.`,
    keywords: [`${venueName}`, `${location} wedding venue`, 'destination wedding', 'wedding packages'],
    openGraph: {
      title: `${venueName} | ${location}`,
      description: `Book this stunning venue in ${location} for your destination wedding.`,
      type: 'website',
    },
  };
}

export function generateDestinationMetadata(destinationName: string): Metadata {
  return {
    title: `${destinationName} Weddings - Venues, Planners & Guides | Wedzway`,
    description: `Plan your destination wedding in ${destinationName}. Discover top venues, local planners, travel tips, and everything you need for a perfect wedding in ${destinationName}.`,
    keywords: [`${destinationName} weddings`, `${destinationName} wedding venues`, `${destinationName} wedding planners`, 'destination wedding'],
    openGraph: {
      title: `${destinationName} Weddings | Wedzway`,
      description: `Plan your perfect destination wedding in ${destinationName}.`,
      type: 'website',
    },
  };
}

export function generatePlannerMetadata(plannerName: string, location: string): Metadata {
  return {
    title: `${plannerName} - ${location} Wedding Planner | Wedzway`,
    description: `Hire ${plannerName}, experienced destination wedding planner in ${location}. View portfolio, read reviews, and get quotes for your wedding.`,
    keywords: [`${plannerName}`, `${location} wedding planner`, 'destination wedding planner', 'event planner'],
    openGraph: {
      title: `${plannerName} | Wedding Planner`,
      description: `Expert wedding planner in ${location}.`,
      type: 'profile',
    },
  };
}

export function generateVendorMetadata(vendorName: string, type: string, location: string): Metadata {
  return {
    title: `${vendorName} - ${type} in ${location} | Wedzway`,
    description: `Book ${vendorName}, professional wedding ${type.toLowerCase()} in ${location}. View portfolio, packages, and reviews.`,
    keywords: [`${vendorName}`, `${location} wedding ${type.toLowerCase()}`, `wedding ${type.toLowerCase()}`, 'wedding vendor'],
    openGraph: {
      title: `${vendorName} | ${type}`,
      description: `Professional wedding ${type.toLowerCase()} in ${location}.`,
      type: 'profile',
    },
  };
}

export function generateBlogPostMetadata(title: string, excerpt: string, slug: string): Metadata {
  return {
    title: `${title} | Wedzway Blog`,
    description: excerpt,
    keywords: ['wedding blog', 'wedding tips', 'destination wedding', 'wedding planning'],
    openGraph: {
      title: title,
      description: excerpt,
      type: 'article',
      url: `/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: excerpt,
    },
  };
}

export function generateProductMetadata(productName: string, brandName: string): Metadata {
  return {
    title: `${productName} by ${brandName} | Wedding Marketplace | Wedzway`,
    description: `Shop ${productName} by ${brandName}. High-quality wedding products and services for your destination wedding.`,
    keywords: [`${productName}`, `${brandName}`, 'wedding products', 'wedding marketplace'],
    openGraph: {
      title: `${productName} | ${brandName}`,
      description: `Shop ${productName} for your wedding.`,
      type: 'product',
    },
  };
}

export function generateTourMetadata(tourName: string, location: string): Metadata {
  return {
    title: `${tourName} - ${location} Wedding Tour | Wedzway`,
    description: `Book ${tourName} in ${location}. Visit wedding venues, meet vendors, and explore your destination wedding location.`,
    keywords: [`${tourName}`, `${location} venue tour`, 'wedding tour', 'destination tour'],
    openGraph: {
      title: `${tourName} | ${location}`,
      description: `Exclusive wedding venue tour in ${location}.`,
      type: 'website',
    },
  };
}

// Generic page metadata generator
interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
}

export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const { title, description, keywords, path, image } = options;
  
  return {
    title: `${title} | Wedzway`,
    description,
    keywords: keywords || [],
    openGraph: {
      title: `${title} | Wedzway`,
      description,
      type: 'website',
      url: path ? `https://wedzway.com${path}` : undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Wedzway`,
      description,
      images: image ? [image] : undefined,
    },
  };
}