'use client'

import { gsap, useGSAP } from '@/lib/gsap'

/** Wires scroll-driven reveals, parallax and color reveals for every `data-*` hook on the page. */
export function StoryMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 48,
          filter: 'blur(10px)',
          duration: 1.3,
          delay: Number(el.dataset.revealDelay ?? 0),
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const strength = Number(el.dataset.parallax) || 1
        gsap.fromTo(
          el,
          { yPercent: -7 * strength },
          {
            yPercent: 7 * strength,
            ease: 'none',
            scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-color-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { filter: 'grayscale(1) brightness(0.7) contrast(1.1)' },
          {
            filter: 'grayscale(0) brightness(1) contrast(1)',
            ease: 'none',
            scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top 70%', end: 'center 45%', scrub: true },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-tilt-in]').forEach((el, i) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 80,
          rotate: Number(el.dataset.tiltIn) * 3,
          scale: 0.85,
          duration: 1.2,
          delay: (i % 4) * 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    })

    return () => mm.revert()
  })

  return null
}
