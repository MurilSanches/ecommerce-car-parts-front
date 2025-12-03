import { Link } from 'react-router-dom'
import { CheckCircle, Package, Truck, Home, ShoppingBag } from 'lucide-react'

export default function Component() {
  return (
    <div className="fade-in">
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Pedido Recebido!</h1>
          <p className="text-zinc-600 text-lg mb-4">
            Obrigado pela sua compra. Seu pedido foi recebido com sucesso.
          </p>
        </div>

        <div className="card p-6 mb-6 bg-gradient-to-r from-orange-50 to-blue-50 border-orange-200">
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-orange-800">
              <Package className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Entraremos em contato em breve</div>
                <p className="text-sm text-orange-700">
                  Nossa equipe entrará em contato com você nos próximos momentos para finalizar o pedido e acertar a forma de pagamento.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-blue-800 pt-3 border-t border-orange-200">
              <Truck className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Você receberá um email de confirmação</div>
                <p className="text-sm text-blue-700">
                  Enviaremos os detalhes do seu pedido e as instruções de pagamento para o email cadastrado.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Link>
          <Link to="/buscar" className="btn-outline inline-flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  )
}

