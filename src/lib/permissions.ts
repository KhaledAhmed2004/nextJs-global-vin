import { User, UserRole, Permission } from '@/types/auth.types'

// Role to Permissions Mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: [
    Permission.VIEW_ALL_FRANCHISES,
    Permission.MANAGE_FRANCHISES,
    Permission.VIEW_ALL_BILLING,
    Permission.MANAGE_ALL_PRICING,
    Permission.VIEW_ALL_REPORTS,
    Permission.VIEW_ALL_ACTIVITY,
    Permission.MANAGE_ALL_API,
    Permission.IMPERSONATE_FRANCHISE,
    Permission.TOPUP_CREDITS,
    Permission.MANAGE_FRANCHISE_USERS
  ],
  [UserRole.FRANCHISE_ADMIN]: [
    Permission.VIEW_OWN_FRANCHISE,
    Permission.VIEW_OWN_BILLING,
    Permission.MANAGE_OWN_BILLING,
    Permission.TOPUP_CREDITS,
    Permission.MANAGE_FRANCHISE_USERS,
    Permission.VIEW_FRANCHISE_REPORTS,
    Permission.VIEW_FRANCHISE_ACTIVITY,
    Permission.MANAGE_FRANCHISE_API
  ],
  [UserRole.FRANCHISE_USER]: [
    Permission.VIEW_OWN_REPORTS
  ]
}

// Check if user has a specific permission
export const hasPermission = (user: User | null, permission: Permission): boolean => {
  if (!user) return false

  // Check user's role permissions
  const rolePermissions = ROLE_PERMISSIONS[user.role] || []

  // Also check if user has explicit permissions
  const userPermissions = user.permissions || []

  return rolePermissions.includes(permission) || userPermissions.includes(permission)
}

// Check if user has any of the permissions
export const hasAnyPermission = (user: User | null, permissions: Permission[]): boolean => {
  if (!user) return false
  return permissions.some(permission => hasPermission(user, permission))
}

// Check if user has all permissions
export const hasAllPermissions = (user: User | null, permissions: Permission[]): boolean => {
  if (!user) return false
  return permissions.every(permission => hasPermission(user, permission))
}

// Role checking helpers
export const isSuperAdmin = (user: User | null): boolean => {
  return user?.role === UserRole.SUPER_ADMIN
}

export const isFranchiseAdmin = (user: User | null): boolean => {
  return user?.role === UserRole.FRANCHISE_ADMIN
}

export const isFranchiseUser = (user: User | null): boolean => {
  return user?.role === UserRole.FRANCHISE_USER
}

// Check if user can access a specific franchise
export const canAccessFranchise = (user: User | null, franchiseId: string): boolean => {
  if (!user) return false

  // Super admins can access all franchises
  if (isSuperAdmin(user)) return true

  // Franchise admins and users can only access their own franchise
  return user.franchiseId === franchiseId
}

// Check if user can manage franchise users
export const canManageFranchiseUsers = (user: User | null, franchiseId?: string): boolean => {
  if (!user) return false

  // Super admins can manage all users
  if (isSuperAdmin(user)) return true

  // Franchise admins can manage users in their franchise
  if (isFranchiseAdmin(user) && franchiseId) {
    return user.franchiseId === franchiseId
  }

  return false
}

// Check if user can view billing
export const canViewBilling = (user: User | null): boolean => {
  return hasAnyPermission(user, [
    Permission.VIEW_ALL_BILLING,
    Permission.VIEW_OWN_BILLING
  ])
}

// Check if user can manage pricing
export const canManagePricing = (user: User | null): boolean => {
  return hasPermission(user, Permission.MANAGE_ALL_PRICING)
}

// Check if user can top up credits
export const canTopUpCredits = (user: User | null, franchiseId?: string): boolean => {
  if (!user) return false

  if (isSuperAdmin(user)) return true

  if (isFranchiseAdmin(user) && franchiseId) {
    return user.franchiseId === franchiseId
  }

  return false
}

// Check if user can impersonate
export const canImpersonate = (user: User | null): boolean => {
  return hasPermission(user, Permission.IMPERSONATE_FRANCHISE)
}

// Get user's accessible routes
export const getAccessibleRoutes = (user: User | null): string[] => {
  if (!user) return []

  const routes: string[] = ['/dashboard']

  if (isSuperAdmin(user)) {
    return [
      '/dashboard',
      '/dashboard/franchises',
      '/dashboard/franchises/manage',
      '/dashboard/leads',
      '/dashboard/billing',
      '/dashboard/pricing',
      '/dashboard/activity',
      '/dashboard/reports',
      '/dashboard/api',
      '/dashboard/terms'
    ]
  }

  if (isFranchiseAdmin(user)) {
    return [
      '/dashboard',
      '/dashboard/billing',
      '/dashboard/activity',
      '/dashboard/reports',
      '/dashboard/api'
    ]
  }

  if (isFranchiseUser(user)) {
    return [
      '/dashboard',
      '/dashboard/reports'
    ]
  }

  return routes
}

// Check if user can access route
export const canAccessRoute = (user: User | null, route: string): boolean => {
  const accessibleRoutes = getAccessibleRoutes(user)

  // Check exact match
  if (accessibleRoutes.includes(route)) return true

  // Check if route starts with any accessible route (for nested routes)
  return accessibleRoutes.some(accessibleRoute =>
    route.startsWith(accessibleRoute) && route !== accessibleRoute
  )
}

// Get default route for user role
export const getDefaultRoute = (user: User | null): string => {
  if (!user) return '/auth/login'

  if (isSuperAdmin(user)) return '/dashboard/franchises/manage'
  if (isFranchiseAdmin(user)) return '/dashboard'
  if (isFranchiseUser(user)) return '/dashboard/reports'

  return '/dashboard'
}

// Get redirect route if user doesn't have access
export const getRedirectRoute = (user: User | null): string => {
  return getDefaultRoute(user)
}
