import { Link } from 'react-router-dom'
import motorImg from '../assets/motor.jpeg'
import freiosImg from '../assets/freios.jpeg'
import filtrosImg from '../assets/filtros.jpeg'
import oleoImg from '../assets/oleo.jpeg'
import calotasImg from '../assets/calotas.jpeg'

const banners = [
  {
    id: 1,
    title: 'Peças de Motor',
    category: 'Motor',
    image: motorImg,
    link: '/buscar?categoria=Motor',
    color: 'from-orange-600/80'
  },
  {
    id: 2,
    title: 'Sistema de Freios',
    category: 'Freios',
    image: freiosImg,
    link: '/buscar?categoria=Freios',
    color: 'from-red-600/80'
  },
  {
    id: 3,
    title: 'Filtros Premium',
    category: 'Filtros',
    image: filtrosImg,
    link: '/buscar?categoria=Filtros',
    color: 'from-green-600/80'
  },
  {
    id: 4,
    title: 'Óleos e Lubrificantes',
    category: 'Óleos',
    image: oleoImg,
    link: '/buscar?categoria=Óleos',
    color: 'from-yellow-600/80'
  },
  {
    id: 5,
    title: 'Calotas e Rodas',
    category: 'Rodas',
    image: calotasImg,
    link: '/buscar?categoria=Rodas',
    color: 'from-blue-600/80'
  }
]

export function PromoBanners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 slide-up">
      {banners.slice(0, 3).map((banner) => (
        <Link 
          key={banner.id} 
          to={banner.link} 
          className="relative block rounded-lg overflow-hidden border-2 border-zinc-200 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:scale-105 group"
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${banner.color} to-transparent`} />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-bold mb-1">{banner.title}</h3>
            <p className="text-sm opacity-90">Ver produtos →</p>
          </div>
        </Link>
      ))}
    </div>
  )
}


