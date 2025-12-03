import { create } from 'zustand'
import { authService, type UserResponse } from '../services/auth'
import { suppliersService } from '../services/suppliers'

export type AuthUser = {
  id: string
  name: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
}

type AuthState = {
  user: AuthUser | null
  hasSupplier: boolean
  status: 'idle' | 'loading' | 'error'
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (firstName: string, lastName: string, email: string, password: string, phone?: string, address?: string) => Promise<void>
  logout: () => void
  hydrate: () => void
  checkSupplier: () => Promise<void>
}

const STORAGE_KEY = 'auth:user'

function mapUserResponseToAuthUser(user: UserResponse): AuthUser {
  if (!user.userId) {
    throw new Error('Resposta do servidor não contém userId')
  }
  
  return {
    id: user.userId,
    name: `${user.firstName} ${user.lastName}`.trim() || user.email.split('@')[0],
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    address: user.address,
  }
}

async function checkUserSupplier(): Promise<boolean> {
  try {
    await suppliersService.getMySupplier()
    return true
  } catch {
    return false
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  hasSupplier: false,
  status: 'idle',
  error: null,
  async login(email, password) {
    set({ status: 'loading', error: null })
    try {
      const userResponse = await authService.login({ email, password })
      const user = mapUserResponseToAuthUser(userResponse)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      
      const hasSupplier = await checkUserSupplier()
      set({ user, hasSupplier, status: 'idle', error: null })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login'
      set({ status: 'error', error: errorMessage, user: null, hasSupplier: false })
      throw error
    }
  },
  async register(firstName, lastName, email, password, phone, address) {
    set({ status: 'loading', error: null })
    try {
      const userResponse = await authService.register({
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        role: 'USER',
      })
      const user = mapUserResponseToAuthUser(userResponse)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      
      set({ user, hasSupplier: false, status: 'idle', error: null })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar conta'
      set({ status: 'error', error: errorMessage, user: null, hasSupplier: false })
      throw error
    }
  },
  logout() {
    localStorage.removeItem(STORAGE_KEY)
    set({ user: null, hasSupplier: false, error: null })
  },
  hydrate() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const user = JSON.parse(raw) as AuthUser
        set({ user })
        get().checkSupplier()
      } catch {}
    }
  },
  async checkSupplier() {
    const { user } = get()
    if (user) {
      const hasSupplier = await checkUserSupplier()
      set({ hasSupplier })
    } else {
      set({ hasSupplier: false })
    }
  },
}))


