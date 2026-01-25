// Shared navigation route map for all pages
export const NAVIGATION_ROUTES: Record<string, string> = {
  'landing': '/landing',
  'venues': '/venues',
  'destinations': '/destinations',
  'inspirations': '/inspirations',
  'planners': '/planners',
  'vendors': '/vendors',
  'tours': '/tours',
  'visa-services': '/travel/visa',
  'builder': '/wedding-builder',
  'expenses': '/expenses',
  'marketplace': '/marketplace',
  'account': '/account',
  'concierge': '/concierge',
  'providers': '/providers',
  'blog': '/blog',
  'home': '/',
  'email-templates': '/email-templates',
  'venue-brochure': '/brochure/venue',
  'brand-guidelines': '/brand-guidelines',
  'venue-preview': '/venue-preview', // Dedicated venue preview page
  'package-compare': '/packages/compare', // Wedding package comparison page
  'sorted': '/sorted', // Sorted by Wedzway
  'auth': '/auth', // Login page
  'register': '/register', // Register page
};

// Helper function to navigate using the route map
export function getNavigationRoute(page: string): string | undefined {
  return NAVIGATION_ROUTES[page];
}