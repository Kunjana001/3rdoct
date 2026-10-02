export const names = {
  him: 'Mrinmoy',
  nickname: 'Kunzu',
  me: 'Kunjana',
}

export const photos = {
  together: '/photos/us-together.jpg',
}

export const intro = {
  eyebrow: "Happy Boyfriend's Day",
  quote: 'the one who turned ordinary days into my favorite memories.',
}

export const photoMessage = {
  title: "Happy Boyfriend's Day, My Dearest Mrinmoy ❤️",
  paragraphs: [
    'From the moment you became part of my life, every day started feeling a little brighter.',
    "Thank you for every laugh, every call, every moment of comfort, and every memory we've created together.",
    "No matter how busy life becomes, you'll always be one of the most special people in my heart.",
    'Today is for celebrating you.',
    "Happy Boyfriend's Day, my love.",
  ],
  signOff: 'Love, Your Kunzu ❤️',
}

export const letter = {
  title: 'To My Dearest Mrinmoy',
  greeting: 'My Love,',
  paragraphs: [
    'If someone asked me what happiness looks like, I think I would simply say your name.',
    'Somehow, you became the person I look for in every good moment and the person I want beside me during difficult ones.',
    "You have made me smile on days when I didn't feel like smiling and made ordinary conversations become some of my favorite memories.",
    "I love the way you call me Kunzu (also any name feels cute tho). It's such a small thing, yet every time I hear it, it reminds me that I hold a special place in your heart.",
    'There are countless things I appreciate about you\u2014your presence, your care, your patience, and the way you make me feel understood.',
    'Thank you for being you.',
    "I don't know what every chapter of the future will look like, but I know that I want you in every part.",
    'If life gives us beautiful moments, I want to celebrate them with you.',
    'If life gives us challenges, I hope we face them together.',
    'And if I had to choose again, I would still choose you.',
    "Happy Boyfriend's Day, Mrinmoy.",
  ],
  closing: 'With all my love,',
  signature: 'Your Kunzu ❤️',
}

export const video = {
  src: '/video/memories.mp4',
  poster: '/images/video-thumbnail.jpg',
  title: 'A Little Collection of My Favorite Memories With You ❤️',
  intro:
    'I wanted to tell you how much you mean to me... but some memories are better shown than explained.',
  beforeTitle: 'For My Favorite Person ❤️',
  beforeSubtitle: 'Click play, Mrinmoy.',
  afterLines: [
    'Every memory in this video is a reminder of how lucky I am to have you.',
    'Thank you for being my favorite chapter. ❤️',
  ],
  surprise: [
    'I love you, Mrinmoy.',
    'Today, tomorrow, and every day after.',
    'Forever, from your Kunzu ❤️',
  ],
}

export type Song = {
  /** Shown until the real title is fetched from YouTube (Song 1 is fixed). */
  title: string
  youtubeUrl: string
  caption: string
}

export const songsIntro = 'Some feelings are difficult to explain, so I hid them inside these songs. ❤️'
export const songsSignature = 'For you, always. — Kunzu ✨'

export const songs: Song[] = [
  {
    title: 'Until I Found You',
    youtubeUrl: 'https://www.youtube.com/watch?v=uCMYzolEbO0',
    caption: 'Some people feel like home. You are one of them.',
  },
  {
    title: 'Song 2',
    youtubeUrl: 'https://www.youtube.com/watch?v=2vRdzTzR4tI',
    caption: 'Every time I hear this song, I think of us.',
  },
  {
    title: 'Song 3',
    youtubeUrl: 'https://youtu.be/T1b6zmqLydA',
    caption: 'A little piece of my heart hidden inside a melody.',
  },
  {
    title: 'Song 4',
    youtubeUrl: 'https://youtu.be/oQaWXlsSW2c',
    caption: "For all the moments we've shared and all the ones still waiting for us.",
  },
]

export type MemoryScene = 'blossoms' | 'moon' | 'work' | 'travel' | 'celebrate' | 'forever'

export const futureMemories: {
  scene: MemoryScene
  title: string
  caption: string
  photo: string
  pos?: string
  alt: string
}[] = [
  {
    scene: 'blossoms',
    title: 'Beneath Cherry Blossoms',
    caption: 'Walking hand in hand beneath falling petals, with nowhere to be but next to you.',
    photo: '/photos/him-river.jpg',
    pos: '50% 30%',
    alt: 'Mrinmoy by the river, arms open wide',
  },
  {
    scene: 'moon',
    title: 'Watching the Moon',
    caption: 'Counting stars with you, and losing count every time you look at me.',
    photo: '/photos/her-selfie.jpg',
    pos: '50% 40%',
    alt: 'Kunjana, a quiet moment',
  },
  {
    scene: 'work',
    title: 'Building Dreams Together',
    caption: 'Side by side at work, two ambitious hearts chasing the same future.',
    photo: '/photos/us-together.jpg',
    pos: '50% 45%',
    alt: 'Mrinmoy and Kunjana together at work',
  },
  {
    scene: 'travel',
    title: 'Every Corner of the World',
    caption: 'New cities, old streets, and you, always my favorite destination.',
    photo: '/photos/him-valley.jpg',
    pos: '50% 50%',
    alt: 'Mrinmoy in the hills, arms open to the view',
  },
  {
    scene: 'celebrate',
    title: 'Every Special Day',
    caption: 'Birthdays, anniversaries, and all the little wins, celebrated together.',
    photo: '/photos/her-kiss.jpg',
    pos: '50% 40%',
    alt: 'Kunjana blowing a playful kiss',
  },
  {
    scene: 'forever',
    title: 'Growing Old Together',
    caption: 'Silver hair, slower steps, and the very same hand to hold.',
    photo: '/photos/our-feet.jpg',
    pos: '50% 70%',
    alt: 'Our feet side by side above a misty valley',
  },
]

export const finale = {
  line: 'Among billions of stars, my favorite one will always be you, Mrinmoy.',
  title: "Happy Boyfriend's Day ❤️",
  signOff: 'Forever yours, Kunzu ✨',
  lifetime: "In every lifetime, I'd still choose you.",
  credit: 'Made with love by Kunjana',
}