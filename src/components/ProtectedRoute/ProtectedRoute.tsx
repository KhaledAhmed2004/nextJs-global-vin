"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import { toast } from 'sonner'
import { canAccessRoute, getRedirectRoute } from '@/lib/permissions'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireRole?: boolean  // If true, check role-based access
}

export function ProtectedRoute({ children, requireRole = false }: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { token, user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Check if user is authenticated
    if (!token || !isAuthenticated) {
      toast.error('Please login to access this page')
      router.push(`/auth/login?redirect=${pathname}`)
      return
    }

    // If role checking is required, check if user can access this route
    if (requireRole && user) {
      if (!canAccessRoute(user, pathname)) {
        const redirectTo = getRedirectRoute(user)
        toast.error('You do not have permission to access this page')
        router.push(redirectTo)
      }
    }
  }, [token, isAuthenticated, user, pathname, router, requireRole])

  // If no token, return null (will redirect anyway)
  if (!token || !isAuthenticated) {
    return null
  }

  // If role checking is required and user doesn't have access, return null
  if (requireRole && user && !canAccessRoute(user, pathname)) {
    return null
  }

  // If authenticated (and authorized if required), render children
  return <>{children}</>
}
