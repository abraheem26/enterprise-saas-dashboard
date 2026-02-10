import { NextRequest, NextResponse } from 'next/server'
import { canAccessRoute } from '@/lib/authorization'
import { Role } from '@/lib/permissions'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect dashboard routes
  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  const token = request.cookies.get('token')?.value
  const role = request.cookies.get('role')?.value as Role | undefined

  // Not authenticated
  if (!token || !role) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Not authorized
  const isAllowed = canAccessRoute(role, pathname)

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
