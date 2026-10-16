import "./_group.css";
import { CurrentShell } from "./_shared/CurrentShell";

const offerings = [
  ["A place to focus", "Settle into a workday with a desk, a clear head, and a little separation between work and everything else."],
  ["A room to meet", "Bring a conversation into a dedicated room. Meet with colleagues, welcome a client, or give a presentation."],
  ["Space for your team", "A shared base can make the work of growing together feel more connected."],
  ["Space between tasks", "The lounge offers a more relaxed place to recharge or continue the conversation."],
];

export function CurrentOfferings() {
  return <CurrentShell><main id="offerings">
    <section className="current-page-hero"><div className="preview-container"><span className="preview-eyebrow">Our offering</span><h1 className="preview-display">A workspace for<br /><span className="preview-editorial">the way you work.</span></h1><p>Different days ask for different things. Explore the work settings at 10Bench and find a way to make the space yours.</p></div></section>
    <section className="current-section"><div className="preview-container current-offer-cards">{offerings.map(([title, text]) => <article className="current-offer-card" key={title}><h2>{title}</h2><p>{text}</p></article>)}</div></section>
    <section className="current-section" style={{ background: "var(--cream)" }}><div className="preview-container current-offer-detail"><div><span className="preview-eyebrow">A room to think together</span><h2 className="preview-display">Bring the conversation into focus.</h2><p>With a long table, presentation screen, and glass-fronted setting, the meeting room gives your next discussion a place of its own.</p><ul><li>A dedicated meeting environment</li><li>Presentation screen in the room</li><li>A setting for conversations and collaboration</li></ul><a className="preview-button" href="#contact">Ask about meeting spaces</a></div><img src="/__mockup/images/workspace-meeting.jpeg" alt="10Bench meeting room with long wood table and presentation screen" /></div></section>
  </main></CurrentShell>;
}
