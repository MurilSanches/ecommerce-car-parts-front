import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export default function Component() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center fade-in">
      <div className="text-center">
        <AlertCircle className="w-24 h-24 mx-auto mb-6 text-zinc-400" />
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-lg text-zinc-600 mb-8">
          Oops! A página que você está procurando não existe.
        </p>
        <div className="space-y-4">
          <Link to="/" className="btn-primary">
            Voltar ao início
          </Link>
          <div className="text-sm text-zinc-500">
            <p>Ou tente:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <Link to="/categorias" className="text-orange-500 hover:underline">Categorias</Link>
              <Link to="/buscar" className="text-orange-500 hover:underline">Buscar</Link>
              <Link to="/favoritos" className="text-orange-500 hover:underline">Favoritos</Link>
              <Link to="/carrinho" className="text-orange-500 hover:underline">Carrinho</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
