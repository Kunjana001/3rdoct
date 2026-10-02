'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export { gsap, ScrollTrigger, useGSAP }

/** Shared, mutable sky state read every frame by the Three.js starfield. */
export const skyState = { brightness: 1 }

export const skyEvents = {
  begin: 'sky:begin',
  finale: 'sky:finale',
  videoPlay: 'sky:video-play',
} as const
