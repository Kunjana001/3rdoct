const clouds = [
  { top: '14%', width: 520, height: 140, duration: 140, delay: -20 },
  { top: '38%', width: 680, height: 180, duration: 190, delay: -90 },
  { top: '62%', width: 460, height: 120, duration: 160, delay: -50 },
  { top: '82%', width: 600, height: 160, duration: 210, delay: -140 },
]

const shootingStars = [
  { top: '8%', left: '70%', delay: '1s', angle: '205deg' },
  { top: '22%', left: '95%', delay: '4.5s', angle: '200deg' },
  { top: '4%', left: '40%', delay: '7.2s', angle: '210deg' },
]

export function SkyAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="moonlight-wash absolute inset-0" />

      <div className="absolute right-[7%] top-[6%] md:right-[9%] md:top-[9%]">
        <div className="moon size-20 rounded-full md:size-32" />
      </div>

      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="cloud animate-drift absolute left-0 rounded-full"
          style={{
            top: cloud.top,
            width: cloud.width,
            height: cloud.height,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}

      {shootingStars.map((star, i) => (
        <span
          key={i}
          className="shooting-star"
          style={
            {
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              '--angle': star.angle,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
