"use client"

import { Bell, LogOut, Menu, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfileQuery } from '@/app/redux/features/auth/authApis'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/app/redux/features/auth/authSlice'
import { toast } from 'sonner'
import { RootState } from '@/app/redux/store'
import { useSidebar } from '@/contexts/SidebarContext'

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const { toggle } = useSidebar()

  // Get state from Redux
  const { impersonating } = useSelector((state: RootState) => state.auth)

  // Fetch user profile
  const { data: profileData, isLoading: isProfileLoading, error } = useProfileQuery(undefined)

  console.log(profileData);
  console.log(error);


  const handleLogout = () => {
    try {
      dispatch(logout())
      toast.success('Logged out successfully')
      router.push('/auth/login')
    } catch (err) {
      console.error('Logout failed:', err)
      toast.error('Logout failed. Please try again.')
    }
  }

  const handleStopImpersonation = () => {
    dispatch({ type: 'auth/stopImpersonation' })
    toast.success('Stopped impersonation')
    router.push('/dashboard/franchises/manage')
  }

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Extract user data from profile response
  const user = profileData?.data?.user || null

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={toggle}
          className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Impersonation Banner */}
        {impersonating && (
          <div className="bg-orange-100 border border-orange-300 text-orange-800 px-3 sm:px-4 py-2 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-shrink min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="text-xs sm:text-sm font-semibold truncate">
                <span className="hidden sm:inline">Viewing Franchise (View-Only Mode)</span>
                <span className="sm:hidden">View-Only Mode</span>
              </span>
            </div>
            <button
              onClick={handleStopImpersonation}
              className="text-xs font-medium px-3 py-1 bg-orange-200 hover:bg-orange-300 rounded transition min-h-[32px] whitespace-nowrap"
            >
              Exit
            </button>
          </div>
        )}

        {/* Franchise Context (for franchise users) */}
        {user?.franchise && !impersonating && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-3 sm:px-4 py-2 rounded-lg hidden sm:block">
            <div className="text-xs font-medium">Franchise</div>
            <div className="text-sm font-semibold truncate max-w-[150px]">{user.franchise.name}</div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
          <Bell size={20} />
        </button>

        <div className="relative pl-2 sm:pl-4 border-l border-border">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity min-h-[44px]"
            disabled={isProfileLoading}
          >
            <div className="text-right hidden sm:block">
              <div className="font-semibold text-sm">
                {isProfileLoading ? 'Loading...' : user?.name || 'User'}
              </div>
              <div className="text-xs text-muted-foreground">
                {user?.role || 'Member'}
              </div>
            </div>
            <Avatar className="w-9 h-9 sm:w-10 sm:h-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{getInitials(user?.name || 'User')}</AvatarFallback>
            </Avatar>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />

              {/* Dropdown Content */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'No email'}</p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px]"
                    onClick={() => {
                      setIsDropdownOpen(false)
                      // Add profile navigation if needed
                    }}
                  >
                    <User size={16} />
                    Profile
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px]"
                    onClick={() => {
                      setIsDropdownOpen(false)
                      // Add settings navigation if needed
                    }}
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
