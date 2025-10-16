import { useAuthStore } from '../store/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Component() {
  const user = useAuthStore((s) => s.user)
  const status = useAuthStore((s) => s.status)
  const login = useAuthStore((s) => s.login)
  const hydrate = useAuthStore((s) => s.hydrate)
  const navigate = useNavigate()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = String(data.get('email') || '')
    const password = String(data.get('password') || '')
    await login(email, password)
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-3">
      <h1 className="text-xl font-semibold">Entrar</h1>
      <input name="email" type="email" required className="w-full rounded border px-3 py-2 text-sm" placeholder="Email" />
      <input name="password" type="password" required className="w-full rounded border px-3 py-2 text-sm" placeholder="Senha" />
      <button disabled={status==='loading'} className="w-full rounded-md bg-zinc-900 px-4 py-2 text-white">
        {status==='loading' ? 'Entrando...' : 'Entrar'}
      </button>
      <div className="text-sm text-zinc-600">Não tem conta? <Link className="underline" to="/registrar">Cadastre-se</Link></div>
    </form>
  )
}


