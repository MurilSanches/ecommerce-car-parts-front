import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { MiniCartButton } from './components/MiniCart'
import { DepartmentsMenu } from './components/DepartmentsMenu'
import { Footer } from './components/Footer'
import { useAuthStore } from './store/auth'
import { useWishlist } from './store/wishlist'
import { useState, useEffect } from 'react'
import { Menu, X, Search, Heart, LayoutDashboard, Package, UserPlus, LogOut, User } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const hasSupplier = useAuthStore((s) => s.hasSupplier)
  const logout = useAuthStore((s) => s.logout)
  const hydrateWishlist = useWishlist((s) => s.hydrate)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    hydrateWishlist()
  }, [hydrateWishlist])

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
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b-2 shadow-md" style={{ borderColor: '#ff6b00' }}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Top Bar - Desktop */}
          <div className="hidden lg:flex items-center gap-4 py-4">
            <Link to="/" className="text-2xl font-bold flex-shrink-0 hover:scale-105 transition-transform" style={{ color: '#ff6b00' }}>
              AutoParts
            </Link>
            <DepartmentsMenu />
            <form onSubmit={onSearchSubmit} className="flex-1 max-w-md">
              <input
                name="q"
                defaultValue={currentQ}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:border-orange-500"
                style={{ '--tw-ring-color': '#ff6b00' } as any}
                placeholder="Buscar por pneus, rodas, filtros, freios..."
              />
            </form>
            <nav className="ml-auto flex items-center gap-4 text-sm">
              <Link className="hover:text-orange-500 transition-colors flex items-center gap-1" to="/">
                Ofertas
              </Link>
              <Link className="hover:text-orange-500 transition-colors flex items-center gap-1" to="/categorias">
                Categorias
              </Link>
              <Link className="hover:text-orange-500 transition-colors flex items-center gap-1" to="/buscar">
                Buscar
              </Link>
              <Link className="hover:text-orange-500 transition-colors flex items-center gap-1" to="/favoritos">
                Favoritos
              </Link>
              {user ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                      <User className="w-4 h-4" />
                      <span className="text-zinc-700">{user.name}</span>
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-white rounded-md shadow-lg border border-zinc-200 p-2 min-w-[200px] z-50">
                      {hasSupplier ? (
                        <>
                          <DropdownMenu.Item asChild>
                            <Link to="/fornecedor" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 transition-colors cursor-pointer">
                              <LayoutDashboard className="w-4 h-4" />
                              Dashboard
                            </Link>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <Link to="/fornecedor/produtos" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 transition-colors cursor-pointer">
                              <Package className="w-4 h-4" />
                              Meus Produtos
                            </Link>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <Link to="/fornecedor/produtos/novo" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 transition-colors cursor-pointer">
                              <Package className="w-4 h-4" />
                              Adicionar Produto
                            </Link>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <Link to="/fornecedor/perfil" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 transition-colors cursor-pointer">
                              <User className="w-4 h-4" />
                              Meu Perfil
                            </Link>
                          </DropdownMenu.Item>
                        </>
                      ) : (
                        <DropdownMenu.Item asChild>
                          <Link to="/fornecedor/cadastrar" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 transition-colors cursor-pointer">
                            <UserPlus className="w-4 h-4" />
                            Tornar-se Fornecedor
                          </Link>
                        </DropdownMenu.Item>
                      )}
                      <DropdownMenu.Separator className="h-px bg-zinc-200 my-1" />
                      <DropdownMenu.Item asChild>
                        <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 transition-colors cursor-pointer text-left">
                          <LogOut className="w-4 h-4" />
                          Sair
                        </button>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ) : (
                <Link className="hover:text-orange-500 transition-colors" to="/login">
                  Entrar
                </Link>
              )}
              <MiniCartButton />
            </nav>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-zinc-100 rounded transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link to="/" className="text-lg font-bold flex-shrink-0" style={{ color: '#ff6b00' }}>
                AutoParts
              </Link>
              <form onSubmit={onSearchSubmit} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    name="q"
                    defaultValue={currentQ}
                    className="w-full rounded-md border border-zinc-300 pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:border-orange-500"
                    style={{ '--tw-ring-color': '#ff6b00' } as any}
                    placeholder="Buscar..."
                  />
                </div>
              </form>
              <div className="flex items-center gap-2">
                {user && (
                  <Link to="/favoritos" className="p-2 hover:bg-zinc-100 rounded transition-colors" aria-label="Favoritos">
                    <Heart className="w-5 h-5" />
                  </Link>
                )}
                <MiniCartButton />
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="mt-3 pb-3 border-t border-zinc-200">
                <nav className="flex flex-col gap-1 pt-3">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors"
                  >
                    <span>Ofertas</span>
                  </Link>
                  <Link
                    to="/categorias"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors"
                  >
                    <span>Categorias</span>
                  </Link>
                  <Link
                    to="/buscar"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors"
                  >
                    <Search className="w-5 h-5" />
                    <span>Buscar</span>
                  </Link>
                  {user && (
                    <>
                      <Link
                        to="/favoritos"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span>Favoritos</span>
                      </Link>
                      {hasSupplier ? (
                        <>
                          <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase mt-2">Fornecedor</div>
                          <Link
                            to="/fornecedor"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors"
                          >
                            <LayoutDashboard className="w-5 h-5" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            to="/fornecedor/produtos"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors"
                          >
                            <Package className="w-5 h-5" />
                            <span>Meus Produtos</span>
                          </Link>
                          <Link
                            to="/fornecedor/produtos/novo"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors"
                          >
                            <Package className="w-5 h-5" />
                            <span>Adicionar Produto</span>
                          </Link>
                          <Link
                            to="/fornecedor/perfil"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors"
                          >
                            <User className="w-5 h-5" />
                            <span>Meu Perfil</span>
                          </Link>
                        </>
                      ) : (
                        <Link
                          to="/fornecedor/cadastrar"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors"
                        >
                          <UserPlus className="w-5 h-5" />
                          <span>Tornar-se Fornecedor</span>
                        </Link>
                      )}
                      <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase mt-2">Conta</div>
                      <div className="px-3 py-2 text-sm text-zinc-700">
                        Olá, {user.name}
                      </div>
                      <button
                        onClick={() => {
                          logout()
                          setMobileMenuOpen(false)
                        }}
                        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sair</span>
                      </button>
                    </>
                  )}
                  {!user && (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-100 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>Entrar</span>
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
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
