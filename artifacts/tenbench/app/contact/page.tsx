import type { Metadata } from 'next';
import { ContactForm } from '../../components/site-shell';

export const metadata: Metadata = {
  title: 'Contact 10Bench | Ask about your workspace',
  description: 'Start a conversation with 10Bench about coworking, meeting rooms, or a workspace for your team. We do not publish unverified contact details.',
};

export default function ContactPage() {
  return <main>
    <section className="page-hero"><div className="container"><span className="eyebrow">Contact us</span><h1 className="display">Let’s find a way<br />to <span className="editorial">make it work.</span></h1><p>Tell us what you need from a workspace. We would be glad to help you explore whether 10Bench feels like the right fit.</p></div></section>
    <section className="section-pad"><div className="container contact-grid">
      <div className="contact-copy"><span className="eyebrow">Start here</span><h2 className="display">A conversation is a good first step.</h2><p>Interested in a place to work, a room to meet, or space for a team? Share a little about what you have in mind and we can take it from there.</p><div className="contact-note">This website does not publish contact details that have not been verified. The enquiry form below is a visual preview only and does not send or store messages.</div></div>
      <ContactForm />
    </div><div className="container image-frame contact-image"><img src="/images/workspace-reception.jpeg" alt="Warmly lit 10Bench reception area, ready to welcome visitors" /></div></section>
  </main>;
}
