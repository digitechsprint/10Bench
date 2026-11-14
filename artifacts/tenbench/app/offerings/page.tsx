import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { ImageReveal, Magnetic, Reveal, SplitText } from '../../components/motion';
import { buildContact, spaces } from '../../components/site-content';
import { JsonLd } from '../../components/json-ld';
import { HeroCollage } from '../../components/hero-collage';
import { PricingCards } from '../../components/pricing';
import { photos, spacePhotos } from '../../components/photos';
import { breadcrumbSchema, faqSchema, formatRupees, pageMetadata, pricingSchema } from '../../lib/seo';
import { getSeo } from '../../lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getSeo(), 'offerings');
}


export default async function OfferingsPage() {
  const seo = await getSeo();
  const contact = buildContact(seo.business);
  const lowest = Math.min(...seo.pricing.plans.map(plan => plan.price));
  return <main>
    <JsonLd data={[
      breadcrumbSchema(seo, [{ name: 'Workspaces', path: '/offerings/' }]),
      faqSchema(seo.faqs),
      pricingSchema(seo),
    ]} />
    <section className="page-hero has-media offering-hero"><span className="page-hero-orb" aria-hidden="true" /><div className="container">
      <div className="page-hero-copy">
        <Reveal y={16}><span className="eyebrow">Workspaces & pricing</span></Reveal>
        <SplitText as="h1" className="display" delay={0.1}>Find the space that <span className="editorial">works like you do.</span></SplitText>
        <Reveal delay={0.45}>
          {Number.isFinite(lowest) && <p className="hero-price">Plans from <strong>{formatRupees(lowest)}</strong> a month</p>}
          <div className="hero-chips"><a href="#pricing" className="chip tone-orange"><i />See prices</a>{spaces.map(space => <a key={space.id} href={`#${space.id}`} className={`chip tone-${space.tone}`}><i />{space.name}</a>)}</div>
        </Reveal>
      </div>
      <HeroCollage main={photos.meeting} side={[photos.cabins, photos.coffee]} caption="The meeting room" />
    </div></section>

    <section id="pricing" className="section-pad pricing-section"><div className="container">
      <div className="section-head">
        <div><Reveal><span className="eyebrow">Pricing</span></Reveal><SplitText className="display">Simple, <span className="editorial">monthly pricing.</span></SplitText></div>
        <Reveal delay={0.15}><p>One seat or a whole cabin. Every plan includes the lounge, the coffee counter and the front-desk welcome.</p>
          <div className="pricing-actions"><Magnetic><Link href="/contact" className="button">Book a visit <ArrowRight size={16} /></Link></Magnetic><Magnetic><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="button button-outline"><MessageCircle size={16} /> WhatsApp</a></Magnetic></div>
        </Reveal>
      </div>
      <PricingCards pricing={seo.pricing} />
    </div></section>

    <section className="section-pad offering-options"><div className="container">
      <div className="section-head">
        <div><Reveal><span className="eyebrow">Choose your setting</span></Reveal><SplitText className="display">Every way <span className="editorial">to work.</span></SplitText></div>
      </div>
      <div className="space-photo-grid">{spaces.map((space, index) => {
        const photo = spacePhotos[space.id] ?? photos.lounge;
        return <Reveal key={space.id} delay={index * 0.08} className={`space-photo-card tone-${space.tone}`}>
          <div id={space.id} className="space-anchor" />
          <ImageReveal className="space-photo" src={photo.src} alt={photo.alt} crop={photo.crop} parallax={false} cursor="">
            <span className="space-tag">{space.tag}</span>
          </ImageReveal>
          <div className="space-photo-body">
            <h2>{space.name}</h2>
            <p>{space.text}</p>
            <ul>{space.points.map(point => <li key={point}><Check size={14} />{point}</li>)}</ul>
            <Link href="/contact" className="text-link">Ask about {space.name.toLowerCase()} <ArrowRight size={15} /></Link>
          </div>
        </Reveal>;
      })}</div>
    </div></section>

    <section className="section-pad offering-meeting"><div className="container offer-detail">
      <div>
        <Reveal><span className="eyebrow">The meeting room</span></Reveal>
        <SplitText className="display">Make a great <span className="editorial">first impression.</span></SplitText>
        <Reveal delay={0.15}><ul><li><Check size={16} />Seating around one long table</li><li><Check size={16} />Big presentation screen</li><li><Check size={16} />Bright, glass-fronted room</li></ul><Magnetic><Link href="/contact" className="button">Check availability <ArrowRight size={16} /></Link></Magnetic></Reveal>
      </div>
      <div className="photo-trio">
        <ImageReveal className="photo-trio-main" src={photos.meeting.src} alt={photos.meeting.alt} />
        <ImageReveal className="photo-trio-small" src={photos.meetingScreen.src} alt={photos.meetingScreen.alt} crop={photos.meetingScreen.crop} parallax={false} delay={0.1} />
        <ImageReveal className="photo-trio-small" src={photos.meetingTable.src} alt={photos.meetingTable.alt} crop={photos.meetingTable.crop} parallax={false} delay={0.2} />
      </div>
    </div></section>

    <section className="section-pad offering-faq"><div className="container faq-layout">
      <div>
        <Reveal><span className="eyebrow">Questions, answered</span></Reveal>
        <SplitText className="display">Good to know.</SplitText>
        <Reveal delay={0.15}><p>Anything else on your mind? Call us on {contact.phone} or send us a message.</p><Link className="text-link" href="/contact">Ask us directly <ArrowRight size={15} /></Link></Reveal>
      </div>
      <div className="faq-list">{seo.faqs.map(({ question, answer }, index) => <Reveal key={question} delay={index * 0.06}><details className="faq-item"><summary><span className="faq-index">{String(index + 1).padStart(2, '0')}</span><span>{question}</span><span className="faq-toggle" aria-hidden="true" /></summary><p>{answer}</p></details></Reveal>)}</div>
    </div></section>

    <section className="cta-band"><div className="cta-rings" aria-hidden="true"><i /><i /><i /></div><div className="container cta-inner">
      <SplitText className="display">See it for yourself. <span className="editorial">Book a visit.</span></SplitText>
      <Reveal delay={0.2}><Magnetic><Link href="/contact" className="button">Book a visit <ArrowRight size={16} /></Link></Magnetic></Reveal>
    </div></section>
  </main>;
}
