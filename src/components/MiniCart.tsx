import * as Dialog from '@radix-ui/react-dialog'
import { useCartStore, selectCartCount, selectCartTotal } from '../store/cart'
import { useAuthStore } from '../store/auth'
import { cartService } from '../services/cart'
import { ShoppingBag, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function MiniCartButton() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const count = useCartStore((s) => selectCartCount(s))
  const total = useCartStore((s) => selectCartTotal(s))
  const itemsObj = useCartStore((s) => s.items)
  const items = Object.values(itemsObj)
  const [isSyncing, setIsSyncing] = useState(false)

  const handleGoToCheckout = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (items.length === 0) {
      navigate('/checkout')
      return
    }

    setIsSyncing(true)

    try {
      try {
        await cartService.createCart(user.id)
      } catch (err: any) {
        if (err?.response?.status !== 400) {
          throw err
        }
      }

      for (const item of items) {
        await cartService.addItem(user.id, item.id, item.quantity)
      }

      navigate('/checkout')
    } catch (error) {
      navigate('/checkout')
    } finally {
      setIsSyncing(false)
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="relative p-2 hover:bg-zinc-100 rounded transition-colors lg:btn-primary lg:px-4 lg:py-2" aria-label="Carrinho">
          <ShoppingBag className="w-5 h-5 lg:hidden" />
          <span className="hidden lg:inline">Carrinho ({count})</span>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center lg:hidden">
              {count}
            </span>
          )}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed right-0 top-0 h-dvh w-full max-w-md bg-white shadow-xl flex flex-col z-50">
          <div className="flex items-center justify-between border-b px-4 py-3 bg-orange-50">
            <Dialog.Title className="text-lg font-semibold">Seu carrinho</Dialog.Title>
            <Dialog.Close className="text-zinc-500 hover:text-orange-500 transition-colors cursor-pointer">✕</Dialog.Close>
          </div>
          <div className="flex-1 overflow-auto px-4 py-2 space-y-3">
            {items.length === 0 ? (
              <p className="text-sm text-zinc-500">Seu carrinho está vazio</p>
            ) : (
              items.map((it) => (
                <div key={it.id} className="flex items-center gap-3 border rounded-md p-3">
                  {it.image ? (
                    <img src={it.image} alt={it.name} className="h-16 w-16 object-cover rounded" />
                  ) : (
                    <div className="h-16 w-16 rounded bg-zinc-100" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium">{it.name}</div>
                    <div className="text-xs text-zinc-500">Qtd: {it.quantity}</div>
                  </div>
                  <div className="text-sm font-semibold">R$ {(it.price * it.quantity).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>
          <div className="border-t px-4 py-4">
            <div className="flex items-center justify-between text-sm">
              <span>Total</span>
              <span className="font-semibold">R$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleGoToCheckout}
              disabled={isSyncing || items.length === 0}
              className="mt-3 w-full btn-primary text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sincronizando...
                </>
              ) : (
                'Ir para checkout'
              )}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}


