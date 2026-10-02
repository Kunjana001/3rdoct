'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { futureMemories, type MemoryScene } from '@/lib/content'
import { MemoryImage } from '@/components/memory-image'
import { SparkleField } from '@/components/sparkle-field'
import { cn } from '@/lib/utils'

function Petals({ count = 10, slow = false }: { count?: number; slow?: boolean }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDuration: `${(slow ? 12 : 7) + (i % 4) * 1.5}s`,
            animationDelay: `${-i * 1.1}s`,
            transform: `scale(${0.6 + (i % 3) * 0.25})`,
          }}
        />
      ))}
    </>
  )
}

function FloatingLights({ count = 8, cool = false }: { count?: number; cool?: boolean }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="float-light bottom-0"
          style={{
            left: `${(i * 29 + 7) % 95}%`,
            width: 8 + (i % 4) * 6,
            height: 8 + (i % 4) * 6,
            animationDuration: `${8 + (i % 5) * 2}s`,
            animationDelay: `${-i * 1.4}s`,
            filter: cool ? 'hue-rotate(170deg) saturate(0.6)' : undefined,
          }}
        />
      ))}
    </>
  )
}

function SceneOverlay({ scene }: { scene: MemoryScene }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {scene === 'blossoms' && <Petals count={14} />}
      {scene === 'moon' && (
        <>
          <div className="moon absolute right-5 top-5 size-12 rounded-full opacity-90" />
          <SparkleField count={14} seed={21} />
        </>
      )}
      {scene === 'work' && <FloatingLights count={10} cool />}
      {scene === 'travel' && (
        <>
          <div className="cloud animate-drift absolute top-[12%] h-24 w-72 rounded-full" style={{ animationDuration: '40s' }} />
          <SparkleField count={10} seed={34} />
        </>
      )}
      {scene === 'celebrate' && (
        <>
          <FloatingLights count={12} />
          <SparkleField count={16} seed={55} />
        </>
      )}
      {scene === 'forever' && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,oklch(0.82_0.11_75/0.3),transparent_60%)]" />
          <Petals count={8} slow />
        </>
      )}
    </div>
  )
}

export function FutureSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.future-title', {
        autoAlpha: 0,
        y: 30,
        filter: 'blur(8px)',
        duration: 1.4,
        stagger: 0.2,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.utils.toArray<HTMLElement>('.future-item').forEach((item) => {
        gsap.from(item.querySelectorAll('.future-reveal'), {
          autoAlpha: 0,
          y: 50,
          duration: 1.3,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 80%' },
        })
        gsap.fromTo(
          item.querySelector('.future-parallax'),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="future" className="relative px-5 py-24 md:py-36">
      <header className="mx-auto mb-20 max-w-2xl text-center">
        <p className="future-title eyebrow mb-4">Chapter Five</p>
        <h2 className="future-title text-balance font-script text-5xl leading-tight text-moon text-glow md:text-7xl">
          The Future I Dream Of With You
        </h2>
        <p className="future-title mt-6 text-pretty text-lg italic text-muted-foreground">
          Every chapter I imagine has the two of us in it.
        </p>
      </header>

      <ol className="mx-auto flex max-w-5xl flex-col gap-24 md:gap-32">
        {futureMemories.map((memory, i) => (
          <li
            key={memory.title}
            className={cn(
              'future-item flex flex-col items-center gap-8 md:flex-row md:gap-14',
              i % 2 === 1 && 'md:flex-row-reverse',
            )}
          >
            <div className="future-reveal relative w-full max-w-md md:w-1/2">
              <div className="absolute -inset-3 rounded-[2.25rem] bg-moon/10 blur-2xl" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-moon/20">
                <div className="future-parallax absolute -inset-y-[10%] inset-x-0">
                  <MemoryImage
                    src={memory.photo}
                    alt={memory.alt}
                    position={memory.pos}
                    sizes="(min-width: 768px) 448px, 90vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-night/20" aria-hidden="true" />
                <SceneOverlay scene={memory.scene} />
              </div>
            </div>

            <div className="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
              <span className="future-reveal font-script text-6xl text-moon/40">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="future-reveal mt-2 text-balance text-3xl font-semibold text-foreground md:text-4xl">
                {memory.title}
              </h3>
              <p className="future-reveal mt-4 max-w-sm text-pretty text-xl italic leading-relaxed text-muted-foreground">
                {memory.caption}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
