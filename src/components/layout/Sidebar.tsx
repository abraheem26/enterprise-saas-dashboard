'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useAuthContext } from '@/context/AuthContext'
import { Permission } from '@/lib/permissions'
import { usePermissions } from '@/hooks/usePermissions'

// Define allowed roles for type safety
type Role = 'admin' | 'manager' | 'viewer'

type NavItem = {
  label: string
  href: string
  permission: Permission
  roles?: Role[] // if undefined, visible to all
}

// Define nav items
const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    permission: 'dashboard:view' as Permission,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    permission: 'users:view' as Permission,
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    permission: 'reports:view' as Permission,
  },
]

export default function Sidebar() {
  const { user, loading } = useAuthContext()
  const pathname = usePathname()
  const { can } = usePermissions()
  // Show nothing while auth is loading
  if (loading) return null

  // User should exist, but safeguard anyway
  if (!user) return null

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 font-bold text-lg">SaaS Dashboard</div>

      <nav className="p-4 space-y-1">
        {navItems
          .filter((item) => can(item.permission))
          .map((item) => {
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'block rounded px-3 py-2 text-sm transition',
                  isActive
                    ? 'bg-gray-200 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {item.label}
              </Link>
            )
          })}
      </nav>
    </aside>
  )
}
