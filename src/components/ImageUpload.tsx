import { useState, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { uploadImage, isSupabaseServiceConfigured } from '../config/supabase'

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  disabled?: boolean
}

export function ImageUpload({ images, onImagesChange, maxImages = 5, disabled = false }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length === 0) return

    if (!isSupabaseServiceConfigured()) {
      alert('Supabase Service Role não está configurado. Por favor, configure a variável VITE_SUPABASE_SERVICE_ROLE_KEY no arquivo .env')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      return
    }

    const remainingSlots = maxImages - images.length
    if (files.length > remainingSlots) {
      alert(`Você pode adicionar no máximo ${remainingSlots} imagem${remainingSlots > 1 ? 'ns' : ''} mais.`)
      return
    }

    setUploading(true)

    try {
      const uploadPromises = files.map(async (file) => {
        const tempId = `temp-${Date.now()}-${Math.random()}`
        setUploadProgress(prev => ({ ...prev, [tempId]: 0 }))

        try {
          const url = await uploadImage(file)
          setUploadProgress(prev => {
            const newProgress = { ...prev }
            delete newProgress[tempId]
            return newProgress
          })
          return url
        } catch (error) {
          setUploadProgress(prev => {
            const newProgress = { ...prev }
            delete newProgress[tempId]
            return newProgress
          })
          throw error
        }
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      onImagesChange([...images, ...uploadedUrls])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer upload das imagens'
      alert(errorMessage)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click()
    }
  }

  const supabaseConfigured = isSupabaseServiceConfigured()

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-700 mb-2">
        Imagens do Produto {images.length > 0 && `(${images.length}/${maxImages})`}
      </label>

      {!supabaseConfigured && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium mb-1">Supabase não configurado</p>
            <p className="text-xs">
              Para fazer upload de imagens, configure as variáveis de ambiente no arquivo .env:
            </p>
            <ul className="text-xs mt-1 ml-4 list-disc">
              <li>VITE_SUPABASE_URL</li>
              <li>VITE_SUPABASE_SERVICE_ROLE_KEY</li>
            </ul>
            <p className="text-xs mt-2">
              Você ainda pode adicionar URLs de imagens manualmente abaixo.
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-zinc-200 bg-zinc-50">
              <img
                src={url}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label="Remover imagem"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={handleClick}
            disabled={disabled || uploading || !supabaseConfigured}
            className="aspect-square rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 hover:border-orange-500 hover:bg-orange-50 transition-colors flex flex-col items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            title={!supabaseConfigured ? 'Configure o Supabase para fazer upload de imagens' : ''}
          >
            {uploading ? (
              <>
                <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                <span className="text-xs text-zinc-600">Enviando...</span>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 text-zinc-400" />
                <span className="text-xs text-zinc-600">Adicionar</span>
              </>
            )}
          </button>
        )}
      </div>

      {images.length === 0 && !uploading && (
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <ImageIcon className="w-4 h-4" />
          <span>Adicione até {maxImages} imagens do produto</span>
        </div>
      )}

      {Object.keys(uploadProgress).length > 0 && (
        <div className="text-sm text-zinc-600">
          Fazendo upload de {Object.keys(uploadProgress).length} imagem(ns)...
        </div>
      )}
    </div>
  )
}

