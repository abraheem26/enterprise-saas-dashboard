export default function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header row */}
      <div className="flex space-x-4">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>

      {/* Body rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-4 bg-gray-100 rounded w-1/4" />
          <div className="h-4 bg-gray-100 rounded w-1/4" />
          <div className="h-4 bg-gray-100 rounded w-1/4" />
        </div>
      ))}
    </div>
  )
}
