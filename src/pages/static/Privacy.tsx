export default function Component() {
  return (
    <div className="min-h-[calc(100vh-200px)] fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Política de Privacidade</h1>
          <p className="text-lg text-zinc-600">
            Última atualização: 15 de janeiro de 2025
          </p>
        </div>

        <div className="space-y-8">
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
            <p className="text-zinc-600 mb-4">
              A AutoParts valoriza a privacidade de seus usuários e está comprometida em proteger 
              as informações pessoais coletadas. Esta Política de Privacidade explica como coletamos, 
              usamos, armazenamos e protegemos seus dados pessoais.
            </p>
            <p className="text-zinc-600">
              Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política.
            </p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">2. Informações que Coletamos</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Dados Pessoais</h3>
                <ul className="list-disc list-inside text-zinc-600 space-y-1">
                  <li>Nome completo</li>
                  <li>Endereço de email</li>
                  <li>Número de telefone</li>
                  <li>Endereço de entrega</li>
                  <li>Data de nascimento (opcional)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Dados de Navegação</h3>
                <ul className="list-disc list-inside text-zinc-600 space-y-1">
                  <li>Endereço IP</li>
                  <li>Tipo de navegador</li>
                  <li>Páginas visitadas</li>
                  <li>Tempo de permanência no site</li>
                  <li>Cookies e tecnologias similares</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">3. Como Utilizamos suas Informações</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Processamento de Pedidos</h3>
                <p className="text-zinc-600 text-sm">
                  Utilizamos seus dados para processar pedidos, processar pagamentos e organizar entregas.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Comunicação</h3>
                <p className="text-zinc-600 text-sm">
                  Enviamos confirmações de pedidos, atualizações de entrega e suporte ao cliente.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Melhoria do Serviço</h3>
                <p className="text-zinc-600 text-sm">
                  Analisamos dados para melhorar nossos produtos, serviços e experiência do usuário.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Marketing</h3>
                <p className="text-zinc-600 text-sm">
                  Com seu consentimento, enviamos ofertas e novidades sobre produtos.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Informações</h2>
            <p className="text-zinc-600 mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
              exceto nas seguintes situações:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2">
              <li>Prestadores de serviços (transportadoras, processadores de pagamento)</li>
              <li>Quando exigido por lei ou autoridades competentes</li>
              <li>Para proteger nossos direitos legais</li>
              <li>Com seu consentimento explícito</li>
            </ul>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">5. Segurança dos Dados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-medium mb-1">Criptografia</h3>
                <p className="text-zinc-600 text-sm">Dados protegidos com SSL/TLS</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <h3 className="font-medium mb-1">Acesso Restrito</h3>
                <p className="text-zinc-600 text-sm">Apenas pessoal autorizado</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-medium mb-1">Monitoramento</h3>
                <p className="text-zinc-600 text-sm">Sistemas monitorados 24/7</p>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">6. Seus Direitos</h2>
            <p className="text-zinc-600 mb-4">
              De acordo com a LGPD, você tem os seguintes direitos:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-zinc-600">Acesso aos seus dados pessoais</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-zinc-600">Correção de dados incorretos</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-zinc-600">Exclusão de dados pessoais</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-zinc-600">Portabilidade de dados</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-zinc-600">Revogação de consentimento</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-zinc-600">Informação sobre uso dos dados</span>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
            <p className="text-zinc-600 mb-4">
              Utilizamos cookies para melhorar sua experiência de navegação. Você pode controlar 
              o uso de cookies através das configurações do seu navegador.
            </p>
            <div className="bg-zinc-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Tipos de Cookies:</h4>
              <ul className="text-sm text-zinc-600 space-y-1">
                <li>• <strong>Essenciais:</strong> Necessários para o funcionamento do site</li>
                <li>• <strong>Analíticos:</strong> Para entender como você usa o site</li>
                <li>• <strong>Marketing:</strong> Para personalizar anúncios (com consentimento)</li>
              </ul>
            </div>
          </div>

          <div className="card p-8 bg-orange-50 border-orange-200">
            <h2 className="text-2xl font-semibold mb-4 text-orange-800">8. Contato</h2>
            <p className="text-orange-700 mb-4">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
            </p>
            <div className="space-y-2 text-orange-700">
              <p><strong>Email:</strong> privacidade@autoparts.com</p>
              <p><strong>Telefone:</strong> (11) 99999-9999</p>
              <p><strong>Endereço:</strong> Rua das Peças, 123 - São Paulo/SP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


