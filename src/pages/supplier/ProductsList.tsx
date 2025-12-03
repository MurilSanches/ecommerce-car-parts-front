import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { suppliersService, type Supplier } from '../../services/suppliers'
import { productsService, type Product } from '../../services/products'
import { useAuthStore } from '../../store/auth'
import { LazyImage } from '../../components/LazyImage'
import { Package } from 'lucide-react'

export default function Component() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [supplier, setSupplier] = useState<Supplier | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const mySupplier = await suppliersService.getMySupplier()
        setSupplier(mySupplier)
        await loadProducts(mySupplier.id, 0)
      } catch (error) {
        navigate('/fornecedor/cadastrar')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadData()
    }
  }, [user, navigate])

  const loadProducts = async (supplierId: string, pageNum: number) => {
    try {
      const response = await productsService.getBySupplier(supplierId, pageNum, 20)
      if (pageNum === 0) {
        setProducts(response.content)
      } else {
        setProducts(prev => [...prev, ...response.content])
      }
      setHasMore(!response.last)
    } catch (error) {
    }
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return

    try {
      await productsService.delete(productId)
      setProducts(prev => prev.filter(p => p.id !== productId))
    } catch (error) {
      alert('Erro ao excluir produto')
    }
  }

  const getProductImage = (product: Product) => {
    return product.images && product.images.length > 0 
      ? product.images[0] 
      : `https://picsum.photos/seed/${product.id}/200/200`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#ff6b00' }}></div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meus Produtos</h1>
          <p className="text-zinc-600">{products.length} produto{products.length !== 1 ? 's' : ''} cadastrado{products.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/fornecedor/produtos/novo" className="btn-primary">
          + Adicionar Produto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
            <Package className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nenhum produto cadastrado</h3>
          <p className="text-zinc-600 mb-6">Comece adicionando seu primeiro produto</p>
          <Link to="/fornecedor/produtos/novo" className="btn-primary">
            Adicionar Primeiro Produto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="card p-4">
              <Link to={`/produto/${product.id}`} className="block mb-3">
                <LazyImage 
                  src={getProductImage(product)} 
                  alt={product.name} 
                  className="h-48 w-full rounded object-cover" 
                  placeholder="Carregando..."
                />
              </Link>
              
              <div className="mb-3">
                <Link to={`/produto/${product.id}`} className="text-lg font-semibold hover:text-orange-500 transition-colors line-clamp-2">
                  {product.name}
                </Link>
                <p className="text-sm text-zinc-600 mt-1">{product.brand} • {product.category}</p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-lg font-bold">R$ {product.price.toFixed(2)}</p>
                  <p className="text-sm text-zinc-600">Estoque: {product.stock}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  product.active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {product.active !== false ? 'Ativo' : 'Inativo'}
                </div>
              </div>

              <div className="flex gap-2">
                <Link 
                  to={`/fornecedor/produtos/editar/${product.id}`}
                  className="flex-1 btn-outline text-sm text-center py-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => {
              const nextPage = page + 1
              setPage(nextPage)
              if (supplier) loadProducts(supplier.id, nextPage)
            }}
            className="btn-outline"
          >
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  )
}

