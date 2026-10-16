import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../../components/site-shell';

export const metadata: Metadata = {
  title: 'About 10Bench | Work better, together or apart',
  description: 'Learn about the thinking behind 10Bench: a welcoming coworking space designed for focus, useful connection, and the many ways people work.',
};

const principles = [
  ['01', 'Focus deserves a home', 'A workspace should help you get into the work, with room to concentrate and the essentials close at hand.'],
  ['02', 'Good work is human', 'The best workdays leave space for a hello, a shared idea, and a change of scene.'],
  ['03', 'There is no one way to work', 'Independent professionals and growing teams have different rhythms. A good space can support both.'],
];

export default function AboutPage() {
  return <main>
    <section className="page-hero"><div className="container"><span className="eyebrow">A space with a point of view</span><h1 className="display">Work feels better<br />when it <span className="editorial">fits you.</span></h1><p>10Bench is a coworking space for people who want their workday to feel considered, connected, and entirely their own.</p></div></section>
    <section className="section-pad"><div className="container about-intro">
      <Reveal><span className="eyebrow">Why 10Bench</span><h2 className="display">A little more human. A lot more room.</h2><p>Not everyone works the same way. Some need the calm of their own focus; others think best in company. Most need a bit of both, depending on the day.</p><p>We built 10Bench around that everyday truth. A warm welcome, thoughtfully made places to work, and distinct spaces for the ways a workday can move.</p><Link className="text-link" href="/offerings">See how you could work here <ArrowRight size={15} /></Link></Reveal>
      <Reveal className="image-frame"><img src="/images/workspace-reception.jpeg" alt="Warm wood reception and glass-fronted rooms at 10Bench" /></Reveal>
    </div></section>
    <section className="principles"><div className="container principles-grid">
      <div><span className="eyebrow">What matters here</span><h2 className="display">Thoughtful by design. Welcoming by nature.</h2><p>We believe the atmosphere around the work matters. It can invite concentration, make a meeting easier, or simply make the day feel lighter.</p></div>
      <div className="principle-items">{principles.map(([n, title, text]) => <Reveal key={n} className="principle"><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div>
    </div></section>
    <section className="section-pad"><div className="container section-head"><div><span className="eyebrow">Step inside</span><h2 className="display">A space made to move with your day.</h2></div><Link href="/gallery" className="button button-outline">Explore the gallery <ArrowRight size={15} /></Link></div><div className="container image-frame" style={{ height: 400 }}><img src="/images/workspace-lounge.jpeg" alt="Sunny lounge with colorful armchairs and a central refreshment counter" /></div></section>
    <section className="cta-band"><div className="container cta-inner"><h2 className="display">Find the kind of space that helps you do your thing.</h2><Link href="/contact" className="button">Talk with us <ArrowRight size={16} /></Link></div></section>
  </main>;
}
