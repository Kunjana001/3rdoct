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
}
