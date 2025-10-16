import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { LazyImage } from '../components/LazyImage'
import { useCartStore } from '../store/cart'
import { useWishlist } from '../store/wishlist'

const MOCK_PRODUCTS = [
  { id: 'pneu-aro-16', name: 'Pneu Aro 16 205/55R16', price: 399.9, image: 'https://picsum.photos/seed/pneu/200/200', rating: 4.6, reviews: 23, category: 'pneus', brand: 'Pirelli' },
  { id: 'oleo-5w30', name: 'Óleo Sintético 5W30 1L', price: 49.9, image: 'https://picsum.photos/seed/oleo/200/200', rating: 4.4, reviews: 15, category: 'oleos', brand: 'Castrol' },
  { id: 'filtro-ar', name: 'Filtro de Ar Motor', price: 59.9, image: 'https://picsum.photos/seed/filtro/200/200', rating: 4.2, reviews: 8, category: 'filtros', brand: 'Mann' },
  { id: 'pastilha-freio', name: 'Pastilha de Freio Dianteira', price: 129.9, image: 'https://picsum.photos/seed/freio/200/200', rating: 4.1, reviews: 12, category: 'freios', brand: 'Brembo' },
  { id: 'pneu-aro-17', name: 'Pneu Aro 17 225/45R17', price: 459.9, image: 'https://picsum.photos/seed/pneu17/200/200', rating: 4.5, reviews: 18, category: 'pneus', brand: 'Michelin' },
  { id: 'oleo-10w40', name: 'Óleo Mineral 10W40 1L', price: 39.9, image: 'https://picsum.photos/seed/oleo10w40/200/200', rating: 4.3, reviews: 12, category: 'oleos', brand: 'Shell' },
  { id: 'disco-freio', name: 'Disco de Freio Dianteiro', price: 189.9, image: 'https://picsum.photos/seed/disco/200/200', rating: 4.4, reviews: 14, category: 'freios', brand: 'Brembo' },
  { id: 'amortecedor', name: 'Amortecedor Dianteiro', price: 299.9, image: 'https://picsum.photos/seed/amortecedor/200/200', rating: 4.2, reviews: 9, category: 'suspensao', brand: 'Monroe' },
]

const BRANDS = ['Pirelli', 'Michelin', 'Bridgestone', 'Castrol', 'Shell', 'Mann', 'Brembo', 'Monroe']
const CATEGORIES = [
  { slug: 'pneus', name: 'Pneus', icon: '🛞' },
  { slug: 'rodas', name: 'Rodas', icon: '⚙️' },
  { slug: 'oleos', name: 'Óleos', icon: '🛢️' },
  { slug: 'filtros', name: 'Filtros', icon: '🔧' },
  { slug: 'freios', name: 'Freios', icon: '🛑' },
  { slug: 'suspensao', name: 'Suspensão', icon: '🔩' },
  { slug: 'motor', name: 'Motor', icon: '⚡' },
  { slug: 'eletrico', name: 'Elétrico', icon: '🔋' },
]

export default function Component() {
  const location = useLocation()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const toggleWish = useWishlist((s) => s.toggle)
  const hasWish = useWishlist((s) => s.has)
  
  const searchParams = new URLSearchParams(location.search)
  const q = searchParams.get('q') ?? ''
  const categoria = searchParams.get('categoria') ?? ''
  const marca = searchParams.get('marca') ?? ''
  const w = searchParams.get('w') ?? ''
  const p = searchParams.get('p') ?? ''
  const r = searchParams.get('r') ?? ''
  const min = searchParams.get('min') ?? ''
  const max = searchParams.get('max') ?? ''
  const sort = searchParams.get('sort') ?? 'relevance'

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(location.search)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    const nextUrl = `/buscar?${next.toString()}`
    if (location.pathname + location.search !== nextUrl) {
      navigate(nextUrl)
    }
  }

  const toggleParam = (key: string, value: string) => {
    const next = new URLSearchParams(location.search)
    const current = next.get(key)
    if (current === value) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    const nextUrl = `/buscar?${next.toString()}`
    if (location.pathname + location.search !== nextUrl) {
      navigate(nextUrl)
    }
  }

  // Filter products based on search parameters
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (categoria && product.category !== categoria) return false
    if (marca && product.brand !== marca) return false
    if (min && product.price < parseFloat(min)) return false
    if (max && product.price > parseFloat(max)) return false
    if (q && !product.name.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'price-asc': return a.price - b.price
      case 'price-desc': return b.price - a.price
      case 'rating': return b.rating - a.rating
      default: return 0
    }
  })

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {categoria ? `Produtos de ${CATEGORIES.find(c => c.slug === categoria)?.name}` : 'Buscar Produtos'}
        </h1>
        <p className="text-zinc-600">
          {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Filters Sidebar */}
        <aside className="space-y-6">
          {/* Search */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Buscar</h3>
            <input
              type="text"
              placeholder="Nome do produto..."
              value={q}
              onChange={(e) => setParam('q', e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:border-orange-500"
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Categorias</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <label key={cat.slug} className="flex items-center gap-3 text-sm cursor-pointer hover:text-orange-500 transition-colors">
                  <input 
                    type="radio" 
                    name="categoria" 
                    checked={categoria === cat.slug} 
                    onChange={() => toggleParam('categoria', cat.slug)}
                    className="text-orange-500"
                  />
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Marcas</h3>
            <div className="space-y-2">
              {BRANDS.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-500 transition-colors">
                  <input 
                    type="radio" 
                    name="marca" 
                    checked={marca === brand} 
                    onChange={() => toggleParam('marca', brand)}
                    className="text-orange-500"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tire Dimensions */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Medidas de Pneu</h3>
            <div className="grid grid-cols-3 gap-2">
              <input 
                className="rounded border border-zinc-300 px-2 py-1 text-sm focus:ring-2 focus:border-orange-500" 
                placeholder="Largura" 
                value={w} 
                onChange={(e) => setParam('w', e.target.value)} 
              />
              <input 
                className="rounded border border-zinc-300 px-2 py-1 text-sm focus:ring-2 focus:border-orange-500" 
                placeholder="Perfil" 
                value={p} 
                onChange={(e) => setParam('p', e.target.value)} 
              />
              <input 
                className="rounded border border-zinc-300 px-2 py-1 text-sm focus:ring-2 focus:border-orange-500" 
                placeholder="Aro" 
                value={r} 
                onChange={(e) => setParam('r', e.target.value)} 
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Preço</h3>
            <div className="grid grid-cols-2 gap-2">
              <input 
                className="rounded border border-zinc-300 px-2 py-1 text-sm focus:ring-2 focus:border-orange-500" 
                placeholder="Min" 
                type="number"
                value={min} 
                onChange={(e) => setParam('min', e.target.value)} 
              />
              <input 
                className="rounded border border-zinc-300 px-2 py-1 text-sm focus:ring-2 focus:border-orange-500" 
                placeholder="Max" 
                type="number"
                value={max} 
                onChange={(e) => setParam('max', e.target.value)} 
              />
            </div>
          </div>

          {/* Clear Filters */}
          <button 
            onClick={() => navigate('/buscar')}
            className="w-full btn-outline text-sm"
          >
            Limpar Filtros
          </button>
        </aside>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              Resultados ({filteredProducts.length})
            </h2>
            <select 
              className="rounded border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:border-orange-500" 
              value={sort} 
              onChange={(e) => setParam('sort', e.target.value)}
            >
              <option value="relevance">Relevância</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="rating">Melhor avaliação</option>
            </select>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
              <p className="text-zinc-600 mb-4">Tente ajustar os filtros ou buscar por outros termos</p>
              <button 
                onClick={() => navigate('/buscar')}
                className="btn-primary"
              >
                Ver todos os produtos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedProducts.map((product, index) => (
                <div key={product.id} className="card p-4 group hover:shadow-lg transition-all duration-300 slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <Link to={`/produto/${product.id}`} className="block">
                    <LazyImage 
                      src={product.image} 
                      alt={product.name} 
                      className="h-48 w-full rounded mb-3" 
                      placeholder="Carregando..."
                    />
                  </Link>
                  
                  <div className="mb-2">
                    <div className="text-xs text-zinc-500 mb-1">{product.brand}</div>
                    <Link to={`/produto/${product.id}`} className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">
                      {product.name}
                    </Link>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-xs text-zinc-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-bold">R$ {product.price.toFixed(2)}</div>
                    <button 
                      aria-label="wishlist" 
                      onClick={() => toggleWish(product.id)} 
                      className="text-zinc-400 hover:text-orange-500 transition-colors"
                    >
                      {hasWish(product.id) ? '♥' : '♡'}
                    </button>
                  </div>

                  <button
                    className="w-full btn-primary text-sm"
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}