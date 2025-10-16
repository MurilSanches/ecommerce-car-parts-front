export default function Component() {
  return (
    <form className="max-w-xl space-y-3">
      <h2 className="text-lg font-semibold mb-4">Checkout</h2>
      <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Nome completo" />
      <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Email" />
      <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Endereço" />
      <button className="rounded-md bg-zinc-900 px-4 py-2 text-white">Finalizar pedido</button>
    </form>
  )
}


