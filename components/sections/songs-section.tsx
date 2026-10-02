'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, skyEvents, useGSAP } from '@/lib/gsap'
import { songs, songsIntro, songsSignature, type Song } from '@/lib/content'
import { cn } from '@/lib/utils'

const bars = [0, 0.2, 0.45, 0.1, 0.35, 0.6, 0.15]

function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|embed\/)([\w-]{11})/)
  return m ? m[1] : ''
}

function SongCard({
  song,
  playing,
  onPlay,
}: {
  song: Song
  playing: boolean
  onPlay: () => void
}) {
  const id = youtubeId(song.youtubeUrl)
  const [title, setTitle] = useState(song.title)

  // Pull the real title from YouTube so it never has to be typed by hand.
  useEffect(() => {
    if (!/^Song \d$/.test(song.title)) return
    let cancelled = false
    fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(song.youtubeUrl)}&format=json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d?.title) setTitle(d.title)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [song.title, song.youtubeUrl])

  return (
    <article
      className={cn(
        'group glass relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-4 transition-transform duration-700 hover:-translate-y-2',
        playing && 'is-playing',
      )}
    >
      <span
        className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[300%]"
        aria-hidden="true"
      />
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-night">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={`Thumbnail for ${title}`}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
            <button
              type="button"
              onClick={onPlay}
              className="moon-play absolute bottom-3 right-3 flex size-12 items-center justify-center rounded-full transition-transform hover:scale-110"
              aria-label={`Play ${title}`}
            >
              {/* crescent moon with a play triangle */}
              <svg viewBox="0 0 24 24" className="size-6 text-night" aria-hidden="true">
                <path
                  d="M15.5 3.2a9 9 0 1 0 5.3 11.9A7.5 7.5 0 0 1 15.5 3.2Z"
                  fill="currentColor"
                  opacity="0.22"
                />
                <path d="M9.5 8v8l6.5-4-6.5-4Z" fill="currentColor" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-1 pb-1">
        <div className="flex items-end justify-between gap-3">
          <h3 className="min-w-0 text-lg font-semibold leading-snug text-foreground">{title}</h3>
          <div className="flex h-6 shrink-0 items-end gap-0.5" aria-hidden="true">
            {bars.map((delay, i) => (
              <span key={i} className="audio-bar h-full" style={{ animationDelay: `${delay}s` }} />
            ))}
          </div>
        </div>
        <p className="font-script text-2xl leading-snug text-moon">{song.caption}</p>
      </div>
    </article>
  )
}

export function SongsSection() {
  const ref = useRef<HTMLElement>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  useGSAP(
    () => {
      gsap.from('.songs-title', {
        autoAlpha: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.15,
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
      gsap.from('.songs-signature', {
        autoAlpha: 0,
        y: 20,
        duration: 1.4,
        scrollTrigger: { trigger: '.songs-signature', start: 'top 92%' },
      })
    },
    { scope: ref },
  )

  const play = (index: number) => {
    // Fade out the ambient track; the video starts only after this click.
    window.dispatchEvent(new Event(skyEvents.videoPlay))
    setPlayingIndex(index)
  }

  return (
    <section ref={ref} id="songs" className="relative px-5 py-24 md:py-36">
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <p className="songs-title eyebrow mb-4">Chapter Four</p>
        <h2 className="songs-title text-balance font-script text-5xl leading-tight text-moon text-glow md:text-7xl">
          Songs That Remind Me Of You
        </h2>
        <p className="songs-title mx-auto mt-6 max-w-md text-pretty text-base italic text-muted-foreground">
          {songsIntro}
        </p>
      </header>
      <div className="songs-grid mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {songs.map((song, i) => (
          <div key={song.youtubeUrl} className="song-card">
            <div className="h-full" style={{ animation: `bob ${7 + i}s ease-in-out ${i * 0.8}s infinite` }}>
              <SongCard song={song} playing={playingIndex === i} onPlay={() => play(i)} />
            </div>
          </div>
        ))}
      </div>
      <p className="songs-signature mt-16 text-center font-script text-3xl text-moon text-glow">
        {songsSignature}
      </p>
    </section>
  )
}