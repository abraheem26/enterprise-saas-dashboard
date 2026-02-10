import { AuthResponse } from '@/types/auth'

export const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@demo.com',
    password: 'manager123',
    role: 'manager',
  },
  {
    id: '3',
    name: 'Viewer User',
    email: 'viewer@demo.com',
    password: 'viewer123',
    role: 'viewer',
  },
]

export async function loginService(
  email: string,
  password: string
): Promise<AuthResponse> {
  await new Promise((res) => setTimeout(res, 800))

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  )

  if (!user) {
    throw new Error('Invalid credentials')
  }

  return {
    token: 'mock-jwt-token-123',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as 'admin' | 'manager' | 'viewer',
    },
  }
}
