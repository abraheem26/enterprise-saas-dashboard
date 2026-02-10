'use client'

import { useAuthContext } from '@/context/AuthContext'
import { Permission } from '@/lib/permissions'
import { hasPermission } from '@/lib/authorization'

export function usePermissions() {
  const { user } = useAuthContext()

  const can = (permission: Permission) => {
    return hasPermission(user, permission)
  }

  return { can }
}
