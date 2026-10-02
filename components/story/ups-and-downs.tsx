import { CloudRain, Sun } from 'lucide-react'
import { ChapterHeading } from './chapter-heading'
import { CouplePhoto } from './couple-photo'
import { crops, names, upsAndDowns, photos } from '@/lib/content'

export function UpsAndDowns() {
  return (
    <section aria-labelledby="ups-downs-title" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 md:flex-row md:gap-20">
        <div className="relative w-full max-w-sm flex-1" data-reveal>
          <div className="glass rounded-[2rem] p-3">
            <CouplePhoto
              src={photos.sunset}
              crop={crops.portrait}
              alt={`${names.me} and ${names.him} sitting close together, side by side`}
              colorReveal
              sizes="(min-width: 768px) 384px, 90vw"
              className="aspect-[3/4] rounded-[1.5rem]"
            />
          </div>
          <span className="glass absolute -left-4 top-8 flex items-center gap-2 rounded-full px-4 py-2 text-sm text-moon/80">
            <CloudRain className="size-4" aria-hidden="true" /> the storms
          </span>
          <span className="glass absolute -right-4 bottom-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm text-candle">
            <Sun className="size-4" aria-hidden="true" /> the sunshine
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-8">
          <ChapterHeading id="ups-downs-title" number="06" chapter={upsAndDowns.chapter} title={upsAndDowns.title} align="left" />
          <div className="relative flex flex-col gap-5 border-l border-moon/20 pl-6">
            {upsAndDowns.lines.map((line, i) => (
              <p
                key={line}
                className="text-pretty text-xl leading-relaxed text-moon/85"
                data-reveal
                data-reveal-delay={String(i * 0.15)}
              >
                {line}
              </p>
            ))}
          </div>
          <blockquote className="glass rounded-3xl p-6 md:p-8" data-reveal>
            <p className="font-script text-3xl leading-snug text-candle text-glow-warm md:text-4xl">{upsAndDowns.promise}</p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
