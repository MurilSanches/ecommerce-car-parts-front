import { useNavigate } from 'react-router-dom'

const WIDTHS = ['175', '185', '195', '205', '215', '225', '235', '245']
const PROFILES = ['45', '50', '55', '60', '65', '70', '75']
const RIMS = ['14', '15', '16', '17', '18', '19', '20']

export function TireFinder() {
  const navigate = useNavigate()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const w = String(data.get('w') || '')
    const p = String(data.get('p') || '')
    const r = String(data.get('r') || '')
    const params = new URLSearchParams()
    if (w) params.set('w', w)
    if (p) params.set('p', p)
    if (r) params.set('r', r)
    navigate(`/buscar?${params.toString()}`)
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-md border p-3 bg-brand-50 slide-up">
      <div>
        <label className="block text-xs text-zinc-600 mb-1">Largura</label>
        <select name="w" className="w-full rounded border px-2 py-2 text-sm">
          <option value="">Selecione</option>
          {WIDTHS.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-zinc-600 mb-1">Perfil</label>
        <select name="p" className="w-full rounded border px-2 py-2 text-sm">
          <option value="">Selecione</option>
          {PROFILES.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-zinc-600 mb-1">Aro</label>
        <select name="r" className="w-full rounded border px-2 py-2 text-sm">
          <option value="">Selecione</option>
          {RIMS.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
      <div className="flex items-end">
        <button className="w-full btn-primary text-sm">Buscar Pneus</button>
      </div>
    </form>
  )
}


