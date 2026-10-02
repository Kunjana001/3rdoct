'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { photoMessage } from '@/lib/content'

export function LoveNoteDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.note-panel',
          { autoAlpha: 0, y: 30, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
        )
        gsap.fromTo(
          '.note-line',
          { autoAlpha: 0, y: 14, filter: 'blur(6px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.45,
            delay: 0.5,
            ease: 'power2.out',
          },
        )
      }, dialog)
      return () => ctx.revert()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
      aria-labelledby="love-note-title"
      className="m-auto max-h-[90svh] w-[min(92vw,640px)] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      <div className="note-panel glass relative max-h-[90svh] overflow-y-auto rounded-3xl px-7 py-12 text-center md:px-12">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Close message"
        >
          <X className="size-5" />
        </button>

        <h2
          id="love-note-title"
          className="note-line text-balance font-script text-4xl leading-tight text-moon text-glow md:text-5xl"
        >
          {photoMessage.title}
        </h2>
        <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-moon/60 to-transparent" />
        <div className="flex flex-col gap-4 text-pretty text-lg italic leading-relaxed text-foreground/90 md:text-xl">
          {photoMessage.paragraphs.map((p) => (
            <p key={p} className="note-line">
              {p}
            </p>
          ))}
        </div>
        <p className="note-line mt-8 font-script text-3xl text-moon">{photoMessage.signOff}</p>
      </div>
    </dialog>
  )
}
