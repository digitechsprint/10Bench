import "./_group.css";
import { CurrentShell } from "./_shared/CurrentShell";

const principles = [
  ["01", "Focus deserves a home", "A workspace should help you get into the work, with room to concentrate and the essentials close at hand."],
  ["02", "Good work is human", "The best workdays leave space for a hello, a shared idea, and a change of scene."],
  ["03", "There is no one way to work", "Independent professionals and growing teams have different rhythms. A good space can support both."],
];

export function CurrentAbout() {
  return <CurrentShell><main id="about">
    <section className="current-page-hero"><div className="preview-container"><span className="preview-eyebrow">A space with a point of view</span><h1 className="preview-display">Work feels better<br />when it <span className="preview-editorial">fits you.</span></h1><p>10Bench is a coworking space for people who want their workday to feel considered, connected, and entirely their own.</p></div></section>
    <section className="current-section"><div className="preview-container current-about-intro"><div><span className="preview-eyebrow">Why 10Bench</span><h2 className="preview-display">A little more human. A lot more room.</h2><p>Not everyone works the same way. Some need the calm of their own focus; others think best in company. Most need a bit of both, depending on the day.</p><p>We built 10Bench around that everyday truth. A warm welcome, thoughtfully made places to work, and distinct spaces for the ways a workday can move.</p><a className="preview-button" href="#offerings">See how you could work here</a></div><img src="/__mockup/images/workspace-reception.jpeg" alt="Warm wood reception and glass-fronted rooms at 10Bench" /></div></section>
    <section className="current-principles"><div className="preview-container current-principles-grid"><div><span className="preview-eyebrow">What matters here</span><h2 className="preview-display">Thoughtful by design. Welcoming by nature.</h2><p>We believe the atmosphere around the work matters. It can invite concentration, make a meeting easier, or simply make the day feel lighter.</p></div><div>{principles.map(([number, title, text]) => <article className="current-principle" key={number}><b>{number}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="current-section"><div className="preview-container"><span className="preview-eyebrow">Step inside</span><h2 className="preview-display">A space made to move with your day.</h2><img className="current-contact-photo" src="/__mockup/images/workspace-lounge.jpeg" alt="Colorful lounge at 10Bench" /></div></section>
  </main></CurrentShell>;
}
