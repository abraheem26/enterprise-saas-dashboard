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

//CREATE USER
export const createUser = async (data: Partial<User>): Promise<User> => {
  return apiClient<User>('/api/users', {
    method: 'POST',
    body: data,
  })
}

// UPDATE USER
export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  return apiClient<User>(`/api/users/${id}`, {
    method: 'PUT',
    body: data,
  })
}

// DELETE USER
export const deleteUser = async (id: string): Promise<void> => {
  return apiClient<void>(`/api/users/${id}`, {
    method: 'DELETE',
  })
}
