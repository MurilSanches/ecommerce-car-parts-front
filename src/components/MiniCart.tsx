import * as Dialog from '@radix-ui/react-dialog'
import { useCartStore, selectCartCount, selectCartTotal } from '../store/cart'

export function MiniCartButton() {
  const count = useCartStore((s) => selectCartCount(s))
  const total = useCartStore((s) => selectCartTotal(s))
  const itemsObj = useCartStore((s) => s.items)
  const items = Object.values(itemsObj)
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn-primary">Carrinho ({count})</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed right-0 top-0 h-dvh w-full max-w-md bg-white shadow-xl flex flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3 bg-brand-50">
            <Dialog.Title className="text-lg font-semibold">Seu carrinho</Dialog.Title>
            <Dialog.Close className="text-zinc-500 hover:text-brand transition-colors">Fechar</Dialog.Close>
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
                    <div className="text-xs text-zinc-500">Qtd: {it.qty}</div>
                  </div>
                  <div className="text-sm font-semibold">R$ {(it.price * it.qty).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>
          <div className="border-t px-4 py-4">
            <div className="flex items-center justify-between text-sm">
              <span>Total</span>
              <span className="font-semibold">R$ {total.toFixed(2)}</span>
            </div>
            <a href="/checkout" className="mt-3 block w-full btn-primary text-center">Ir para checkout</a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}


