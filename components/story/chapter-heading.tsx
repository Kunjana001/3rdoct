import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

type ChapterHeadingProps = {
  id: string
  number: string
  chapter: string
  title: string
  align?: 'center' | 'left'
  className?: string
}

export function ChapterHeading({ id, number, chapter, title, align = 'center', className }: ChapterHeadingProps) {
  return (
    <header
      className={cn('flex flex-col gap-4', align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}
      data-reveal
    >
      <p className="eyebrow flex items-center gap-3">
        <span className="font-serif text-sm tracking-[0.2em] text-candle">{number}</span>
        <span aria-hidden="true" className="h-px w-8 bg-candle/50" />
        <span>{chapter}</span>
      </p>
      <h2 id={id} className="text-balance font-serif text-4xl font-light leading-tight text-moon text-glow md:text-6xl">
        {title}
      </h2>
      <div aria-hidden="true" className="flex items-center gap-3 text-rose">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose/60" />
        <Heart className="size-3.5 fill-current" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose/60" />
      </div>
    </header>
  )
}
