const PETAL_COUNT = 22

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const rand = seed / 233280
  return {
    left: `${(i * 37 + rand * 23) % 100}%`,
    size: 8 + Math.round(rand * 9),
    duration: 14 + ((i * 7) % 12),
    delay: -((i * 3.7) % 24),
    opacity: 0.45 + rand * 0.45,
  }
})

export function FloatingPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 0.8,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        />
      ))}
    </div>
  )
}
