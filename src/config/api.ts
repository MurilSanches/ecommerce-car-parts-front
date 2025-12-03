export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api'

function getUserId(): string | null {
  try {
    const raw = localStorage.getItem('auth:user')
    if (!raw) {
      return null
    }
    
    const user = JSON.parse(raw) as { id?: string; userId?: string }
    const userId = user?.id || user?.userId
    
    if (userId && typeof userId === 'string' && userId.trim() !== '') {
      return userId
    }
    
    return null
  } catch {
    return null
  }
}

export const api = {
  baseUrl: API_BASE_URL,
  
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const userId = getUserId()
    const method = options.method || 'GET'
    
    const requiresAuth = 
      method === 'POST' || 
      method === 'PUT' || 
      method === 'DELETE' ||
      endpoint.includes('/suppliers/me')
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value
        })
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value
        })
      } else {
        Object.assign(headers, options.headers)
      }
    }
    
    if (requiresAuth && userId) {
      headers['X-User-Id'] = userId
    }
    
    const fetchOptions: RequestInit = {
      method,
      body: options.body,
      credentials: options.credentials,
      mode: options.mode,
      cache: options.cache,
      redirect: options.redirect,
      referrer: options.referrer,
      referrerPolicy: options.referrerPolicy,
      integrity: options.integrity,
      keepalive: options.keepalive,
      signal: options.signal,
      headers,
    }
    
    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
      throw new Error(error.message || `Erro ${response.status}: ${response.statusText}`)
    }

    return response.json()
  },

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  },

  post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  },
}

