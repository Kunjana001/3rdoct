'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

type MemoryImageProps = {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  /** CSS object-position, e.g. '50% 30%' (crop only, never edits the photo) */
  position?: string
}

/**
 * Renders a personal photo exactly as provided (no AI alteration).
 * Falls back to a soft placeholder until the photo is added to /public.
 */
export function MemoryImage({ src, alt, sizes = '100vw', priority, className, position }: MemoryImageProps) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <div
        className={cn(
          'flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-secondary to-background p-6 text-center',
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <Heart className="size-8 text-moon/70 animate-pulse-soft" aria-hidden="true" />
        <p className="font-script text-2xl text-moon/90">Our photo goes here</p>
        <p className="text-xs tracking-wide text-muted-foreground">
          {'Add it at public'}
          {src}
        </p>
      </div>
    )
  }

  return (
    <Image
      src={src || '/placeholder.svg'}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={position ? { objectPosition: position } : undefined}
      onError={() => setMissing(true)}
      className={cn('object-cover', className)}
    />
  )
}
