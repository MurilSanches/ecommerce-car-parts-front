import { create } from 'zustand'

type WishlistState = {
  ids: Record<string, true>
  toggle: (id: string) => void
  has: (id: string) => boolean
  hydrate: () => void
  clear: () => void
}

const STORAGE_KEY = 'wishlist:ids'

// Função para carregar do localStorage
function loadFromStorage(): Record<string, true> {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      const arr = JSON.parse(raw) as string[]
      const rec: Record<string, true> = {}
      for (const k of arr) rec[k] = true
      return rec
    } catch {
      return {}
    }
  }
  return {}
}

// Função para salvar no localStorage
function saveToStorage(ids: Record<string, true>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.keys(ids)))
}

export const useWishlist = create<WishlistState>((set, get) => {
  // Hidrata automaticamente na criação do store
  const initialIds = loadFromStorage()

  return {
    ids: initialIds,
    toggle: (id) => {
      const currentIds = get().ids
      const next = { ...currentIds }
      if (next[id]) {
        delete next[id]
      } else {
        next[id] = true
      }
      saveToStorage(next)
      set({ ids: next })
    },
    has: (id) => Boolean(get().ids[id]),
    hydrate: () => {
      const loadedIds = loadFromStorage()
      set({ ids: loadedIds })
    },
    clear: () => {
      localStorage.removeItem(STORAGE_KEY)
      set({ ids: {} })
    },
  }
})

// Selector reativo para verificar se um produto está na wishlist
// Use este hook quando precisar de reatividade específica para um produto
export const useHasWish = (productId: string): boolean => {
  return useWishlist((state) => Boolean(state.ids[productId]))
}


