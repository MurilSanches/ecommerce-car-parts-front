import { useState } from 'react'

export default function Component() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center fade-in">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Fale Conosco</h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Estamos disponíveis para ajudar. Preencha o formulário abaixo ou entre em contato conosco.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6">Envie sua mensagem</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                  Nome completo *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-zinc-300 px-4 py-3 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-zinc-300 px-4 py-3 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-zinc-300 px-4 py-3 text-sm focus:ring-2 focus:border-orange-500 focus:outline-none resize-none"
                  placeholder="Descreva sua dúvida ou solicitação..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-zinc-600">contato@autoparts.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h4 className="font-medium">Telefone</h4>
                    <p className="text-zinc-600">(11) 99999-9999</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🕒</div>
                  <div>
                    <h4 className="font-medium">Horário de Atendimento</h4>
                    <p className="text-zinc-600">Segunda a Sexta: 8h às 18h</p>
                    <p className="text-zinc-600">Sábado: 8h às 12h</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">
                  Twitter
                </a>
              </div>
            </div>

            <div className="card p-6 bg-orange-50 border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">💡 Dica</h4>
              <p className="text-sm text-orange-700">
                Para dúvidas sobre produtos específicos, inclua o nome ou código do produto em sua mensagem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


