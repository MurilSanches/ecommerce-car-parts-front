import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { suppliersService, type Supplier } from '../../services/suppliers'
import { productsService, type Product } from '../../services/products'
import { useAuthStore } from '../../store/auth'
import { CATEGORIES } from '../../constants/categories'
import { CAR_BRANDS } from '../../constants/carBrands'
import { ImageUpload } from '../../components/ImageUpload'

export default function Component() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const user = useAuthStore((s) => s.user)
  const [supplier, setSupplier] = useState<Supplier | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [productImages, setProductImages] = useState<string[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const mySupplier = await suppliersService.getMySupplier()
        setSupplier(mySupplier)

        if (id) {
          const productData = await productsService.getById(id)
          setProduct(productData)
        }
      } catch (error) {
        navigate('/fornecedor/produtos')
      } finally {
        setLoading(false)
      }
    }

    if (user && id) {
      loadData()
    }
  }, [user, id, navigate])

  useEffect(() => {
    if (product?.recommendedBrands && product.recommendedBrands.length > 0) {
      setSelectedBrands(product.recommendedBrands)
    }
    if (product?.images) {
      setProductImages(product.images)
    }
  }, [product])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (!id) return

      const data = new FormData(e.currentTarget)
      const productData: any = {
        name: String(data.get('name') || ''),
        description: String(data.get('description') || ''),
        price: parseFloat(String(data.get('price') || '0')),
        stock: parseInt(String(data.get('stock') || '0')),
        category: String(data.get('category') || ''),
        brand: String(data.get('brand') || ''),
        model: String(data.get('model') || ''),
        year: String(data.get('year') || ''),
        images: productImages,
        specifications: String(data.get('specifications') || ''),
        active: data.get('active') === 'true',
      }
      
      if (selectedBrands.length > 0) {
        productData.recommendedBrands = selectedBrands
      }

      if (!productData.name || !productData.price || !productData.stock || !productData.category || !productData.brand) {
        setError('Preencha todos os campos obrigatórios')
        setSaving(false)
        return
      }

      await productsService.update(id, productData)
      navigate('/fornecedor/produtos')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar produto. Tente novamente.'
      setError(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#ff6b00' }}></div>
      </div>
    )
  }

  if (!product || !supplier) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-200px)] fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Editar Produto</h1>
          <p className="text-zinc-600">Atualize as informações do produto</p>
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
                  defaultValue={product.name}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
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
                  defaultValue={product.description}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none resize-none"
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
                  defaultValue={product.price}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
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
                  defaultValue={product.stock}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-zinc-700 mb-2">
                  Categoria *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none bg-white"
                  defaultValue={product.category}
                >
                  <option value="" disabled>Selecione uma categoria</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
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
                  defaultValue={product.brand}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
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
                  defaultValue={product.model || ''}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
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
                  defaultValue={product.year || ''}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <ImageUpload
                  images={productImages}
                  onImagesChange={setProductImages}
                  maxImages={5}
                  disabled={saving}
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
                  defaultValue={product.specifications || ''}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none resize-none"
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
                  defaultValue={product.active !== false ? 'true' : 'false'}
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Marcas Recomendadas
                </label>
                <div className="border border-zinc-300 rounded-md p-4 max-h-64 overflow-y-auto bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-zinc-500">
                      Selecione uma ou mais marcas de carros para as quais este produto é recomendado
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBrands(CAR_BRANDS.map(b => b.value))}
                        className="text-xs px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                      >
                        Selecionar todas
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedBrands([])}
                        className="text-xs px-3 py-1 bg-zinc-200 text-zinc-700 rounded hover:bg-zinc-300 transition-colors"
                      >
                        Limpar
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {CAR_BRANDS.map((carBrand) => (
                      <label
                        key={carBrand.value}
                        className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-500 transition-colors p-2 rounded hover:bg-orange-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(carBrand.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, carBrand.value])
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== carBrand.value))
                            }
                          }}
                          className="text-orange-500 focus:ring-orange-500 rounded"
                        />
                        <span>{carBrand.label}</span>
                      </label>
                    ))}
                  </div>
                  {selectedBrands.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-zinc-200">
                      <p className="text-xs text-zinc-600 mb-2">
                        <strong>{selectedBrands.length}</strong> marca{selectedBrands.length !== 1 ? 's' : ''} selecionada{selectedBrands.length !== 1 ? 's' : ''}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedBrands.map((brandValue) => {
                          const brand = CAR_BRANDS.find(b => b.value === brandValue)
                          return (
                            <span
                              key={brandValue}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium"
                            >
                              {brand?.label}
                              <button
                                type="button"
                                onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== brandValue))}
                                className="hover:text-orange-900"
                                aria-label={`Remover ${brand?.label}`}
                              >
                                ×
                              </button>
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Salvando...' : 'Salvar Alterações'}
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

