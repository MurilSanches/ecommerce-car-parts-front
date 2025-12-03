import { useAuthStore } from '../store/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { PhoneInput } from '../components/PhoneInput'
import { removePhoneMask } from '../utils/phoneMask'

export default function Component() {
  const status = useAuthStore((s) => s.status)
  const register = useAuthStore((s) => s.register)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    
    try {
      const data = new FormData(e.currentTarget)
      const firstName = String(data.get('firstName') || '')
      const lastName = String(data.get('lastName') || '')
      const email = String(data.get('email') || '')
      const password = String(data.get('password') || '')
      const confirmPassword = String(data.get('confirmPassword') || '')
      const phoneRaw = String(data.get('phone') || '')
      const phone = phoneRaw ? removePhoneMask(phoneRaw) : ''
      const address = String(data.get('address') || '')
      
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        setError('Por favor, preencha todos os campos obrigatórios')
        return
      }
      
      if (password !== confirmPassword) {
        setError('As senhas não coincidem')
        return
      }
      
      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres')
        return
      }
      
      await register(firstName, lastName, email, password, phone || undefined, address || undefined)
      navigate('/')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar conta. Tente novamente.'
      setError(errorMessage)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center fade-in">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Criar sua conta</h1>
            <p className="text-zinc-600">Junte-se à nossa comunidade de entusiastas automotivos</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700 mb-1">
                  Nome *
                </label>
                <input 
                  id="firstName"
                  name="firstName" 
                  required 
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none" 
                  placeholder="Seu nome" 
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 mb-1">
                  Sobrenome *
                </label>
                <input 
                  id="lastName"
                  name="lastName" 
                  required 
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none" 
                  placeholder="Seu sobrenome" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">
                Email *
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
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-1">
                Telefone
              </label>
              <PhoneInput
                id="phone"
                name="phone"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                placeholder="(11) 999999999"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-zinc-700 mb-1">
                Endereço
              </label>
              <input 
                id="address"
                name="address" 
                type="text" 
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none" 
                placeholder="Rua, número, complemento" 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1">
                Senha *
              </label>
              <input 
                id="password"
                name="password" 
                type="password" 
                required 
                minLength={6}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none" 
                placeholder="Mínimo 6 caracteres" 
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-700 mb-1">
                Confirmar senha *
              </label>
              <input 
                id="confirmPassword"
                name="confirmPassword" 
                type="password" 
                required 
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none" 
                placeholder="Digite a senha novamente" 
              />
            </div>

            <button 
              disabled={status === 'loading'} 
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600">
              Já tem conta?{' '}
              <Link 
                to="/login" 
                className="text-orange-500 font-medium"
              >
                Entrar
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-200">
            <p className="text-xs text-zinc-500 text-center">
              Ao criar uma conta, você concorda com nossos{' '}
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


