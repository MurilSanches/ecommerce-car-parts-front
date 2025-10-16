import { useAuthStore } from '../store/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Component() {
  const status = useAuthStore((s) => s.status)
  const register = useAuthStore((s) => s.register)
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const password = String(data.get('password') || '')
    await register(name, email, password)
    navigate('/')
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-3">
      <h1 className="text-xl font-semibold">Cadastro</h1>
      <input name="name" required className="w-full rounded border px-3 py-2 text-sm" placeholder="Nome completo" />
      <input name="email" type="email" required className="w-full rounded border px-3 py-2 text-sm" placeholder="Email" />
      <input name="password" type="password" required className="w-full rounded border px-3 py-2 text-sm" placeholder="Senha" />
      <button disabled={status==='loading'} className="w-full rounded-md bg-zinc-900 px-4 py-2 text-white">
        {status==='loading' ? 'Criando...' : 'Criar conta'}
      </button>
      <div className="text-sm text-zinc-600">Já tem conta? <Link className="underline" to="/login">Entrar</Link></div>
    </form>
  )
}


