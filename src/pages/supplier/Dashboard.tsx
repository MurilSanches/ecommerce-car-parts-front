import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { suppliersService, type Supplier } from '../../services/suppliers'
import { productsService } from '../../services/products'
import { useAuthStore } from '../../store/auth'
import { User, Home, Package, Plus, Box, BarChart3, DollarSign } from 'lucide-react'

export default function Component() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [supplier, setSupplier] = useState<Supplier | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    totalValue: 0,
  })

  useEffect(() => {
    async function loadSupplier() {
      try {
        setLoading(true)
        const mySupplier = await suppliersService.getMySupplier()
        setSupplier(mySupplier)

        const productsResponse = await productsService.getBySupplier(mySupplier.id, 0, 1000)
        const products = productsResponse.content
        const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
        const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)

        setStats({
          totalProducts: products.length,
          totalStock,
          totalValue,
        })
      } catch (error) {
        navigate('/fornecedor/cadastrar')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadSupplier()
    }
  }, [user, navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#ff6b00' }}></div>
      </div>
    )
  }

  if (!supplier) {
    return null
  }

  return (
    <div className="fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard do Fornecedor</h1>
            <p className="text-zinc-600">Bem-vindo, {supplier.name}</p>
          </div>
          <Link to="/fornecedor/produtos/novo" className="btn-primary">
            + Adicionar Produto
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 mb-1">Total de Produtos</p>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Box className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 mb-1">Estoque Total</p>
              <p className="text-3xl font-bold">{stats.totalStock}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-600 mb-1">Valor Total em Estoque</p>
              <p className="text-3xl font-bold">R$ {stats.totalValue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/fornecedor/produtos" className="card p-6 hover:shadow-lg transition-all text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
            <Package className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold mb-1">Meus Produtos</h3>
          <p className="text-sm text-zinc-600">Ver e gerenciar produtos</p>
        </Link>

        <Link to="/fornecedor/produtos/novo" className="card p-6 hover:shadow-lg transition-all text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
            <Plus className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold mb-1">Adicionar Produto</h3>
          <p className="text-sm text-zinc-600">Cadastrar novo produto</p>
        </Link>

        <Link to="/fornecedor/perfil" className="card p-6 hover:shadow-lg transition-all text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
            <User className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold mb-1">Meu Perfil</h3>
          <p className="text-sm text-zinc-600">Editar informações</p>
        </Link>

        <Link to="/" className="card p-6 hover:shadow-lg transition-all text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
            <Home className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold mb-1">Voltar à Loja</h3>
          <p className="text-sm text-zinc-600">Ver como cliente</p>
        </Link>
      </div>

      {/* Supplier Info */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Informações do Fornecedor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-zinc-600 mb-1">Nome</p>
            <p className="font-medium">{supplier.name}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-600 mb-1">Email</p>
            <p className="font-medium">{supplier.email}</p>
          </div>
          {supplier.phone && (
            <div>
              <p className="text-sm text-zinc-600 mb-1">Telefone</p>
              <p className="font-medium">{supplier.phone}</p>
            </div>
          )}
          {supplier.address && (
            <div>
              <p className="text-sm text-zinc-600 mb-1">Endereço</p>
              <p className="font-medium">{supplier.address}</p>
            </div>
          )}
          {supplier.city && (
            <div>
              <p className="text-sm text-zinc-600 mb-1">Cidade/Estado</p>
              <p className="font-medium">{supplier.city}, {supplier.state}</p>
            </div>
          )}
          {supplier.contactPerson && (
            <div>
              <p className="text-sm text-zinc-600 mb-1">Pessoa de Contato</p>
              <p className="font-medium">{supplier.contactPerson}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

