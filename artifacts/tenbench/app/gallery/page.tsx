import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gallery Tour | Inside 10Bench Coworking',
  description: 'Take a visual tour through 10Bench: welcoming reception, colorful lounge, glass-fronted meeting room, and a look at the overall floor plan.',
};

export default function GalleryPage() {
  return <main>
    <section className="page-hero"><div className="container"><span className="eyebrow">Gallery tour</span><h1 className="display">A first look<br />at <span className="editorial">your next place.</span></h1><p>Move through the spaces, notice the details, and picture how your own workday might unfold here.</p></div></section>
    <section className="section-pad"><div className="container tour-intro"><div><span className="eyebrow">Come on in</span><h2 className="display">Different corners.<br />One good flow.</h2></div><p>Warm wood and glass help create a clear, open feel. A generous welcome leads into colorful places to reset, and a more focused room for bringing people together.</p></div>
      <div className="container tour-grid">
        <figure className="tour-tile image-frame"><img src="/images/workspace-lounge.jpeg" alt="A bright lounge with bold colorful chairs, plants, and a shared counter" /><figcaption>The lounge — a change of pace, right in the flow of the day.</figcaption></figure>
        <figure className="tour-tile image-frame"><img src="/images/workspace-reception.jpeg" alt="10Bench reception with welcoming wood finishes and glass partitions" /><figcaption>Reception — a warm welcome into the space.</figcaption></figure>
        <figure className="tour-tile image-frame"><img src="/images/workspace-meeting.jpeg" alt="Meeting room at 10Bench featuring a long table and presentation display" /><figcaption>Meeting room — bring a conversation into focus.</figcaption></figure>
      </div>
      <div className="container floorplan-frame"><span className="eyebrow">See the bigger picture</span><h2 className="display">A layout with room to find your rhythm.</h2><img src="/images/workspace-floorplan.jpeg" alt="Isometric floor plan illustration showing work desks, enclosed rooms, lounge, and circulation at 10Bench" /></div>
    </section>
    <section className="cta-band"><div className="container cta-inner"><h2 className="display">Pictures are a start. Come find your own corner.</h2><Link href="/contact" className="button">Ask about a visit <ArrowRight size={16} /></Link></div></section>
  </main>;
}
