'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  rotation: number
  spin: number
  kind: 'star' | 'spark'
}

function drawSparkle(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.quadraticCurveTo(size * 0.15, -size * 0.15, size, 0)
  ctx.quadraticCurveTo(size * 0.15, size * 0.15, 0, size)
  ctx.quadraticCurveTo(-size * 0.15, size * 0.15, -size, 0)
  ctx.quadraticCurveTo(-size * 0.15, -size * 0.15, 0, -size)
  ctx.fill()
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const particles: Particle[] = []
    let frame = 0
    let running = false
    let last = { x: -100, y: -100 }
    const dpr = Math.min(window.devicePixelRatio, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const spawn = (x: number, y: number) => {
      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.4 + 0.1,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        size: 2 + Math.random() * 4,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.08,
        kind: 'star',
      })
      if (Math.random() < 0.1) {
        for (let i = 0; i < 7; i++) {
          const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.4
          const speed = 1.2 + Math.random() * 1.6
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 26 + Math.random() * 16,
            size: 1 + Math.random() * 1.6,
            rotation: 0,
            spin: 0,
            kind: 'spark',
          })
        }
      }
      if (particles.length > 260) particles.splice(0, particles.length - 260)
      if (!running) {
        running = true
        frame = requestAnimationFrame(tick)
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.globalCompositeOperation = 'lighter'
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }
        p.x += p.vx
        p.y += p.vy
        p.vx *= p.kind === 'spark' ? 0.93 : 0.98
        p.vy *= p.kind === 'spark' ? 0.93 : 0.98
        p.rotation += p.spin
        const t = p.life / p.maxLife
        const alpha = t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        if (p.kind === 'star') {
          ctx.shadowBlur = 12
          ctx.shadowColor = `rgba(200, 215, 255, ${alpha})`
          ctx.fillStyle = `rgba(245, 248, 255, ${alpha})`
          drawSparkle(ctx, p.size * (1 - t * 0.4))
        } else {
          ctx.shadowBlur = 8
          ctx.shadowColor = `rgba(255, 236, 200, ${alpha})`
          ctx.fillStyle = `rgba(255, 246, 225, ${alpha})`
          ctx.beginPath()
          ctx.arc(0, 0, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
      if (particles.length > 0) {
        frame = requestAnimationFrame(tick)
      } else {
        running = false
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      }
    }

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - last.x
      const dy = e.clientY - last.y
      if (dx * dx + dy * dy < 120) return
      last = { x: e.clientX, y: e.clientY }
      spawn(e.clientX, e.clientY)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  )
}
