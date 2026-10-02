'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { skyState } from '@/lib/gsap'

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBrightness;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float speed = 0.5 + aPhase * 1.8;
    float tw = 0.5 + 0.5 * sin(uTime * speed + aPhase * 6.2831);
    vTwinkle = mix(0.35, 1.0, tw);
    vColor = aColor;
    gl_PointSize = aSize * uPixelRatio * (0.75 + 0.35 * tw) * (0.9 + 0.25 * uBrightness) * (700.0 / -mv.z);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uBrightness;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.4);
    float cross = max(0.0, 1.0 - abs(uv.x) * 14.0) * max(0.0, 1.0 - abs(uv.y) * 2.2)
                + max(0.0, 1.0 - abs(uv.y) * 14.0) * max(0.0, 1.0 - abs(uv.x) * 2.2);
    float alpha = (glow + cross * 0.18) * vTwinkle * uBrightness;
    gl_FragColor = vec4(vColor * (0.9 + 0.25 * uBrightness), alpha);
  }
`

export function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmall = window.innerWidth < 768
    const count = isSmall ? 2200 : 5000

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
    } catch {
      return
    }
    const pixelRatio = Math.min(window.devicePixelRatio, 2)
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000)

    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#dfe7ff'),
      new THREE.Color('#c7d4ff'),
      new THREE.Color('#fff1dc'),
    ]

    for (let i = 0; i < count; i++) {
      const r = 500 + Math.random() * 900
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i] = 1.1 + Math.pow(Math.random(), 5) * 5
      phases[i] = Math.random()
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uBrightness: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const stars = new THREE.Points(geometry, material)
    scene.add(stars)

    const pointer = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let frame = 0
    const render = () => {
      const elapsed = clock.getElapsedTime()
      const scroll = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)
      material.uniforms.uTime.value = elapsed
      material.uniforms.uBrightness.value +=
        (skyState.brightness - material.uniforms.uBrightness.value) * 0.04
      if (!reducedMotion) {
        stars.rotation.y = elapsed * 0.006 + scroll * 0.6
        stars.rotation.x = scroll * 0.25
        camera.rotation.y += (-pointer.x * 0.04 - camera.rotation.y) * 0.03
        camera.rotation.x += (-pointer.y * 0.03 - camera.rotation.x) * 0.03
      }
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    render()

    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) render()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-20" aria-hidden="true" />
}
