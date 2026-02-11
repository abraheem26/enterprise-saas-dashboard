import { apiClient } from '../apiClient'
import { User } from '@/types/auth'

export interface PaginatedUsersResponse {
  data: User[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const fetchUsers = async (
  page: number,
  limit: number,
  sortBy?: keyof User,
  sortOrder?: 'asc' | 'desc',
  token?: string
): Promise<PaginatedUsersResponse> => {
  // Construct query string dynamically
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(sortBy ? { sortBy } : {}),
    ...(sortOrder ? { sortOrder } : {}),
  })

  return apiClient<PaginatedUsersResponse>(
    `/api/users?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    { token }
  )
}
