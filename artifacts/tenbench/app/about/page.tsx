import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, DoorOpen, Sparkles } from 'lucide-react';
import { ImageReveal, Magnetic, Reveal, ScrollWords, SplitText } from '../../components/motion';

export const metadata: Metadata = {
  title: 'About 10Bench | Work better, together or apart',
  description: 'Learn about the thinking behind 10Bench: a welcoming coworking space designed for focus, useful connection, and the many ways people work.',
};

const principles = [
  ['01', 'Focus deserves a home', 'A workspace should help you get into the work, with room to concentrate and the essentials close at hand.'],
  ['02', 'Good work is human', 'The best workdays leave space for a hello, a shared idea, and a change of scene.'],
  ['03', 'There is no one way to work', 'Independent professionals and growing teams have different rhythms. A good space can support both.'],
];

const steps = [
  { icon: Compass, title: 'Tell us what matters', text: 'Focus time, a room for a conversation, or a shared base for your team. Start with the work, not a package name.' },
  { icon: DoorOpen, title: 'Get to know the space', text: 'Take a look around the different settings and picture how they might fit into your workday.' },
  { icon: Sparkles, title: 'Find your own rhythm', text: 'Choose a starting point that feels right. The best workday is the one that works for you.' },
];

export default function AboutPage() {
  return <main>
    <section className="page-hero about-hero"><span className="page-hero-orb" aria-hidden="true" /><div className="container">
      <Reveal y={16}><span className="eyebrow">A space with a point of view</span></Reveal>
      <SplitText as="h1" className="display" delay={0.1}>Work feels better<br />when it <span className="editorial">fits you.</span></SplitText>
      <Reveal delay={0.45}><p>10Bench is a coworking space for people who want their workday to feel considered, connected, and entirely their own.</p></Reveal>
      <Reveal delay={0.6} className="about-hero-foot"><span>Room to focus</span><i /><span>Space to connect</span><i /><span>A day at your own pace</span></Reveal>
    </div></section>
    <section className="section-pad"><div className="container about-intro">
      <div>
        <Reveal><span className="eyebrow">Why 10Bench</span></Reveal>
        <SplitText className="display">A little more human. A lot more room.</SplitText>
        <Reveal delay={0.15}><p>Not everyone works the same way. Some need the calm of their own focus; others think best in company. Most need a bit of both, depending on the day.</p><p>We built 10Bench around that everyday truth. A warm welcome, thoughtfully made places to work, and distinct spaces for the ways a workday can move.</p><Link className="text-link" href="/offerings">See how you could work here <ArrowRight size={15} /></Link></Reveal>
      </div>
      <ImageReveal src="/images/workspace-reception.jpeg" alt="Warm wood reception and glass-fronted rooms at 10Bench" />
    </div></section>
    <section className="about-belief"><div className="container about-belief-inner">
      <Reveal><span className="eyebrow">The simple idea</span></Reveal>
      <ScrollWords className="display" text="A better workday isn’t one-size-fits-all. *Your* *space* *shouldn’t* *be* *either.*" />
      <span className="about-belief-mark" aria-hidden="true">10</span>
    </div></section>
    <section className="principles"><div className="container principles-grid">
      <div>
        <Reveal><span className="eyebrow">What matters here</span></Reveal>
        <SplitText className="display">Thoughtful by design. Welcoming by nature.</SplitText>
        <Reveal delay={0.15}><p>We believe the atmosphere around the work matters. It can invite concentration, make a meeting easier, or simply make the day feel lighter.</p></Reveal>
      </div>
      <div className="principle-items">{principles.map(([n, title, text], index) => <Reveal key={n} delay={index * 0.1} className="principle"><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div>
    </div></section>
    <section className="section-pad about-process"><div className="container">
      <div className="about-process-heading">
        <div><Reveal><span className="eyebrow">A simple way to begin</span></Reveal><SplitText className="display">Explore at your own pace.</SplitText></div>
        <Reveal delay={0.15}><p>No complicated formula. Start with what your day needs, then find the setting that makes it easier.</p></Reveal>
      </div>
      <div className="about-steps">
        {steps.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * 0.12} className="about-step">
          <span className="about-step-number">0{index + 1}</span><span className="about-step-icon"><Icon size={24} strokeWidth={1.5} /></span><h3>{title}</h3><p>{text}</p>
        </Reveal>)}
      </div>
    </div></section>
    <section className="section-pad about-gallery">
      <div className="container section-head">
        <div><Reveal><span className="eyebrow">Step inside</span></Reveal><SplitText className="display">A space made to move with your day.</SplitText></div>
        <Reveal delay={0.15}><Magnetic><Link href="/gallery" className="button button-outline">Explore the gallery <ArrowRight size={15} /></Link></Magnetic></Reveal>
      </div>
      <div className="container"><ImageReveal className="about-lounge-image" src="/images/workspace-lounge.jpeg" alt="Sunny lounge with colorful armchairs and a central refreshment counter"><span className="about-image-caption">A softer place to pause between tasks</span></ImageReveal></div>
    </section>
    <section className="cta-band"><div className="cta-rings" aria-hidden="true"><i /><i /><i /></div><div className="container cta-inner">
      <SplitText className="display">Find the kind of space that helps you do your thing.</SplitText>
      <Reveal delay={0.2}><Magnetic><Link href="/contact" className="button">Talk with us <ArrowRight size={16} /></Link></Magnetic></Reveal>
    </div></section>
  </main>;
}
