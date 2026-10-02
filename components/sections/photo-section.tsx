'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { names, photos } from '@/lib/content'
import { MemoryImage } from '@/components/memory-image'
import { SparkleField } from '@/components/sparkle-field'
import { LoveNoteDialog } from '@/components/sections/love-note-dialog'

export function PhotoSection() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useGSAP(
    () => {
      gsap.from('.photo-reveal', {
        autoAlpha: 0,
        y: 40,
        scale: 0.96,
        duration: 1.4,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      id="us"
      className="relative flex min-h-svh flex-col items-center justify-center gap-10 px-6 py-24"
    >
      <header className="photo-reveal text-center">
        <p className="eyebrow mb-3">Chapter One</p>
        <h2 className="font-script text-5xl text-moon text-glow md:text-7xl">You &amp; Me</h2>
      </header>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Open a message for ${names.him}`}
        className="photo-reveal group relative rounded-[2.25rem] focus-visible:outline-2 focus-visible:outline-offset-8"
      >
        <span className="photo-glow absolute -inset-4 rounded-[2.75rem]" aria-hidden="true" />
        <span className="relative block aspect-[4/5] w-[min(78vw,380px)] overflow-hidden rounded-[2rem] border border-moon/30 shadow-2xl">
          <span className="animate-slow-zoom absolute inset-0 block">
            <MemoryImage
              src={photos.together}
              alt={`${names.me} looking lovingly at ${names.him}`}
              sizes="(min-width: 768px) 380px, 78vw"
              priority
            />
          </span>
          <span
            className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent transition-opacity duration-700 group-hover:opacity-60"
            aria-hidden="true"
          />
          <span className="absolute inset-x-0 bottom-5 text-center font-script text-3xl text-moon text-glow">
            {names.him} &amp; {names.nickname}
          </span>
        </span>
        <SparkleField count={18} seed={11} className="-inset-10" />
      </button>

      <p className="photo-reveal animate-pulse-soft text-center text-lg italic text-muted-foreground">
        Tap our photo, {names.him}
      </p>

      <LoveNoteDialog open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
