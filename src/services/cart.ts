import { api } from '../config/api'

export type CartItem = {
  product: {
    id: string
    name: string
    price: number
    images?: string[]
  }
  quantity: number
  unitPrice: number
  totalPrice: number
}

export type Cart = {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  totalItems: number
  createdAt?: string
  updatedAt?: string
}

export type Order = {
  id: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  items: CartItem[]
  totalAmount: number
  totalItems: number
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'DELIVERED'
  createdAt: string
  updatedAt: string
}

export const cartService = {
  async createCart(userId: string): Promise<Cart> {
    return api.post<Cart>(`/cart/${userId}`)
  },

  async getCart(userId: string): Promise<Cart> {
    return api.get<Cart>(`/cart/${userId}`)
  },

  async addItem(userId: string, productId: string, quantity: number = 1): Promise<Cart> {
    return api.post<Cart>(`/cart/${userId}/add?productId=${productId}&quantity=${quantity}`)
  },

  async updateItem(userId: string, productId: string, quantity: number): Promise<Cart> {
    return api.put<Cart>(`/cart/${userId}/update?productId=${productId}&quantity=${quantity}`)
  },

  async removeItem(userId: string, productId: string): Promise<Cart> {
    return api.delete<Cart>(`/cart/${userId}/remove?productId=${productId}`)
  },

  async clearCart(userId: string): Promise<void> {
    return api.delete<void>(`/cart/${userId}/clear`)
  },

  async checkout(userId: string): Promise<Order> {
    return api.post<Order>(`/cart/${userId}/checkout`)
  },
}

