import { Heart } from 'lucide-react'
import { ChapterHeading } from './chapter-heading'
import { CouplePhoto } from './couple-photo'
import { crops, fallingForYou, names, photos } from '@/lib/content'

const floatingHearts = [
  { top: '6%', left: '8%', size: 'size-5', delay: '0s' },
  { top: '18%', left: '88%', size: 'size-4', delay: '1.2s' },
  { top: '78%', left: '4%', size: 'size-3', delay: '2.1s' },
  { top: '86%', left: '82%', size: 'size-6', delay: '0.6s' },
]

export function FallingForYou() {
  return (
    <section aria-labelledby="falling-title" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 md:flex-row md:gap-20">
        <div className="relative w-full max-w-md flex-1" data-reveal>
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-rose/30 blur-3xl" />
          <div className="mask-heart relative aspect-[10/9] w-full">
            <CouplePhoto
              src={photos.airport}
              crop={crops.portrait}
              alt={`Close-up of ${names.me} leaning on ${names.him}, both smiling`}
              parallax={1}
              className="absolute inset-0"
            />
          </div>
          {floatingHearts.map((h, i) => (
            <Heart
              key={i}
              aria-hidden="true"
              className={`animate-float absolute fill-rose/70 text-rose ${h.size}`}
              style={{ top: h.top, left: h.left, animationDelay: h.delay }}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-8">
          <ChapterHeading id="falling-title" number="02" chapter={fallingForYou.chapter} title={fallingForYou.title} align="left" />
          <div className="glass flex flex-col gap-4 rounded-3xl p-6 md:p-8" data-reveal data-reveal-delay="0.15">
            {fallingForYou.lines.map((line) => (
              <p key={line} className="text-pretty text-lg leading-relaxed text-moon/85 md:text-xl">
                {line}
              </p>
            ))}
          </div>
          <p className="font-script text-3xl text-rose md:text-4xl" data-reveal data-reveal-delay="0.3">
            {fallingForYou.whisper}
          </p>
        </div>
      </div>
    </section>
  )
}
