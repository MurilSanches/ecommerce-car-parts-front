import { useCartStore } from '../store/cart'
import { TireFinder } from '../components/TireFinder'
import { PromoBanners } from '../components/PromoBanners'
import { useWishlist } from '../store/wishlist'
import { Link } from 'react-router-dom'
import { LazyImage } from '../components/LazyImage'
import { productsService, type Product } from '../services/products'
import { useEffect, useState } from 'react'

export default function Component() {
  const addItem = useCartStore((s) => s.addItem)
  const toggleWish = useWishlist((s) => s.toggle)
  const hasWish = useWishlist((s) => s.has)
  const [products, setProducts] = useState<Product[]>([])
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        
        // Load all products
        const allProductsResponse = await productsService.getAll({ page: 0, size: 20 })
        setProducts(allProductsResponse.content)

        // Load products by category
        const categories = ['Pneus', 'Óleos', 'Freios', 'Filtros']
        const categoryData: Record<string, Product[]> = {}
        
        for (const category of categories) {
          try {
            const response = await productsService.getByCategory(category, 0, 5)
            categoryData[category.toLowerCase()] = response.content
          } catch (err) {
            // Category might not exist, continue
            categoryData[category.toLowerCase()] = []
          }
        }
        
        setCategoryProducts(categoryData)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const getProductImage = (product: Product) => {
    return product.images && product.images.length > 0 
      ? product.images[0] 
      : `https://picsum.photos/seed/${product.id}/200/200`
  }

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <div key={product.id} className="card p-3 group hover:shadow-lg transition-all duration-300 slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <Link to={`/produto/${product.id}`} className="block">
        <LazyImage 
          src={getProductImage(product)} 
          alt={product.name} 
          className="h-36 w-full rounded" 
          placeholder="Carregando..."
        />
      </Link>
      <div className="mt-2 flex items-start justify-between gap-2">
        <Link to={`/produto/${product.id}`} className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">{product.name}</Link>
        <button aria-label="wishlist" onClick={() => toggleWish(product.id)} className="text-zinc-400 hover:text-orange-500 transition-colors">
          {hasWish(product.id) ? '♥' : '♡'}
        </button>
      </div>
      <div className="text-sm text-zinc-600 mt-1">R$ {product.price.toFixed(2)}</div>
      <div className="text-xs text-emerald-600">em até 10x sem juros</div>
      <button
        className="mt-2 w-full btn-primary text-sm"
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
    </div>
  )

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
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#ff6b00' }}></div>
        </div>
      ) : (
        <>
          {/* Category Sections */}
          <div className="space-y-12">
            {/* Pneus Section */}
            {categoryProducts.pneus && categoryProducts.pneus.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">🛞 Pneus</h3>
                  <Link to="/buscar?categoria=Pneus" className="text-sm text-orange-500 hover:underline">
                    Ver todos →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {categoryProducts.pneus.map((p, index) => (
                    <ProductCard key={p.id} product={p} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* Óleos Section */}
            {categoryProducts.óleos && categoryProducts.óleos.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">🛢️ Óleos</h3>
                  <Link to="/buscar?categoria=Óleos" className="text-sm text-orange-500 hover:underline">
                    Ver todos →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {categoryProducts.óleos.map((p, index) => (
                    <ProductCard key={p.id} product={p} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* Freios Section */}
            {categoryProducts.freios && categoryProducts.freios.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">🛑 Freios</h3>
                  <Link to="/buscar?categoria=Freios" className="text-sm text-orange-500 hover:underline">
                    Ver todos →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {categoryProducts.freios.map((p, index) => (
                    <ProductCard key={p.id} product={p} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* Filtros Section */}
            {categoryProducts.filtros && categoryProducts.filtros.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">🔧 Filtros</h3>
                  <Link to="/buscar?categoria=Filtros" className="text-sm text-orange-500 hover:underline">
                    Ver todos →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {categoryProducts.filtros.map((p, index) => (
                    <ProductCard key={p.id} product={p} index={index} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* All Products Section */}
          {products.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg font-semibold mb-4">Todos os Produtos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {products.map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}


