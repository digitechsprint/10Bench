import type { Metadata } from 'next';
import Link from 'next/link';
import { Armchair, ArrowRight, ArrowUpRight, BookOpen, Coffee, IndianRupee, MapPin, MessageCircle, Navigation, Phone, Presentation, Sofa } from 'lucide-react';
import { HorizontalGallery, ImageReveal, Magnetic, Marquee, Reveal, RotatingBadge, SplitText, Spotlight } from '../components/motion';
import { AmenityIcon } from '../components/amenity-icon';
import { amenities, audiences, buildContact, joinSteps, spaces } from '../components/site-content';
import { JsonLd } from '../components/json-ld';
import { PricingCards } from '../components/pricing';
import { photos, spacePhotos, type Photo } from '../components/photos';
import { formatRupees, pageMetadata, pricingSchema } from '../lib/seo';
import { getSeo } from '../lib/settings';

const whyReasons = [
  { icon: Armchair, title: 'Ready to use', text: 'Furnished desks and private cabins, so there’s nothing to set up.' },
  { icon: IndianRupee, title: 'Simple monthly pricing', text: '' }, // filled from the live pricing
  { icon: Presentation, title: 'Meeting room on site', text: 'Impress clients in a room with a big presentation screen.' },
  { icon: MapPin, title: 'A Vaishali address', text: 'Easy to reach from Ghaziabad, Noida and East Delhi.' },
];

const loungeFeatures = [
  { icon: Coffee, title: 'Coffee counter', text: 'A proper coffee machine for your next refill.' },
  { icon: Sofa, title: 'Breakout seating', text: 'Bright armchairs for a reset or a quick chat.' },
  { icon: BookOpen, title: 'Reading shelf', text: 'A warm corner to pause between tasks.' },
];

// Freelancers, startups, remote employees, client-facing pros (same order as `audiences`).
const audiencePhotos: Photo[] = [photos.openDeskArea, photos.cabinTeam, photos.loungeChairs, photos.meeting];

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getSeo(), 'home');
}

const galleryItems = [
  { src: '/images/workspace-lounge.jpeg', alt: 'Colorful lounge seating and coffee counter in the 10Bench coworking space', title: 'The breakout lounge', label: 'Reset & recharge' },
  { src: '/images/open-desks.jpg', alt: 'Open coworking desks with monitors at 10Bench', title: 'The open desks', label: 'Plug in & focus' },
  { src: '/images/cabin-team.jpg', alt: 'Glass-walled team cabin at 10Bench with a row of workstations', title: 'The private cabins', label: 'Room for your team' },
  { src: '/images/workspace-meeting.jpeg', alt: 'Meeting room at 10Bench with a long wood table and presentation screen', title: 'The meeting room', label: 'Present & decide' },
  { src: '/images/workspace-reception.jpeg', alt: 'The 10Bench welcome desk behind a black geometric screen', title: 'The reception', label: 'Arrive in style' },
  { src: '/images/workspace-floorplan.jpeg', alt: 'Isometric floor plan of the 10Bench coworking space', title: 'The full layout', label: 'Desks, cabins & more' },
];

export default async function HomePage() {
  const seo = await getSeo();
  const contact = buildContact(seo.business);
  const lowestPrice = Math.min(...seo.pricing.plans.map(plan => plan.price));
  return <main>
    <JsonLd data={pricingSchema(seo)} />
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

    <section className="section-pad why-section">
      <div className="container">
        <div className="why-grid">
          <div className="why-copy">
            <Reveal><span className="eyebrow">Why 10Bench</span></Reveal>
            <SplitText className="display">Walk in ready. <span className="editorial">Get straight to work.</span></SplitText>
            <Reveal delay={0.15}><p className="why-lead">A professional office in Sector 4, Vaishali, without the cost or commitment of leasing your own. Desks, cabins and a meeting room, ready when you are.</p></Reveal>
            <Reveal delay={0.25} className="why-actions">
              <Magnetic><Link className="button" href="/contact">Book a visit <ArrowRight size={16} /></Link></Magnetic>
              <Link className="text-link" href="/offerings/#pricing">See pricing <ArrowRight size={15} /></Link>
            </Reveal>
          </div>
          <div className="why-media">
            <ImageReveal className="why-photo-main" src={photos.reception.src} alt={photos.reception.alt} />
            <ImageReveal className="why-photo-inset" src={photos.openDeskArea.src} alt={photos.openDeskArea.alt} parallax={false} delay={0.2} />
          </div>
        </div>
        <ul className="why-list">
          {whyReasons.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * 0.07}><li>
            <span className="why-icon"><Icon size={20} strokeWidth={1.8} /></span>
            <strong>{title}</strong>
            <span className="why-text">{text || `Plans from ${formatRupees(lowestPrice)} a month, with no long lease.`}</span>
          </li></Reveal>)}
        </ul>
      </div>
    </section>

    <section className="section-pad spaces-section">
      <div className="container">
        <div className="section-head">
          <div><Reveal><span className="eyebrow">Ways to work</span></Reveal><SplitText className="display">Pick the space that <span className="editorial">fits your day.</span></SplitText></div>
          <Reveal delay={0.15}><p>From a single seat to a private cabin for your whole team, there’s a setup for every stage of your work.</p><Link href="/offerings" className="text-link">Compare all spaces <ArrowRight size={15} /></Link></Reveal>
        </div>
        <div className="space-photo-grid is-three">
          {spaces.map((space, index) => {
            const photo = spacePhotos[space.id] ?? photos.lounge;
            return <Reveal key={space.id} delay={index * 0.08} className={`space-photo-card tone-${space.tone}`}>
              <ImageReveal className="space-photo" src={photo.src} alt={photo.alt} crop={photo.crop} parallax={false} cursor="">
                <span className="space-tag">{space.tag}</span>
              </ImageReveal>
              <div className="space-photo-body">
                <h3>{space.name}</h3>
                <p>{space.text}</p>
                <Link href={`/offerings/#${space.id}`} className="space-link">Explore <ArrowUpRight size={16} /></Link>
              </div>
            </Reveal>;
          })}
        </div>
      </div>
    </section>

    <section id="pricing" className="section-pad pricing-section">
      <div className="container">
        <div className="section-head">
          <div><Reveal><span className="eyebrow">Pricing</span></Reveal><SplitText className="display">Simple, <span className="editorial">monthly pricing.</span></SplitText></div>
          <Reveal delay={0.15}><p>No hidden extras. Every plan includes the lounge, coffee counter and front-desk welcome.</p><Link href="/offerings/#pricing" className="text-link">Compare all plans <ArrowRight size={15} /></Link></Reveal>
        </div>
        <PricingCards pricing={seo.pricing} />
      </div>
    </section>

    <section className="section-pad lounge-section">
      <div className="lounge-glow" aria-hidden="true" />
      <div className="container lounge-grid">
        <div className="lounge-media">
          <ImageReveal className="lounge-photo-main" src={photos.lounge.src} alt={photos.lounge.alt} cursor="" />
          <div className="lounge-thumbs">
            <ImageReveal className="lounge-thumb" src={photos.coffee.src} alt={photos.coffee.alt} crop={photos.coffee.crop} parallax={false} delay={0.1} cursor="" />
            <ImageReveal className="lounge-thumb" src={photos.loungeChairs.src} alt={photos.loungeChairs.alt} crop={photos.loungeChairs.crop} parallax={false} delay={0.2} cursor="" />
          </div>
        </div>
        <div className="lounge-copy">
          <Reveal><span className="eyebrow">The lounge</span></Reveal>
          <SplitText className="display">Colour, coffee and <span className="editorial">a change of pace.</span></SplitText>
          <Reveal delay={0.15}><p>Step away from the screen without leaving the building. Grab a coffee, sink into a bright armchair and let your next idea arrive.</p></Reveal>
          <ul className="lounge-features">
            {loungeFeatures.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={0.2 + index * 0.07}><li>
              <span className="lounge-feature-icon"><Icon size={18} strokeWidth={1.8} /></span>
              <div><strong>{title}</strong><span>{text}</span></div>
            </li></Reveal>)}
          </ul>
          <Reveal delay={0.4}><Magnetic><Link className="button" href="/gallery">Take the tour <ArrowRight size={16} /></Link></Magnetic></Reveal>
        </div>
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
        <div className="audience-photos">
          {audiences.map((audience, index) => {
            const photo = audiencePhotos[index % audiencePhotos.length];
            return <Reveal key={audience.title} delay={index * 0.08} className="audience-photo">
              <ImageReveal className="audience-photo-image" src={photo.src} alt={photo.alt} crop={photo.crop} parallax={false} cursor="">
                <div className="audience-photo-text"><h3>{audience.title}</h3><p>{audience.text}</p></div>
              </ImageReveal>
            </Reveal>;
          })}
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
          <iframe src={contact.mapsEmbed} title={`Map showing 10Bench at ${contact.address}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
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
