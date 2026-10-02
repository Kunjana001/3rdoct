'use client'

import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { gsap, skyEvents, useGSAP } from '@/lib/gsap'
import { intro, names } from '@/lib/content'
import { SparkleField } from '@/components/sparkle-field'

export function IntroSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.intro-eyebrow', { autoAlpha: 0, y: 12, letterSpacing: '0.8em', duration: 1.6 })
        .from('.intro-name', { autoAlpha: 0, scale: 0.9, filter: 'blur(12px)', duration: 1.8 }, '-=0.8')
        .from(
          '.intro-word',
          { autoAlpha: 0, y: 18, filter: 'blur(8px)', duration: 1.1, stagger: 0.09 },
          '-=1',
        )
        .from('.intro-cta', { autoAlpha: 0, y: 16, duration: 1.2 }, '-=0.3')
    },
    { scope: ref },
  )

  const begin = () => {
    window.dispatchEvent(new Event(skyEvents.begin))
    document.getElementById('us')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="intro"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <SparkleField count={22} seed={3} />

      <p className="intro-eyebrow eyebrow mb-8">{intro.eyebrow}</p>

      <h1 className="max-w-3xl text-balance">
        <span className="intro-name block font-script text-6xl leading-tight text-moon text-glow md:text-8xl">
          For {names.him},
        </span>
        <span className="mt-4 block font-serif text-2xl font-light italic leading-relaxed text-foreground/90 md:text-4xl">
          {intro.quote.split(' ').map((word, i) => (
            <span key={i} className="intro-word inline-block whitespace-pre">
              {word}{' '}
            </span>
          ))}
          <span className="intro-word inline-block text-rose" aria-hidden="true">
            {'\u2764\uFE0F'}
          </span>
        </span>
      </h1>

      <button
        type="button"
        onClick={begin}
        className="intro-cta group mt-16 flex flex-col items-center gap-3 rounded-full px-8 py-4 text-sm uppercase tracking-[0.4em] text-moon/90 transition-colors hover:text-moon focus-visible:outline-2"
      >
        <span className="animate-pulse-soft text-glow">Tap To Begin</span>
        <ChevronDown className="size-5 animate-bounce opacity-70" aria-hidden="true" />
      </button>
    </section>
  )
}
