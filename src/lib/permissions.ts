export type Role = 'admin' | 'manager' | 'viewer'

export type Permission =
  | 'dashboard:view'
  | 'users:view'
  | 'users:manage'
  | 'reports:view'
  | 'reports:manage'

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'dashboard:view',
    'users:view',
    'users:manage',
    'reports:view',
    'reports:manage',
  ],

  manager: ['dashboard:view', 'users:view', 'reports:view'],

  viewer: ['dashboard:view', 'reports:view'],
}
