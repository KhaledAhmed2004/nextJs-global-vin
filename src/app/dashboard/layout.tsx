'use client'

import { Header } from "@/components/DashboardComponents/Header/Header"
import { Sidebar } from "@/components/DashboardComponents/Sidebar/Sidebar"
import { MobileSidebar } from "@/components/DashboardComponents/MobileSidebar/MobileSidebar"
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute"
import { SidebarProvider } from "@/contexts/SidebarContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requireRole={true}>
      <SidebarProvider>
        <div className="flex h-screen">
          {/* Desktop Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Drawer */}
          <MobileSidebar />

          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto bg-background">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
