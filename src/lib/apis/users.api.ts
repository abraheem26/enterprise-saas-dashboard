// users.api.ts
import { apiClient } from '../apiClient'
import { User } from '@/types/auth'

export const fetchUsers = async (token?: string): Promise<User[]> => {
  return apiClient<User[]>('/api/users', { token })
}
