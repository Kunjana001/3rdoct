'use client'

import { useEffect, useRef, useState } from 'react'
import { Music2, VolumeX } from 'lucide-react'
import { gsap, skyEvents } from '@/lib/gsap'

const TARGET_VOLUME = 0.35

export function AmbientMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const fadeTo = (volume: number, duration: number, pauseAfter = false) => {
      gsap.to(audio, {
        volume,
        duration,
        ease: 'sine.inOut',
        onComplete: () => {
          if (pauseAfter) audio.pause()
        },
      })
    }

    const onBegin = () => {
      if (!audio.paused) return
      audio.volume = 0
      audio
        .play()
        .then(() => fadeTo(TARGET_VOLUME, 3))
        .catch(() => {})
    }
    const onFinale = () => fadeTo(0, 7, true)
    const onVideoPlay = () => fadeTo(0, 1.2, true)

    window.addEventListener(skyEvents.begin, onBegin)
    window.addEventListener(skyEvents.finale, onFinale)
    window.addEventListener(skyEvents.videoPlay, onVideoPlay)
    return () => {
      window.removeEventListener(skyEvents.begin, onBegin)
      window.removeEventListener(skyEvents.finale, onFinale)
      window.removeEventListener(skyEvents.videoPlay, onVideoPlay)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.volume = TARGET_VOLUME
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/piano.mp3"
        loop
        preload="metadata"
        onLoadedMetadata={() => setAvailable(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {available && (
        <button
          type="button"
          onClick={toggle}
          className="glass fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full text-moon transition-transform hover:scale-105"
          aria-label={playing ? 'Pause background music' : 'Play background music'}
          aria-pressed={playing}
        >
          {playing ? <Music2 className="size-5 animate-pulse-soft" /> : <VolumeX className="size-5" />}
        </button>
      )}
    </>
  )
}
