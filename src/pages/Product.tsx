import { useParams, Link } from 'react-router-dom'
import { useCartStore } from '../store/cart'
import { useMemo, useState, useEffect } from 'react'
import { productsService, type Product } from '../services/products'
import { Loader2, ArrowLeft, Heart } from 'lucide-react'
import { LazyImage } from '../components/LazyImage'
import { WishlistButton } from '../components/WishlistButton'

export default function Component() {
  const { id } = useParams<{ id: string }>()
  const addItem = useCartStore((s) => s.addItem)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [cep, setCep] = useState('')
  const [frete, setFrete] = useState<string | null>(null)

  useEffect(() => {
    async function loadProduct() {
      if (!id) {
        setError('ID do produto não fornecido')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')
        const productData = await productsService.getById(id)
        setProduct(productData)
      } catch (err) {
        setError('Produto não encontrado')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const getProductImage = (product: Product, index: number = 0) => {
    if (product.images && product.images.length > 0) {
      return product.images[index] || product.images[0]
    }
    return `https://picsum.photos/seed/${product.id}/800/800`
  }

  const mainImage = useMemo(() => {
    if (!product) return ''
    return getProductImage(product, activeIndex)
  }, [product, activeIndex])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4">
          <Heart className="w-16 h-16 text-zinc-400 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Produto não encontrado</h2>
        <p className="text-zinc-600 mb-4">{error || 'O produto que você está procurando não existe ou foi removido.'}</p>
        <Link to="/" className="btn-primary">
          Voltar para Home
        </Link>
      </div>
    )
  }

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [getProductImage(product, 0)]

  function calcFrete() {
    if (!cep) return setFrete(null)
    const dias = 2 + ((parseInt(cep.slice(-2)) || 0) % 5)
    setFrete(`Entrega em até ${dias} dias úteis · R$ ${(19.9 + (dias - 2) * 3).toFixed(2)}`)
  }

  // Parse specifications se for string
  const specs = product.specifications 
    ? (() => {
        try {
          // Tenta parsear como JSON
          return JSON.parse(product.specifications)
        } catch {
          // Se não for JSON, cria um objeto simples
          return { 'Especificações': product.specifications }
        }
      })()
    : null

  return (
    <div className="fade-in py-6">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-zinc-600 hover:text-orange-500 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-md border bg-white">
            {mainImage ? (
              <LazyImage 
                src={mainImage} 
                alt={product.name} 
                className="h-full w-full object-cover" 
                placeholder="Carregando imagem..."
              />
            ) : (
              <div className="h-full w-full bg-zinc-100 flex items-center justify-center">
                <span className="text-zinc-400">Sem imagem</span>
              </div>
            )}
          </div>
          {productImages.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {productImages.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  onClick={() => setActiveIndex(i)}
                  className={`aspect-square overflow-hidden rounded border ${i === activeIndex ? 'ring-2 ring-orange-500' : ''}`}
                >
                  <LazyImage 
                    src={src} 
                    alt={`${product.name} - Imagem ${i + 1}`} 
                    className="h-full w-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-zinc-500 mb-1">{product.brand}</div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              {product.category && (
                <div className="text-sm text-zinc-600 mt-1">Categoria: {product.category}</div>
              )}
            </div>
            <WishlistButton 
              productId={product.id}
              className="text-zinc-500 hover:text-red-500 transition-colors flex-shrink-0"
              size="lg"
            />
          </div>

          <div className="mt-4 text-3xl font-bold text-orange-600">R$ {product.price.toFixed(2)}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-emerald-600">em até 10x sem juros</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">5% off no PIX</span>
          </div>

          {product.stock !== undefined && (
            <div className="mt-3 text-sm">
              {product.stock > 0 ? (
                <span className="text-emerald-600 font-medium">✓ Em estoque ({product.stock} unidades)</span>
              ) : (
                <span className="text-red-600 font-medium">✗ Sem estoque</span>
              )}
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded border">
              <button 
                className="px-3 py-2 hover:bg-zinc-100 transition-colors" 
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <input
                className="w-12 border-x px-2 py-2 text-center"
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              />
              <button 
                className="px-3 py-2 hover:bg-zinc-100 transition-colors" 
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              className="btn-primary px-5 py-3 flex-1"
              onClick={() => addItem({ 
                id: product.id, 
                name: product.name, 
                price: product.price, 
                image: getProductImage(product, 0) 
              }, qty)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Sem estoque' : 'Adicionar ao carrinho'}
            </button>
          </div>

          <div className="mt-6 p-4 bg-zinc-50 rounded-lg">
            <div className="text-sm font-medium mb-2">Calcular frete</div>
            <div className="flex items-center gap-2">
              <input
                className="w-40 rounded border border-zinc-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                maxLength={8}
              />
              <button className="btn-outline text-sm" onClick={calcFrete}>Calcular</button>
            </div>
            {frete && <div className="mt-2 text-sm text-zinc-700">{frete}</div>}
          </div>

          {specs && (
            <div className="mt-8">
              <div className="text-lg font-semibold mb-2">Especificações</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {Object.entries(specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6">
                    <div className="text-zinc-600">{k}</div>
                    <div className="font-medium">{String(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.description && (
            <div className="mt-8">
              <div className="text-lg font-semibold mb-2">Descrição</div>
              <div className="text-sm text-zinc-700 whitespace-pre-line">{product.description}</div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 mt-10">
          <div className="text-lg font-semibold mb-3">Avaliações</div>
          <div className="space-y-3">
            <div className="text-sm text-zinc-600">Ainda não há avaliações para este produto.</div>
          </div>
        </div>

        <div className="lg:col-span-2 mt-8">
          <div className="text-lg font-semibold mb-3">Perguntas e respostas</div>
          <QASection productId={product.id} />
        </div>
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


