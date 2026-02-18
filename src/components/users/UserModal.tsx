'use client'

import { useEffect } from 'react'
import { User } from '@/types/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormInput } from '@/lib/schemas/user.schema'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: UserFormInput) => void
  user?: User | null
}

export default function UserModal({ isOpen, onClose, onSubmit, user }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormInput>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'viewer',
    },
  })

  // Populate form when editing a user
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
      })
    } else {
      reset({
        name: '',
        email: '',
        role: 'viewer',
      })
    }
  }, [user, reset])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded w-96 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">
          {user ? 'Edit User' : 'Create User'}
        </h2>

        <label className="block mb-2">
          Name
          <input
            {...register('name')}
            className="w-full border p-2 mb-1"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </label>

        <label className="block mb-2">
          Email
          <input
            {...register('email')}
            className="w-full border p-2 mb-1"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </label>

        <label className="block mb-4">
          Role
          <select {...register('role')} className="w-full border p-2">
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="viewer">Viewer</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
