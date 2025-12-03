import { useState } from 'react'

const FAQ_ITEMS = [
  {
    question: "Como acompanhar meu pedido?",
    answer: "Após a confirmação do pagamento, você receberá um código de rastreamento por email. Use este código no site da transportadora para acompanhar sua entrega em tempo real."
  },
  {
    question: "Como solicitar troca ou devolução?",
    answer: "Você tem até 7 dias para solicitar troca ou devolução. Acesse 'Meus Pedidos' em sua conta e clique em 'Solicitar Troca'. Nossa equipe entrará em contato em até 24h."
  },
  {
    question: "Qual o prazo de entrega?",
    answer: "O prazo varia de 2 a 5 dias úteis para a maioria das cidades. Para regiões mais distantes, pode chegar a 7 dias úteis. Consulte o prazo específico no carrinho."
  },
  {
    question: "Como falar com o atendimento?",
    answer: "Você pode nos contatar pelo WhatsApp (11) 99999-9999, email contato@autoparts.com ou pelo formulário de contato. Atendemos de segunda a sexta, 8h às 18h."
  },
  {
    question: "Vocês oferecem garantia?",
    answer: "Sim! Todos os produtos têm garantia de 90 dias contra defeitos de fabricação. A garantia é válida desde a data de entrega do produto."
  },
  {
    question: "Como funciona o frete grátis?",
    answer: "Frete grátis para compras acima de R$ 200 em todo o Brasil. Para compras menores, o frete é calculado automaticamente no carrinho."
  }
]

export default function Component() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="min-h-[calc(100vh-200px)] fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Central de Ajuda</h1>
          <p className="text-lg text-zinc-600">
            Encontre respostas para suas dúvidas mais frequentes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="card p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Pedidos</h3>
            <p className="text-zinc-600 text-sm">
              Acompanhe seus pedidos e saiba mais sobre entregas
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2">Trocas</h3>
            <p className="text-zinc-600 text-sm">
              Como trocar ou devolver produtos
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Suporte</h3>
            <p className="text-zinc-600 text-sm">
              Fale conosco e tire suas dúvidas
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-zinc-50 transition-colors"
                >
                  <h3 className="text-lg font-medium">{item.question}</h3>
                  <span className={`text-2xl transition-transform ${openItems.includes(index) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-zinc-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card p-8 bg-orange-50 border-orange-200">
          <h3 className="text-xl font-semibold mb-4 text-orange-800">Ainda tem dúvidas?</h3>
          <p className="text-orange-700 mb-4">
            Nossa equipe está pronta para ajudar! Entre em contato conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/5511999999999" className="btn-primary">
              WhatsApp
            </a>
            <a href="/fale-conosco" className="btn-outline">
              Formulário de Contato
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


