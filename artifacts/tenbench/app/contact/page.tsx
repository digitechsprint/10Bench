import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from '../../components/site-shell';
import { buildContact } from '../../components/site-content';
import { ImageReveal, Reveal, SplitText } from '../../components/motion';
import { JsonLd } from '../../components/json-ld';
import { absoluteUrl, breadcrumbSchema, pageMetadata } from '../../lib/seo';
import { getSeo } from '../../lib/settings';
import { supabaseConfigured } from '../../lib/supabase';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getSeo(), 'contact');
}

export default async function ContactPage() {
  const seo = await getSeo();
  const contact = buildContact(seo.business);
  return <main>
    <JsonLd data={[
      breadcrumbSchema(seo, [{ name: 'Contact', path: '/contact/' }]),
      { '@context': 'https://schema.org', '@type': 'ContactPage', name: seo.pages.contact.title, url: absoluteUrl(seo, '/contact/'), about: { '@id': absoluteUrl(seo, '/#business') } },
    ]} />
    <section className="page-hero contact-hero"><span className="page-hero-orb" aria-hidden="true" /><div className="container">
      <Reveal y={16}><span className="eyebrow">Contact 10Bench</span></Reveal>
      <SplitText as="h1" className="display" delay={0.1}>Let’s find your<br /><span className="editorial">perfect desk.</span></SplitText>
      <Reveal delay={0.45}><p>Looking for a desk, a private cabin for your team or a room for your next client meeting? Call, WhatsApp or send an enquiry, and come see 10Bench for yourself.</p><div className="quick-actions">
        <a href={contact.phoneHref} className="button"><Phone size={16} /> Call {contact.phone}</a>
        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="button button-outline"><MessageCircle size={16} /> WhatsApp us</a>
      </div><Link href="#enquiry" className="contact-jump">Or send an enquiry <ArrowDown size={15} /></Link></Reveal>
      <div className="contact-hero-mark" aria-hidden="true">10<span>BENCH</span></div>
    </div></section>
    <section className="section-pad contact-section"><div className="container contact-grid">
      <div className="contact-copy">
        <Reveal><span className="eyebrow">A good first step</span></Reveal>
        <SplitText className="display">Tell us a little about your day.</SplitText>
        <Reveal delay={0.1}><p>Interested in a place to work, a room to meet, or space for a team? A few details about what you have in mind can help you explore whether 10Bench feels like the right fit.</p></Reveal>
        <Reveal delay={0.15} className="contact-path"><span>01</span><div><strong>Share what you’re exploring</strong><p>Choose a general area and describe what would make the space useful to you.</p></div></Reveal>
        <Reveal delay={0.2} className="contact-path"><span>02</span><div><strong>Review the options</strong><p>Explore the workspace settings and gallery to get a feel for the environment.</p></div></Reveal>
        <Reveal delay={0.25}><Link className="text-link" href="/offerings">Browse workspace options <ArrowRight size={15} /></Link></Reveal>
        <Reveal delay={0.1}><ul className="contact-details" aria-label="10Bench contact details">
          <li><Mail size={17} aria-hidden="true" /><div><span>Email</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div></li>
          <li><Phone size={17} aria-hidden="true" /><div><span>Phone</span><a href={contact.phoneHref}>{contact.phone}</a></div></li>
          <li><MessageCircle size={17} aria-hidden="true" /><div><span>WhatsApp</span><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">Message us instantly</a></div></li>
          <li><MapPin size={17} aria-hidden="true" /><div><span>Visit us</span><a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer"><address>{contact.street},<br />{contact.locality}</address></a></div></li>
        </ul></Reveal>
        {!supabaseConfigured() && <Reveal><div className="contact-note">Online enquiries aren’t switched on yet. To reach us, please call, WhatsApp or email using the details above.</div></Reveal>}
      </div>
      <Reveal delay={0.15} className="contact-form-wrap"><ContactForm /></Reveal>
    </div>
    <div className="container contact-image-story">
      <ImageReveal className="contact-image" src="/images/workspace-reception.jpeg" alt="Warmly lit 10Bench reception area with wood finishes" cursor="" />
      <div className="contact-image-caption"><Reveal><span className="eyebrow">A considered welcome</span></Reveal><SplitText as="p" className="display">A place to arrive, take a breath, and get into your day.</SplitText></div>
    </div></section>
  </main>;
}
