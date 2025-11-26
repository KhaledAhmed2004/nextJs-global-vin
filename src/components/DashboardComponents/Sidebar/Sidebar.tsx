'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import { cn } from '@/lib/utils'
import { canAccessRoute } from '@/lib/permissions'
import {
  LayoutDashboard,
  Building2,
  FileText,
  Zap,
  Package,
  FileCheck,
  DollarSign,
  Activity,
  Users,
  UserCheck,
} from 'lucide-react'

const allNavItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['super_admin', 'franchise_admin', 'franchise_user']
  },
  {
    href: '/dashboard/franchises',
    label: 'Franchises',
    icon: Building2,
    roles: ['super_admin']
  },
  {
    href: '/dashboard/franchises/manage',
    label: 'Manage Franchises',
    icon: Users,
    roles: ['super_admin']
  },
  {
    href: '/dashboard/leads',
    label: 'Leads',
    icon: UserCheck,
    roles: ['super_admin']
  },
  {
    href: '/dashboard/billing',
    label: 'Billing',
    icon: DollarSign,
    roles: ['super_admin', 'franchise_admin']
  },
  {
    href: '/dashboard/activity',
    label: 'Activity',
    icon: Activity,
    roles: ['super_admin', 'franchise_admin']
  },
  {
    href: '/dashboard/reports',
    label: 'Reports',
    icon: FileText,
    roles: ['super_admin', 'franchise_admin', 'franchise_user']
  },
  {
    href: '/dashboard/api',
    label: 'API',
    icon: Zap,
    roles: ['super_admin', 'franchise_admin']
  },
  {
    href: '/dashboard/pricing',
    label: 'Pricing & Packages',
    icon: Package,
    roles: ['super_admin']
  },
  {
    href: '/dashboard/terms',
    label: 'Terms & Conditions',
    icon: FileCheck,
    roles: ['super_admin']
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useSelector((state: RootState) => state.auth)

  // Filter nav items based on user's role and permissions
  const navItems = allNavItems.filter(item => {
    if (!user) return false
    return canAccessRoute(user, item.href)
  })

  return (
    <aside className="w-56 bg-card border-r border-border flex flex-col h-screen">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
            G
          </div>
          <div>
            <h1 className="text-lg font-semibold">GlobalVIN</h1>
            {user && (
              <p className="text-xs text-muted-foreground capitalize">
                {user.role.replace('_', ' ')}
              </p>
            )}
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon

          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-[#764BA2] text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Franchise Context (for franchise users) */}
      {user && user.franchise && (
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-1">Franchise</div>
          <div className="font-semibold text-sm">{user.franchise.name}</div>
          <div className="text-xs text-muted-foreground mt-1">{user.franchise.country}</div>
        </div>
      )}
    </aside>
  )
}
