import { create } from 'zustand'

type WishlistState = {
  ids: Record<string, true>
  toggle: (id: string) => void
  has: (id: string) => boolean
  hydrate: () => void
}

const STORAGE_KEY = 'wishlist:ids'

export const useWishlist = create<WishlistState>((set, get) => ({
  ids: {},
  toggle: (id) => {
    const next = { ...get().ids }
    if (next[id]) delete next[id]
    else next[id] = true
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.keys(next)))
    set({ ids: next })
  },
  has: (id) => Boolean(get().ids[id]),
  hydrate: () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const arr = JSON.parse(raw) as string[]
        const rec: Record<string, true> = {}
        for (const k of arr) rec[k] = true
        set({ ids: rec })
      } catch {}
    }
  },
}))


