import { cn } from '@/lib/utils'

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export function SparkleField({
  count = 16,
  seed = 1,
  className,
}: {
  count?: number
  seed?: number
  className?: string
}) {
  const rand = seeded(seed)
  const dots = Array.from({ length: count }, () => ({
    top: rand() * 100,
    left: rand() * 100,
    size: 1.5 + rand() * 2.5,
    delay: rand() * 6,
    duration: 5 + rand() * 5,
  }))

  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} aria-hidden="true">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="sparkle-dot"
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            width: dot.size,
            height: dot.size,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
