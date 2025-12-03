import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartStore } from '../store/cart'
import { useAuthStore } from '../store/auth'
import { cartService } from '../services/cart'
import { LazyImage } from '../components/LazyImage'
import { ArrowLeft, MapPin, CheckCircle, User, Mail, Phone, Truck, Shield } from 'lucide-react'
import { CepInput } from '../components/CepInput'
import { PhoneInput } from '../components/PhoneInput'
import { BRAZILIAN_STATES } from '../constants/states'

export default function Component() {
  const navigate = useNavigate()
  const itemsObj = useCartStore((s) => s.items)
  const items = Object.values(itemsObj)
  const clearCart = useCartStore((s) => s.clearCart)
  const user = useAuthStore((s) => s.user)
  
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  })

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 200 ? 0 : 15.90
  const discount = subtotal > 300 ? subtotal * 0.05 : 0
  const finalTotal = subtotal + shipping - discount

  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      navigate('/carrinho')
    }
  }, [items.length, navigate, isProcessing])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCepChange = (cep: string) => {
    setFormData(prev => ({ ...prev, cep }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        alert('Por favor, preencha todos os campos obrigatórios')
        return
      }
      setStep(step + 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.cep || !formData.address || !formData.number || !formData.city || !formData.state) {
      alert('Por favor, preencha todos os campos do endereço')
      return
    }

    if (!user?.id) {
      alert('Você precisa estar logado para finalizar a compra')
      navigate('/login')
      return
    }
    
    setIsProcessing(true)
    setError(null)
    
    try {
      await cartService.checkout(user.id)
      navigate('/checkout/sucesso')
      clearCart()
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Erro ao finalizar compra. Por favor, tente novamente.')
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="fade-in">
      <div className="mb-6">
        <Link to="/carrinho" className="inline-flex items-center gap-2 text-zinc-600 hover:text-orange-500 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao carrinho
        </Link>
        <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>
        <p className="text-zinc-600">Complete seus dados para finalizar o pedido</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step >= s 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-zinc-200 text-zinc-500'
                }`}>
                  {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                </div>
                <div className={`text-xs mt-2 text-center ${step >= s ? 'text-orange-500 font-medium' : 'text-zinc-500'}`}>
                  {s === 1 ? 'Dados Pessoais' : 'Endereço'}
                </div>
              </div>
              {s < 2 && (
                <div className={`h-1 flex-1 mx-2 ${step > s ? 'bg-orange-500' : 'bg-zinc-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6">
            {step === 1 && (
              <div className="card p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-orange-500" />
                  <h2 className="text-xl font-semibold">Dados Pessoais</h2>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                    style={{ '--tw-ring-color': '#ff6b00' } as any}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-zinc-300 pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                        style={{ '--tw-ring-color': '#ff6b00' } as any}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400 z-10" />
                      <PhoneInput
                        value={formData.phone}
                        onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                        required
                        className="w-full rounded-md border border-zinc-300 pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                        style={{ '--tw-ring-color': '#ff6b00' } as any}
                        placeholder="(00) 999999999"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full btn-primary py-3"
                >
                  Continuar para Endereço
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <h2 className="text-xl font-semibold">Endereço de Entrega</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    CEP <span className="text-red-500">*</span>
                  </label>
                  <CepInput
                    value={formData.cep}
                    onChange={handleCepChange}
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                    style={{ '--tw-ring-color': '#ff6b00' } as any}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Endereço <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                      style={{ '--tw-ring-color': '#ff6b00' } as any}
                      placeholder="Rua, Avenida, etc"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Número <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                      style={{ '--tw-ring-color': '#ff6b00' } as any}
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Complemento
                  </label>
                  <input
                    type="text"
                    name="complement"
                    value={formData.complement}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                    style={{ '--tw-ring-color': '#ff6b00' } as any}
                    placeholder="Apto, Bloco, etc (opcional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Bairro <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                    style={{ '--tw-ring-color': '#ff6b00' } as any}
                    placeholder="Nome do bairro"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Cidade <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                      style={{ '--tw-ring-color': '#ff6b00' } as any}
                      placeholder="Nome da cidade"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Estado <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                      style={{ '--tw-ring-color': '#ff6b00' } as any}
                    >
                      <option value="">Selecione o estado</option>
                      {BRAZILIAN_STATES.map(state => (
                        <option key={state.value} value={state.value}>{state.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 btn-outline py-3"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Finalizar Pedido
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
        </div>

        <div className="lg:sticky lg:top-4 h-fit">
          <div className="card p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0">
                  <LazyImage
                    src={item.image || ''}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                    placeholder=""
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-2">{item.name}</div>
                    <div className="text-xs text-zinc-500 mt-1">
                      Qtd: {item.quantity} × R$ {item.price.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-orange-600">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Frete</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto</span>
                  <span>-R$ {discount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-orange-600">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Compra 100% segura</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Entrega em todo o Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
