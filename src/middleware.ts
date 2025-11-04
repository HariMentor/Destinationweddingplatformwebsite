import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user has valid session cookie
  const isAuthenticated = request.cookies.get('wedzway_auth')?.value === 'authenticated';
  
  // Allow access to login page
  if (request.nextUrl.pathname === '/login') {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Allow public access to wedding invitation, registry, and blog pages (no password required)
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith('/wedding/') || 
      pathname.startsWith('/registry/') ||
      pathname === '/blog' ||
      pathname.startsWith('/blog/')) {
    return NextResponse.next();
  }

  // Protect all other routes
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
