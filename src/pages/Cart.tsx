import { useCartStore, selectCartTotal } from '../store/cart'
import { useWishlist } from '../store/wishlist'
import { Link } from 'react-router-dom'
import { LazyImage } from '../components/LazyImage'
import { useState, useEffect } from 'react'

export default function Component() {
  const itemsObj = useCartStore((s) => s.items)
  const items = Object.values(itemsObj)
  const total = useCartStore((s) => selectCartTotal(s))
  const remove = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)
  const toggleWish = useWishlist((s) => s.toggle)
  const hasWish = useWishlist((s) => s.has)
  const hydrateWishlist = useWishlist((s) => s.hydrate)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  useEffect(() => {
    hydrateWishlist()
  }, [hydrateWishlist])

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000))
    clearCart()
    setIsCheckingOut(false)
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 200 ? 0 : 15.90
  const discount = subtotal > 300 ? subtotal * 0.05 : 0
  const finalTotal = subtotal + shipping - discount

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seu Carrinho</h1>
        <p className="text-zinc-600">
          {items.length} produto{items.length !== 1 ? 's' : ''} no carrinho
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h3>
          <p className="text-zinc-600 mb-6">Adicione alguns produtos para continuar</p>
          <Link to="/" className="btn-primary">
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-4 slide-up">
                <div className="flex gap-4">
                  <Link to={`/produto/${item.id}`} className="flex-shrink-0">
                    <LazyImage 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 rounded object-cover" 
                      placeholder="Carregando..."
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <Link to={`/produto/${item.id}`} className="text-lg font-medium hover:text-orange-500 transition-colors">
                      {item.name}
                    </Link>
                    <div className="text-sm text-zinc-500 mt-1">R$ {item.price.toFixed(2)} cada</div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-zinc-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="px-3 py-1 min-w-[3rem] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-zinc-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => toggleWish(item.id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          hasWish(item.id) 
                            ? 'text-red-500 hover:text-red-600' 
                            : 'text-zinc-400 hover:text-red-500'
                        }`}
                      >
                        {hasWish(item.id) ? '♥' : '♡'}
                        <span>{hasWish(item.id) ? 'Favorito' : 'Adicionar aos favoritos'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">R$ {(item.price * item.quantity).toFixed(2)}</div>
                    <button 
                      onClick={() => remove(item.id)}
                      className="text-sm text-red-500 hover:text-red-600 transition-colors mt-1"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-4">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({items.length} itens)</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Desconto (5% off)</span>
                    <span>-R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>R$ {finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Processando...' : 'Finalizar Compra'}
                </button>
                
                <Link to="/" className="block w-full btn-outline text-center py-3">
                  Continuar comprando
                </Link>
              </div>

              <div className="mt-6 pt-4 border-t text-xs text-zinc-500">
                <p>✓ Compra 100% segura</p>
                <p>✓ Entrega em todo o Brasil</p>
                <p>✓ Suporte 24/7</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


