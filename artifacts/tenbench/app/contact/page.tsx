import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '../../components/site-shell';

export const metadata: Metadata = {
  title: 'Contact 10Bench | Ask about your workspace',
  description: 'Start a conversation with 10Bench about coworking, meeting rooms, or a workspace for your team. Email spaces@10bench.in, call +91 97739 87782, or visit us at 116, Sector 4, Vaishali, Ghaziabad.',
};

export default function ContactPage() {
  return <main>
    <section className="page-hero contact-hero"><div className="container"><span className="eyebrow">Contact 10Bench</span><h1 className="display">Start with what<br />you <span className="editorial">need.</span></h1><p>A focused day. A room for a useful conversation. Somewhere your team can settle in. Tell us what you’re looking for and explore the possibilities.</p><Link href="#enquiry" className="contact-jump">Go to the enquiry form <ArrowDown size={15} /></Link><div className="contact-hero-mark" aria-hidden="true">10<span>BENCH</span></div></div></section>
    <section className="section-pad contact-section"><div className="container contact-grid">
      <div className="contact-copy"><span className="eyebrow">A good first step</span><h2 className="display">Tell us a little about your day.</h2><p>Interested in a place to work, a room to meet, or space for a team? A few details about what you have in mind can help you explore whether 10Bench feels like the right fit.</p><div className="contact-path"><span>01</span><div><strong>Share what you’re exploring</strong><p>Choose a general area and describe what would make the space useful to you.</p></div></div><div className="contact-path"><span>02</span><div><strong>Review the options</strong><p>Explore the workspace settings and gallery to get a feel for the environment.</p></div></div><Link className="text-link" href="/offerings">Browse workspace options <ArrowRight size={15} /></Link><ul className="contact-details" aria-label="10Bench contact details">
        <li><Mail size={17} aria-hidden="true" /><div><span>Email</span><a href="mailto:spaces@10bench.in">spaces@10bench.in</a></div></li>
        <li><Phone size={17} aria-hidden="true" /><div><span>Phone</span><a href="tel:+919773987782">+91 97739 87782</a></div></li>
        <li><MapPin size={17} aria-hidden="true" /><div><span>Visit us</span><address>116, Sector 4, Vaishali,<br />Ghaziabad</address></div></li>
      </ul><div className="contact-note">This enquiry form is a preview only. Submitting it will not send or store your message. To reach us directly, email or call using the details above.</div></div>
      <ContactForm />
    </div><div className="container contact-image-story"><div className="contact-image"><img src="/images/workspace-reception.jpeg" alt="Warmly lit 10Bench reception area with wood finishes" /></div><div className="contact-image-caption"><span className="eyebrow">A considered welcome</span><p className="display">A place to arrive, take a breath, and get into your day.</p></div></div></section>
  </main>;
}
