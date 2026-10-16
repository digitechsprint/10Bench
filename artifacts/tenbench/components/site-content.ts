// Central place for 10Bench facts and copy, so the client can edit details in one file.
// Items marked `confirm: true` are standard coworking amenities that are not visible in the
// photography — confirm them with 10Bench before going live, or delete them.

export const contact = {
  email: 'spaces@10bench.in',
  phone: '+91 97739 87782',
  phoneHref: 'tel:+919773987782',
  whatsapp: 'https://wa.me/919773987782?text=Hi%2010Bench%2C%20I%27d%20like%20to%20know%20more%20about%20your%20workspace.',
  address: '116, Sector 4, Vaishali, Ghaziabad',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=116%2C%20Sector%204%2C%20Vaishali%2C%20Ghaziabad',
  mapsEmbed: 'https://maps.google.com/maps?q=116%2C%20Sector%204%2C%20Vaishali%2C%20Ghaziabad&z=15&output=embed',
};

export type Tone = 'orange' | 'mustard' | 'leaf' | 'cobalt' | 'coral';

export const spaces: { id: string; name: string; tag: string; tone: Tone; text: string; ideal: string; points: string[] }[] = [
  {
    id: 'open-desk',
    name: 'Open desks',
    tag: 'Flexible',
    tone: 'mustard',
    text: 'Pick a seat in the shared work area and get straight into it. Good energy, good light, zero setup.',
    ideal: 'Freelancers, remote workers, anyone who needs a change of scene',
    points: ['Shared work area', 'Lounge and coffee counter access', 'Come in, plug in, get going'],
  },
  {
    id: 'dedicated-desk',
    name: 'Dedicated desks',
    tag: 'Your own spot',
    tone: 'leaf',
    text: 'The same desk every day, set up exactly how you like it. All the routine of an office, none of the overheads.',
    ideal: 'Consultants, creators and regulars who like a fixed base',
    points: ['A desk that stays yours', 'Leave your setup in place', 'Shared amenities included'],
  },
  {
    id: 'private-cabin',
    name: 'Private cabins',
    tag: 'For teams',
    tone: 'cobalt',
    text: 'Glass-fronted cabins that give your team its own room to think, call and build, with the community just outside the door.',
    ideal: 'Startups and small teams who need privacy and focus',
    points: ['Enclosed, team-sized rooms', 'Quiet for calls and deep work', 'Room to grow alongside you'],
  },
  {
    id: 'meeting-room',
    name: 'Meeting room',
    tag: 'Present & decide',
    tone: 'coral',
    text: 'A long table, a big presentation screen and glass walls that keep things bright. Bring clients, interviews or the whole team.',
    ideal: 'Client meetings, pitches, interviews and team reviews',
    points: ['Long table for the whole team', 'Presentation screen in the room', 'A professional setting for guests'],
  },
];

export const amenities: { icon: string; title: string; text: string; tone: Tone; confirm?: boolean }[] = [
  { icon: 'wifi', title: 'High-speed Wi-Fi', text: 'Reliable internet for calls, uploads and everything in between.', tone: 'cobalt', confirm: true },
  { icon: 'coffee', title: 'Coffee & tea counter', text: 'A proper coffee machine in the lounge for your next refill.', tone: 'orange' },
  { icon: 'presentation', title: 'Meeting room with screen', text: 'Present, review and decide in a room built for it.', tone: 'coral' },
  { icon: 'concierge', title: 'Front-desk welcome', text: 'A warm reception for you and the guests you bring.', tone: 'mustard' },
  { icon: 'sofa', title: 'Breakout lounge', text: 'Colourful seats for a reset, a chat or a working lunch.', tone: 'leaf' },
  { icon: 'zap', title: 'Power backup', text: 'Keep working through outages without missing a beat.', tone: 'mustard', confirm: true },
  { icon: 'snowflake', title: 'Air-conditioned', text: 'Comfortable all year round, whatever the weather outside.', tone: 'cobalt', confirm: true },
  { icon: 'map', title: 'Vaishali address', text: 'A professional address at Sector 4, Vaishali, Ghaziabad.', tone: 'coral' },
];

export const audiences = [
  { title: 'Freelancers & consultants', text: 'Swap the kitchen table for a desk that means business.' },
  { title: 'Startups & small teams', text: 'A real base for your team without a long, heavy lease.' },
  { title: 'Remote employees', text: 'Keep the job, lose the isolation. Work near home, not alone.' },
  { title: 'Client-facing pros', text: 'Meet clients in a space that reflects the quality of your work.' },
];

export const joinSteps = [
  { title: 'Say hello', text: 'Call, WhatsApp or send an enquiry. Tell us how you work and how many seats you need.' },
  { title: 'Come for a visit', text: 'Drop by Sector 4, Vaishali. See the desks, the cabins and the meeting room for yourself.' },
  { title: 'Move in', text: 'Choose the space that fits and start working. We’ll help you get settled.' },
];
