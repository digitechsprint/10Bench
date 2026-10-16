import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Coffee, DoorOpen, Laptop, UsersRound } from 'lucide-react';
import { Reveal } from '../../components/site-shell';

export const metadata: Metadata = {
  title: 'Our Offering | Coworking, meeting and team spaces',
  description: 'Explore how you might work at 10Bench, from individual focus time to team sessions and meeting room moments. Ask us about the right fit.',
};

const offerings = [
  { icon: Laptop, title: 'A place to focus', text: 'Settle into a workday with a desk, a clear head, and a little separation between work and everything else. For independent professionals, remote workers, and anyone who needs a change of scene.' },
  { icon: DoorOpen, title: 'A room to meet', text: 'Bring a conversation into a dedicated room. Meet with colleagues, welcome a client, or give a presentation in a setting that feels ready for the moment.' },
  { icon: UsersRound, title: 'Space for your team', text: 'A shared base can make the work of growing together feel more connected. Explore a setup that can support your team’s day-to-day rhythm.' },
  { icon: Coffee, title: 'Space between tasks', text: 'A good break can change the shape of an afternoon. The lounge offers a more relaxed place to recharge or continue the conversation.' },
];

export default function OfferingsPage() {
  return <main>
    <section className="page-hero"><div className="container"><span className="eyebrow">Our offering</span><h1 className="display">A workspace for<br /><span className="editorial">the way you work.</span></h1><p>Different days ask for different things. Explore the work settings at 10Bench and find a way to make the space yours.</p></div></section>
    <section className="section-pad"><div className="container offer-cards">{offerings.map(({ icon: Icon, title, text }) => <Reveal key={title} className="offer-card"><Icon className="icon" size={25} strokeWidth={1.6} /><h2>{title}</h2><p>{text}</p></Reveal>)}</div></section>
    <section className="section-pad" style={{ background: 'var(--cream)' }}><div className="container offer-detail">
      <Reveal><span className="eyebrow">A room to think together</span><h2 className="display">Bring the conversation into focus.</h2><p>With a long table, presentation screen, and glass-fronted setting, the meeting room gives your next discussion a place of its own.</p><ul><li><Check size={16} />A dedicated meeting environment</li><li><Check size={16} />Presentation screen in the room</li><li><Check size={16} />A setting for conversations and collaboration</li></ul><Link href="/contact" className="button">Ask about meeting spaces <ArrowRight size={16} /></Link></Reveal>
      <Reveal><img src="/images/workspace-meeting.jpeg" alt="10Bench meeting room with long wood table, chairs, and presentation screen" /></Reveal>
    </div></section>
    <section className="section-pad"><div className="container section-head"><div><span className="eyebrow">Find your starting point</span><h2 className="display">Not sure what fits?</h2></div><p>Tell us a little about your workday or the kind of gathering you have in mind. We can help you think through the options.</p></div><div className="container" style={{ textAlign: 'center' }}><Link className="button" href="/contact">Start a conversation <ArrowRight size={16} /></Link></div></section>
    <section className="cta-band"><div className="container cta-inner"><h2 className="display">Your next workday could start here.</h2><Link href="/gallery" className="button">Take the gallery tour <ArrowRight size={16} /></Link></div></section>
  </main>;
}
