import { ChevronDown } from 'lucide-react'
import { CouplePhoto } from './couple-photo'
import { crops, firstMeeting, names, photos } from '@/lib/content'

export function FirstMeeting() {
  return (
    <section
      aria-labelledby="first-meeting-title"
      className="relative flex min-h-svh items-center overflow-hidden px-6 pb-24 pt-20 md:px-12"
    >
      <CouplePhoto
        src={photos.river}
        crop={crops.portrait}
        alt=""
        priority
        parallax={1.5}
        sizes="100vw"
        className="absolute inset-0 -z-10 opacity-35"
        imageClassName="blur-2xl saturate-150"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-night/40 via-night/70 to-night" />

      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 md:flex-row md:gap-16">
        <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
          <p className="eyebrow" data-reveal>
            A love story in eight chapters
          </p>
          <h1
            className="font-script text-6xl leading-none text-moon text-glow md:text-8xl"
            data-reveal
            data-reveal-delay="0.15"
          >
            {names.me} <span className="text-rose">&amp;</span> {names.him}
          </h1>

          <div className="glass flex max-w-md flex-col gap-3 rounded-3xl p-6 md:p-8" data-reveal data-reveal-delay="0.3">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-candle">01</span>
              <span aria-hidden="true" className="h-px w-8 bg-candle/50" />
              {firstMeeting.chapter}
            </p>
            <h2 id="first-meeting-title" className="font-serif text-3xl font-light text-moon md:text-4xl">
              {firstMeeting.title}
            </h2>
            {firstMeeting.lines.map((line) => (
              <p key={line} className="text-pretty text-lg leading-relaxed text-moon/85">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="relative w-64 shrink-0 md:w-96" data-reveal data-reveal-delay="0.2">
          <div aria-hidden="true" className="photo-glow absolute -inset-6 rounded-t-full" />
          <div className="relative rounded-t-full border border-moon/25 p-2">
            <CouplePhoto
              src={photos.river}
              crop={crops.portrait}
              alt={`${names.me} and ${names.him} together by the river`}
              priority
              sizes="(min-width: 768px) 384px, 256px"
              className="aspect-[3/4] rounded-t-full"
              imageClassName="animate-slow-zoom"
            />
          </div>
          <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-script text-3xl text-candle text-glow-warm">
            where it all began
          </p>
        </div>
      </div>

      <a
        href="#falling-title"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs uppercase tracking-[0.35em] text-muted-foreground transition-colors hover:text-moon"
      >
        Begin
        <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
