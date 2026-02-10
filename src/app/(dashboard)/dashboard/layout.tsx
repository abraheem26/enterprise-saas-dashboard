'use client'

import { ReactNode } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { useAuthContext } from '@/context/AuthContext'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { loading } = useAuthContext()

  // Show a small loader while auth context initializes
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    )

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Sidebar is always visible */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="p-4 flex-1">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
