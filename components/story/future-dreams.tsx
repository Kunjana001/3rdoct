import { Sparkles } from 'lucide-react'
import { ChapterHeading } from './chapter-heading'
import { CouplePhoto } from './couple-photo'
import { crops, futureDreams, names } from '@/lib/content'

export function FutureDreams() {
  return (
    <section aria-labelledby="future-title" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <ChapterHeading id="future-title" number="07" chapter={futureDreams.chapter} title={futureDreams.title} />
        <p className="mx-auto max-w-lg text-center text-lg italic text-muted-foreground" data-reveal>
          {futureDreams.intro}
        </p>

        <div className="flex flex-col items-center gap-12 md:flex-row md:items-stretch">
          <figure className="relative w-full max-w-sm shrink-0 overflow-hidden rounded-[2rem] border border-moon/20" data-reveal>
            <CouplePhoto
              crop={crops.upper}
              alt={`${names.me} and ${names.him}, dreaming of the days ahead`}
              parallax={1}
              sizes="384px"
              className="aspect-[3/4] h-full"
              imageClassName="saturate-[1.15]"
            />
            <div aria-hidden="true" className="dream-vignette absolute inset-0" />
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="sparkle-dot"
                style={{
                  top: `${(i * 23) % 90 + 4}%`,
                  left: `${(i * 41) % 90 + 4}%`,
                  width: 3 + (i % 3),
                  height: 3 + (i % 3),
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            ))}
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-center font-script text-3xl text-moon text-glow">
              Us, in every future
            </figcaption>
          </figure>

          <ol className="grid flex-1 gap-4 sm:grid-cols-2">
            {futureDreams.dreams.map((d, i) => (
              <li
                key={d.title}
                className="glass group flex flex-col gap-3 rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1"
                data-reveal
                data-reveal-delay={String(i * 0.12)}
              >
                <span className="flex items-center justify-between">
                  <span className="font-serif text-sm tracking-[0.3em] text-candle">{String(i + 1).padStart(2, '0')}</span>
                  <Sparkles className="size-4 text-candle transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" aria-hidden="true" />
                </span>
                <h3 className="text-balance font-serif text-2xl leading-snug text-moon">{d.title}</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">{d.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
