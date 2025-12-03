import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY?.trim()

let supabase: SupabaseClient | null = null
let supabaseService: SupabaseClient | null = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

if (supabaseUrl && supabaseServiceRoleKey) {
  supabaseService = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })
}

export const isSupabaseConfigured = (): boolean => {
  return supabase !== null && !!supabaseUrl && !!supabaseAnonKey
}

export const isSupabaseServiceConfigured = (): boolean => {
  return supabaseService !== null && !!supabaseUrl && !!supabaseServiceRoleKey
}

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabase) {
    throw new Error('Supabase não está configurado. Verifique as variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env')
  }
  return supabase
}


export const uploadImage = async (file: File, folder: string = 'products'): Promise<string> => {
  if (!isSupabaseServiceConfigured()) {
    throw new Error('Supabase Service Role não está configurado. Verifique a variável VITE_SUPABASE_SERVICE_ROLE_KEY no arquivo .env')
  }

  if (!supabaseService) {
    throw new Error('Cliente Supabase Service não inicializado')
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { data, error } = await supabaseService.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'image/jpeg'
    })

  if (error) {
    throw new Error(`Erro ao fazer upload da imagem: ${error.message}`)
  }

  if (!data?.path) {
    throw new Error('Upload realizado mas não foi possível obter o caminho do arquivo')
  }

  const { data: { publicUrl } } = supabaseService.storage
    .from('product-images')
    .getPublicUrl(data.path)

  return publicUrl
}

export const deleteImage = async (filePath: string): Promise<void> => {
  if (!isSupabaseServiceConfigured()) {
    throw new Error('Supabase Service Role não está configurado. Verifique a variável VITE_SUPABASE_SERVICE_ROLE_KEY no arquivo .env')
  }

  if (!supabaseService) {
    throw new Error('Cliente Supabase Service não inicializado')
  }

  const { error } = await supabaseService.storage
    .from('product-images')
    .remove([filePath])

  if (error) {
    throw new Error(`Erro ao deletar imagem: ${error.message}`)
  }
}

