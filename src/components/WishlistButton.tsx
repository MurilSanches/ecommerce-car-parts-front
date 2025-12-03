import { useWishlist } from '../store/wishlist'
import { Heart } from 'lucide-react'

interface WishlistButtonProps {
  productId: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function WishlistButton({ 
  productId, 
  className = '', 
  size = 'md',
  showLabel = false 
}: WishlistButtonProps) {
  const isInWishlist = useWishlist((state) => Boolean(state.ids[productId]))
  const toggleWish = useWishlist((s) => s.toggle)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <button
      aria-label={isInWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      onClick={() => toggleWish(productId)}
      className={className}
    >
      <Heart className={`${sizeClasses[size]} ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-zinc-400'} transition-colors`} />
      {showLabel && (
        <span className="ml-1 text-sm">
          {isInWishlist ? 'Favorito' : 'Favoritar'}
        </span>
      )}
    </button>
  )
}

