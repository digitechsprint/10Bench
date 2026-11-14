import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Coffee, IndianRupee, LayoutGrid, MapPin, Phone, Presentation, Sparkles, UsersRound } from 'lucide-react';
import { ImageReveal, Magnetic, Reveal, SplitText } from '../../components/motion';
import { JsonLd } from '../../components/json-ld';
import { HeroCollage } from '../../components/hero-collage';
import { photos } from '../../components/photos';
import { breadcrumbSchema, pageMetadata } from '../../lib/seo';
import { getSeo } from '../../lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getSeo(), 'about');
}

const principles = [
  { title: 'Focus deserves a home', text: 'Room to concentrate, with the essentials close at hand.', photo: photos.cabinTeam },
  { title: 'Good work is human', text: 'Space for a hello, a shared idea and a coffee.', photo: photos.coffee },
  { title: 'No one way to work', text: 'Solo or as a team, there’s a setting that fits.', photo: photos.openDeskArea },
];

// Icon for each "Label: value" key fact (labels are edited in the admin, so unknown ones get a default).
const factIcons = { location: MapPin, workspaces: LayoutGrid, pricing: IndianRupee, 'meeting room': Presentation, 'shared amenities': Coffee, 'ideal for': UsersRound, contact: Phone };
const factIcon = (label: string) => factIcons[label.trim().toLowerCase() as keyof typeof factIcons] ?? Sparkles;

const steps = [
  { title: 'Tell us what you need', photo: photos.receptionDesk },
  { title: 'Come and see the space', photo: photos.loungeChairs },
  { title: 'Move in and get going', photo: photos.cabinTeam },
];

export default async function AboutPage() {
  const seo = await getSeo();
  return <main>
    <JsonLd data={breadcrumbSchema(seo, [{ name: 'About', path: '/about/' }])} />
    <section className="page-hero has-media about-hero"><span className="page-hero-orb" aria-hidden="true" /><div className="container">
      <div className="page-hero-copy">
        <Reveal y={16}><span className="eyebrow">A space with a point of view</span></Reveal>
        <SplitText as="h1" className="display" delay={0.1}>Work feels better when it <span className="editorial">fits you.</span></SplitText>
        <Reveal delay={0.45}><p>A warm, well-designed coworking space in Sector 4, Vaishali, made for focus, good company and a day at your own pace.</p></Reveal>
        <Reveal delay={0.6} className="about-hero-foot"><span>Room to focus</span><i /><span>Space to connect</span><i /><span>Your own pace</span></Reveal>
      </div>
      <HeroCollage main={photos.reception} side={[photos.openDeskArea, photos.cabinTeam]} caption="The 10Bench reception" />
    </div></section>

    <section className="section-pad"><div className="container about-intro">
      <div>
        <Reveal><span className="eyebrow">Why 10Bench</span></Reveal>
        <SplitText className="display">A little more human. <span className="editorial">A lot more room.</span></SplitText>
        <Reveal delay={0.15}><p>Some days need quiet focus, others need company. 10Bench gives you both under one roof: warm wood, glass-fronted cabins and a lounge full of colour.</p><Link className="text-link" href="/offerings">See how you could work here <ArrowRight size={15} /></Link></Reveal>
      </div>
      <div className="why-media">
        <ImageReveal className="why-photo-main" src={photos.meeting.src} alt={photos.meeting.alt} />
        <ImageReveal className="why-photo-inset" src={photos.cabinCompact.src} alt={photos.cabinCompact.alt} parallax={false} delay={0.2} />
      </div>
    </div></section>

    {/* A plain-language summary and fact list: easy for answer engines and AI assistants to quote. */}
    <section className="section-pad glance-section"><div className="container">
      <div className="glance-head">
        <div><Reveal><span className="eyebrow">10Bench at a glance</span></Reveal><SplitText className="display">The essentials, <span className="editorial">in one place.</span></SplitText></div>
        <Reveal delay={0.1}><p className="glance-summary">{seo.aeo.summary}</p></Reveal>
      </div>
      <dl className="glance-facts">{seo.aeo.keyFacts.map((fact, index) => {
        const [label, ...rest] = fact.split(':');
        const value = rest.join(':').trim();
        const Icon = factIcon(label);
        return <Reveal key={fact} delay={(index % 4) * 0.06} className="glance-fact">
          <span className="glance-icon"><Icon size={20} strokeWidth={1.8} /></span>
          {value ? <><dt>{label}</dt><dd>{value.charAt(0).toUpperCase() + value.slice(1)}</dd></> : <dd>{fact}</dd>}
        </Reveal>;
      })}</dl>
    </div></section>

    <section className="photo-band">
      <ImageReveal className="photo-band-image" src={photos.openDeskArea.src} alt={photos.openDeskArea.alt} cursor="" />
      <div className="photo-band-overlay"><div className="container">
        <Reveal><span className="eyebrow">The simple idea</span></Reveal>
        <SplitText className="display">A better workday isn’t one-size-fits-all. <span className="editorial">Your space shouldn’t be either.</span></SplitText>
      </div></div>
    </section>

    <section className="section-pad principles-photos"><div className="container">
      <div className="section-head">
        <div><Reveal><span className="eyebrow">What matters here</span></Reveal><SplitText className="display">Thoughtful by design. <span className="editorial">Welcoming by nature.</span></SplitText></div>
      </div>
      <div className="photo-card-grid">
        {principles.map((item, index) => <Reveal key={item.title} delay={index * 0.1} className="photo-card">
          <ImageReveal className="photo-card-image" src={item.photo.src} alt={item.photo.alt} crop={item.photo.crop} parallax={false} cursor="" />
          <div className="photo-card-text"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>
        </Reveal>)}
      </div>
    </div></section>

    <section className="section-pad about-process"><div className="container">
      <div className="section-head">
        <div><Reveal><span className="eyebrow">A simple way to begin</span></Reveal><SplitText className="display">Three steps <span className="editorial">to your desk.</span></SplitText></div>
        <Reveal delay={0.15}><Magnetic><Link href="/contact" className="button">Book a visit <ArrowRight size={16} /></Link></Magnetic></Reveal>
      </div>
      <div className="step-photo-grid">
        {steps.map((step, index) => <Reveal key={step.title} delay={index * 0.1} className="step-photo">
          <ImageReveal className="step-photo-image" src={step.photo.src} alt={step.photo.alt} crop={step.photo.crop} parallax={false} cursor="">
            <span className="step-photo-label"><b>0{index + 1}</b>{step.title}</span>
          </ImageReveal>
        </Reveal>)}
      </div>
    </div></section>

    <section className="section-pad about-gallery">
      <div className="container section-head">
        <div><Reveal><span className="eyebrow">Step inside</span></Reveal><SplitText className="display">Take a <span className="editorial">look around.</span></SplitText></div>
        <Reveal delay={0.15}><Magnetic><Link href="/gallery" className="button button-outline">Full gallery <ArrowRight size={15} /></Link></Magnetic></Reveal>
      </div>
      <div className="container about-mosaic">
        <ImageReveal className="about-mosaic-a" src={photos.lounge.src} alt={photos.lounge.alt}><span className="about-image-caption">The breakout lounge</span></ImageReveal>
        <ImageReveal className="about-mosaic-b" src={photos.cabinLarge.src} alt={photos.cabinLarge.alt} parallax={false} delay={0.1}><span className="about-image-caption">Private cabins</span></ImageReveal>
        <ImageReveal className="about-mosaic-c" src={photos.reception.src} alt={photos.reception.alt} parallax={false} delay={0.2}><span className="about-image-caption">Reception</span></ImageReveal>
      </div>
    </section>

    <section className="cta-band"><div className="cta-rings" aria-hidden="true"><i /><i /><i /></div><div className="container cta-inner">
      <SplitText className="display">Find the space that helps you <span className="editorial">do your thing.</span></SplitText>
      <Reveal delay={0.2}><Magnetic><Link href="/contact" className="button">Talk with us <ArrowRight size={16} /></Link></Magnetic></Reveal>
    </div></section>
  </main>;
}
