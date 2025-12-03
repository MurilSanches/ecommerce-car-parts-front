import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Link } from 'react-router-dom'
import { Category } from '../constants/categories'

const DEPARTMENTS: Array<{ title: string; items: Array<{ label: string; href: string }> }> = [
  {
    title: 'Pneus & Rodas',
    items: [
      { label: 'Pneus', href: `/buscar?categoria=${Category.PNEUS}` },
      { label: 'Rodas', href: `/buscar?categoria=${Category.RODAS}` },
    ],
  },
  {
    title: 'Óleo & Filtros',
    items: [
      { label: 'Óleos', href: `/buscar?categoria=${Category.OLEOS}` },
      { label: 'Filtros', href: `/buscar?categoria=${Category.FILTROS}` },
    ],
  },
  {
    title: 'Freios & Suspensão',
    items: [
      { label: 'Freios', href: `/buscar?categoria=${Category.FREIOS}` },
      { label: 'Suspensão', href: `/buscar?categoria=${Category.SUSPENSAO}` },
    ],
  },
  {
    title: 'Motor & Elétrica',
    items: [
      { label: 'Motor', href: `/buscar?categoria=${Category.MOTOR}` },
      { label: 'Elétrica', href: `/buscar?categoria=${Category.ELETRICA}` },
    ],
  },
]

export function DepartmentsMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="btn-outline text-sm">Departamentos</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={8} className="z-30">
          <div className="rounded-md border bg-white p-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-w-[560px]">
              {DEPARTMENTS.map((col) => (
                <div key={col.title}>
                  <div className="text-xs font-semibold uppercase text-brand-600 mb-2">{col.title}</div>
                  <div className="space-y-1 text-sm">
                    {col.items.map((it) => (
                      <Link key={it.label} to={it.href} className="block rounded px-1 py-1 hover:bg-brand-50 hover:text-brand transition-colors">
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}


