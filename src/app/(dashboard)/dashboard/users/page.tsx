'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useUsers } from '@/hooks/useUsers'

export default function UsersPage() {
  const { data, isLoading, error } = useUsers()

  return (
    <ProtectedRoute allowedRoles={['admin', 'manager']}>
      <div>
        <h1 className="text-2xl font-bold mb-4">Users</h1>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{(error as Error).message}</p>}

        <ul>
          {data?.map((u) => (
            <li key={u.id}>
              {u.name} — {u.role}
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  )
}
