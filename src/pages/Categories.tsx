import { Link } from 'react-router-dom'
import motorImg from '../assets/motor.jpeg'
import freiosImg from '../assets/freios.jpeg'
import filtrosImg from '../assets/filtros.jpeg'
import oleoImg from '../assets/oleo.jpeg'
import calotasImg from '../assets/calotas.jpeg'
import pneusImg from '../assets/pneus.png'
import amortecedorImg from '../assets/amortecedor.jpeg'
import bateriaImg from '../assets/bateria.jpeg'
import { Category, CATEGORIES } from '../constants/categories'

const CATEGORY_CONFIG: Record<Category, {
  description: string
  image: string | null
  color: string
  gradient: string
}> = {
  [Category.PNEUS]: {
    description: 'Pneus para todos os veículos',
    image: pneusImg,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    gradient: 'from-blue-500/20 to-blue-600/20'
  },
  [Category.RODAS]: {
    description: 'Rodas e acessórios',
    image: calotasImg,
    color: 'bg-gray-50 border-gray-200 text-gray-700',
    gradient: 'from-gray-500/20 to-gray-600/20'
  },
  [Category.OLEOS]: {
    description: 'Óleos e lubrificantes',
    image: oleoImg,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    gradient: 'from-yellow-500/20 to-yellow-600/20'
  },
  [Category.FILTROS]: {
    description: 'Filtros de ar, óleo e combustível',
    image: filtrosImg,
    color: 'bg-green-50 border-green-200 text-green-700',
    gradient: 'from-green-500/20 to-green-600/20'
  },
  [Category.FREIOS]: {
    description: 'Sistema de freios completo',
    image: freiosImg,
    color: 'bg-red-50 border-red-200 text-red-700',
    gradient: 'from-red-500/20 to-red-600/20'
  },
  [Category.SUSPENSAO]: {
    description: 'Amortecedores e componentes',
    image: amortecedorImg,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    gradient: 'from-purple-500/20 to-purple-600/20'
  },
  [Category.MOTOR]: {
    description: 'Peças do motor',
    image: motorImg,
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    gradient: 'from-orange-500/20 to-orange-600/20'
  },
  [Category.ELETRICA]: {
    description: 'Sistema elétrico e baterias',
    image: bateriaImg,
    color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    gradient: 'from-indigo-500/20 to-indigo-600/20'
  },
}

export default function Component() {
  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categorias de Produtos</h1>
        <p className="text-zinc-600">Encontre as peças certas para seu veículo</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CATEGORIES.map((category, index) => {
          const config = CATEGORY_CONFIG[category.value]
          return (
            <Link 
              key={category.value} 
              to={`/buscar?categoria=${category.value}`} 
              className={`card overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 slide-up ${config.color} border-2 hover:border-orange-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {config.image ? (
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={config.image}
                    alt={category.label}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient} to-transparent`} />
                </div>
              ) : (
                <div className={`h-40 flex items-center justify-center bg-gradient-to-br ${config.gradient}`}>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.label}</h3>
                <p className="text-sm opacity-75 mb-4">{config.description}</p>
                <div className="text-sm font-semibold text-orange-600 flex items-center gap-2">
                  Ver produtos 
                  <span>→</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}


