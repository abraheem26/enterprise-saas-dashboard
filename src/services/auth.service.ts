import { MOCK_USERS } from '@/lib/mockDb'
import { AuthResponse } from '@/types/auth'

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
