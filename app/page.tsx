import { Starfield } from '@/components/sky/starfield'
import { SkyAtmosphere } from '@/components/sky/sky-atmosphere'
import { CursorTrail } from '@/components/sky/cursor-trail'
import { AmbientMusic } from '@/components/sky/ambient-music'
import { IntroSection } from '@/components/sections/intro-section'
import { PhotoSection } from '@/components/sections/photo-section'
import { LetterSection } from '@/components/sections/letter-section'
import { VideoSection } from '@/components/sections/video-section'
import { SongsSection } from '@/components/sections/songs-section'
import { FutureSection } from '@/components/sections/future-section'
import { FinaleSection } from '@/components/sections/finale-section'

export default function Page() {
  return (
    <>
      <Starfield />
      <SkyAtmosphere />
      <CursorTrail />
      <AmbientMusic />
      <main className="relative">
        <IntroSection />
        <PhotoSection />
        <LetterSection />
        <VideoSection />
        <SongsSection />
        <FutureSection />
        <FinaleSection />
      </main>
    </>
  )
}
