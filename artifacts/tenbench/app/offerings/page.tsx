import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Coffee, DoorOpen, Laptop, UsersRound } from 'lucide-react';
import { Reveal } from '../../components/site-shell';

export const metadata: Metadata = {
  title: 'Our Offering | Coworking, meeting and team spaces',
  description: 'Explore how you might work at 10Bench, from individual focus time to team sessions and meeting room moments. Ask us about the right fit.',
};

const offerings = [
  { icon: Laptop, number: '01', title: 'A place to focus', text: 'Settle into a workday with a desk, a clear head, and a little separation between work and everything else. For independent professionals, remote workers, and anyone who needs a change of scene.', image: '/images/workspace-reception.jpeg', alt: 'The warmly finished reception and workspace at 10Bench' },
  { icon: DoorOpen, number: '02', title: 'A room to meet', text: 'Bring a conversation into a dedicated room. Meet with colleagues, welcome a client, or give a presentation in a setting that feels ready for the moment.', image: '/images/workspace-meeting.jpeg', alt: 'A meeting room with a long wood table and presentation screen' },
  { icon: UsersRound, number: '03', title: 'Space for your team', text: 'A shared base can make the work of growing together feel more connected. Explore a setup that can support your team’s day-to-day rhythm.', image: '/images/workspace-lounge.jpeg', alt: 'A relaxed shared lounge at 10Bench with colorful seating' },
  { icon: Coffee, number: '04', title: 'Space between tasks', text: 'A good break can change the shape of an afternoon. The lounge offers a more relaxed place to recharge or continue the conversation.', image: '/images/workspace-lounge.jpeg', alt: 'Colorful lounge seating for a relaxed pause' },
];

const faqs = [
  ['What kinds of workspace can I ask about?', 'You can explore individual work settings, a dedicated meeting room, options for a team, and the lounge. Tell us what kind of workday you have in mind and we can help you understand which spaces might suit it.'],
  ['Can I ask about a meeting room?', 'Yes. The meeting room is a dedicated setting with a long table and presentation screen. Get in touch to discuss your gathering and what you need from the room.'],
  ['Do you publish rates or availability here?', 'No rates or availability are listed on this page. Use the enquiry form to tell us what you are looking for; the form is a preview and does not send or store messages.'],
  ['I’m not sure what I need yet. Is that okay?', 'Absolutely. A rough idea is enough to begin. You might share whether you are working solo, meeting with others, or looking for a team setup.'],
];

export default function OfferingsPage() {
  return <main>
    <section className="page-hero offering-hero"><div className="container"><span className="eyebrow">Our offering</span><h1 className="display">A workspace for<br /><span className="editorial">the way you work.</span></h1><p>Different days ask for different things. Explore the work settings at 10Bench and find a way to make the space yours.</p><Link href="/contact" className="text-link">Talk through your options <ArrowRight size={15} /></Link></div></section>
    <section className="section-pad offering-options"><div className="container">
      <div className="offering-intro"><span className="eyebrow">Choose your setting</span><p>Start with the work in front of you. There is room for the quiet stretch, the group conversation, and everything around them.</p></div>
      <div className="offering-list">{offerings.map(({ icon: Icon, number, title, text, image, alt }) => <Reveal key={title} className="offering-row">
        <div className="offering-copy"><span className="offering-number">{number}</span><Icon className="icon" size={23} strokeWidth={1.6} /><h2>{title}</h2><p>{text}</p></div>
        <div className="offering-photo"><img src={image} alt={alt} /></div>
      </Reveal>)}</div>
    </div></section>
    <section className="section-pad offering-meeting" style={{ background: 'var(--cream)' }}><div className="container offer-detail">
      <Reveal><span className="eyebrow">A room to think together</span><h2 className="display">Bring the conversation into focus.</h2><p>With a long table, presentation screen, and glass-fronted setting, the meeting room gives your next discussion a place of its own.</p><ul><li><Check size={16} />A dedicated meeting environment</li><li><Check size={16} />Presentation screen in the room</li><li><Check size={16} />A setting for conversations and collaboration</li></ul><Link href="/contact" className="button">Ask about meeting spaces <ArrowRight size={16} /></Link></Reveal>
      <Reveal><img src="/images/workspace-meeting.jpeg" alt="10Bench meeting room with long wood table, chairs, and presentation screen" /></Reveal>
    </div></section>
    <section className="section-pad offering-faq"><div className="container faq-layout"><div><span className="eyebrow">A few useful answers</span><h2 className="display">Good to know.</h2><p>Have another question? Start a conversation and tell us what you’re exploring.</p><Link className="text-link" href="/contact">Ask us directly <ArrowRight size={15} /></Link></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} className="faq-item"><summary><span className="faq-index">0{index + 1}</span><span>{question}</span><span className="faq-toggle" aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>
    <section className="cta-band"><div className="container cta-inner"><h2 className="display">Your next workday could start here.</h2><Link href="/gallery" className="button">Take the gallery tour <ArrowRight size={16} /></Link></div></section>
  </main>;
}
