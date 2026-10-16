import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Armchair, Check, DoorClosed, Laptop, MessageCircle, Presentation, UsersRound } from 'lucide-react';
import { ImageReveal, Magnetic, Reveal, SplitText } from '../../components/motion';
import { contact, spaces } from '../../components/site-content';

export const metadata: Metadata = {
  title: 'Workspaces | Open desks, private cabins & meeting room',
  description: 'Compare coworking options at 10Bench, Vaishali: open desks, dedicated desks, private cabins for teams and a meeting room with a presentation screen. Ask us for pricing.',
};

const spaceIcons = { 'open-desk': Laptop, 'dedicated-desk': Armchair, 'private-cabin': DoorClosed, 'meeting-room': Presentation };

const faqs = [
  ['Can I visit before I decide?', 'Yes, and we’d encourage it. Call or WhatsApp us to arrange a time, then come and see the desks, cabins and meeting room in person.'],
  ['How much does it cost?', 'Pricing depends on the type of space, the number of seats and how long you need it. Tell us what you’re looking for and we’ll share the options that fit.'],
  ['Do you have space for a whole team?', 'Private cabins are designed for teams who need a room of their own. Share your team size and we’ll suggest the right setup.'],
  ['Can I use the meeting room for client meetings?', 'Absolutely. With a long table and a presentation screen, it’s set up for client meetings, pitches, interviews and team reviews. Get in touch to check availability.'],
  ['Where exactly are you?', `You’ll find us at ${contact.address}. Use the map on our home page or contact page for directions.`],
];

export default function OfferingsPage() {
  return <main>
    <section className="page-hero offering-hero"><span className="page-hero-orb" aria-hidden="true" /><div className="container">
      <Reveal y={16}><span className="eyebrow">Workspaces</span></Reveal>
      <SplitText as="h1" className="display" delay={0.1}>Find the space that<br /><span className="editorial">works like you do.</span></SplitText>
      <Reveal delay={0.45}><p>A seat for the day, a desk to call your own, a private cabin for your team or a room to impress clients. Mix and match as your work changes.</p>
        <div className="hero-chips">{spaces.map(space => <a key={space.id} href={`#${space.id}`} className={`chip tone-${space.tone}`}><i />{space.name}</a>)}</div>
      </Reveal>
    </div></section>

    <section className="section-pad offering-options"><div className="container">
      <Reveal className="offering-intro"><span className="eyebrow">Choose your setting</span><p>Every space comes with the lounge, the coffee counter and a warm welcome at the front desk.</p></Reveal>
      <div className="offering-list">{spaces.map((space, index) => {
        const Icon = spaceIcons[space.id as keyof typeof spaceIcons] ?? UsersRound;
        return <div key={space.id} id={space.id} className={`offering-row tone-${space.tone}`}>
          <Reveal className="offering-copy">
            <span className="offering-number">0{index + 1}</span>
            <span className="space-tag">{space.tag}</span>
            <h2>{space.name}</h2>
            <p>{space.text}</p>
            <Link href="/contact" className="text-link">Ask about {space.name.toLowerCase()} <ArrowRight size={15} /></Link>
          </Reveal>
          <Reveal delay={0.1} className="offering-panel">
            <span className="offering-panel-icon"><Icon size={30} strokeWidth={1.5} /></span>
            <span className="offering-panel-label">Ideal for</span>
            <strong>{space.ideal}</strong>
            <ul>{space.points.map(point => <li key={point}><Check size={15} />{point}</li>)}</ul>
          </Reveal>
        </div>;
      })}</div>
    </div></section>

    <section className="section-pad offering-meeting"><div className="container offer-detail">
      <div>
        <Reveal><span className="eyebrow">The meeting room</span></Reveal>
        <SplitText className="display">Make a great <span className="editorial">first impression.</span></SplitText>
        <Reveal delay={0.15}><p>Glass walls, a long wooden table and a big presentation screen. Whether it’s a pitch, an interview or a quarterly review, this is a room that tells people you mean business.</p><ul><li><Check size={16} />Seating around one long table</li><li><Check size={16} />Presentation screen in the room</li><li><Check size={16} />Bright, glass-fronted setting</li></ul><Magnetic><Link href="/contact" className="button">Check availability <ArrowRight size={16} /></Link></Magnetic></Reveal>
      </div>
      <ImageReveal className="offer-detail-photo" src="/images/workspace-meeting.jpeg" alt="10Bench meeting room with long wood table, chairs, and presentation screen" />
    </div></section>

    <section className="pricing-band"><div className="container pricing-inner">
      <Reveal><span className="eyebrow">Pricing</span><SplitText className="display">Plans shaped around <span className="editorial">your team.</span></SplitText></Reveal>
      <Reveal delay={0.15} className="pricing-copy"><p>Tell us how many seats you need and for how long. We’ll come back with clear options and no surprises.</p>
        <div className="pricing-actions"><Magnetic><Link href="/contact" className="button">Get a quote <ArrowRight size={16} /></Link></Magnetic><Magnetic><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="button button-ghost"><MessageCircle size={16} /> WhatsApp us</a></Magnetic></div>
      </Reveal>
    </div></section>

    <section className="section-pad offering-faq"><div className="container faq-layout">
      <div>
        <Reveal><span className="eyebrow">Questions, answered</span></Reveal>
        <SplitText className="display">Good to know.</SplitText>
        <Reveal delay={0.15}><p>Anything else on your mind? Give us a call on {contact.phone} or send us a message.</p><Link className="text-link" href="/contact">Ask us directly <ArrowRight size={15} /></Link></Reveal>
      </div>
      <div className="faq-list">{faqs.map(([question, answer], index) => <Reveal key={question} delay={index * 0.08}><details className="faq-item"><summary><span className="faq-index">0{index + 1}</span><span>{question}</span><span className="faq-toggle" aria-hidden="true" /></summary><p>{answer}</p></details></Reveal>)}</div>
    </div></section>

    <section className="cta-band"><div className="cta-rings" aria-hidden="true"><i /><i /><i /></div><div className="container cta-inner">
      <SplitText className="display">See it for yourself. <span className="editorial">Book a visit.</span></SplitText>
      <Reveal delay={0.2}><Magnetic><Link href="/contact" className="button">Book a visit <ArrowRight size={16} /></Link></Magnetic></Reveal>
    </div></section>
  </main>;
}
