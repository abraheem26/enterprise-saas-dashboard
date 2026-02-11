import { useState } from 'react'
import Card from '../Card'
import TableSkeleton from './TableSkeleton'
import EmptyState from './EmptyState'

type Column<T> = {
  header: string
  accessor: keyof T
}

type DataTableProps<T> = {
  data?: T[]
  columns: Column<T>[]
  isLoading?: boolean
  emptyMessage?: string

  // Pagination
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void

  // Sorting
  onSortChange?: (sortBy: keyof T, sortOrder: 'asc' | 'desc') => void

  // Row actions
  rowActions?: (row: T) => React.ReactNode
}

export default function DataTable<T>({
  data,
  columns,
  isLoading,
  emptyMessage = 'No data available',
  page,
  totalPages,
  onPageChange,
  rowActions,
  onSortChange,
}: DataTableProps<T>) {
  const [sortBy, setSortBy] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleSort = (col: Column<T>) => {
    let order: 'asc' | 'desc' = 'asc'
    if (sortBy === col.accessor && sortOrder === 'asc') order = 'desc'

    setSortBy(col.accessor)
    setSortOrder(order)
    if (onSortChange && col.accessor) onSortChange(col.accessor, order)
  }
  return (
    <Card>
      {isLoading ? (
        <TableSkeleton />
      ) : data && data.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left border-b">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={String(col.accessor)}
                      className="pb-3 font-medium text-gray-600"
                      onClick={() => handleSort(col)}
                    >
                      {col.header}
                      {sortBy === col.accessor && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </th>
                  ))}
                  {rowActions && (
                    <th className="pb-3 font-medium text-gray-600">Actions</th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50 transition">
                    {columns.map((col) => (
                      <td
                        key={String(col.accessor)}
                        className="py-3 text-gray-700"
                      >
                        {String(row[col.accessor])}
                      </td>
                    ))}
                    {rowActions && <td className="py-3">{rowActions(row)}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <EmptyState title="No Records Found" description={emptyMessage} />
      )}

      {/* Pagination */}
      {totalPages && totalPages > 1 && onPageChange && page && (
        <div className="flex items-center justify-between mt-4">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </Card>
  )
}
