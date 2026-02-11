'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useUsers } from '@/hooks/useUsers'
import { Column } from '@/components/ui/DataTable/types'
import { User } from '@/types/auth'
import DataTable from '@/components/ui/DataTable/DataTable'

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<keyof User | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const limit = 2

  // Fetch users with page, limit, sorting
  const { data, isLoading, refetch } = useUsers(
    page,
    limit,
    sortBy ?? undefined,
    sortOrder
  )

  const columns: Column<User>[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
  ]

  // Row action buttons
  const rowActions = (user: User) => (
    <div className="flex gap-2">
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
        onClick={() => alert(`Edit user ${user.name}`)}
      >
        Edit
      </button>
      <button
        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
        onClick={() => alert(`Delete user ${user.name}`)}
      >
        Delete
      </button>
    </div>
  )

  // When user sorts a column
  const handleSortChange = (column: keyof User, order: 'asc' | 'desc') => {
    setSortBy(column)
    setSortOrder(order)
    setPage(1) // reset to first page on sort change
    refetch() // fetch new sorted data
  }

  console.log('API DATA:', data)

  return (
    <ProtectedRoute allowedRoles={['admin', 'manager']}>
      <DataTable
        data={data?.data}
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Email', accessor: 'email' },
          { header: 'Role', accessor: 'role' },
        ]}
        isLoading={isLoading}
        page={page}
        totalPages={data?.totalPages}
        onPageChange={setPage}
        rowActions={rowActions}
        onSortChange={handleSortChange}
        emptyMessage="There are no users in the system."
      />
    </ProtectedRoute>
  )
}
