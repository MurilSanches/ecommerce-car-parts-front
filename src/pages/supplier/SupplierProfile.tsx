import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { suppliersService, Supplier } from '../../services/suppliers'
import { useAuthStore } from '../../store/auth'

export default function Component() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [supplier, setSupplier] = useState<Supplier | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function loadSupplier() {
      try {
        setLoading(true)
        const mySupplier = await suppliersService.getMySupplier()
        setSupplier(mySupplier)
      } catch (error) {
        console.error('Erro ao carregar fornecedor:', error)
        navigate('/fornecedor/cadastrar')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadSupplier()
    }
  }, [user, navigate])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSaving(true)

    try {
      if (!supplier) return

      const data = new FormData(e.currentTarget)
      const supplierData = {
        name: String(data.get('name') || ''),
        description: String(data.get('description') || ''),
        email: String(data.get('email') || ''),
        phone: String(data.get('phone') || ''),
        address: String(data.get('address') || ''),
        city: String(data.get('city') || ''),
        state: String(data.get('state') || ''),
        zipCode: String(data.get('zipCode') || ''),
        country: String(data.get('country') || 'Brasil'),
        contactPerson: String(data.get('contactPerson') || ''),
      }

      if (!supplierData.name || !supplierData.email) {
        setError('Nome e email são obrigatórios')
        setSaving(false)
        return
      }

      const updated = await suppliersService.update(supplier.id, supplierData)
      setSupplier(updated)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar fornecedor. Tente novamente.'
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

  if (!supplier) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-200px)] fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Perfil do Fornecedor</h1>
          <p className="text-zinc-600">Atualize as informações do seu fornecedor</p>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            Perfil atualizado com sucesso!
          </div>
        )}

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
                  Nome do Fornecedor *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  defaultValue={supplier.name}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-zinc-700 mb-2">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={supplier.description || ''}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={supplier.email}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-2">
                  Telefone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={supplier.phone || ''}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-zinc-700 mb-2">
                  Pessoa de Contato
                </label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  defaultValue={supplier.contactPerson || ''}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-zinc-700 mb-2">
                  Endereço
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  defaultValue={supplier.address || ''}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-zinc-700 mb-2">
                  Cidade
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  defaultValue={supplier.city || ''}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-zinc-700 mb-2">
                  Estado
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  maxLength={2}
                  defaultValue={supplier.state || ''}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none uppercase"
                />
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-zinc-700 mb-2">
                  CEP
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  defaultValue={supplier.zipCode || ''}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-zinc-700 mb-2">
                  País
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  defaultValue={supplier.country || 'Brasil'}
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                />
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
                onClick={() => navigate('/fornecedor')}
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

