import { NextRequest, NextResponse } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/forgot-password', '/'];

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/settings', '/api/protected'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Get auth token from cookies
  const token = request.cookies.get('auth_token')?.value;

  // If trying to access protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If logged in and trying to access login page
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Validate token on edge runtime
  if (isProtectedRoute && token) {
    // Token validation logic can be added here
    // For now, we trust the token exists
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
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
