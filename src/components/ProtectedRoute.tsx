'use client'

import { ReactNode, useEffect } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

type ProtectedRouteProps = {
  children: ReactNode
  allowedRoles?: ('admin' | 'manager' | 'viewer')[]
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuthContext()
  const router = useRouter()

  // Wait until auth state is ready
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/auth/login') // redirect if not logged in
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        router.push('/dashboard') // redirect if role not allowed
      }
    }
  }, [isAuthenticated, loading, user, allowedRoles, router])

  // Don't render children until auth is loaded & user exists
  if (loading || !user) return null

  // If role restriction exists, hide content for unauthorized role
  if (allowedRoles && !allowedRoles.includes(user.role)) return null

  return <>{children}</>
}
