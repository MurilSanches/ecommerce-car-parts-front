export default function Component() {
  return (
    <div className="min-h-[calc(100vh-200px)] fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Quem Somos</h1>
          <p className="text-lg text-zinc-600">
            Conheça a história e os valores da AutoParts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
            <p className="text-zinc-600 mb-4">
              Fundada em 2020, a AutoParts nasceu da paixão por automóveis e da necessidade de 
              oferecer peças de qualidade para entusiastas e profissionais do setor automotivo.
            </p>
            <p className="text-zinc-600">
              Começamos como uma pequena loja física e hoje somos referência em peças automotivas 
              online, atendendo clientes em todo o Brasil.
            </p>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Nossos Valores</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-zinc-600">Qualidade em todos os produtos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-zinc-600">Atendimento personalizado</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-zinc-600">Entrega rápida e segura</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-zinc-600">Preços justos e competitivos</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Qualidade</h3>
            <p className="text-zinc-600">
              Trabalhamos apenas com fornecedores certificados e produtos de primeira linha.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
            <p className="text-zinc-600">
              Entregamos em todo o Brasil com prazo de 2 a 5 dias úteis.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Suporte</h3>
            <p className="text-zinc-600">
              Nossa equipe está sempre disponível para ajudar com suas dúvidas.
            </p>
          </div>
        </div>

        <div className="card p-8 bg-orange-50 border-orange-200">
          <h2 className="text-2xl font-semibold mb-4 text-orange-800">Nossa Missão</h2>
          <p className="text-lg text-orange-700">
            Facilitar a compra de peças automotivas com confiança, oferecendo variedade, 
            qualidade e entrega rápida para todos os tipos de veículos.
          </p>
        </div>
      </div>
    </div>
  )
}


