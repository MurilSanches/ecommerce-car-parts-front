import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { suppliersService, type Supplier } from '../../services/suppliers'
import { dashboardService, type DashboardData } from '../../services/dashboard'
import { useAuthStore } from '../../store/auth'
import { User, Home, Package, Plus, Box, BarChart3, DollarSign, TrendingUp, ShoppingCart, CheckCircle } from 'lucide-react'

export default function Component() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [supplier, setSupplier] = useState<Supplier | null>(null)
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const mySupplier = await suppliersService.getMySupplier()
        setSupplier(mySupplier)

        const dashboard = await dashboardService.getDashboard()
        setDashboardData(dashboard)
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

      {/* Estatísticas de Estoque */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Estatísticas de Estoque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600 mb-1">Total de Produtos</p>
                <p className="text-3xl font-bold">{dashboardData?.stockStatistics.totalProducts || 0}</p>
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
                <p className="text-3xl font-bold">{dashboardData?.stockStatistics.totalStock || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600 mb-1">Produtos Ativos</p>
                <p className="text-3xl font-bold">{dashboardData?.stockStatistics.activeProducts || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600 mb-1">Produtos Inativos</p>
                <p className="text-3xl font-bold">{dashboardData?.stockStatistics.inactiveProducts || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Box className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-600 mb-1">Valor Total em Estoque</p>
                <p className="text-2xl font-bold">R$ {dashboardData?.stockStatistics.totalStockValue.toFixed(2) || '0.00'}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {dashboardData?.stockStatistics.stockByCategory && Object.keys(dashboardData.stockStatistics.stockByCategory).length > 0 && (
          <div className="card p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Estoque por Categoria</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(dashboardData.stockStatistics.stockByCategory).map(([category, stock]) => (
                <div key={category} className="border-l-4 border-orange-500 pl-3">
                  <p className="text-sm text-zinc-600">{category}</p>
                  <p className="text-xl font-bold">{stock}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Estatísticas de Vendas */}
      {dashboardData?.salesStatistics && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Estatísticas de Vendas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Total de Pedidos</p>
                  <p className="text-3xl font-bold">{dashboardData.salesStatistics.totalOrders}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Itens Vendidos</p>
                  <p className="text-3xl font-bold">{dashboardData.salesStatistics.totalItemsSold}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Receita Total</p>
                  <p className="text-2xl font-bold">R$ {dashboardData.salesStatistics.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 mb-1">Ticket Médio</p>
                  <p className="text-2xl font-bold">R$ {dashboardData.salesStatistics.averageOrderValue.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {dashboardData.salesStatistics.ordersByStatus && Object.keys(dashboardData.salesStatistics.ordersByStatus).length > 0 && (
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Pedidos por Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(dashboardData.salesStatistics.ordersByStatus).map(([status, count]) => (
                  <div key={status} className="border-l-4 border-blue-500 pl-3">
                    <p className="text-sm text-zinc-600">{status}</p>
                    <p className="text-xl font-bold">{count}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {dashboardData.salesStatistics.revenueByMonth && Object.keys(dashboardData.salesStatistics.revenueByMonth).length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Receita por Mês</h3>
              <div className="space-y-3">
                {Object.entries(dashboardData.salesStatistics.revenueByMonth)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([month, revenue]) => (
                    <div key={month} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                      <span className="font-medium">{month}</span>
                      <span className="text-lg font-bold text-orange-600">R$ {revenue.toFixed(2)}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

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

