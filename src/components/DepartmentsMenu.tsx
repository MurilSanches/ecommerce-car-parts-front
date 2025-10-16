import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Link } from 'react-router-dom'

const DEPARTMENTS: Array<{ title: string; items: Array<{ label: string; href: string }> }> = [
  {
    title: 'Pneus & Rodas',
    items: [
      { label: 'Pneus', href: '/buscar?categoria=pneu' },
      { label: 'Rodas', href: '/buscar?categoria=rodas' },
      { label: 'Acessórios', href: '/buscar?categoria=acessorios-rodas' },
    ],
  },
  {
    title: 'Óleo & Filtros',
    items: [
      { label: 'Óleos', href: '/buscar?categoria=oleo' },
      { label: 'Filtro de Óleo', href: '/buscar?categoria=filtro-oleo' },
      { label: 'Filtro de Ar', href: '/buscar?categoria=filtro' },
    ],
  },
  {
    title: 'Freios & Suspensão',
    items: [
      { label: 'Pastilhas', href: '/buscar?categoria=freio' },
      { label: 'Discos', href: '/buscar?categoria=disco' },
      { label: 'Amortecedores', href: '/buscar?categoria=suspensao' },
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


