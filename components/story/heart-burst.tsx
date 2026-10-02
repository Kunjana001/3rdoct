'use client'

import { useRef, useState } from 'react'
import { Heart } from 'lucide-react'
import { gsap } from '@/lib/gsap'

const HEARTS_PER_BURST = 18

export function HeartBurst() {
  const layerRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  const burst = () => {
    setCount((c) => c + 1)
    const layer = layerRef.current
    if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    for (let i = 0; i < HEARTS_PER_BURST; i++) {
      const heart = document.createElement('span')
      heart.textContent = '\u2665'
      heart.className = 'absolute left-1/2 top-1/2 text-rose pointer-events-none select-none'
      heart.style.fontSize = `${14 + Math.random() * 22}px`
      layer.appendChild(heart)
      const angle = (Math.PI * 2 * i) / HEARTS_PER_BURST + Math.random() * 0.4
      const distance = 80 + Math.random() * 140
      gsap.fromTo(
        heart,
        { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0.3, opacity: 1 },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 60,
          scale: 1,
          opacity: 0,
          rotate: Math.random() * 60 - 30,
          duration: 1.6 + Math.random() * 0.6,
          ease: 'power2.out',
          onComplete: () => heart.remove(),
        },
      )
    }
  }

  return (
    <div className="relative my-2">
      <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible" />
      <button
        type="button"
        onClick={burst}
        className="group flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-lg text-night shadow-[0_10px_40px_oklch(0.72_0.14_10/0.45)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
      >
        <Heart className="size-5 fill-current transition-transform group-hover:scale-110" aria-hidden="true" />
        Send all my love
      </button>
      <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
        {count > 0 ? `${count * 1000} kisses sent and counting` : 'Tap it, Mrinmoy'}
      </p>
    </div>
  )
}
