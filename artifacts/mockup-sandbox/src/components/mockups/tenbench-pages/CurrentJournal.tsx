import "./_group.css";
import { CurrentShell } from "./_shared/CurrentShell";

const articles = [
  ["Work well", "A workday with more than one gear", "Deep focus, a quick reset, a useful conversation. Why the best workdays leave room to shift.", "workspace-lounge.jpeg"],
  ["A place to work", "The case for a change of scene", "When your usual four walls stop helping, a different setting can open up the day again.", "workspace-reception.jpeg"],
  ["Getting together", "Meetings that feel like progress", "A thoughtful setting will not run the meeting for you, but it can help everyone arrive ready.", "workspace-meeting.jpeg"],
];

export function CurrentJournal() {
  return <CurrentShell><main id="journal">
    <section className="current-page-hero"><div className="preview-container"><span className="preview-eyebrow">The 10Bench journal</span><h1 className="preview-display">A few thoughts<br />on <span className="preview-editorial">working well.</span></h1><p>Notes on focus, fresh perspectives, useful spaces, and the small things that shape a workday.</p></div></section>
    <section className="current-section"><div className="preview-container current-blog-grid">{articles.map(([category, title, excerpt, image]) => <article className="current-blog-card" key={title}><a className="current-blog-photo" href="#journal"><img src={`/__mockup/images/${image}`} alt="" /></a><div className="current-blog-body"><div className="current-blog-meta"><span>{category}</span><span>A note from 10Bench</span></div><h2>{title}</h2><p>{excerpt}</p><a className="preview-button" href="#journal">Read the story</a></div></article>)}</div></section>
  </main></CurrentShell>;
}
