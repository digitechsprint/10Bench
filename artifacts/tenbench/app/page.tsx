import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { HorizontalGallery, ImageReveal, Magnetic, Marquee, Reveal, RotatingBadge, ScrollWords, SplitText, Spotlight } from '../components/motion';
import { AmenityIcon } from '../components/amenity-icon';
import { amenities, audiences, contact, joinSteps, spaces } from '../components/site-content';

export const metadata: Metadata = {
  title: 'Coworking space in Vaishali, Ghaziabad',
  description: 'Open desks, dedicated desks, private cabins and a meeting room at 116, Sector 4, Vaishali, Ghaziabad. 10Bench is a warm, well-designed coworking space for freelancers, startups and growing teams.',
};

const galleryItems = [
  { src: '/images/workspace-lounge.jpeg', alt: 'Colorful lounge seating and coffee counter in the 10Bench coworking space', title: 'The breakout lounge', label: 'Reset & recharge' },
  { src: '/images/workspace-meeting.jpeg', alt: 'Meeting room at 10Bench with a long wood table and presentation screen', title: 'The meeting room', label: 'Present & decide' },
  { src: '/images/workspace-reception.jpeg', alt: 'The 10Bench welcome desk behind a black geometric screen', title: 'The reception', label: 'Arrive in style' },
  { src: '/images/workspace-floorplan.jpeg', alt: 'Isometric floor plan of the 10Bench coworking space', title: 'The full layout', label: 'Desks, cabins & more' },
];

export default function HomePage() {
  return <main>
    <section className="hero hero-dark">
      <div className="hero-bg" aria-hidden="true"><span className="hero-orb" /><span className="hero-orb hero-orb-2" /><span className="hero-lines" /></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal y={16}><span className="eyebrow eyebrow-pill"><i className="live-dot" />Coworking in Vaishali, Ghaziabad</span></Reveal>
          <SplitText as="h1" className="display" delay={0.1}>Do your best work at a <span className="editorial">better address.</span></SplitText>
          <Reveal delay={0.45}><p>Open desks, private cabins and a meeting room that’s ready when you are. 10Bench is a warm, beautifully designed workspace for freelancers, startups and teams who want more than just a desk.</p></Reveal>
          <Reveal delay={0.6} className="hero-actions">
            <Magnetic><Link className="button" href="/contact">Book a visit <ArrowRight size={16} /></Link></Magnetic>
            <Magnetic><a className="button button-ghost" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> Chat on WhatsApp</a></Magnetic>
          </Reveal>
          <Reveal delay={0.75} className="hero-chips">
            {spaces.map(space => <span key={space.id} className={`chip tone-${space.tone}`}><i />{space.name}</span>)}
          </Reveal>
        </div>
        <div className="hero-visual">
          <ImageReveal className="hero-photo" src="/images/workspace-reception.jpeg" alt="Welcoming 10Bench reception with warm wood and glass partitions" delay={0.15} cursor="" />
          <Link href="/gallery" className="hero-badge-link" aria-label="Take the gallery tour" data-cursor="Tour"><RotatingBadge className="hero-badge" text="10Bench • Coworking spaces • Vaishali • Ghaziabad • " /></Link>
          <Reveal delay={0.9} y={24} className="hero-caption">
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hero-caption-link">
              <span className="caption-mark"><MapPin size={17} /></span>
              <span><strong>Visit us in Sector 4</strong><span>{contact.address}</span></span>
            </a>
          </Reveal>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span>Scroll</span><i /></div>
    </section>

    <Marquee items={['Focus', 'Meet', 'Collaborate', 'Recharge', 'Build', 'Grow']} />

    <section className="section-pad manifesto">
      <div className="container manifesto-grid">
        <div className="manifesto-head">
          <Reveal><span className="eyebrow">Why 10Bench</span></Reveal>
          <SplitText className="display">Not just a desk. <span className="editorial">A better workday.</span></SplitText>
          <Reveal delay={0.2}><div className="manifesto-tag">Focus · Meet · Recharge — all under one roof</div></Reveal>
        </div>
        <div className="manifesto-copy">
          <ScrollWords className="display" text="Working from home blurs every line. Cafés are loud. Long office leases tie you down. 10Bench gives you a *professional* *base* that feels *good* *to* *walk* *into* — and the freedom to work your way." />
          <Reveal><p>Warm wood, glass-fronted rooms and a lounge full of colour. Everything practical is in place, so all you have to bring is the work.</p></Reveal>
        </div>
      </div>
    </section>

    <section className="section-pad spaces-section">
      <div className="container">
        <div className="section-head">
          <div><Reveal><span className="eyebrow">Ways to work</span></Reveal><SplitText className="display">Pick the space that <span className="editorial">fits your day.</span></SplitText></div>
          <Reveal delay={0.15}><p>From a single seat to a private cabin for your whole team, there’s a setup for every stage of your work.</p><Link href="/offerings" className="text-link">Compare all spaces <ArrowRight size={15} /></Link></Reveal>
        </div>
        <div className="space-grid">
          {spaces.map((space, index) => <Reveal key={space.id} delay={index * 0.08} className={`space-card tone-${space.tone}`}>
            <div className="space-card-top"><span className="space-num">0{index + 1}</span><span className="space-tag">{space.tag}</span></div>
            <h3>{space.name}</h3>
            <p>{space.text}</p>
            <ul>{space.points.map(point => <li key={point}><Check size={14} />{point}</li>)}</ul>
            <Link href="/contact" className="space-link">Enquire <ArrowUpRight size={16} /></Link>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="image-story">
      <ImageReveal className="image-story-visual" src="/images/workspace-lounge.jpeg" alt="Bright lounge at 10Bench with colorful chairs arranged around a shared coffee counter" />
      <div className="image-story-copy">
        <Reveal><span className="eyebrow">The lounge</span></Reveal>
        <SplitText className="display">Colour, coffee and a <span className="editorial">change of pace.</span></SplitText>
        <Reveal delay={0.2}><p>Step away from the screen without leaving the building. Grab a coffee, sink into a bright armchair, and let your next idea arrive. Great work needs good breaks.</p></Reveal>
        <Reveal delay={0.3}><Magnetic><Link className="button" href="/gallery">Take the tour <ArrowRight size={16} /></Link></Magnetic></Reveal>
      </div>
    </section>

    <section className="amenities-section">
      <div className="amenities-glow" aria-hidden="true" />
      <div className="container">
        <div className="section-head">
          <div><Reveal><span className="eyebrow">Everything included</span></Reveal><SplitText className="display">All the essentials. <span className="editorial">None of the hassle.</span></SplitText></div>
          <Reveal delay={0.15}><p>Skip the setup, the bills and the admin. Walk in and everything you need to work well is already here.</p></Reveal>
        </div>
        <Spotlight className="amenity-grid">
          {amenities.map((amenity, index) => <Reveal key={amenity.title} delay={(index % 4) * 0.07} className={`amenity spot tone-${amenity.tone}`}>
            <span className="amenity-icon"><AmenityIcon name={amenity.icon} size={22} strokeWidth={1.7} /></span>
            <h3>{amenity.title}</h3>
            <p>{amenity.text}</p>
          </Reveal>)}
        </Spotlight>
      </div>
    </section>

    <section className="section-pad audience-section">
      <div className="container audience-grid">
        <div className="audience-head">
          <Reveal><span className="eyebrow">Who it’s for</span></Reveal>
          <SplitText className="display">Built for people who <span className="editorial">mean business.</span></SplitText>
          <Reveal delay={0.15}><p>Whether you’re flying solo or leading a growing team, 10Bench gives you the space and the setting to do your best work.</p><Magnetic><Link href="/contact" className="button">Find your fit <ArrowRight size={16} /></Link></Magnetic></Reveal>
        </div>
        <div className="audience-list">
          {audiences.map((audience, index) => <Reveal key={audience.title} delay={index * 0.08} className="audience-card">
            <span className="audience-num">0{index + 1}</span>
            <div><h3>{audience.title}</h3><p>{audience.text}</p></div>
          </Reveal>)}
        </div>
      </div>
    </section>

    <HorizontalGallery
      items={galleryItems}
      intro={<>
        <span className="eyebrow">Look around</span>
        <h2 className="display">Warm edges.<br /><span className="editorial">Clear thinking.</span></h2>
        <p>Warm wood, glass and bold colour come together in a space that feels as good as it works. Take a first look inside.</p>
        <span className="hgallery-hint">Keep scrolling <ArrowRight size={14} /></span>
      </>}
    />

    <section className="section-pad join-section">
      <div className="container">
        <div className="section-head">
          <div><Reveal><span className="eyebrow">Getting started</span></Reveal><SplitText className="display">Three steps to <span className="editorial">your new desk.</span></SplitText></div>
          <Reveal delay={0.15}><p>No complicated paperwork, no long waits. Just a conversation, a visit, and a space that’s ready for you.</p></Reveal>
        </div>
        <div className="join-steps">
          {joinSteps.map((step, index) => <Reveal key={step.title} delay={index * 0.12} className="join-step">
            <span className="join-num">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="section-pad location-section">
      <div className="container location-grid">
        <div className="location-copy">
          <Reveal><span className="eyebrow">Find us</span></Reveal>
          <SplitText className="display">Right here in <span className="editorial">Vaishali.</span></SplitText>
          <Reveal delay={0.15}>
            <p>Easy to reach from across Ghaziabad, Noida and East Delhi. Come by for a visit and see the space for yourself.</p>
            <ul className="location-list">
              <li><MapPin size={18} /><div><span>Address</span><strong>{contact.address}</strong></div></li>
              <li><Phone size={18} /><div><span>Call us</span><a href={contact.phoneHref}>{contact.phone}</a></div></li>
            </ul>
            <div className="location-actions">
              <Magnetic><a className="button" href={contact.mapsUrl} target="_blank" rel="noopener noreferrer"><Navigation size={15} /> Get directions</a></Magnetic>
              <Magnetic><a className="button button-outline" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> WhatsApp us</a></Magnetic>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="location-map">
          <iframe src={contact.mapsEmbed} title="Map showing 10Bench at 116, Sector 4, Vaishali, Ghaziabad" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <span className="location-pin"><MapPin size={16} /> 10Bench</span>
        </Reveal>
      </div>
    </section>

    <section className="cta-band">
      <div className="cta-rings" aria-hidden="true"><i /><i /><i /></div>
      <div className="container cta-inner">
        <SplitText className="display">Your new favourite place to work is <span className="editorial">one visit away.</span></SplitText>
        <Reveal delay={0.2}><Magnetic><Link href="/contact" className="button">Book a visit <ArrowRight size={16} /></Link></Magnetic></Reveal>
      </div>
    </section>
  </main>;
}
