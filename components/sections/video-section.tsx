'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Heart, Play, Sparkles } from 'lucide-react'
import { gsap, skyEvents, skyState, useGSAP } from '@/lib/gsap'
import { video } from '@/lib/content'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'playing' | 'ended'

const gatherStars = Array.from({ length: 36 }, (_, i) => {
  const angle = (i / 36) * Math.PI * 2
  const seed = Math.sin(i * 12.9898) * 43758.5453
  const r = seed - Math.floor(seed)
  return {
    fromX: (r - 0.5) * 900,
    fromY: (((r * 7.31) % 1) - 0.5) * 600,
    toX: Math.cos(angle) * 150,
    toY: Math.sin(angle) * 46,
  }
})

const hearts = [
  { left: '-4%', delay: '0s', size: 14 },
  { left: '102%', delay: '1.6s', size: 18 },
  { left: '-6%', delay: '3.4s', size: 12 },
  { left: '104%', delay: '4.8s', size: 14 },
  { left: '50%', delay: '2.4s', size: 12 },
]

export function VideoSection() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [missing, setMissing] = useState(false)
  const [surprise, setSurprise] = useState(false)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
      })
      tl.from('.video-title', { autoAlpha: 0, y: 30, duration: 1.2, ease: 'power3.out' })
        .fromTo(
          '.gather-star',
          { x: (i) => gatherStars[i].fromX, y: (i) => gatherStars[i].fromY, autoAlpha: 0 },
          {
            x: (i) => gatherStars[i].toX,
            y: (i) => gatherStars[i].toY,
            autoAlpha: 1,
            duration: 2,
            stagger: 0.02,
            ease: 'power2.inOut',
          },
          '-=0.6',
        )
        .from('.video-intro', { autoAlpha: 0, filter: 'blur(10px)', duration: 1.6 }, '-=0.6')
        .to('.gather-star', { scale: 0, autoAlpha: 0, duration: 1, stagger: 0.01 }, '+=0.4')
        .from(
          '.video-frame',
          { autoAlpha: 0, y: 40, scale: 0.97, duration: 1.4, ease: 'power3.out' },
          '-=0.8',
        )
    },
    { scope: ref },
  )

  useGSAP(
    () => {
      if (phase === 'ended') {
        gsap.from('.after-line', { autoAlpha: 0, y: 16, duration: 1.4, stagger: 1.4, ease: 'power2.out' })
        gsap.from('.one-more', { autoAlpha: 0, scale: 0.9, duration: 1, delay: 3.2 })
      }
    },
    { scope: ref, dependencies: [phase] },
  )

  useGSAP(
    () => {
      if (surprise) {
        gsap.from('.surprise-line', { autoAlpha: 0, y: 20, filter: 'blur(8px)', duration: 1.4, stagger: 1 })
      }
    },
    { scope: ref, dependencies: [surprise] },
  )

  const play = () => {
    const el = videoRef.current
    if (!el || missing) return
    el.play().catch(() => {})
  }

  return (
    <section ref={ref} id="memories" className="relative px-5 py-24 md:py-36">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="video-title eyebrow mb-4">Chapter Three</p>
        <h2 className="video-title max-w-3xl text-balance font-script text-4xl leading-tight text-moon text-glow md:text-6xl">
          {video.title}
        </h2>

        <div className="relative my-14 flex min-h-28 w-full items-center justify-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
            {gatherStars.map((_, i) => (
              <span
                key={i}
                className="gather-star absolute size-1.5 rounded-full bg-moon opacity-0 shadow-[0_0_10px_2px_oklch(0.92_0.04_255/0.8)]"
              />
            ))}
          </div>
          <p className="video-intro relative max-w-xl text-pretty text-xl italic leading-relaxed text-foreground/90 md:text-2xl">
            {video.intro}
          </p>
        </div>

        <div className="video-frame relative w-full">
          {phase === 'playing' &&
            hearts.map((h, i) => (
              <Heart
                key={i}
                aria-hidden="true"
                className="float-light pointer-events-none bottom-0 fill-rose/70 text-rose/70"
                style={{
                  left: h.left,
                  width: h.size,
                  height: h.size,
                  animationDuration: '7s',
                  animationDelay: h.delay,
                  background: 'none',
                }}
              />
            ))}

          <div
            className={cn(
              'absolute -inset-6 rounded-[2.5rem] bg-moon/10 blur-3xl transition-opacity duration-1000',
              phase === 'playing' ? 'opacity-100' : 'opacity-40',
            )}
            aria-hidden="true"
          />

          <div className="glass relative mx-auto w-full max-w-[min(100%,440px)] rounded-[2rem] p-2.5 md:p-4">
            <div className="pointer-events-none absolute inset-1.5 rounded-[1.7rem] border border-candle/25 md:inset-2.5" aria-hidden="true" />
            <div className="relative aspect-[780/1052] overflow-hidden rounded-[1.4rem] bg-black">
              <video
                ref={videoRef}
                src={video.src}
                poster={video.poster}
                preload="none"
                playsInline
                controls={phase !== 'idle'}
                className="size-full object-contain"
                onPlay={() => {
                  setPhase('playing')
                  skyState.brightness = 1.25
                  window.dispatchEvent(new Event(skyEvents.videoPlay))
                }}
                onEnded={() => {
                  setPhase('ended')
                  skyState.brightness = 1
                }}
                onError={() => setMissing(true)}
              >
                <track kind="captions" />
              </video>

              {phase === 'idle' && (
                <button
                  type="button"
                  onClick={play}
                  className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"
                  aria-label="Play our memories video"
                >
                  <Image src={video.poster} alt="" fill sizes="(min-width: 768px) 440px, 90vw" loading="lazy" className="object-cover" />
                  <span className="absolute inset-0 bg-night/45" aria-hidden="true" />
                  <span className="relative font-script text-3xl text-moon text-glow md:text-5xl">
                    {video.beforeTitle}
                  </span>
                  <span className="moon-play relative flex size-16 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110 md:size-24">
                    <Play className="ml-1 size-6 fill-night/80 text-night/80 md:size-8" aria-hidden="true" />
                  </span>
                  <span className="relative text-base italic text-foreground/90 md:text-lg">
                    {missing ? 'The video is on its way...' : video.beforeSubtitle}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {phase === 'ended' && (
          <div className="mt-14 flex flex-col items-center gap-4">
            {video.afterLines.map((line) => (
              <p key={line} className="after-line max-w-xl text-pretty text-xl italic text-foreground/90 md:text-2xl">
                {line}
              </p>
            ))}

            {!surprise ? (
              <button
                type="button"
                onClick={() => setSurprise(true)}
                className="one-more glass mt-8 flex items-center gap-2 rounded-full px-7 py-3 text-sm uppercase tracking-[0.3em] text-moon transition-transform hover:scale-105"
              >
                <Sparkles className="size-4" aria-hidden="true" />
                One More Thing...
              </button>
            ) : (
              <div className="mt-8 flex flex-col items-center gap-3" aria-live="polite">
                <p className="surprise-line font-script text-5xl text-moon text-glow md:text-6xl">
                  {video.surprise[0]}
                </p>
                <p className="surprise-line text-xl italic text-foreground/90">{video.surprise[1]}</p>
                <p className="surprise-line font-script text-3xl text-rose">{video.surprise[2]}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
