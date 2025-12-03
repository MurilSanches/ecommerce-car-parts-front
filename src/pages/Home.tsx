import { useCartStore } from '../store/cart'
import { TireFinder } from '../components/TireFinder'
import { PromoBanners } from '../components/PromoBanners'
import { PlateSearch } from '../components/PlateSearch'
import { Link } from 'react-router-dom'
import { LazyImage } from '../components/LazyImage'
import { productsService, type Product } from '../services/products'
import { useEffect, useState } from 'react'
import motorImg from '../assets/motor.jpeg'
import freiosImg from '../assets/freios.jpeg'
import filtrosImg from '../assets/filtros.jpeg'
import oleoImg from '../assets/oleo.jpeg'
import { Wrench, Shield, Truck, Award } from 'lucide-react'
import { WishlistButton } from '../components/WishlistButton'

export default function Component() {
  const addItem = useCartStore((s) => s.addItem)
  const [products, setProducts] = useState<Product[]>([])
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        
        const allProductsResponse = await productsService.getAll({ page: 0, size: 20 })
        setProducts(allProductsResponse.content)

        const categories = ['Pneus', 'Óleos', 'Freios', 'Filtros', 'Suspensão', 'Motor', 'Elétrica']
        const categoryData: Record<string, Product[]> = {}
        
        for (const category of categories) {
          try {
            const response = await productsService.getByCategory(category, 0, 5)
            categoryData[category.toLowerCase()] = response.content
          } catch (err) {
            categoryData[category.toLowerCase()] = []
          }
        }
        
        setCategoryProducts(categoryData)
      } catch (error) {
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
        <WishlistButton 
          productId={product.id}
          className="text-zinc-400 hover:text-orange-500 transition-colors"
          size="sm"
        />
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
      <PlateSearch />
      
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
        <div className="relative h-64 md:h-80 lg:h-96">
          <img
            src={motorImg}
            alt="Peças Automotivas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-6 md:px-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Peças Automotivas de Qualidade
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6">
                Encontre tudo que você precisa para seu veículo com os melhores preços e entrega rápida
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/categorias"
                  className="btn-primary text-base px-6 py-3"
                >
                  Ver Categorias
                </Link>
                <Link
                  to="/buscar"
                  className="btn-outline text-base px-6 py-3 bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20"
                >
                  Buscar Produtos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 text-center hover:shadow-lg transition-all">
          <Truck className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <h3 className="font-semibold text-sm mb-1">Frete Grátis</h3>
          <p className="text-xs text-zinc-600">Acima de R$ 200</p>
        </div>
        <div className="card p-4 text-center hover:shadow-lg transition-all">
          <Shield className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <h3 className="font-semibold text-sm mb-1">Garantia</h3>
          <p className="text-xs text-zinc-600">Produtos originais</p>
        </div>
        <div className="card p-4 text-center hover:shadow-lg transition-all">
          <Wrench className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <h3 className="font-semibold text-sm mb-1">Instalação</h3>
          <p className="text-xs text-zinc-600">Rede credenciada</p>
        </div>
        <div className="card p-4 text-center hover:shadow-lg transition-all">
          <Award className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <h3 className="font-semibold text-sm mb-1">Qualidade</h3>
          <p className="text-xs text-zinc-600">Melhores marcas</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Ofertas em Destaque</h2>
        <PromoBanners />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Busque por medidas de pneu</h2>
        <TireFinder />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#ff6b00' }}></div>
        </div>
      ) : (
        <>
          <div className="space-y-12">
            {categoryProducts.pneus && categoryProducts.pneus.length > 0 && (
              <section className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Pneus</h3>
                  <Link to="/buscar?categoria=Pneus" className="text-sm font-semibold text-orange-500 hover:text-orange-600 hover:underline flex items-center gap-1">
                    Ver todos <span>→</span>
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {categoryProducts.pneus.map((p, index) => (
                    <ProductCard key={p.id} product={p} index={index} />
                  ))}
                </div>
              </section>
            )}

            {categoryProducts.óleos && categoryProducts.óleos.length > 0 && (
              <section className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md">
                      <img src={oleoImg} alt="Óleos" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold">Óleos e Lubrificantes</h3>
                  </div>
                  <Link to="/buscar?categoria=Óleos" className="text-sm font-semibold text-orange-500 hover:text-orange-600 hover:underline flex items-center gap-1">
                    Ver todos <span>→</span>
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {categoryProducts.óleos.map((p, index) => (
                    <ProductCard key={p.id} product={p} index={index} />
                  ))}
                </div>
              </section>
            )}

            {categoryProducts.freios && categoryProducts.freios.length > 0 && (
              <section className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md">
                      <img src={freiosImg} alt="Freios" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold">Sistema de Freios</h3>
                  </div>
                  <Link to="/buscar?categoria=Freios" className="text-sm font-semibold text-orange-500 hover:text-orange-600 hover:underline flex items-center gap-1">
                    Ver todos <span>→</span>
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {categoryProducts.freios.map((p, index) => (
                    <ProductCard key={p.id} product={p} index={index} />
                  ))}
                </div>
              </section>
            )}

            {categoryProducts.filtros && categoryProducts.filtros.length > 0 && (
              <section className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md">
                      <img src={filtrosImg} alt="Filtros" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold">Filtros Premium</h3>
                  </div>
                  <Link to="/buscar?categoria=Filtros" className="text-sm font-semibold text-orange-500 hover:text-orange-600 hover:underline flex items-center gap-1">
                    Ver todos <span>→</span>
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


