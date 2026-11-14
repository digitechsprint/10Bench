import type { Crop } from './motion';

// Every photo of the space, plus close-up crops of them, in one place.
// Only real 10Bench imagery: the reception, lounge, meeting room and floor plan renders.
// To add new photos, drop them in public/images and add entries here.
export type Photo = { src: string; alt: string; crop?: Crop };

const reception = '/images/workspace-reception.jpeg';
const lounge = '/images/workspace-lounge.jpeg';
const meeting = '/images/workspace-meeting.jpeg';
const floorplan = '/images/workspace-floorplan.jpeg';

export const photos = {
  reception: { src: reception, alt: '10Bench reception with the 10 Bench Co Working sign, warm wood walls and a geometric front desk' },
  receptionSign: { src: reception, alt: 'The illuminated 10 Bench Co Working sign above the reception desk', crop: { x: 44, y: 31, zoom: 2 } },
  receptionDesk: { src: reception, alt: 'The black geometric reception desk with plants at 10Bench', crop: { x: 42, y: 70, zoom: 1.8 } },
  lounge: { src: lounge, alt: 'Colourful breakout lounge at 10Bench with round armchairs, wooden tables and an orange coffee counter' },
  coffee: { src: lounge, alt: 'The orange coffee counter with a coffee machine and bookshelf in the 10Bench lounge', crop: { x: 57, y: 34, zoom: 2 } },
  loungeChairs: { src: lounge, alt: 'Bright yellow, blue, green and red armchairs in the 10Bench lounge', crop: { x: 40, y: 78, zoom: 1.7 } },
  glassCabins: { src: lounge, alt: 'Glass-fronted cabins lining the corridor beside the 10Bench lounge', crop: { x: 92, y: 45, zoom: 2.6 } },
  glassCabinsLeft: { src: lounge, alt: 'Row of glass-fronted cabins with wooden frames at 10Bench', crop: { x: 8, y: 45, zoom: 2.6 } },
  meeting: { src: meeting, alt: '10Bench meeting room with a long wooden table, black chairs and a large presentation screen' },
  meetingScreen: { src: meeting, alt: 'Large presentation screen at the head of the 10Bench meeting room table', crop: { x: 37, y: 54, zoom: 2 } },
  meetingTable: { src: meeting, alt: 'Long wooden boardroom table and chairs in the 10Bench meeting room', crop: { x: 51, y: 72, zoom: 1.8 } },
  floorplan: { src: floorplan, alt: 'Isometric floor plan of 10Bench showing cabins, open desks, the meeting room, reception and lounge' },
  openDesks: { src: floorplan, alt: 'Open coworking desks with monitors in the centre of the 10Bench floor plan', crop: { x: 45, y: 58, zoom: 2.6 } },
  cabins: { src: floorplan, alt: 'Row of private team cabins with desks and monitors on the 10Bench floor plan', crop: { x: 62, y: 42, zoom: 2.6 } },
  cabinsLeft: { src: floorplan, alt: 'Private cabins with workstations along the glass wall of the 10Bench floor plan', crop: { x: 38, y: 60, zoom: 2.4 } },
  cabinsBottom: { src: floorplan, alt: 'Private cabins with desks for small teams on the 10Bench floor plan', crop: { x: 56, y: 80, zoom: 2.5 } },
  cabinRow: { src: lounge, alt: 'Row of glass-fronted private cabins with wooden frames along the 10Bench corridor', crop: { x: 12, y: 38, zoom: 2.3 } },
  cabinsWide: { src: floorplan, alt: 'Private cabins of different sizes on the 10Bench floor plan', crop: { x: 60, y: 44, zoom: 2.1 } },
  meetingPlan: { src: floorplan, alt: 'The meeting room and reception area on the 10Bench floor plan', crop: { x: 61, y: 22, zoom: 2.6 } },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** The photo shown for each workspace type (ids from site-content.ts). */
export const spacePhotos: Record<string, Photo> = {
  'open-desk': photos.openDesks,
  'dedicated-desk': photos.floorplan,
  'private-cabin': photos.cabins,
  'meeting-room': photos.meeting,
};
