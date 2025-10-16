import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { MiniCartButton } from './components/MiniCart'
import { DepartmentsMenu } from './components/DepartmentsMenu'
import { Footer } from './components/Footer'
import { useAuthStore } from './store/auth'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const q = String(data.get('q') || '').trim()
    if (q) {
      const next = `/buscar?q=${encodeURIComponent(q)}`
      if (location.pathname + location.search !== next) {
        navigate(next)
      }
    }
  }

  const currentQ = new URLSearchParams(location.search).get('q') ?? ''
  return (
    <div className="min-h-dvh bg-white text-zinc-900">
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-2 sm:gap-4">
          <Link to="/" className="text-xl font-bold" style={{ color: '#ff6b00' }}>AutoParts</Link>
          <DepartmentsMenu />
          <form onSubmit={onSearchSubmit} className="w-full max-w-md hidden sm:block">
            <input
              name="q"
              defaultValue={currentQ}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
              style={{ '--tw-ring-color': '#ff6b00' } as any}
              placeholder="Buscar por pneus, rodas, filtros, freios..."
            />
          </form>
          <nav className="ml-auto flex items-center gap-2 sm:gap-4 text-sm">
            <Link className="hover:text-orange-500 transition-colors hidden sm:block" to="/">Ofertas</Link>
            <Link className="hover:text-orange-500 transition-colors hidden sm:block" to="/categorias">Categorias</Link>
            <Link className="hover:text-orange-500 transition-colors hidden sm:block" to="/buscar">Buscar</Link>
            <Link className="hover:text-orange-500 transition-colors hidden sm:block" to="/favoritos">Favoritos</Link>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-zinc-700">Olá, {user.name}</span>
                <button onClick={logout} className="text-zinc-600 underline hover:text-orange-500 transition-colors">Sair</button>
              </div>
            ) : (
              <Link className="hover:text-orange-500 transition-colors" to="/login">Entrar</Link>
            )}
            <MiniCartButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
