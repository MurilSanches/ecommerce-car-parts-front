import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-zinc-800 text-zinc-300 py-8 mt-12">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">AutoParts</h3>
          <p className="text-sm mb-4">Sua loja completa de peças automotivas com as melhores marcas e preços.</p>
          <div className="flex gap-3">
            <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Facebook</a>
            <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Instagram</a>
            <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">Twitter</a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Institucional</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/quem-somos" className="hover:text-orange-500 transition-colors">Quem Somos</Link></li>
            <li><Link to="/politica-privacidade" className="hover:text-orange-500 transition-colors">Política de Privacidade</Link></li>
            <li><Link to="/termos-de-uso" className="hover:text-orange-500 transition-colors">Termos de Uso</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Ajuda</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/central-de-ajuda" className="hover:text-orange-500 transition-colors">Central de Ajuda</Link></li>
            <li><Link to="/fale-conosco" className="hover:text-orange-500 transition-colors">Fale Conosco</Link></li>
            <li><Link to="/carrinho" className="hover:text-orange-500 transition-colors">Meus Pedidos</Link></li>
            <li><Link to="/favoritos" className="hover:text-orange-500 transition-colors">Lista de Desejos</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Produtos</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/categorias" className="hover:text-orange-500 transition-colors">Categorias</Link></li>
            <li><Link to="/buscar" className="hover:text-orange-500 transition-colors">Buscar Produtos</Link></li>
            <li><Link to="/" className="hover:text-orange-500 transition-colors">Ofertas</Link></li>
            <li><Link to="/carrinho" className="hover:text-orange-500 transition-colors">Carrinho</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-zinc-700 mt-8 pt-6">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} AutoParts. Todos os direitos reservados.
          </div>
          <div className="flex gap-4 text-xs text-zinc-500">
            <span>CNPJ: 12.345.678/0001-90</span>
            <span>•</span>
            <span>Razão Social: AutoParts Ltda</span>
          </div>
        </div>
      </div>
    </footer>
  )
}


