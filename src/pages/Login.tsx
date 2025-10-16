import { useAuthStore } from '../store/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Component() {
  const user = useAuthStore((s) => s.user)
  const status = useAuthStore((s) => s.status)
  const login = useAuthStore((s) => s.login)
  const hydrate = useAuthStore((s) => s.hydrate)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    hydrate()
  }, [hydrate])

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    
    try {
      const data = new FormData(e.currentTarget)
      const email = String(data.get('email') || '')
      const password = String(data.get('password') || '')
      
      if (!email || !password) {
        setError('Por favor, preencha todos os campos')
        return
      }
      
      await login(email, password)
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center fade-in">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Entrar na sua conta</h1>
            <p className="text-zinc-600">Acesse sua conta para continuar comprando</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">
                Email
              </label>
              <input 
                id="email"
                name="email" 
                type="email" 
                required 
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none" 
                placeholder="seu@email.com" 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1">
                Senha
              </label>
              <input 
                id="password"
                name="password" 
                type="password" 
                required 
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none" 
                placeholder="Sua senha" 
              />
            </div>

            <button 
              disabled={status === 'loading'} 
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600">
              Não tem conta?{' '}
              <Link 
                to="/register" 
                className="text-orange-500 font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-200">
            <p className="text-xs text-zinc-500 text-center">
              Ao continuar, você concorda com nossos{' '}
              <Link to="/termos-de-uso" className="text-orange-500 hover:underline">
                Termos de Uso
              </Link>
              {' '}e{' '}
              <Link to="/politica-privacidade" className="text-orange-500 hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


