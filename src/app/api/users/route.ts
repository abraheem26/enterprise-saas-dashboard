import { NextResponse } from 'next/server'
import { MOCK_USERS } from '@/services/auth.service'

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  // Parse query params
  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '10', 10)
  const sortBy = url.searchParams.get('sortBy') as
    | keyof (typeof MOCK_USERS)[0]
    | null
  const sortOrder = (url.searchParams.get('sortOrder') || 'asc') as
    | 'asc'
    | 'desc'

  let users = [...MOCK_USERS]

  // Sorting
  if (sortBy) {
    users.sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }

  const totalRecords = users.length
  const totalPages = Math.ceil(totalRecords / limit)

  // Pagination
  const startIndex = (page - 1) * limit
  const paginatedUsers = users.slice(startIndex, startIndex + limit)

  return NextResponse.json({
    data: paginatedUsers,
    totalPages,
    totalRecords,
  })
}
