import { useCartStore } from '../store/cart'
import { useAuthStore } from '../store/auth'
import { Link, useNavigate } from 'react-router-dom'
import { LazyImage } from '../components/LazyImage'
import { useState } from 'react'
import { WishlistButton } from '../components/WishlistButton'
import { ShoppingCart, Trash2, Plus, Minus, Truck, Shield, CreditCard, Tag, ArrowRight, Package, Clock } from 'lucide-react'

export default function Component() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const itemsObj = useCartStore((s) => s.items)
  const items = Object.values(itemsObj)
  const remove = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 200 ? 0 : 15.90
  const automaticDiscount = subtotal > 300 ? subtotal * 0.05 : 0
  const totalDiscount = automaticDiscount + couponDiscount
  const finalTotal = subtotal + shipping - totalDiscount

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'AUTOPARTS10') {
      setCouponApplied(true)
      setCouponDiscount(subtotal * 0.10)
    } else {
      alert('Cupom inválido')
    }
  }

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  const getEstimatedDelivery = () => {
    const days = subtotal > 200 ? 3 : 5
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <div className="fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ShoppingCart className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold">Seu Carrinho</h1>
        </div>
        <p className="text-zinc-600 ml-11">
          {items.length} produto{items.length !== 1 ? 's' : ''} no carrinho
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="mb-6">
            <ShoppingCart className="w-24 h-24 text-zinc-300 mx-auto" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Seu carrinho está vazio</h3>
          <p className="text-zinc-600 mb-8">Adicione alguns produtos para continuar comprando</p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
          <div className="space-y-4">
            <div className="card p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 border-orange-200">
              <div className="flex items-center gap-2 text-sm text-orange-800">
                <Package className="w-4 h-4" />
                <span className="font-medium">Frete grátis para compras acima de R$ 200,00</span>
              </div>
            </div>

            {items.map((item, index) => (
              <div key={item.id} className="card p-5 slide-up hover:shadow-lg transition-shadow" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="flex gap-4">
                  <Link to={`/produto/${item.id}`} className="flex-shrink-0 group">
                    <div className="relative">
                      <LazyImage 
                        src={item.image || ''} 
                        alt={item.name} 
                        className="w-28 h-28 rounded-lg object-cover border-2 border-zinc-200 group-hover:border-orange-500 transition-colors" 
                        placeholder="Carregando..."
                      />
                      {item.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <Link to={`/produto/${item.id}`} className="text-lg font-semibold hover:text-orange-500 transition-colors line-clamp-2">
                      {item.name}
                    </Link>
                    <div className="text-sm text-zinc-500 mt-1">R$ {item.price.toFixed(2).replace('.', ',')} cada</div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border-2 border-zinc-200 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 min-w-[3rem] text-center font-medium bg-zinc-50">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-zinc-100 transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <WishlistButton 
                        productId={item.id}
                        className="flex items-center gap-1 text-sm text-zinc-400 hover:text-red-500 transition-colors"
                        size="sm"
                        showLabel
                      />
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-col justify-between">
                    <div>
                      <div className="text-xl font-bold text-orange-600">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-zinc-500 mt-1">
                          {item.quantity} × R$ {item.price.toFixed(2).replace('.', ',')}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => remove(item.id)}
                      className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition-colors mt-2 justify-end"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remover</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-4 h-fit">
            <div className="card p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  Resumo do Pedido
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                    <span className="font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm items-center">
                    <div className="flex items-center gap-1 text-zinc-600">
                      <Truck className="w-4 h-4" />
                      <span>Frete</span>
                    </div>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>
                  
                  {automaticDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        Desconto automático (5%)
                      </span>
                      <span className="font-medium">-R$ {automaticDiscount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  
                  {couponApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        Cupom aplicado
                      </span>
                      <span className="font-medium">-R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-orange-600">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      ou em até 10x sem juros
                    </div>
                  </div>
                </div>

                {!couponApplied && (
                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-zinc-700 mb-2 block">Cupom de desconto</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Digite o cupom"
                        className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                        style={{ '--tw-ring-color': '#ff6b00' } as any}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="btn-outline px-4 text-sm whitespace-nowrap"
                      >
                        Aplicar
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">Exemplo: AUTOPARTS10</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-blue-900 mb-1">Estimativa de entrega</div>
                    <div className="text-sm text-blue-700">
                      Seu pedido chegará até <strong>{getEstimatedDelivery()}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleCheckout}
                  className="w-full btn-primary py-3.5 text-base font-semibold flex items-center justify-center gap-2"
                >
                  Finalizar Compra
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <Link to="/" className="block w-full btn-outline text-center py-3">
                  Continuar comprando
                </Link>
              </div>

              <div className="pt-4 border-t space-y-2 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Compra 100% segura e protegida</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Entrega em todo o Brasil</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span>Parcelamento em até 10x sem juros</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


