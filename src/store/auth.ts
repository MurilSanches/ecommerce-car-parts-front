import { create } from 'zustand'

export type AuthUser = {
  id: string
  name: string
  email: string
}

type AuthState = {
  user: AuthUser | null
  status: 'idle' | 'loading'
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  hydrate: () => void
}

const STORAGE_KEY = 'auth:user'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'idle',
  async login(email, _password) {
    set({ status: 'loading' })
    await new Promise((r) => setTimeout(r, 400))
    const user = { id: 'u1', name: email.split('@')[0] || 'Usuário', email }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    set({ user, status: 'idle' })
  },
  async register(name, email, _password) {
    set({ status: 'loading' })
    await new Promise((r) => setTimeout(r, 500))
    const user = { id: 'u2', name, email }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    set({ user, status: 'idle' })
  },
  logout() {
    localStorage.removeItem(STORAGE_KEY)
    set({ user: null })
  },
  hydrate() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const user = JSON.parse(raw) as AuthUser
        set({ user })
      } catch {}
    }
  },
}))


