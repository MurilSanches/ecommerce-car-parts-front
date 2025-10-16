import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t bg-brand-50">
      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-semibold mb-2">Institucional</div>
          <ul className="space-y-1 text-zinc-600">
            <li><Link to="/quem-somos" className="hover:underline">Quem somos</Link></li>
            <li><Link to="/privacidade" className="hover:underline">Política de privacidade</Link></li>
            <li><Link to="/termos" className="hover:underline">Termos e condições</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Atendimento</div>
          <ul className="space-y-1 text-zinc-600">
            <li><Link to="/ajuda" className="hover:underline">Central de ajuda</Link></li>
            <li><Link to="/contato" className="hover:underline">Fale conosco</Link></li>
            <li><a href="#" className="hover:underline">Acompanhar pedido</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Formas de pagamento</div>
          <div className="grid grid-cols-4 gap-2">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-6 rounded bg-zinc-200" />
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2">Siga-nos</div>
          <div className="flex gap-2">
            {[1,2,3].map(i => (
              <div key={i} className="h-8 w-8 rounded-full bg-zinc-200" />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-zinc-500">© {new Date().getFullYear()} AutoParts. Todos os direitos reservados.</div>
      </div>
    </footer>
  )
}


