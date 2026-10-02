import { MapPin } from 'lucide-react'
import { ChapterHeading } from './chapter-heading'
import { CouplePhoto } from './couple-photo'
import { adventures, crops, names, photos } from '@/lib/content'

const filmFrames = [
  { crop: crops.faces, alt: `${names.me} and ${names.him}, cheek to cheek` },
  { crop: crops.seated, alt: `${names.me} and ${names.him} sitting together` },
  { crop: crops.sneakers, alt: 'Our sneakers side by side' },
]

export function AdventuresTogether() {
  return (
    <section aria-labelledby="adventures-title" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <ChapterHeading id="adventures-title" number="04" chapter={adventures.chapter} title={adventures.title} />

        <figure className="relative overflow-hidden rounded-3xl border border-moon/15 shadow-2xl" data-reveal>
          <CouplePhoto
            src={photos.adventure}
            crop={{ x: 50, y: 60, zoom: 1 }}
            alt={`${names.me} and ${names.him}'s feet side by side on a rock above a misty forest valley`}
            parallax={1.2}
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="aspect-[4/3] md:aspect-[21/9]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-night/20" />
          <figcaption className="glass absolute inset-x-4 bottom-4 flex items-start gap-3 rounded-2xl p-4 md:inset-x-auto md:left-8 md:bottom-8 md:max-w-md md:p-5">
            <MapPin className="mt-1 size-4 shrink-0 text-candle" aria-hidden="true" />
            <span className="text-pretty text-base leading-relaxed text-moon/90 md:text-lg">{adventures.caption}</span>
          </figcaption>
        </figure>

        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          <div className="flex flex-1 flex-col gap-6" data-reveal>
            {adventures.lines.map((line) => (
              <p key={line} className="text-pretty text-xl leading-relaxed text-moon/85">
                {line}
              </p>
            ))}
            <dl className="flex gap-4">
              {adventures.stats.map((s) => (
                <div key={s.label} className="glass flex flex-1 flex-col items-center gap-1 rounded-2xl p-4 text-center">
                  <dt className="order-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</dt>
                  <dd className="order-1 font-serif text-3xl text-candle text-glow-warm">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="film-strip flex flex-1 gap-2 rounded-xl p-3" data-reveal data-reveal-delay="0.2">
            {filmFrames.map((f) => (
              <CouplePhoto
                key={f.alt}
                crop={f.crop}
                alt={f.alt}
                sizes="200px"
                className="aspect-[3/4] flex-1 rounded-sm"
                imageClassName="saturate-[0.85] contrast-110"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
