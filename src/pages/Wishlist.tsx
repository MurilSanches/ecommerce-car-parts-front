import { useWishlist } from '../store/wishlist'
import { useCartStore } from '../store/cart'
import { productsService, type Product } from '../services/products'
import { Link } from 'react-router-dom'
import { LazyImage } from '../components/LazyImage'
import { useEffect, useState, useMemo } from 'react'
import { Heart, Loader2 } from 'lucide-react'

export default function Component() {
  const wishlistIds = useWishlist((s) => s.ids)
  const toggleWish = useWishlist((s) => s.toggle)
  const addItem = useCartStore((s) => s.addItem)
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const productIdsString = useMemo(() => {
    return Object.keys(wishlistIds).sort().join(',')
  }, [wishlistIds])

  useEffect(() => {
    async function loadWishlistProducts() {
      try {
        setLoading(true)
        setError('')
        
        const currentIds = Object.keys(wishlistIds)
        
        if (currentIds.length === 0) {
          setProducts([])
          setLoading(false)
          return
        }

        const productPromises = currentIds.map(id => 
          productsService.getById(id).catch(() => null)
        )
        
        const productsData = await Promise.all(productPromises)
        const validProducts = productsData.filter((p): p is Product => p !== null)
        
        setProducts(validProducts)
      } catch (err) {
        setError('Erro ao carregar lista de desejos')
      } finally {
        setLoading(false)
      }
    }

    loadWishlistProducts()
  }, [productIdsString, wishlistIds])

  const getProductImage = (product: Product) => {
    return product.images && product.images.length > 0 
      ? product.images[0] 
      : `https://picsum.photos/seed/${product.id}/200/200`
  }

  if (loading) {
    return (
      <div className="fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Lista de Desejos</h1>
        </div>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lista de Desejos</h1>
        <p className="text-zinc-600">
          {products.length} produto{products.length !== 1 ? 's' : ''} salvo{products.length !== 1 ? 's' : ''}
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Sua lista de desejos está vazia</h3>
          <p className="text-zinc-600 mb-6">Adicione produtos que você gostaria de comprar mais tarde</p>
          <Link to="/" className="btn-primary">
            Explorar produtos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product.id} className="card p-4 group hover:shadow-lg transition-all duration-300 slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="relative">
                <Link to={`/produto/${product.id}`} className="block">
                  <LazyImage 
                    src={getProductImage(product)} 
                    alt={product.name} 
                    className="h-48 w-full rounded mb-3 object-cover" 
                    placeholder="Carregando..."
                  />
                </Link>
                
                <button
                  onClick={() => toggleWish(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors"
                  aria-label="Remover dos favoritos"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
              </div>
              
              <div className="mb-3">
                <div className="text-xs text-zinc-500 mb-1">{product.brand}</div>
                <Link to={`/produto/${product.id}`} className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">
                  {product.name}
                </Link>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-bold text-orange-600">R$ {product.price.toFixed(2)}</div>
                <div className="text-xs text-emerald-600">em até 10x sem juros</div>
              </div>

              <div className="space-y-2">
                <button
                  className="w-full btn-primary text-sm"
                  onClick={() => addItem({ 
                    id: product.id, 
                    name: product.name, 
                    price: product.price, 
                    image: getProductImage(product) 
                  })}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Sem estoque' : 'Adicionar ao carrinho'}
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
