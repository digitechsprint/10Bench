import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Reveal } from '../components/site-shell';

export const metadata: Metadata = {
  title: 'Coworking with room to think',
  description: 'Meet 10Bench: a warm, considered coworking space for independent professionals and growing teams. Explore workspaces, meeting rooms, and the people-sized details.',
};

const offerings = [
  ['01', 'A desk for your day', 'A comfortable place to settle in, get your head down, and let the day take shape.'],
  ['02', 'Rooms to bring people together', 'A considered setting for the conversations that move work forward.'],
  ['03', 'Space for a team in motion', 'Flexible-feeling surroundings for people building something together.'],
];

export default function HomePage() {
  return <main>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Work, with a little more room</span>
          <h1 className="display">A good place to <span className="editorial">get into it.</span></h1>
          <p>For the solo stretches, the shared table, the meeting that needed a room. 10Bench brings the useful parts of work together in one welcoming place.</p>
          <div className="hero-actions"><Link className="button" href="/offerings">Explore the offering <ArrowRight size={16} /></Link><Link className="button button-outline" href="/gallery">Take a look around <MoveUpRight size={15} /></Link></div>
          <div className="hero-note"><i />Space for independent minds and growing teams</div>
        </div>
        <div className="hero-visual">
          <div className="image-frame hero-photo"><img src="/images/workspace-reception.jpeg" alt="Welcoming 10Bench reception with warm wood and glass partitions" /></div>
          <div className="hero-caption"><div className="caption-mark"><ArrowUpRight size={18} /></div><div><strong>Come as you are.</strong><span>Find your way into a better workday.</span></div></div>
        </div>
      </div>
      <div className="scroll-cue">Scroll to explore</div>
    </section>

    <section className="section-pad manifesto">
      <div className="container manifesto-grid">
        <Reveal><span className="eyebrow">The 10Bench point of view</span><h2 className="display">Room to focus.<br /><span className="editorial">Room to connect.</span></h2><div className="manifesto-tag">A workspace should make work feel possible.</div></Reveal>
        <Reveal className="manifesto-copy"><p>Working independently does not mean working alone. And a growing team needs more than desks in a row. It needs a place where concentration and conversation can sit comfortably side by side.</p><p>That is the idea behind 10Bench: an inviting, thoughtfully arranged space with the practical pieces in place and enough character to feel like somewhere you want to return to.</p></Reveal>
      </div>
    </section>

    <section className="image-story">
      <div className="image-frame image-story-visual"><img src="/images/workspace-lounge.jpeg" alt="Bright lounge at 10Bench with colorful chairs arranged around a shared coffee counter" /></div>
      <div className="image-story-copy"><span className="eyebrow">A change of pace</span><h2 className="display">Work has more than one good shape.</h2><p>Some days ask for quiet and a clear surface. Others need a quick conversation, a fresh cup, or room to think out loud. Our spaces make room for all of it.</p><Link className="button" href="/gallery">See the space <ArrowRight size={16} /></Link></div>
    </section>

    <section className="section-pad">
      <div className="container offer-slice">
        <Reveal><span className="eyebrow">A place for your kind of work</span><h2 className="display">The right setup for what’s next.</h2><p>Whether you work for yourself or alongside a team, explore the spaces and ways to work at 10Bench.</p><Link href="/offerings" className="text-link">Explore all offerings <ArrowRight size={15} /></Link></Reveal>
        <div className="offer-list">{offerings.map(([number, title, text]) => <Reveal key={number} className="offer-row"><span className="offer-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="offer-arrow" size={19} /></Reveal>)}</div>
      </div>
    </section>

    <section className="gallery-teaser">
      <div className="container">
        <div className="section-head"><div><span className="eyebrow">Look around</span><h2 className="display">Warm edges.<br />Clear thinking.</h2></div><p>Wood, glass, color, and natural places to pause. Take a first look at the details that make up a 10Bench workday.</p></div>
        <div className="gallery-mosaic">
          <figure className="image-frame large"><img src="/images/workspace-lounge.jpeg" alt="Colorful lounge seating and coffee counter in the 10Bench coworking space" /><figcaption>Room to reset</figcaption></figure>
          <figure className="image-frame"><img src="/images/workspace-meeting.jpeg" alt="Meeting room at 10Bench with a long wood table and presentation screen" /><figcaption>Room to meet</figcaption></figure>
          <figure className="image-frame"><img src="/images/workspace-reception.jpeg" alt="The 10Bench welcome desk behind a black geometric screen" /><figcaption>Room to arrive</figcaption></figure>
        </div>
        <div style={{ textAlign: 'right', marginTop: 26 }}><Link className="text-link" href="/gallery">Continue the gallery tour <ArrowRight size={15} /></Link></div>
      </div>
    </section>

    <section className="cta-band"><div className="container cta-inner"><h2 className="display">Come see what a better workday could feel like.</h2><Link href="/contact" className="button">Start a conversation <ArrowRight size={16} /></Link></div></section>
  </main>;
}
