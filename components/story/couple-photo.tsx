import Image from 'next/image'
import { cn } from '@/lib/utils'
import { photos, type Crop } from '@/lib/content'

type CouplePhotoProps = {
  crop: Crop
  alt: string
  src?: string
  className?: string
  imageClassName?: string
  sizes?: string
  priority?: boolean
  /** Parallax strength; adds an oversized inner layer that drifts on scroll. */
  parallax?: number
  colorReveal?: boolean
}

export function CouplePhoto({
  crop,
  alt,
  src = photos.together,
  className,
  imageClassName,
  sizes = '(min-width: 768px) 50vw, 100vw',
  priority,
  parallax,
  colorReveal,
}: CouplePhotoProps) {
  const origin = `${crop.x}% ${crop.y}%`

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className={cn('absolute', parallax ? '-inset-[12%]' : 'inset-0')}
        data-parallax={parallax || undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          data-color-reveal={colorReveal || undefined}
          className={cn('object-cover', imageClassName)}
          style={{ objectPosition: origin, transform: `scale(${crop.zoom})`, transformOrigin: origin }}
        />
      </div>
    </div>
  )
}
