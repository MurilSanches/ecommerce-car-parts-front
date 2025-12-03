import { api } from '../config/api'

export type Supplier = {
  id: string
  name: string
  description?: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  contactPerson?: string
  createdAt?: string
  updatedAt?: string
}

export type CreateSupplierRequest = {
  name: string
  description?: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  contactPerson?: string
}

export const suppliersService = {
  async getAll(): Promise<Supplier[]> {
    return api.get<Supplier[]>('/suppliers')
  },

  async getMySupplier(): Promise<Supplier> {
    return api.get<Supplier>('/suppliers/me')
  },

  async getById(id: string): Promise<Supplier> {
    return api.get<Supplier>(`/suppliers/${id}`)
  },

  async create(data: CreateSupplierRequest): Promise<Supplier> {
    return api.post<Supplier>('/suppliers', data)
  },

  async update(id: string, data: Partial<CreateSupplierRequest>): Promise<Supplier> {
    return api.put<Supplier>(`/suppliers/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return api.delete<void>(`/suppliers/${id}`)
  },
}

