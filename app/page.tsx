import { Starfield } from '@/components/sky/starfield'
import { SkyAtmosphere } from '@/components/sky/sky-atmosphere'
import { CursorTrail } from '@/components/sky/cursor-trail'
import { FloatingPetals } from '@/components/story/floating-petals'
import { StoryMotion } from '@/components/story/story-motion'
import { MusicPlayer } from '@/components/story/music-player'
import { FirstMeeting } from '@/components/story/first-meeting'
import { FallingForYou } from '@/components/story/falling-for-you'
import { FavoriteMemories } from '@/components/story/favorite-memories'
import { AdventuresTogether } from '@/components/story/adventures-together'
import { LateNightTalks } from '@/components/story/late-night-talks'
import { UpsAndDowns } from '@/components/story/ups-and-downs'
import { FutureDreams } from '@/components/story/future-dreams'
import { BoyfriendsDayFinale } from '@/components/story/boyfriends-day-finale'

export default function Page() {
  return (
    <>
      <Starfield />
      <SkyAtmosphere />
      <FloatingPetals />
      <CursorTrail />
      <main className="relative z-10">
        <FirstMeeting />
        <FallingForYou />
        <FavoriteMemories />
        <AdventuresTogether />
        <LateNightTalks />
        <UpsAndDowns />
        <FutureDreams />
        <BoyfriendsDayFinale />
      </main>
      <MusicPlayer />
      <StoryMotion />
    </>
  )
}
