import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { suppliersService } from '../services/suppliers'
import { useAuthStore } from '../store/auth'

export default function Component() {
  const navigate = useNavigate()
  const checkSupplier = useAuthStore((s) => s.checkSupplier)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
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
        setLoading(false)
        return
      }

      await suppliersService.create(supplierData)
      // Atualizar o estado do store para refletir que o usuário agora tem fornecedor
      await checkSupplier()
      setSuccess(true)
      
      setTimeout(() => {
        navigate('/fornecedor')
      }, 2000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar fornecedor. Tente novamente.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Cadastrar Fornecedor</h1>
          <p className="text-zinc-600">Preencha os dados do fornecedor para cadastrá-lo no sistema</p>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            Fornecedor cadastrado com sucesso! Redirecionando...
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="Ex: Auto Parts Distribuidora"
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none resize-none"
                  placeholder="Breve descrição sobre o fornecedor"
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="contato@fornecedor.com"
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="(11) 99999-9999"
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="Nome do responsável"
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="Rua, número, complemento"
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="São Paulo"
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none uppercase"
                  placeholder="SP"
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
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="01234-567"
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
                  defaultValue="Brasil"
                  className="w-full rounded-md border border-zinc-300 px-4 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="Brasil"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || success}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Cadastrando...' : success ? 'Cadastrado!' : 'Cadastrar Fornecedor'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
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

