// User Roles
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  FRANCHISE_ADMIN = 'franchise_admin',
  FRANCHISE_USER = 'franchise_user'
}

// Permissions
export enum Permission {
  // Franchise Management
  VIEW_ALL_FRANCHISES = 'view_all_franchises',
  MANAGE_FRANCHISES = 'manage_franchises',
  VIEW_OWN_FRANCHISE = 'view_own_franchise',

  // Billing & Pricing
  VIEW_ALL_BILLING = 'view_all_billing',
  MANAGE_ALL_PRICING = 'manage_all_pricing',
  VIEW_OWN_BILLING = 'view_own_billing',
  MANAGE_OWN_BILLING = 'manage_own_billing',
  TOPUP_CREDITS = 'topup_credits',

  // User Management
  MANAGE_FRANCHISE_USERS = 'manage_franchise_users',

  // Reports & Analytics
  VIEW_ALL_REPORTS = 'view_all_reports',
  VIEW_FRANCHISE_REPORTS = 'view_franchise_reports',
  VIEW_OWN_REPORTS = 'view_own_reports',

  // Activity Monitoring
  VIEW_ALL_ACTIVITY = 'view_all_activity',
  VIEW_FRANCHISE_ACTIVITY = 'view_franchise_activity',

  // API Management
  MANAGE_ALL_API = 'manage_all_api',
  MANAGE_FRANCHISE_API = 'manage_franchise_api',

  // Impersonation
  IMPERSONATE_FRANCHISE = 'impersonate_franchise'
}

// Franchise Interface
export interface Franchise {
  id: string
  name: string
  country: string
  email: string
  status: 'active' | 'inactive' | 'suspended'
  plan: 'pay-as-you-go' | 'professional' | 'enterprise'
  balance: number
  apiCalls: number
  joined: string
}

// User Interface
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  franchiseId?: string | null  // null for super admins
  franchise?: Franchise | null  // Populated franchise data
  avatar?: string | null
  permissions?: Permission[]
  createdAt?: string
  updatedAt?: string
}

// Auth State
export interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  impersonating?: {
    originalUser: User
    franchiseId: string
    viewOnly: boolean
  } | null
}

// Login Credentials
export interface LoginCredentials {
  email: string
  password: string
}

// Register Data
export interface RegisterData {
  name: string
  email: string
  password: string
  role?: UserRole
  franchiseId?: string
}

// Auth Response
export interface AuthResponse {
  token: string
  user: User
}

// Role Check Result
export interface RoleCheckResult {
  hasAccess: boolean
  redirectTo?: string
  message?: string
}
