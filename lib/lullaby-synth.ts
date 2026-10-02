/**
 * A tiny generative music-box lullaby built on the Web Audio API.
 * Used as the background track when no /audio/love.mp3 file is provided.
 */
const PROGRESSION = [
  [53, 60, 64, 69], // F
  [57, 60, 64, 72], // Am
  [50, 57, 62, 65], // Dm
  [55, 58, 62, 67], // Gm
  [53, 60, 65, 69], // F
  [57, 60, 64, 69], // Am
  [58, 62, 65, 70], // Bb
  [55, 60, 64, 67], // C
]
const ARPEGGIO = [0, 1, 2, 3, 2, 1, 2, 3]
const STEP_SECONDS = 60 / 66 / 2
const VOLUME_SCALE = 0.55

const midiToFreq = (midi: number) => 440 * 2 ** ((midi - 69) / 12)

function createImpulse(ctx: AudioContext, seconds: number) {
  const length = Math.floor(ctx.sampleRate * seconds)
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate)
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel)
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2.6
    }
  }
  return buffer
}

export class LullabySynth {
  private ctx: AudioContext
  private master: GainNode
  private bus: GainNode
  private timer: ReturnType<typeof setInterval> | null = null
  private nextTime = 0
  private step = 0

  constructor(volume: number) {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new Ctx()
    this.master = this.ctx.createGain()
    this.master.gain.value = volume * VOLUME_SCALE
    this.bus = this.ctx.createGain()

    const reverb = this.ctx.createConvolver()
    reverb.buffer = createImpulse(this.ctx, 3.4)
    const wet = this.ctx.createGain()
    wet.gain.value = 0.5

    this.bus.connect(this.master)
    this.bus.connect(reverb)
    reverb.connect(wet)
    wet.connect(this.master)
    this.master.connect(this.ctx.destination)
  }

  private note(midi: number, time: number, duration: number, peak: number) {
    const freq = midiToFreq(midi)
    const env = this.ctx.createGain()
    env.gain.setValueAtTime(0.0001, time)
    env.gain.exponentialRampToValueAtTime(peak, time + 0.015)
    env.gain.exponentialRampToValueAtTime(0.0001, time + duration)
    env.connect(this.bus)

    const body = this.ctx.createOscillator()
    body.type = 'sine'
    body.frequency.value = freq
    body.connect(env)

    const shimmer = this.ctx.createOscillator()
    const shimmerGain = this.ctx.createGain()
    shimmer.type = 'triangle'
    shimmer.frequency.value = freq * 2
    shimmerGain.gain.value = 0.18
    shimmer.connect(shimmerGain)
    shimmerGain.connect(env)

    for (const osc of [body, shimmer]) {
      osc.start(time)
      osc.stop(time + duration + 0.05)
    }
  }

  private schedule = () => {
    while (this.nextTime < this.ctx.currentTime + 0.25) {
      const bar = Math.floor(this.step / ARPEGGIO.length) % PROGRESSION.length
      const beat = this.step % ARPEGGIO.length
      const chord = PROGRESSION[bar]

      if (beat === 0) this.note(chord[0] - 12, this.nextTime, STEP_SECONDS * 8, 0.16)
      this.note(chord[ARPEGGIO[beat]] + 12, this.nextTime, STEP_SECONDS * 3.5, beat % 4 === 0 ? 0.12 : 0.07)
      if (beat === 4 && bar % 2 === 1) this.note(chord[3] + 24, this.nextTime, STEP_SECONDS * 4, 0.04)

      this.nextTime += STEP_SECONDS
      this.step++
    }
  }

  async start() {
    await this.ctx.resume()
    if (this.timer) return
    this.nextTime = this.ctx.currentTime + 0.1
    this.timer = setInterval(this.schedule, 60)
  }

  stop() {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
    void this.ctx.suspend()
  }

  setVolume(volume: number) {
    this.master.gain.setTargetAtTime(volume * VOLUME_SCALE, this.ctx.currentTime, 0.08)
  }

  dispose() {
    this.stop()
    void this.ctx.close()
  }
}
