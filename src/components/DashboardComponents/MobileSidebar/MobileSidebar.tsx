'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import { cn } from '@/lib/utils'
import { canAccessRoute } from '@/lib/permissions'
import { useSidebar } from '@/contexts/SidebarContext'
import { X } from 'lucide-react'
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

export function MobileSidebar() {
  const pathname = usePathname()
  const { user } = useSelector((state: RootState) => state.auth)
  const { isOpen, close } = useSidebar()

  // Filter nav items based on user's role and permissions
  const navItems = allNavItems.filter(item => {
    if (!user) return false
    return canAccessRoute(user, item.href)
  })

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border flex flex-col',
          'transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
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
          <button
            onClick={close}
            className="p-2 hover:bg-muted rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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
                onClick={close}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px]',
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
    </>
  )
}
