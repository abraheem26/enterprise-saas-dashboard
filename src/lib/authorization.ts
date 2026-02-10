import { ROLE_PERMISSIONS, Permission, Role } from './permissions'
import { User } from '@/types/auth'

/**
 * Check if a role has a specific permission
 */
export function roleHasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission)
}

/**
 * Check if a user has a specific permission
 */
export function hasPermission(
  user: User | null,
  permission: Permission
): boolean {
  if (!user) return false
  return roleHasPermission(user.role, permission)
}

/**
 * Simple role helpers
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin'
}

export function isManager(user: User | null): boolean {
  return user?.role === 'manager'
}

/**
 * Route-level access (used by middleware)
 */
export function canAccessRoute(role: Role, route: string): boolean {
  // Admin can access everything
  if (role === 'admin') return true

  if (route.startsWith('/dashboard/users')) {
    return roleHasPermission(role, 'users:view')
  }

  if (route.startsWith('/dashboard/reports')) {
    return roleHasPermission(role, 'reports:view')
  }

  if (route.startsWith('/dashboard')) {
    return roleHasPermission(role, 'dashboard:view')
  }

  return false
}
