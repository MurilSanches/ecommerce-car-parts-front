// Enum de categorias baseado no backend
export enum Category {
  PNEUS = 'Pneus',
  RODAS = 'Rodas',
  OLEOS = 'Óleos',
  FILTROS = 'Filtros',
  FREIOS = 'Freios',
  SUSPENSAO = 'Suspensão',
  MOTOR = 'Motor',
  ELETRICA = 'Elétrica',
}

// Array de categorias para uso em selects e listas
export const CATEGORIES = [
  { value: Category.PNEUS, label: Category.PNEUS },
  { value: Category.RODAS, label: Category.RODAS },
  { value: Category.OLEOS, label: Category.OLEOS },
  { value: Category.FILTROS, label: Category.FILTROS },
  { value: Category.FREIOS, label: Category.FREIOS },
  { value: Category.SUSPENSAO, label: Category.SUSPENSAO },
  { value: Category.MOTOR, label: Category.MOTOR },
  { value: Category.ELETRICA, label: Category.ELETRICA },
]

// Mapeamento de categorias para slugs (para URLs)
export const CATEGORY_SLUGS: Record<Category, string> = {
  [Category.PNEUS]: 'pneus',
  [Category.RODAS]: 'rodas',
  [Category.OLEOS]: 'oleos',
  [Category.FILTROS]: 'filtros',
  [Category.FREIOS]: 'freios',
  [Category.SUSPENSAO]: 'suspensao',
  [Category.MOTOR]: 'motor',
  [Category.ELETRICA]: 'eletrica',
}

// Função helper para obter slug de uma categoria
export function getCategorySlug(category: Category): string {
  return CATEGORY_SLUGS[category]
}

// Função helper para obter categoria de um slug
export function getCategoryFromSlug(slug: string): Category | null {
  const entry = Object.entries(CATEGORY_SLUGS).find(([_, s]) => s === slug)
  return entry ? (entry[0] as Category) : null
}

