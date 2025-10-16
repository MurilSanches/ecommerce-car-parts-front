import { useWishlist } from '../store/wishlist'
import { useCartStore } from '../store/cart'
import { Link } from 'react-router-dom'
import { LazyImage } from '../components/LazyImage'
import { useEffect } from 'react'

// Mock products for wishlist
const MOCK_WISHLIST_PRODUCTS = [
  { id: 'pneu-aro-16', name: 'Pneu Aro 16 205/55R16', price: 399.9, image: 'https://picsum.photos/seed/pneu/200/200', rating: 4.6, reviews: 23, category: 'pneus', brand: 'Pirelli' },
  { id: 'oleo-5w30', name: 'Óleo Sintético 5W30 1L', price: 49.9, image: 'https://picsum.photos/seed/oleo/200/200', rating: 4.4, reviews: 15, category: 'oleos', brand: 'Castrol' },
  { id: 'filtro-ar', name: 'Filtro de Ar Motor', price: 59.9, image: 'https://picsum.photos/seed/filtro/200/200', rating: 4.2, reviews: 8, category: 'filtros', brand: 'Mann' },
  { id: 'pastilha-freio', name: 'Pastilha de Freio Dianteira', price: 129.9, image: 'https://picsum.photos/seed/freio/200/200', rating: 4.1, reviews: 12, category: 'freios', brand: 'Brembo' },
]

export default function Component() {
  const wishlistIds = useWishlist((s) => s.ids)
  const toggleWish = useWishlist((s) => s.toggle)
  const hasWish = useWishlist((s) => s.has)
  const hydrateWishlist = useWishlist((s) => s.hydrate)
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    hydrateWishlist()
  }, [hydrateWishlist])

  // Filter products that are in wishlist
  const wishlistProducts = MOCK_WISHLIST_PRODUCTS.filter(product => hasWish(product.id))

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lista de Desejos</h1>
        <p className="text-zinc-600">
          {wishlistProducts.length} produto{wishlistProducts.length !== 1 ? 's' : ''} salvo{wishlistProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💝</div>
          <h3 className="text-xl font-semibold mb-2">Sua lista de desejos está vazia</h3>
          <p className="text-zinc-600 mb-6">Adicione produtos que você gostaria de comprar mais tarde</p>
          <Link to="/" className="btn-primary">
            Explorar produtos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product, index) => (
            <div key={product.id} className="card p-4 group hover:shadow-lg transition-all duration-300 slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative">
                <Link to={`/produto/${product.id}`} className="block">
                  <LazyImage 
                    src={product.image} 
                    alt={product.name} 
                    className="h-48 w-full rounded mb-3" 
                    placeholder="Carregando..."
                  />
                </Link>
                
                <button
                  onClick={() => toggleWish(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors"
                  aria-label="Remover dos favoritos"
                >
                  <span className="text-red-500 text-lg">♥</span>
                </button>
              </div>
              
              <div className="mb-3">
                <div className="text-xs text-zinc-500 mb-1">{product.brand}</div>
                <Link to={`/produto/${product.id}`} className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">
                  {product.name}
                </Link>
              </div>

              <div className="flex items-center gap-1 mb-3">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-xs text-zinc-500">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-bold">R$ {product.price.toFixed(2)}</div>
                <div className="text-xs text-emerald-600">em até 10x sem juros</div>
              </div>

              <div className="space-y-2">
                <button
                  className="w-full btn-primary text-sm"
                  onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                >
                  Adicionar ao carrinho
                </button>
                
                <Link 
                  to={`/produto/${product.id}`}
                  className="block w-full btn-outline text-sm text-center"
                >
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
