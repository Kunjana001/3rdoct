export const names = {
  him: 'Mrinmoy',
  nickname: 'Kunzu',
  me: 'Kunjana',
}

export const photos = {
  together: '/photos/us-together.jpg',
  adventure: '/photos/our-feet.jpg',
}

/**
 * Crop presets for the couple photo (portrait, 1086x1448).
 * x / y are object-position percentages, zoom is a scale multiplier.
 */
export type Crop = { x: number; y: number; zoom: number }

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

export const crops = {
  full: { x: 50, y: 50, zoom: 1 },
  faces: { x: 50, y: 30, zoom: 2.4 },
  headOnShoulder: { x: 52, y: 32, zoom: 3.1 },
  hands: { x: 40, y: 66, zoom: 2.6 },
  sneakers: { x: 50, y: 92, zoom: 2.2 },
  seated: { x: 50, y: 55, zoom: 1.35 },
  upper: { x: 50, y: 38, zoom: 1.6 },
} satisfies Record<string, Crop>

export const firstMeeting = {
  chapter: 'Chapter One',
  title: 'First Meeting',
  kicker: `${names.me} & ${names.him}`,
  lines: [
    'I didn’t know it then, but the day we met was the first page of my favorite story.',
    'One ordinary moment, one look, and somehow the whole world got a little softer.',
  ],
}

export const fallingForYou = {
  chapter: 'Chapter Two',
  title: 'Falling For You',
  lines: [
    'It happened slowly, and then all at once.',
    'Your laugh became my favorite sound. Your shoulder became my favorite place to rest.',
    'And before I could even name it, my heart had already chosen you.',
  ],
  whisper: 'This is my safe place, right here, next to you.',
}

export const favoriteMemories = {
  chapter: 'Chapter Three',
  title: 'Our Favorite Memories',
  intro: 'Little frames I would replay forever if I could.',
  polaroids: [
    { crop: 'full', caption: 'The day we couldn’t stop smiling', rotate: -6 },
    { crop: 'headOnShoulder', caption: 'My head, your shoulder, always', rotate: 4 },
    { crop: 'hands', caption: 'Your hands, my calm', rotate: -3 },
    { crop: 'sneakers', caption: 'Matching steps, same direction', rotate: 7 },
  ] as const,
}

export const adventures = {
  chapter: 'Chapter Four',
  title: 'Adventures Together',
  lines: [
    'Misty hills, long roads, cafe corners and every place in between.',
    'It was never about where we went. It was always about who I was next to.',
  ],
  caption: 'Our feet, side by side, above the clouds. My favorite view will always include you.',
  stats: [
    { value: '∞', label: 'Roads still to take' },
    { value: '1', label: 'Favorite travel partner' },
    { value: '2', label: 'Hearts, same direction' },
  ],
}

export const lateNight = {
  chapter: 'Chapter Five',
  title: 'Late Night Talks',
  intro: 'When the world goes quiet, our conversations get the loudest.',
  messages: [
    { from: 'him', text: 'Still awake, Kunzu?' },
    { from: 'me', text: 'Waiting for you to say goodnight first.' },
    { from: 'him', text: 'Then we’ll be up till sunrise again.' },
    { from: 'me', text: 'Fine by me. Talking to you is my favorite way to lose sleep.' },
  ] as const,
  outro: 'Every 2 AM conversation with you is a memory I keep under my pillow.',
}

export const upsAndDowns = {
  chapter: 'Chapter Six',
  title: 'Through Every Ups and Downs',
  lines: [
    'We’ve had sunny days and stormy ones.',
    'Days when words came easy, and days when silence said more.',
    'But through every high and every low, you stayed. And so did I.',
  ],
  promise: 'Whatever comes next, I’d rather face it holding your hand.',
}

export const futureDreams = {
  chapter: 'Chapter Seven',
  title: 'Future Dreams',
  intro: 'Some things I want to do with you, someday soon and someday far.',
  dreams: [
    { title: 'Watch the sunrise from a mountain top', note: 'You complaining about the cold, me stealing your jacket.' },
    { title: 'Travel to a city we’ve never seen', note: 'Getting lost on purpose, finding our own little cafe.' },
    { title: 'Build a cozy home of our own', note: 'Fairy lights, plants everywhere, and our songs on repeat.' },
    { title: 'Grow old, still holding hands', note: 'Silver hair, slower steps, and the very same love.' },
  ],
}

export const finale = {
  chapter: 'Chapter Eight',
  title: `Happy Boyfriend’s Day, ${names.him} ❤️`,
  lines: ['Thank you for every smile, every laugh, and every moment.', 'I love you.'],
  signOff: `Forever yours, ${names.nickname}`,
  line: 'Among billions of stars, my favorite one will always be you, Mrinmoy.',
  lifetime: "In every lifetime, I'd still choose you.",
  credit: 'Made with love by Kunjana',
}
