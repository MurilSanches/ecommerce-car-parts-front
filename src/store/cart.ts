import { create } from 'zustand'

export type CartItem = {
  id: string
  name: string
  price: number
  image?: string
  qty: number
}

type CartState = {
  items: Record<string, CartItem>
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  addItem: (item, qty = 1) => {
    const prev = get().items
    const existing = prev[item.id]
    const nextQty = (existing?.qty ?? 0) + qty
    set({
      items: {
        ...prev,
        [item.id]: { ...item, qty: nextQty },
      },
    })
  },
  removeItem: (id) => {
    const prev = { ...get().items }
    delete prev[id]
    set({ items: prev })
  },
  clear: () => set({ items: {} }),
}))

export function selectCartList(state: CartState): CartItem[] {
  return Object.values(state.items)
}

export function selectCartCount(state: CartState): number {
  return Object.values(state.items).reduce((acc, it) => acc + it.qty, 0)
}

export function selectCartTotal(state: CartState): number {
  return Object.values(state.items).reduce((acc, it) => acc + it.qty * it.price, 0)
}


