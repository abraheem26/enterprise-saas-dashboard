import { useQuery } from '@tanstack/react-query'
import { fetchUsers, PaginatedUsersResponse } from '@/lib/apis/users.api'
import { User } from '@/types/auth'
import { useAuthContext } from '@/context/AuthContext'

export const useUsers = (
  page: number,
  limit: number,
  sortBy?: keyof User,
  sortOrder?: 'asc' | 'desc'
) => {
  const { token } = useAuthContext()
  return useQuery<PaginatedUsersResponse>({
    queryKey: ['users', page, limit, sortBy, sortOrder],
    queryFn: () =>
      fetchUsers(page, limit, sortBy as any, sortOrder, token ?? undefined),
    placeholderData: (previousData) => previousData,
  })
}
