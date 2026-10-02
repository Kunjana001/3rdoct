'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { LullabySynth } from '@/lib/lullaby-synth'
import { cn } from '@/lib/utils'

const AUDIO_SRC = '/audio/love.mp3'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const synthRef = useRef<LullabySynth | null>(null)
  const [hasFile, setHasFile] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [muted, setMuted] = useState(false)

  const effectiveVolume = muted ? 0 : volume

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = effectiveVolume
    synthRef.current?.setVolume(effectiveVolume)
  }, [effectiveVolume])

  useEffect(() => () => synthRef.current?.dispose(), [])

  const togglePlay = async () => {
    if (hasFile && audioRef.current) {
      const audio = audioRef.current
      if (audio.paused) await audio.play().catch(() => {})
      else audio.pause()
      return
    }

    if (playing) {
      synthRef.current?.stop()
      setPlaying(false)
      return
    }
    synthRef.current ??= new LullabySynth(effectiveVolume)
    await synthRef.current.start()
    setPlaying(true)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="metadata"
        onLoadedMetadata={() => setHasFile(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div
        role="group"
        aria-label="Background music"
        className="glass flex items-center gap-3 rounded-full py-2 pl-2 pr-4"
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pause background music' : 'Play background music'}
          className={cn(
            'moon-play flex size-11 shrink-0 items-center justify-center rounded-full text-night transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moon',
            !playing && 'animate-pulse-ring',
          )}
        >
          {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
        </button>

        <div className="hidden min-w-0 flex-col sm:flex">
          <span className="text-sm leading-tight text-moon">Our Melody</span>
          <span className="text-xs leading-tight text-muted-foreground">
            {playing ? 'Now playing, for you' : 'Tap to play our song'}
          </span>
        </div>

        <div className={cn('flex h-5 items-end gap-0.5', playing && 'is-playing')} aria-hidden="true">
          {[0, 0.2, 0.4, 0.1].map((delay, i) => (
            <span key={i} className="audio-bar h-full" style={{ animationDelay: `${delay}s` }} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          aria-pressed={muted}
          className="text-moon/80 transition-colors hover:text-moon"
        >
          {muted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>

        <label className="hidden items-center sm:flex">
          <span className="sr-only">Music volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => {
              setVolume(Number(e.target.value))
              setMuted(false)
            }}
            className="volume-slider w-20"
          />
        </label>
      </div>
    </div>
  )
}
