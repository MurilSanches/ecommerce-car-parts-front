import { api } from '../config/api'

export type RegisterRequest = {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  role?: 'USER' | 'ADMIN'
}

export type LoginRequest = {
  email: string
  password: string
}

export type UserResponse = {
  userId: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  role?: string
  message?: string
}

export const authService = {
  async register(data: RegisterRequest): Promise<UserResponse> {
    return api.post<UserResponse>('/auth/register', data)
  },

  async login(data: LoginRequest): Promise<UserResponse> {
    return api.post<UserResponse>('/auth/login', data)
  },
}

