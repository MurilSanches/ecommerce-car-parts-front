import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { suppliersService, type Supplier } from '../../services/suppliers'
import { productsService } from '../../services/products'
import { useAuthStore } from '../../store/auth'

export default function Component() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [supplier, setSupplier] = useState<Supplier | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadSupplier() {
      try {
        const mySupplier = await suppliersService.getMySupplier()
        setSupplier(mySupplier)
      } catch (error) {
        console.error('Erro ao carregar fornecedor:', error)
        navigate('/fornecedor/cadastrar')
      }
    }

    if (user) {
      loadSupplier()
    }
  }, [user, navigate])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = new FormData(e.currentTarget)
      const productData = {
        name: String(data.get('name') || ''),
        description: String(data.get('description') || ''),
        price: parseFloat(String(data.get('price') || '0')),
        stock: parseInt(String(data.get('stock') || '0')),
        category: String(data.get('category') || ''),
        brand: String(data.get('brand') || ''),
        model: String(data.get('model') || ''),
        year: String(data.get('year') || ''),
        images: String(data.get('images') || '').split(',').filter(Boolean).map(url => url.trim()),
        specifications: String(data.get('specifications') || ''),
        active: data.get('active') === 'true',
      }

      if (!productData.name || !productData.price || !productData.stock || !productData.category || !productData.brand) {
        setError('Preencha todos os campos obrigatórios')
        setLoading(false)
        return
      }

      await productsService.create(productData)
      navigate('/fornecedor/produtos')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar produto. Tente novamente.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!supplier) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#ff6b00' }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-200px)] fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Adicionar Novo Produto</h1>
          <p className="text-zinc-600">Cadastre um novo produto para seu fornecedor</p>
        </div>

        <div className="card p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                  Nome do Produto *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="Ex: Filtro de Óleo"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-zinc-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none resize-none"
                  placeholder="Descreva o produto..."
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-zinc-700 mb-2">
                  Preço (R$) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-zinc-700 mb-2">
                  Estoque *
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  required
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="0"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-zinc-700 mb-2">
                  Categoria *
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  required
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="Ex: Filtros, Pneus, Óleos"
                />
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-zinc-700 mb-2">
                  Marca *
                </label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  required
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="Ex: Mann, Pirelli"
                />
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-medium text-zinc-700 mb-2">
                  Modelo
                </label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="Ex: W712/75"
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-zinc-700 mb-2">
                  Ano
                </label>
                <input
                  id="year"
                  name="year"
                  type="text"
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="Ex: 2020-2023"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="images" className="block text-sm font-medium text-zinc-700 mb-2">
                  URLs das Imagens (separadas por vírgula)
                </label>
                <input
                  id="images"
                  name="images"
                  type="text"
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="https://exemplo.com/imagem1.jpg, https://exemplo.com/imagem2.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="specifications" className="block text-sm font-medium text-zinc-700 mb-2">
                  Especificações
                </label>
                <textarea
                  id="specifications"
                  name="specifications"
                  rows={3}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none resize-none"
                  placeholder="Especificações técnicas do produto..."
                />
              </div>

              <div>
                <label htmlFor="active" className="block text-sm font-medium text-zinc-700 mb-2">
                  Status
                </label>
                <select
                  id="active"
                  name="active"
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  defaultValue="true"
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Salvando...' : 'Salvar Produto'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/fornecedor/produtos')}
                className="btn-outline"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

