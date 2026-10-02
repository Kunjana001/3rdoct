import { CouplePhoto } from './couple-photo'
import { HeartBurst } from './heart-burst'
import { crops, finale, names } from '@/lib/content'

export function BoyfriendsDayFinale() {
  return (
    <section
      aria-labelledby="finale-title"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-32 pt-28 md:px-12"
    >
      <div aria-hidden="true" className="absolute left-1/2 top-1/3 -z-10 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/15 blur-3xl" />

      <p className="eyebrow mb-10 flex items-center gap-3" data-reveal>
        <span className="text-candle">08</span>
        <span aria-hidden="true" className="h-px w-8 bg-candle/50" />
        {finale.chapter}
      </p>

      <div className="relative mb-12 w-64 md:w-80" data-reveal>
        <div aria-hidden="true" className="photo-glow absolute -inset-8 rounded-full" />
        <div className="mask-heart animate-heartbeat-slow relative aspect-[10/9] w-full">
          <CouplePhoto
            crop={crops.headOnShoulder}
            alt={`${names.me} and ${names.him} together, heads close`}
            sizes="320px"
            className="absolute inset-0"
          />
        </div>
      </div>

      <div className="glass flex max-w-2xl flex-col items-center gap-5 rounded-[2rem] px-6 py-10 text-center md:px-14" data-reveal>
        <h2 id="finale-title" className="text-balance font-script text-5xl leading-tight text-moon text-glow md:text-7xl">
          {finale.title}
        </h2>
        {finale.lines.map((line, i) => (
          <p
            key={line}
            className={
              i === finale.lines.length - 1
                ? 'font-serif text-3xl italic text-rose md:text-4xl'
                : 'text-pretty text-xl leading-relaxed text-moon/90 md:text-2xl'
            }
          >
            {line}
          </p>
        ))}
        <HeartBurst />
        <p className="font-script text-2xl text-candle text-glow-warm">{finale.signOff}</p>
      </div>

      <p className="mt-16 text-xs uppercase tracking-[0.35em] text-muted-foreground">Made with love by {names.me}</p>
    </section>
  )
}
