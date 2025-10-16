export default function Component() {
  return (
    <div className="min-h-[calc(100vh-200px)] fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Termos de Uso</h1>
          <p className="text-lg text-zinc-600">
            Última atualização: 15 de janeiro de 2025
          </p>
        </div>

        <div className="space-y-8">
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-zinc-600 mb-4">
              Ao acessar e utilizar o site da AutoParts, você concorda em cumprir e estar vinculado 
              aos termos e condições descritos neste documento.
            </p>
            <p className="text-zinc-600">
              Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.
            </p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
            <p className="text-zinc-600 mb-4">
              A AutoParts é uma plataforma de e-commerce especializada na venda de peças e acessórios 
              automotivos. Oferecemos:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2">
              <li>Catálogo de produtos automotivos</li>
              <li>Sistema de busca e filtros</li>
              <li>Carrinho de compras</li>
              <li>Processamento de pedidos</li>
              <li>Entrega em todo o Brasil</li>
              <li>Suporte ao cliente</li>
            </ul>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">3. Cadastro e Conta</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Criação de Conta</h3>
                <p className="text-zinc-600">
                  Para realizar compras, você deve criar uma conta fornecendo informações verdadeiras 
                  e atualizadas. É sua responsabilidade manter a confidencialidade de sua senha.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Responsabilidades</h3>
                <ul className="list-disc list-inside text-zinc-600 space-y-1">
                  <li>Manter informações atualizadas</li>
                  <li>Proteger sua senha</li>
                  <li>Notificar sobre uso não autorizado</li>
                  <li>Ser responsável por todas as atividades em sua conta</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">4. Processo de Compra</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Disponibilidade</h3>
                <p className="text-zinc-600 text-sm">
                  Os produtos estão sujeitos à disponibilidade. Reservamos o direito de cancelar 
                  pedidos em caso de indisponibilidade.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Preços</h3>
                <p className="text-zinc-600 text-sm">
                  Todos os preços estão em reais (R$) e incluem impostos. Reservamos o direito de 
                  alterar preços sem aviso prévio.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Pagamento</h3>
                <p className="text-zinc-600 text-sm">
                  Aceitamos cartões de crédito, débito, PIX e boleto bancário. O pagamento é processado 
                  de forma segura.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Confirmação</h3>
                <p className="text-zinc-600 text-sm">
                  Após a confirmação do pagamento, você receberá um email com os detalhes do pedido 
                  e código de rastreamento.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">5. Entrega e Frete</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Prazos de Entrega</h3>
                <p className="text-zinc-600">
                  Os prazos de entrega variam de 2 a 7 dias úteis, dependendo da localização. 
                  Prazos são estimativas e podem variar devido a fatores externos.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Frete Grátis</h3>
                <p className="text-zinc-600">
                  Oferecemos frete grátis para compras acima de R$ 200 em todo o Brasil. 
                  Para compras menores, o frete é calculado automaticamente.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">6. Trocas e Devoluções</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Política de Troca</h3>
                <p className="text-zinc-600 mb-2">
                  Você tem até 7 dias corridos após o recebimento para solicitar troca ou devolução, 
                  desde que:
                </p>
                <ul className="list-disc list-inside text-zinc-600 space-y-1">
                  <li>O produto esteja em perfeito estado</li>
                  <li>Com embalagem original</li>
                  <li>Com nota fiscal</li>
                  <li>Não seja produto personalizado</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Processo de Troca</h3>
                <p className="text-zinc-600">
                  Entre em contato conosco através do WhatsApp ou email. Nossa equipe orientará 
                  sobre o processo de troca ou devolução.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">7. Garantia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Garantia do Produto</h3>
                <p className="text-zinc-600 text-sm">
                  Todos os produtos têm garantia de 90 dias contra defeitos de fabricação, 
                  conforme especificação do fabricante.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Garantia de Entrega</h3>
                <p className="text-zinc-600 text-sm">
                  Garantimos a entrega segura dos produtos. Em caso de extravio, 
                  repomos o produto sem custo adicional.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitações de Responsabilidade</h2>
            <p className="text-zinc-600 mb-4">
              A AutoParts não se responsabiliza por:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2">
              <li>Danos causados por uso inadequado dos produtos</li>
              <li>Instalação incorreta de peças</li>
              <li>Danos decorrentes de força maior</li>
              <li>Perdas indiretas ou lucros cessantes</li>
            </ul>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">9. Propriedade Intelectual</h2>
            <p className="text-zinc-600">
              Todo o conteúdo do site, incluindo textos, imagens, logotipos e design, 
              é propriedade da AutoParts e está protegido por leis de direitos autorais.
            </p>
          </div>

          <div className="card p-8 bg-orange-50 border-orange-200">
            <h2 className="text-2xl font-semibold mb-4 text-orange-800">10. Contato</h2>
            <p className="text-orange-700 mb-4">
              Para dúvidas sobre estes termos, entre em contato:
            </p>
            <div className="space-y-2 text-orange-700">
              <p><strong>Email:</strong> juridico@autoparts.com</p>
              <p><strong>Telefone:</strong> (11) 99999-9999</p>
              <p><strong>Endereço:</strong> Rua das Peças, 123 - São Paulo/SP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


