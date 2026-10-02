'use client'

import { useRef } from 'react'
import { Heart } from 'lucide-react'
import { gsap, skyEvents, skyState, useGSAP } from '@/lib/gsap'
import { finale } from '@/lib/content'
import { ShareQr } from '@/components/sections/share-qr'

const heartPoints = Array.from({ length: 20 }, (_, i) => {
  const t = (i / 20) * Math.PI * 2
  const x = 16 * Math.sin(t) ** 3
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
  return { x: +x.toFixed(2), y: +y.toFixed(2), r: i % 5 === 0 ? 0.75 : 0.45 }
}).filter((_, i) => ![1, 9, 11, 19].includes(i))
const heartPath = `M ${heartPoints.map((p) => `${p.x} ${p.y}`).join(' L ')} Z`

export function FinaleSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = document.documentElement
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 55%',
          onEnter: () => {
            skyState.brightness = 1.8
            gsap.to(root, { '--moon-intensity': 2.2, duration: 3, ease: 'sine.inOut' })
            window.dispatchEvent(new Event(skyEvents.finale))
          },
          onLeaveBack: () => {
            skyState.brightness = 1
            gsap.to(root, { '--moon-intensity': 1, duration: 2 })
          },
        },
      })

      tl.from('.heart-star', {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: 'center',
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(3)',
      })
        .fromTo(
          '.heart-line',
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 2.4, ease: 'power1.inOut' },
          '-=0.6',
        )
        .from('.heart-fill', { autoAlpha: 0, duration: 1.6 }, '-=0.8')
        .from(
          '.finale-line',
          { autoAlpha: 0, y: 24, filter: 'blur(10px)', duration: 1.6, stagger: 0.9, ease: 'power2.out' },
          '-=0.6',
        )
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      id="finale"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,oklch(0.45_0.08_260/0.35),transparent_65%)]"
        aria-hidden="true"
      />

      <svg
        viewBox="-20 -16 40 36"
        className="w-[min(70vw,320px)] overflow-visible"
        role="img"
        aria-label="Stars forming a heart-shaped constellation"
      >
        <defs>
          <radialGradient id="heart-glow">
            <stop offset="0%" stopColor="oklch(0.85 0.1 10 / 0.35)" />
            <stop offset="100%" stopColor="oklch(0.85 0.1 10 / 0)" />
          </radialGradient>
          <filter id="star-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path className="heart-fill" d={heartPath} fill="url(#heart-glow)" />
        <path
          className="heart-line"
          d={heartPath}
          fill="none"
          stroke="oklch(0.92 0.03 250 / 0.55)"
          strokeWidth="0.18"
          pathLength={1}
          strokeDasharray="1"
        />
        {heartPoints.map((p, i) => (
          <circle
            key={i}
            className="heart-star"
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="oklch(0.98 0.01 250)"
            filter="url(#star-glow)"
          />
        ))}
      </svg>

      <div className="mt-12 flex max-w-3xl flex-col items-center gap-6">
        <p className="finale-line text-balance text-2xl font-light italic leading-relaxed text-foreground md:text-4xl">
          {finale.line}
        </p>
        <h2 className="finale-line font-script text-6xl text-moon text-glow md:text-8xl">{finale.title}</h2>
        <p className="finale-line font-script text-3xl text-candle text-glow-warm md:text-4xl">{finale.signOff}</p>
        <p className="finale-line mt-6 text-sm uppercase tracking-[0.35em] text-muted-foreground">
          {finale.lifetime}
        </p>
        <Heart
          className="finale-line animate-heartbeat mt-4 size-8 fill-rose text-rose drop-shadow-[0_0_14px_oklch(0.72_0.14_10/0.8)]"
          aria-hidden="true"
        />
      </div>

      <footer className="finale-line mt-20 flex flex-col items-center gap-6">
        <ShareQr />
        <p className="text-sm italic text-muted-foreground">{finale.credit}</p>
      </footer>
    </section>
  )
}
