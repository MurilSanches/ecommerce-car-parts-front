export function ProductCardSkeleton() {
  return (
    <div className="card p-3">
      <div className="skeleton h-36 w-full rounded mb-2" />
      <div className="skeleton h-4 w-3/4 mb-1" />
      <div className="skeleton h-3 w-1/2 mb-2" />
      <div className="skeleton h-4 w-1/3 mb-2" />
      <div className="skeleton h-8 w-full rounded" />
    </div>
  )
}

export function ProductPageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div>
        <div className="skeleton aspect-square w-full rounded-md" />
        <div className="flex gap-2 mt-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton aspect-square w-16 rounded" />
          ))}
        </div>
      </div>
      <div>
        <div className="skeleton h-8 w-3/4 mb-2" />
        <div className="skeleton h-4 w-1/2 mb-4" />
        <div className="skeleton h-12 w-1/3 mb-4" />
        <div className="skeleton h-8 w-1/2" />
      </div>
    </div>
  )
}
