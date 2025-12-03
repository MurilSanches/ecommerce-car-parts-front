import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { carsService } from '../services/cars'
import { getCarBrandEnum } from '../utils/carBrand'
import { Car, Search, Loader2 } from 'lucide-react'

export function PlateSearch() {
  const navigate = useNavigate()
  const [plate, setPlate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function formatPlate(value: string): string {
    // Remove tudo que não é letra ou número
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
    
    // Limita a 7 caracteres
    const limited = cleaned.slice(0, 7)
    
    if (limited.length === 0) return ''
    
    // Primeiros 3 caracteres são sempre letras
    const letters = limited.slice(0, 3).replace(/[^A-Z]/g, '')
    const rest = limited.slice(3)
    
    if (limited.length <= 3) {
      return letters
    }
    
    // Detecta formato: se o 4º caractere é número e o 5º é letra, é formato novo
    // Caso contrário, é formato antigo
    const isNewFormat = rest.length >= 2 && /[0-9]/.test(rest[0]) && /[A-Z]/.test(rest[1])
    
    if (isNewFormat) {
      // Formato novo: ABC1D23
      return `${letters}${rest.slice(0, 1)}${rest.slice(1, 2)}${rest.slice(2)}`
    } else {
      // Formato antigo: ABC1234
      return `${letters}${rest}`
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    
    // Remove espaços e hífens para validação
    const cleanPlate = plate.replace(/[\s-]/g, '')
    
    if (!cleanPlate || cleanPlate.length !== 7) {
      setError('Digite uma placa válida (7 caracteres: ABC1234 ou ABC1D23)')
      return
    }
    
    // Valida formato: 3 letras + 4 caracteres (números ou letra+números)
    if (!/^[A-Z]{3}[A-Z0-9]{4}$/.test(cleanPlate)) {
      setError('Formato de placa inválido. Use ABC1234 (antiga) ou ABC1D23 (nova)')
      return
    }

    setLoading(true)
    
    try {
      // Busca informações do carro
      const carInfo = await carsService.getByPlate(plate)
      
      // Converte a marca para o formato do enum
      const brandEnum = getCarBrandEnum(carInfo.brand)
      
      if (!brandEnum) {
        setError(`Marca "${carInfo.brand}" não encontrada no sistema`)
        setLoading(false)
        return
      }
      
      // Navega para a página de recomendações com a marca
      navigate(`/recomendacoes?marca=${encodeURIComponent(brandEnum)}&placa=${encodeURIComponent(plate)}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar informações do veículo'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-4 md:p-5 mb-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <Car className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg md:text-xl font-bold text-zinc-800">
            Encontre peças para seu veículo
          </h2>
        </div>
        <p className="text-zinc-600 mb-4 text-sm">
          Digite a placa do seu carro e encontre peças recomendadas para sua marca
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(formatPlate(e.target.value))}
                placeholder="ABC1234 ou ABC1D23"
                maxLength={8}
                className="w-full px-4 py-2.5 pl-11 rounded-lg border border-zinc-300 text-base font-semibold uppercase bg-white text-zinc-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
                disabled={loading}
              />
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded border border-red-200">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !plate || plate.replace(/[\s-]/g, '').length !== 7}
            className="btn-primary font-semibold px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Buscando...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

