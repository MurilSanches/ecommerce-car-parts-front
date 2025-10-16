import { Link } from 'react-router-dom'

const CATEGORIES = [
  { 
    slug: 'pneus', 
    name: 'Pneus', 
    description: 'Pneus para todos os veículos',
    icon: '🛞',
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  { 
    slug: 'rodas', 
    name: 'Rodas', 
    description: 'Rodas e acessórios',
    icon: '⚙️',
    color: 'bg-gray-50 border-gray-200 text-gray-700'
  },
  { 
    slug: 'oleos', 
    name: 'Óleos', 
    description: 'Óleos e lubrificantes',
    icon: '🛢️',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700'
  },
  { 
    slug: 'filtros', 
    name: 'Filtros', 
    description: 'Filtros de ar, óleo e combustível',
    icon: '🔧',
    color: 'bg-green-50 border-green-200 text-green-700'
  },
  { 
    slug: 'freios', 
    name: 'Freios', 
    description: 'Sistema de freios completo',
    icon: '🛑',
    color: 'bg-red-50 border-red-200 text-red-700'
  },
  { 
    slug: 'suspensao', 
    name: 'Suspensão', 
    description: 'Amortecedores e componentes',
    icon: '🔩',
    color: 'bg-purple-50 border-purple-200 text-purple-700'
  },
  { 
    slug: 'motor', 
    name: 'Motor', 
    description: 'Peças do motor',
    icon: '⚡',
    color: 'bg-orange-50 border-orange-200 text-orange-700'
  },
  { 
    slug: 'eletrico', 
    name: 'Elétrico', 
    description: 'Sistema elétrico e baterias',
    icon: '🔋',
    color: 'bg-indigo-50 border-indigo-200 text-indigo-700'
  },
]

export default function Component() {
  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categorias de Produtos</h1>
        <p className="text-zinc-600">Encontre as peças certas para seu veículo</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CATEGORIES.map((category, index) => (
          <Link 
            key={category.slug} 
            to={`/buscar?categoria=${category.slug}`} 
            className={`card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 slide-up ${category.color}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <p className="text-sm opacity-75">{category.description}</p>
            <div className="mt-4 text-sm font-medium opacity-60">
              Ver produtos →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


