export function PromoBanners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 slide-up">
      {[1, 2, 3].map((i) => (
        <a key={i} href="/buscar?categoria=pneu" className="relative block rounded-md overflow-hidden border">
          <img
            src={`https://picsum.photos/seed/promo-${i}/800/300`}
            alt={`Promo ${i}`}
            className="h-36 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </a>
      ))}
    </div>
  )
}


