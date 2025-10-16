import { useCartStore, selectCartTotal } from '../store/cart'

export default function Component() {
  const itemsObj = useCartStore((s) => s.items)
  const items = Object.values(itemsObj)
  const total = useCartStore((s) => selectCartTotal(s))
  const remove = useCartStore((s) => s.removeItem)

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Carrinho</h2>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between border rounded-md p-3">
            <div>
              <div className="text-sm font-medium">{it.name}</div>
              <div className="text-xs text-zinc-500">Qtd: {it.qty}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold">R$ {(it.price * it.qty).toFixed(2)}</div>
              <button className="text-xs text-red-600" onClick={() => remove(it.id)}>Remover</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-sm text-zinc-500">Seu carrinho está vazio.</div>}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">Total</div>
        <div className="text-lg font-bold">R$ {total.toFixed(2)}</div>
      </div>
      <a href="/checkout" className="mt-4 inline-block rounded-md bg-zinc-900 px-4 py-2 text-white">Ir para checkout</a>
    </div>
  )
}


