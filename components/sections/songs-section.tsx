'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import { gsap, skyEvents, useGSAP } from '@/lib/gsap'
import { songs, type Song } from '@/lib/content'
import { cn } from '@/lib/utils'

const bars = [0, 0.2, 0.45, 0.1, 0.35, 0.6, 0.15]

function SongCard({
  song,
  index,
  playing,
  onToggle,
}: {
  song: Song
  index: number
  playing: boolean
  onToggle: () => void
}) {
  const externalUrl = song.spotifyUrl || song.youtubeUrl
  const canPlay = Boolean(song.audioSrc || externalUrl)

  return (
    <article
      className={cn(
        'group glass relative flex flex-col gap-4 overflow-hidden rounded-3xl p-4 transition-transform duration-700 hover:-translate-y-2',
        playing && 'is-playing',
      )}
    >
      <span
        className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[300%]"
        aria-hidden="true"
      />
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src={song.cover || '/placeholder.svg'}
          alt={`Album artwork for ${song.title}`}
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={onToggle}
          disabled={!canPlay}
          className="moon-play absolute bottom-3 right-3 flex size-12 items-center justify-center rounded-full transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={playing ? `Pause ${song.title}` : `Play ${song.title}`}
        >
          {playing ? (
            <Pause className="size-5 fill-night text-night" aria-hidden="true" />
          ) : (
            <Play className="ml-0.5 size-5 fill-night text-night" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="flex items-end justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold text-foreground">{song.title}</h3>
          <p className="truncate text-sm italic text-muted-foreground">{song.artist}</p>
        </div>
        <div className="flex h-6 items-end gap-0.5" aria-hidden="true">
          {bars.map((delay, i) => (
            <span key={i} className="audio-bar h-full" style={{ animationDelay: `${delay}s` }} />
          ))}
        </div>
      </div>

      <div className="flex gap-2 px-1 pb-1 text-xs uppercase tracking-[0.2em]">
        {song.spotifyUrl ? (
          <a href={song.spotifyUrl} target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-1.5 text-moon transition-colors hover:bg-secondary">
            Spotify
          </a>
        ) : null}
        {song.youtubeUrl ? (
          <a href={song.youtubeUrl} target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-1.5 text-moon transition-colors hover:bg-secondary">
            YouTube
          </a>
        ) : null}
        {!song.spotifyUrl && !song.youtubeUrl ? (
          <span className="px-1 py-1.5 text-muted-foreground">Links coming soon</span>
        ) : null}
      </div>
    </article>
  )
}

export function SongsSection() {
  const ref = useRef<HTMLElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  useGSAP(
    () => {
      gsap.from('.songs-title', {
        autoAlpha: 0,
        y: 30,
        duration: 1.2,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.from('.song-card', {
        autoAlpha: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.songs-grid', start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  const toggle = (index: number) => {
    const song = songs[index]
    const audio = audioRef.current
    if (!song.audioSrc) {
      const url = song.spotifyUrl || song.youtubeUrl
      if (url) window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    if (!audio) return
    if (playingIndex === index) {
      audio.pause()
      setPlayingIndex(null)
      return
    }
    window.dispatchEvent(new Event(skyEvents.videoPlay))
    audio.src = song.audioSrc
    audio.play().then(() => setPlayingIndex(index)).catch(() => setPlayingIndex(null))
  }

  return (
    <section ref={ref} id="songs" className="relative px-5 py-24 md:py-36">
      <audio ref={audioRef} onEnded={() => setPlayingIndex(null)} />
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <p className="songs-title eyebrow mb-4">Chapter Four</p>
        <h2 className="songs-title text-balance font-script text-5xl leading-tight text-moon text-glow md:text-7xl">
          Songs That Remind Me Of You
        </h2>
      </header>
      <div className="songs-grid mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {songs.map((song, i) => (
          <div key={`${song.title}-${i}`} className="song-card">
            <div style={{ animation: `bob ${7 + i}s ease-in-out ${i * 0.8}s infinite` }}>
              <SongCard
                song={song}
                index={i}
                playing={playingIndex === i}
                onToggle={() => toggle(i)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
