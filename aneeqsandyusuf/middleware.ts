import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/dashboard/chat', '/dashboard/gallery', '/dashboard/memories', '/dashboard/live-location'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Only protect dashboard routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // Check for Firebase Auth session cookie
    const token = request.cookies.get('firebaseAuthToken')?.value;
    if (!token) {
      // Not signed in, redirect to sign-in
      const signInUrl = new URL('/sign-in', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
