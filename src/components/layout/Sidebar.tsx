'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Users',
    href: '/dashboard/users',
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 font-bold text-lg">SaaS Dashboard</div>

      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
        {navItems.map((item) => {
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
                  ? 'bg-gray-200 text-black font-medium'
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
