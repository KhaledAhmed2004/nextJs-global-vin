'use client'

import { Header } from "@/components/DashboardComponents/Header/Header"
import { Sidebar } from "@/components/DashboardComponents/Sidebar/Sidebar"
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requireRole={true}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
