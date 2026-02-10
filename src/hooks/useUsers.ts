import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '@/lib/apis/users.api'
import { useAuthContext } from '@/context/AuthContext'
import { User } from '@/types/auth'

export const useUsers = () => {
  const { token } = useAuthContext() // get JWT

  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: () => fetchUsers(token ?? undefined),
    staleTime: 1000 * 60,
    retry: 1,
  })
}
