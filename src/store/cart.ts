import { create } from 'zustand'

export type CartItem = {
  id: string
  name: string
  price: number
  image?: string
  quantity: number
}

type CartState = {
  items: Record<string, CartItem>
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  addItem: (item, qty = 1) => {
    const prev = get().items
    const existing = prev[item.id]
    const nextQty = (existing?.quantity ?? 0) + qty
    set({
      items: {
        ...prev,
        [item.id]: { ...item, quantity: nextQty },
      },
    })
  },
  removeItem: (id) => {
    const prev = { ...get().items }
    delete prev[id]
    set({ items: prev })
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    const prev = { ...get().items }
    if (prev[id]) {
      prev[id] = { ...prev[id], quantity }
      set({ items: prev })
    }
  },
  clearCart: () => set({ items: {} }),
}))

export function selectCartList(state: CartState): CartItem[] {
  return Object.values(state.items)
}

export function selectCartCount(state: CartState): number {
  return Object.values(state.items).reduce((acc, it) => acc + it.quantity, 0)
}

export function selectCartTotal(state: CartState): number {
  return Object.values(state.items).reduce((acc, it) => acc + it.quantity * it.price, 0)
}


