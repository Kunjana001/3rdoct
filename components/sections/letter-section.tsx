'use client'

import { useRef } from 'react'
import { Heart } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { letter } from '@/lib/content'

export function LetterSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.parchment', {
        autoAlpha: 0,
        y: 80,
        rotate: -2,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.parchment', start: 'top 85%' },
      })
      gsap.utils.toArray<HTMLElement>('.letter-line').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 18,
          filter: 'blur(4px)',
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="letter" className="relative px-4 py-24 md:py-36">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="burnt-edge">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="8" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div
        className="candle-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[140vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full md:size-[90vw]"
        aria-hidden="true"
      />

      <article className="parchment mx-auto max-w-2xl px-8 py-14 md:px-16 md:py-20">
        <p className="letter-line mb-2 text-center text-xs uppercase tracking-[0.45em] text-ink/60">
          A letter, sealed with love
        </p>
        <h2 className="letter-line text-balance text-center font-script text-5xl leading-tight text-ink md:text-6xl">
          {letter.title}
        </h2>
        <div className="letter-line mx-auto my-8 flex items-center justify-center gap-3 text-ink/50" aria-hidden="true">
          <span className="h-px w-16 bg-current" />
          <Heart className="size-4 fill-current" />
          <span className="h-px w-16 bg-current" />
        </div>

        <p className="letter-line mb-6 font-script text-3xl text-ink md:text-4xl">{letter.greeting}</p>

        <div className="flex flex-col gap-5 text-pretty text-lg font-medium italic leading-relaxed text-ink/90 md:text-xl">
          {letter.paragraphs.map((p) => (
            <p key={p} className="letter-line">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 text-right">
          <p className="letter-line text-lg italic text-ink/80">{letter.closing}</p>
          <p className="letter-line mt-2 font-script text-4xl text-ink md:text-5xl">{letter.signature}</p>
        </div>
      </article>
    </section>
  )
}
