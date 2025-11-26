'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import { canAccessRoute, getRedirectRoute } from '@/lib/permissions'

interface RoleProtectedRouteProps {
  children: React.ReactNode
}

export default function RoleProtectedRoute({ children }: RoleProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      router.push(`/auth/login?redirect=${pathname}`)
      return
    }

    // Check if user can access this route
    if (!canAccessRoute(user, pathname)) {
      const redirectTo = getRedirectRoute(user)
      router.push(redirectTo)
    }
  }, [user, isAuthenticated, pathname, router])

  // Show nothing while checking permissions
  if (!isAuthenticated || !user) {
    return null
  }

  // If user doesn't have access, show nothing while redirecting
  if (!canAccessRoute(user, pathname)) {
    return null
  }

  return <>{children}</>
}
