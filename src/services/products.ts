import { api } from '../config/api'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  brand: string
  model?: string
  year?: string
  images?: string[]
  specifications?: string
  supplierId?: string
  active?: boolean
  createdAt?: string
  updatedAt?: string
}

export type ProductPageResponse = {
  content: Product[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

export type ProductFilters = {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  category?: string
  brand?: string
  name?: string
  minPrice?: number
  maxPrice?: number
  supplierId?: string
}

export const productsService = {
  async getAll(filters?: ProductFilters): Promise<ProductPageResponse> {
    const params = new URLSearchParams()
    
    if (filters?.page !== undefined) params.append('page', filters.page.toString())
    if (filters?.size !== undefined) params.append('size', filters.size.toString())
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortDir) params.append('sortDir', filters.sortDir)
    
    const query = params.toString()
    return api.get<ProductPageResponse>(`/products${query ? `?${query}` : ''}`)
  },

  async getById(id: string): Promise<Product> {
    return api.get<Product>(`/products/${id}`)
  },

  async getByCategory(category: string, page = 0, size = 10): Promise<ProductPageResponse> {
    return api.get<ProductPageResponse>(`/products/category/${encodeURIComponent(category)}?page=${page}&size=${size}`)
  },

  async getByBrand(brand: string, page = 0, size = 10): Promise<ProductPageResponse> {
    return api.get<ProductPageResponse>(`/products/brand/${encodeURIComponent(brand)}?page=${page}&size=${size}`)
  },

  async search(name: string, page = 0, size = 10): Promise<ProductPageResponse> {
    return api.get<ProductPageResponse>(`/products/search?name=${encodeURIComponent(name)}&page=${page}&size=${size}`)
  },

  async getByPriceRange(minPrice: number, maxPrice: number, page = 0, size = 10): Promise<ProductPageResponse> {
    return api.get<ProductPageResponse>(`/products/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`)
  },

  async getBySupplier(supplierId: string, page = 0, size = 10): Promise<ProductPageResponse> {
    return api.get<ProductPageResponse>(`/products/supplier/${supplierId}?page=${page}&size=${size}`)
  },

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return api.post<Product>('/products', data)
  },

  async update(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    return api.put<Product>(`/products/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return api.delete<void>(`/products/${id}`)
  },
}

