import { Moon } from 'lucide-react'
import { ChapterHeading } from './chapter-heading'
import { CouplePhoto } from './couple-photo'
import { crops, lateNight, names } from '@/lib/content'
import { cn } from '@/lib/utils'

export function LateNightTalks() {
  return (
    <section aria-labelledby="late-night-title" className="relative overflow-hidden px-6 py-28 md:px-12 md:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[oklch(0.14_0.06_270/0.7)] to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 md:flex-row-reverse md:gap-20">
        <div className="relative flex-1" data-reveal>
          <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-moon/15 blur-3xl" />
          <div className="relative size-72 rounded-full p-1.5 shadow-[0_0_80px_oklch(0.9_0.04_255/0.45)] ring-1 ring-moon/40 md:size-96">
            <CouplePhoto
              crop={crops.faces}
              alt={`${names.me} and ${names.him}, bathed in moonlight`}
              parallax={0.8}
              sizes="384px"
              className="size-full rounded-full"
              imageClassName="grayscale contrast-110 brightness-90"
            />
            <div aria-hidden="true" className="absolute inset-1.5 rounded-full bg-[oklch(0.45_0.12_265)] mix-blend-color" />
            <div aria-hidden="true" className="absolute inset-1.5 rounded-full bg-[radial-gradient(circle_at_30%_25%,oklch(1_0_0/0.25),transparent_55%)]" />
          </div>
          <Moon aria-hidden="true" className="absolute -right-2 top-4 size-10 fill-moon/90 text-moon text-glow" />
        </div>

        <div className="flex w-full flex-1 flex-col gap-8">
          <ChapterHeading id="late-night-title" number="05" chapter={lateNight.chapter} title={lateNight.title} align="left" />
          <p className="text-lg italic text-muted-foreground" data-reveal>
            {lateNight.intro}
          </p>

          <ol className="flex flex-col gap-3" aria-label="Our late night conversation">
            {lateNight.messages.map((m, i) => {
              const mine = m.from === 'me'
              return (
                <li
                  key={m.text}
                  className={cn('flex flex-col gap-1', mine ? 'items-end' : 'items-start')}
                  data-reveal
                  data-reveal-delay={String(i * 0.12)}
                >
                  <span className="px-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {mine ? names.nickname : names.him}
                  </span>
                  <p
                    className={cn(
                      'max-w-[85%] rounded-3xl px-5 py-3 text-lg leading-snug',
                      mine
                        ? 'rounded-br-md bg-rose/80 text-night shadow-[0_8px_30px_oklch(0.72_0.14_10/0.35)]'
                        : 'glass rounded-bl-md text-moon',
                    )}
                  >
                    {m.text}
                  </p>
                </li>
              )
            })}
          </ol>

          <p className="font-script text-3xl text-moon text-glow" data-reveal>
            {lateNight.outro}
          </p>
        </div>
      </div>
    </section>
  )
}
