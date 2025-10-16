import { useParams } from 'react-router-dom'
import { useCartStore } from '../store/cart'
import { useMemo, useState } from 'react'
import { useWishlist } from '../store/wishlist'

type ProductData = {
  id: string
  name: string
  price: number
  images: string[]
  specs?: Record<string, string>
  rating?: number
  reviews?: Array<{ id: string; author: string; rating: number; comment: string }>
}

const DB: Record<string, ProductData> = {
  'pneu-aro-16': {
    id: 'pneu-aro-16',
    name: 'Pneu Aro 16 205/55R16',
    price: 399.9,
    images: [
      'https://picsum.photos/seed/pneu-1/800/800',
      'https://picsum.photos/seed/pneu-2/800/800',
      'https://picsum.photos/seed/pneu-3/800/800',
    ],
    specs: {
      'Largura': '205',
      'Perfil': '55',
      'Aro': '16',
      'Índice de velocidade': 'V',
      'Índice de carga': '91',
    },
    rating: 4.6,
    reviews: [
      { id: 'r1', author: 'Carlos', rating: 5, comment: 'Excelente aderência e baixo ruído.' },
      { id: 'r2', author: 'Marina', rating: 4, comment: 'Ótimo custo benefício.' },
    ],
  },
  'oleo-5w30': {
    id: 'oleo-5w30',
    name: 'Óleo Sintético 5W30 1L',
    price: 49.9,
    images: [
      'https://picsum.photos/seed/oleo-1/800/800',
      'https://picsum.photos/seed/oleo-2/800/800',
    ],
    specs: {
      'Viscosidade': '5W30',
      'Tipo': 'Sintético',
      'Volume': '1L',
    },
    rating: 4.4,
  },
  'filtro-ar': {
    id: 'filtro-ar',
    name: 'Filtro de Ar Motor',
    price: 59.9,
    images: [
      'https://picsum.photos/seed/filtro-1/800/800',
    ],
    specs: {
      'Material': 'Celulose tratada',
    },
    rating: 4.2,
  },
  'pastilha-freio': {
    id: 'pastilha-freio',
    name: 'Pastilha de Freio Dianteira',
    price: 129.9,
    images: [
      'https://picsum.photos/seed/freio-1/800/800',
      'https://picsum.photos/seed/freio-2/800/800',
    ],
    specs: {
      'Posição': 'Dianteira',
      'Composição': 'Cerâmica',
    },
    rating: 4.1,
  },
}

export default function Component() {
  const { slug = '' } = useParams()
  const product = DB[slug]
  const addItem = useCartStore((s) => s.addItem)
  const [activeIndex, setActiveIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [cep, setCep] = useState('')
  const [frete, setFrete] = useState<string | null>(null)
  const toggleWish = useWishlist((s) => s.toggle)
  const hasWish = useWishlist((s) => s.has)

  const mainImage = useMemo(() => product?.images?.[activeIndex] ?? '', [product, activeIndex])

  if (!product) return <div className="py-4">Produto não encontrado.</div>

  function calcFrete() {
    if (!cep) return setFrete(null)
    // Mock simples: prazo baseado nos dois últimos dígitos
    const dias = 2 + ((parseInt(cep.slice(-2)) || 0) % 5)
    setFrete(`Entrega em até ${dias} dias úteis · R$ ${(19.9 + (dias - 2) * 3).toFixed(2)}`)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 fade-in">
      <div>
        <div className="aspect-square w-full overflow-hidden rounded-md border bg-white">
          {mainImage ? (
            <img src={mainImage} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-zinc-100" />
          )}
        </div>
        {product.images?.length ? (
          <div className="mt-3 grid grid-cols-5 gap-2">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveIndex(i)}
                className={`aspect-square overflow-hidden rounded border ${i===activeIndex ? 'ring-2 ring-zinc-900' : ''}`}
              >
                <img src={src} alt={product.name} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <button aria-label="wishlist" onClick={() => toggleWish(product.id)} className="text-2xl leading-none text-zinc-500">
            {hasWish(product.id) ? '♥' : '♡'}
          </button>
        </div>
        {product.rating && (
          <div className="mt-1 text-sm text-zinc-600">Avaliação: {product.rating.toFixed(1)} / 5</div>
        )}
        <div className="mt-3 text-3xl font-bold">R$ {product.price.toFixed(2)}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-emerald-600">em até 10x sem juros</span>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">5% off no PIX</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center rounded border">
            <button className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <input
              className="w-12 border-x px-2 py-2 text-center"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            />
            <button className="px-3 py-2" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
          <button
            className="btn-primary px-5 py-3"
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] }, qty)}
          >
            Adicionar ao carrinho
          </button>
        </div>

        <div className="mt-6 p-4 bg-zinc-50 rounded-lg">
          <div className="text-sm font-medium mb-2">Calcular frete</div>
          <div className="flex items-center gap-2">
            <input
              className="w-40 rounded border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:border-brand"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
            />
            <button className="btn-outline text-sm" onClick={calcFrete}>Calcular</button>
          </div>
          {frete && <div className="mt-2 text-sm text-zinc-700">{frete}</div>}
        </div>

        {product.specs && (
          <div className="mt-8">
            <div className="text-lg font-semibold mb-2">Especificações</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6">
                  <div className="text-zinc-600">{k}</div>
                  <div className="font-medium">{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 mt-10">
        <div className="text-lg font-semibold mb-3">Avaliações</div>
        <div className="space-y-3">
          {product.reviews?.length ? (
            product.reviews.map((r) => (
              <div key={r.id} className="rounded border p-3">
                <div className="text-sm font-medium">{r.author}</div>
                <div className="text-xs text-zinc-600">Nota: {r.rating}/5</div>
                <div className="mt-1 text-sm">{r.comment}</div>
              </div>
            ))
          ) : (
            <div className="text-sm text-zinc-600">Ainda não há avaliações para este produto.</div>
          )}
        </div>
      </div>

      <div className="lg:col-span-2 mt-8">
        <div className="text-lg font-semibold mb-3">Perguntas e respostas</div>
        <QASection productId={product.id} />
      </div>
    </div>
  )
}

function QASection({ productId }: { productId: string }) {
  const [list, setList] = useState<Array<{ id: string; q: string; a?: string }>>([])
  const [q, setQ] = useState('')
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!q.trim()) return
    setList((prev) => [{ id: `${productId}-${Date.now()}`, q: q.trim() }, ...prev])
    setQ('')
  }
  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <input className="flex-1 rounded border px-3 py-2 text-sm" placeholder="Faça uma pergunta" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="rounded-md border px-3 py-2 text-sm">Enviar</button>
      </form>
      <div className="space-y-3">
        {list.length === 0 && <div className="text-sm text-zinc-600">Seja o primeiro a perguntar.</div>}
        {list.map((item) => (
          <div key={item.id} className="rounded border p-3">
            <div className="text-sm font-medium">Pergunta</div>
            <div className="text-sm">{item.q}</div>
            {item.a ? (
              <div className="mt-2 text-sm text-zinc-700">Resposta: {item.a}</div>
            ) : (
              <div className="mt-2 text-xs text-zinc-500">Aguardando resposta do vendedor</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


