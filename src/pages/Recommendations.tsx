import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { productsService, type Product } from '../services/products'
import { carsService, type CarInfo } from '../services/cars'
import { useCartStore } from '../store/cart'
import { LazyImage } from '../components/LazyImage'
import { CATEGORIES } from '../constants/categories'
import { Car, ArrowLeft, Loader2 } from 'lucide-react'
import { WishlistButton } from '../components/WishlistButton'

const BRANDS = ['Pirelli', 'Michelin', 'Bridgestone', 'Castrol', 'Shell', 'Mann', 'Brembo', 'Monroe']

export default function Component() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const marca = searchParams.get('marca')
  const placa = searchParams.get('placa')
  const categoria = searchParams.get('categoria') ?? ''
  const brandFilter = searchParams.get('brand') ?? ''
  const min = searchParams.get('min') ?? ''
  const max = searchParams.get('max') ?? ''
  const sort = searchParams.get('sort') ?? 'relevance'
  
  const addItem = useCartStore((s) => s.addItem)
  
  const [products, setProducts] = useState<Product[]>([])
  const [carInfo, setCarInfo] = useState<CarInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [totalElements, setTotalElements] = useState(0)

  useEffect(() => {
    if (!placa) return
    
    async function loadCarInfo() {
      try {
        const info = await carsService.getByPlate(placa!)
        setCarInfo(info)
      } catch (error) {
      }
    }
    
    loadCarInfo()
  }, [placa])

  const [allProducts, setAllProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!marca) return
    
    async function loadAllProducts() {
      try {
        setLoading(true)
        const allProductsList: Product[] = []
        let currentPage = 0
        let hasMorePages = true
        
        while (hasMorePages) {
          const response = await productsService.getByRecommendedBrand(marca!, currentPage, 100)
          allProductsList.push(...response.content)
          hasMorePages = !response.last
          currentPage++
        }
        
        setAllProducts(allProductsList)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    
    loadAllProducts()
  }, [marca])

  useEffect(() => {
    setPage(0)
  }, [categoria, brandFilter, min, max, sort])

  useEffect(() => {
    let filteredProducts = [...allProducts]
    
    if (categoria) {
      filteredProducts = filteredProducts.filter(p => p.category === categoria)
    }
    
    if (brandFilter) {
      filteredProducts = filteredProducts.filter(p => p.brand === brandFilter)
    }
    
    if (min) {
      const minPrice = parseFloat(min)
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice)
    }
    
    if (max) {
      const maxPrice = parseFloat(max)
      filteredProducts = filteredProducts.filter(p => p.price <= maxPrice)
    }
    
    if (sort === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price)
    } else if (sort === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price)
    } else {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
    }
    
    const endIndex = (page + 1) * 20
    const paginatedProducts = filteredProducts.slice(0, endIndex)
    
    setProducts(paginatedProducts)
    setTotalElements(filteredProducts.length)
    setHasMore(endIndex < filteredProducts.length)
  }, [allProducts, categoria, brandFilter, min, max, sort, page])

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString())
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    navigate(`/recomendacoes?${next.toString()}`)
  }

  const toggleParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString())
    const current = next.get(key)
    if (current === value) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    navigate(`/recomendacoes?${next.toString()}`)
  }

  const loadMoreProducts = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1)
    }
  }, [loading, hasMore])

  const getProductImage = (product: Product) => {
    return product.images && product.images.length > 0 
      ? product.images[0] 
      : `https://picsum.photos/seed/${product.id}/200/200`
  }

  if (!marca) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center fade-in">
        <div className="text-center">
          <Car className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Marca não especificada</h2>
          <p className="text-zinc-600 mb-4">Por favor, busque por uma placa para ver as recomendações.</p>
          <Link to="/" className="btn-primary">
            Voltar para Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-orange-500 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Home</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-3">
            <Car className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold">
              Peças Recomendadas
            </h1>
          </div>
          
          {/* Car Info */}
          {carInfo && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div>
                  <span className="text-zinc-600">Veículo:</span>{' '}
                  <span className="font-semibold text-zinc-900">{carInfo.name}</span>
                </div>
                {placa && (
                  <div>
                    <span className="text-zinc-600">Placa:</span>{' '}
                    <span className="font-semibold uppercase text-zinc-900">{placa}</span>
                  </div>
                )}
                <div>
                  <span className="text-zinc-600">Ano:</span>{' '}
                  <span className="font-semibold text-zinc-900">{carInfo.year}</span>
                </div>
                <div>
                  <span className="text-zinc-600">Cor:</span>{' '}
                  <span className="font-semibold text-zinc-900">{carInfo.color}</span>
                </div>
              </div>
            </div>
          )}
          
          <p className="text-zinc-600">
            Encontramos <span className="font-semibold text-orange-600">{totalElements}</span> produto{totalElements !== 1 ? 's' : ''} compatível{totalElements !== 1 ? 'is' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Categorias</h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <label key={cat.value} className="flex items-center gap-3 text-sm cursor-pointer hover:text-orange-500 transition-colors">
                    <input 
                      type="radio" 
                      name="categoria" 
                      checked={categoria === cat.value} 
                      onChange={() => toggleParam('categoria', cat.value)}
                      className="text-orange-500"
                    />
                    <span>{cat.label}</span>
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
                      name="brand" 
                      checked={brandFilter === brand} 
                      onChange={() => toggleParam('brand', brand)}
                      className="text-orange-500"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
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
              onClick={() => {
                const next = new URLSearchParams()
                if (marca) next.set('marca', marca)
                if (placa) next.set('placa', placa)
                navigate(`/recomendacoes?${next.toString()}`)
              }}
              className="w-full btn-outline text-sm"
            >
              Limpar Filtros
            </button>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                Resultados ({totalElements})
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

            {loading && products.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <Car className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Nenhum produto encontrado</h2>
                <p className="text-zinc-600 mb-4">
                  Não encontramos produtos recomendados para esta marca no momento.
                </p>
                <Link to="/" className="btn-primary">
                  Ver todos os produtos
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product, index) => (
                    <div key={product.id} className="card p-4 group hover:shadow-lg transition-all duration-300 slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <Link to={`/produto/${product.id}`} className="block">
                        <LazyImage 
                          src={getProductImage(product)} 
                          alt={product.name} 
                          className="h-48 w-full rounded mb-3 object-cover" 
                          placeholder="Carregando..."
                        />
                      </Link>
                      
                      <div className="mb-2">
                        <div className="text-xs text-zinc-500 mb-1">{product.brand}</div>
                        <Link to={`/produto/${product.id}`} className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">
                          {product.name}
                        </Link>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-lg font-bold">R$ {product.price.toFixed(2)}</div>
                        <WishlistButton 
                          productId={product.id}
                          className="text-zinc-400 hover:text-orange-500 transition-colors"
                          size="sm"
                        />
                      </div>

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
                    </div>
                  ))}
                </div>
                
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={loadMoreProducts}
                      disabled={loading}
                      className="btn-outline px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Carregando...</span>
                        </>
                      ) : (
                        'Carregar mais produtos'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

