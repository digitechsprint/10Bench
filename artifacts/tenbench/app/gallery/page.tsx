import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ImageReveal, LightboxGallery, Magnetic, Reveal, SplitText } from '../../components/motion';

export const metadata: Metadata = {
  title: 'Gallery Tour | Inside 10Bench Coworking',
  description: 'Take a visual tour through 10Bench: welcoming reception, colorful lounge, glass-fronted meeting room, and a look at the overall floor plan.',
};

const tour = [
  { src: '/images/workspace-lounge.jpeg', alt: 'A bright lounge with bold colorful chairs, plants, and a shared counter', label: 'The lounge', title: 'A change of pace', text: 'right in the flow of the day.' },
  { src: '/images/workspace-reception.jpeg', alt: '10Bench reception with welcoming wood finishes and glass partitions', label: 'Reception', title: 'A warm welcome', text: 'into the space.' },
  { src: '/images/workspace-meeting.jpeg', alt: 'Meeting room at 10Bench featuring a long table and presentation display', label: 'Meeting room', title: 'Bring a conversation', text: 'into focus.' },
];

export default function GalleryPage() {
  return <main>
    <section className="page-hero"><span className="page-hero-orb" aria-hidden="true" /><div className="container">
      <Reveal y={16}><span className="eyebrow">Gallery tour</span></Reveal>
      <SplitText as="h1" className="display" delay={0.1}>A first look<br />at <span className="editorial">your next place.</span></SplitText>
      <Reveal delay={0.45}><p>Move through the spaces, notice the details, and picture how your own workday might unfold here.</p></Reveal>
    </div></section>
    <section className="section-pad">
      <div className="container tour-intro">
        <div><Reveal><span className="eyebrow">Come on in</span></Reveal><SplitText className="display">Different corners.<br />One good flow.</SplitText></div>
        <Reveal delay={0.15}><p>Warm wood and glass help create a clear, open feel. A generous welcome leads into colorful places to reset, and a more focused room for bringing people together. Select any image to view it full screen.</p></Reveal>
      </div>
      <div className="container"><LightboxGallery items={tour} /></div>
      <div className="container floorplan-frame">
        <Reveal><span className="eyebrow">See the bigger picture</span></Reveal>
        <SplitText className="display">A layout with room to find your rhythm.</SplitText>
        <ImageReveal className="floorplan-image" src="/images/workspace-floorplan.jpeg" alt="Isometric floor plan illustration showing work desks, enclosed rooms, lounge, and circulation at 10Bench" parallax={false} cursor="" />
      </div>
    </section>
    <section className="cta-band"><div className="cta-rings" aria-hidden="true"><i /><i /><i /></div><div className="container cta-inner">
      <SplitText className="display">Pictures are a start. Come find your own corner.</SplitText>
      <Reveal delay={0.2}><Magnetic><Link href="/contact" className="button">Ask about a visit <ArrowRight size={16} /></Link></Magnetic></Reveal>
    </div></section>
  </main>;
}
