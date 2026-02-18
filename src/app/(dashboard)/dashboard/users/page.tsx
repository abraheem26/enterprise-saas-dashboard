'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useUsers } from '@/hooks/useUsers'
import { Column } from '@/components/ui/DataTable/types'
import { User } from '@/types/auth'
import DataTable from '@/components/ui/DataTable/DataTable'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser, updateUser, deleteUser } from '@/lib/apis/users.api'
import UserModal from '@/components/users/UserModal'
import { UserFormInput } from '@/lib/schemas/user.schema'

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<keyof User | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

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
        disabled={updateMutation.isPending || createMutation.isPending}
        onClick={() => {
          setSelectedUser(user)
          setIsModalOpen(true)
        }}
      >
        Edit
      </button>
      <button
        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
        disabled={deleteMutation.isPending}
        onClick={() => {
          if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            deleteMutation.mutate(user.id)
          }
        }}
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

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setIsModalOpen(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setIsModalOpen(false)
      setSelectedUser(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create User
        </button>
      </div>

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

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        onSubmit={(formData: UserFormInput) => {
          if (selectedUser) {
            // Edit user mutation
            updateMutation.mutate({
              id: selectedUser.id,
              data: formData, // formData is type-safe
            })
          } else {
            // Create user mutation
            createMutation.mutate(formData) // formData is type-safe
          }

          // Close modal after submit
          setIsModalOpen(false)
          setSelectedUser(null)
        }}
      />
    </ProtectedRoute>
  )
}
