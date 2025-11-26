import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get token from cookie or header
  const token = request.cookies.get('authToken')?.value ||
                request.headers.get('authorization')?.replace('Bearer ', '')

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register', '/', '/technology', '/databases']
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))

  // If accessing public route, allow
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // If accessing protected route without token, redirect to login
  if (!token && pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // For now, allow authenticated users through
  // Role-based access control will be enforced on the client side
  // In a production app, you would decode the JWT here and check roles

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}
