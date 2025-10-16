import { useCartStore } from '../store/cart'
import { TireFinder } from '../components/TireFinder'
import { PromoBanners } from '../components/PromoBanners'
import { useWishlist } from '../store/wishlist'
import { Link } from 'react-router-dom'
import { LazyImage } from '../components/LazyImage'

const BASE_PRODUCTS = [
  { id: 'pneu-aro-16', name: 'Pneu Aro 16 205/55R16', price: 399.9, image: 'https://picsum.photos/seed/pneu/200/200', rating: 4.6, reviews: 23, category: 'pneus' },
  { id: 'oleo-5w30', name: 'Óleo Sintético 5W30 1L', price: 49.9, image: 'https://picsum.photos/seed/oleo/200/200', rating: 4.4, reviews: 15, category: 'oleos' },
  { id: 'filtro-ar', name: 'Filtro de Ar Motor', price: 59.9, image: 'https://picsum.photos/seed/filtro/200/200', rating: 4.2, reviews: 8, category: 'filtros' },
  { id: 'pastilha-freio', name: 'Pastilha de Freio Dianteira', price: 129.9, image: 'https://picsum.photos/seed/freio/200/200', rating: 4.1, reviews: 12, category: 'freios' },
]

const CATEGORY_PRODUCTS = {
  pneus: [
    { id: 'pneu-aro-17', name: 'Pneu Aro 17 225/45R17', price: 459.9, image: 'https://picsum.photos/seed/pneu17/200/200', rating: 4.5, reviews: 18, category: 'pneus' },
    { id: 'pneu-aro-18', name: 'Pneu Aro 18 235/40R18', price: 529.9, image: 'https://picsum.photos/seed/pneu18/200/200', rating: 4.7, reviews: 25, category: 'pneus' },
  ],
  oleos: [
    { id: 'oleo-10w40', name: 'Óleo Mineral 10W40 1L', price: 39.9, image: 'https://picsum.photos/seed/oleo10w40/200/200', rating: 4.3, reviews: 12, category: 'oleos' },
    { id: 'oleo-5w40', name: 'Óleo Sintético 5W40 1L', price: 59.9, image: 'https://picsum.photos/seed/oleo5w40/200/200', rating: 4.6, reviews: 20, category: 'oleos' },
  ],
  freios: [
    { id: 'disco-freio', name: 'Disco de Freio Dianteiro', price: 189.9, image: 'https://picsum.photos/seed/disco/200/200', rating: 4.4, reviews: 14, category: 'freios' },
    { id: 'fluido-freio', name: 'Fluido de Freio DOT4', price: 29.9, image: 'https://picsum.photos/seed/fluido/200/200', rating: 4.2, reviews: 8, category: 'freios' },
  ],
}


export default function Component() {
  const addItem = useCartStore((s) => s.addItem)
  const toggleWish = useWishlist((s) => s.toggle)
  const hasWish = useWishlist((s) => s.has)

  return (
    <div className="py-4 fade-in">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Busque por medidas de pneu</h2>
        <TireFinder />
      </div>
      <h2 className="text-lg font-semibold mb-4">Destaques</h2>
      <div className="mb-6">
        <PromoBanners />
      </div>
      
      {/* Category Sections */}
      <div className="space-y-12">
        {/* Pneus Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">🛞 Pneus</h3>
            <Link to="/buscar?categoria=pneus" className="text-sm text-orange-500 hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORY_PRODUCTS.pneus.map((p, index) => (
              <div key={p.id} className="card p-3 group hover:shadow-lg transition-all duration-300 slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <Link to={`/produto/${p.id}`} className="block">
                  <LazyImage 
                    src={p.image} 
                    alt={p.name} 
                    className="h-36 w-full rounded" 
                    placeholder="Carregando..."
                  />
                </Link>
                <div className="mt-2 flex items-start justify-between gap-2">
                  <Link to={`/produto/${p.id}`} className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">{p.name}</Link>
                  <button aria-label="wishlist" onClick={() => toggleWish(p.id)} className="text-zinc-400 hover:text-orange-500 transition-colors">
                    {hasWish(p.id) ? '♥' : '♡'}
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(p.rating))}
                    {'☆'.repeat(5 - Math.floor(p.rating))}
                  </div>
                  <span className="text-xs text-zinc-500">({p.reviews})</span>
                </div>
                <div className="text-sm text-zinc-600">R$ {p.price.toFixed(2)}</div>
                <div className="text-xs text-emerald-600">em até 10x sem juros</div>
                <button
                  className="mt-2 w-full btn-primary text-sm"
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image })}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Óleos Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">🛢️ Óleos</h3>
            <Link to="/buscar?categoria=oleos" className="text-sm text-orange-500 hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORY_PRODUCTS.oleos.map((p, index) => (
              <div key={p.id} className="card p-3 group hover:shadow-lg transition-all duration-300 slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <Link to={`/produto/${p.id}`} className="block">
                  <LazyImage 
                    src={p.image} 
                    alt={p.name} 
                    className="h-36 w-full rounded" 
                    placeholder="Carregando..."
                  />
                </Link>
                <div className="mt-2 flex items-start justify-between gap-2">
                  <Link to={`/produto/${p.id}`} className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">{p.name}</Link>
                  <button aria-label="wishlist" onClick={() => toggleWish(p.id)} className="text-zinc-400 hover:text-orange-500 transition-colors">
                    {hasWish(p.id) ? '♥' : '♡'}
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(p.rating))}
                    {'☆'.repeat(5 - Math.floor(p.rating))}
                  </div>
                  <span className="text-xs text-zinc-500">({p.reviews})</span>
                </div>
                <div className="text-sm text-zinc-600">R$ {p.price.toFixed(2)}</div>
                <div className="text-xs text-emerald-600">em até 10x sem juros</div>
                <button
                  className="mt-2 w-full btn-primary text-sm"
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image })}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Freios Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">🛑 Freios</h3>
            <Link to="/buscar?categoria=freios" className="text-sm text-orange-500 hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORY_PRODUCTS.freios.map((p, index) => (
              <div key={p.id} className="card p-3 group hover:shadow-lg transition-all duration-300 slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <Link to={`/produto/${p.id}`} className="block">
                  <LazyImage 
                    src={p.image} 
                    alt={p.name} 
                    className="h-36 w-full rounded" 
                    placeholder="Carregando..."
                  />
                </Link>
                <div className="mt-2 flex items-start justify-between gap-2">
                  <Link to={`/produto/${p.id}`} className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">{p.name}</Link>
                  <button aria-label="wishlist" onClick={() => toggleWish(p.id)} className="text-zinc-400 hover:text-orange-500 transition-colors">
                    {hasWish(p.id) ? '♥' : '♡'}
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(p.rating))}
                    {'☆'.repeat(5 - Math.floor(p.rating))}
                  </div>
                  <span className="text-xs text-zinc-500">({p.reviews})</span>
                </div>
                <div className="text-sm text-zinc-600">R$ {p.price.toFixed(2)}</div>
                <div className="text-xs text-emerald-600">em até 10x sem juros</div>
                <button
                  className="mt-2 w-full btn-primary text-sm"
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image })}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* All Products Section */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4">Todos os Produtos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {BASE_PRODUCTS.map((p, index) => (
            <div key={p.id} className="card p-3 group hover:shadow-lg transition-all duration-300 slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <Link to={`/produto/${p.id}`} className="block">
                <LazyImage 
                  src={p.image} 
                  alt={p.name} 
                  className="h-36 w-full rounded" 
                  placeholder="Carregando..."
                />
              </Link>
              <div className="mt-2 flex items-start justify-between gap-2">
                <Link to={`/produto/${p.id}`} className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">{p.name}</Link>
                <button aria-label="wishlist" onClick={() => toggleWish(p.id)} className="text-zinc-400 hover:text-orange-500 transition-colors">
                  {hasWish(p.id) ? '♥' : '♡'}
                </button>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.floor(p.rating))}
                  {'☆'.repeat(5 - Math.floor(p.rating))}
                </div>
                <span className="text-xs text-zinc-500">({p.reviews})</span>
              </div>
              <div className="text-sm text-zinc-600">R$ {p.price.toFixed(2)}</div>
              <div className="text-xs text-emerald-600">em até 10x sem juros</div>
              <button
                className="mt-2 w-full btn-primary text-sm"
                onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image })}
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


