export default function Component() {
  return (
    <div className="prose max-w-none">
      <h1>Fale Conosco</h1>
      <p>Estamos disponíveis para ajudar. Preencha o formulário abaixo ou envie um email.</p>
      <form className="max-w-md space-y-2">
        <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Nome" />
        <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Email" />
        <textarea className="w-full rounded border px-3 py-2 text-sm" placeholder="Mensagem" rows={4} />
        <button className="rounded-md bg-zinc-900 px-4 py-2 text-white">Enviar</button>
      </form>
    </div>
  )
}


