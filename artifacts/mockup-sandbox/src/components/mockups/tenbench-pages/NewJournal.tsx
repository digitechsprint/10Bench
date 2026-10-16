import "./_group.css";
import { CurrentShell } from "./_shared/CurrentShell";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

const articles = [
  {
    slug: "a-workday-with-more-than-one-gear",
    category: "Work well",
    date: "A note from 10Bench",
    title: "A workday with more than one gear",
    excerpt:
      "Deep focus, a quick reset, a useful conversation. Why the best workdays leave room to shift.",
    image: "/__mockup/images/workspace-lounge.jpeg",
    alt: "Colorful lounge at 10Bench offering a relaxed counterpoint to focused desk work",
  },
  {
    slug: "the-case-for-a-change-of-scene",
    category: "A place to work",
    date: "A note from 10Bench",
    title: "The case for a change of scene",
    excerpt:
      "When your usual four walls stop helping, a different setting can open up the day again.",
    image: "/__mockup/images/workspace-reception.jpeg",
    alt: "Warm reception area at 10Bench with wood finishes and welcoming light",
  },
  {
    slug: "meetings-that-feel-like-progress",
    category: "Getting together",
    date: "A note from 10Bench",
    title: "Meetings that feel like progress",
    excerpt:
      "A thoughtful setting will not run the meeting for you, but it can help everyone arrive ready.",
    image: "/__mockup/images/workspace-meeting.jpeg",
    alt: "Meeting room prepared with a long wood table and presentation display",
  },
];

export function NewJournal() {
  const featured = articles[0];
  const latest = articles.slice(1);

  return (
    <CurrentShell>
      <style>{`
        .tb-journal {
          --journal-line: rgba(16, 35, 56, .15);
          background: var(--paper);
          color: var(--ink);
        }
        .tb-journal a { text-decoration: none; }
        .tb-journal a:focus-visible { outline: 3px solid var(--orange); outline-offset: 5px; }
        .tb-journal .journal-wrap { width: min(1220px, calc(100% - 64px)); margin-inline: auto; }
        .tb-journal .journal-hero {
          position: relative;
          overflow: hidden;
          padding: 42px 0 82px;
          background: var(--cream);
        }
        .tb-journal .journal-topline {
          display: flex;
          align-items: center;
          gap: 18px;
          color: var(--navy);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .17em;
          text-transform: uppercase;
        }
        .tb-journal .journal-topline::after {
          content: "";
          height: 1px;
          flex: 1;
          background: var(--journal-line);
        }
        .tb-journal .journal-hero-grid {
          display: grid;
          grid-template-columns: 1.03fr .97fr;
          gap: clamp(38px, 7vw, 100px);
          align-items: center;
          padding-top: 50px;
        }
        .tb-journal .journal-hero-copy { position: relative; z-index: 1; padding: 0 0 16px; }
        .tb-journal .journal-hero-copy .preview-eyebrow { margin-bottom: 18px; }
        .tb-journal .journal-hero h1 {
          max-width: 630px;
          margin: 0;
          color: var(--navy);
          font: 600 clamp(58px, 7.5vw, 100px)/.96 var(--font-display);
          letter-spacing: -.075em;
        }
        .tb-journal .journal-hero h1 em {
          display: block;
          margin-top: 4px;
          color: var(--orange);
          font: 500 italic .9em/1.07 var(--font-editorial);
          letter-spacing: -.055em;
        }
        .tb-journal .journal-deck {
          max-width: 455px;
          margin: 28px 0 0;
          color: #596773;
          font-size: 15px;
          line-height: 1.85;
        }
        .tb-journal .journal-index-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 30px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--orange);
          color: var(--navy);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .025em;
          transition: gap .2s ease, color .2s ease;
        }
        .tb-journal .journal-index-link:hover { gap: 17px; color: var(--orange); }
        .tb-journal .journal-index-link svg { color: var(--orange); }
        .tb-journal .journal-hero-visual {
          position: relative;
          min-height: 425px;
          padding: 0 22px 22px 0;
        }
        .tb-journal .journal-hero-visual::before {
          content: "";
          position: absolute;
          inset: 17px 0 0 18px;
          border: 1px solid var(--orange);
        }
        .tb-journal .journal-hero-photo {
          position: relative;
          display: block;
          width: 100%;
          height: 425px;
          overflow: hidden;
          background: #ded4c6;
        }
        .tb-journal .journal-hero-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 53%;
          transition: transform .75s cubic-bezier(.2,.7,.2,1);
        }
        .tb-journal .journal-hero-photo:hover img { transform: scale(1.035); }
        .tb-journal .journal-photo-stamp {
          position: absolute;
          right: -10px;
          bottom: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 240px;
          padding: 16px 19px;
          color: white;
          background: var(--navy);
          font-size: 11px;
          line-height: 1.5;
          letter-spacing: .03em;
        }
        .tb-journal .journal-photo-stamp b {
          color: var(--orange);
          font: 500 27px/1 var(--font-editorial);
        }
        .tb-journal .journal-vertical-note {
          position: absolute;
          top: 30px;
          right: -3px;
          color: var(--navy);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }
        .tb-journal .journal-scroll {
          position: absolute;
          bottom: 39px;
          left: max(32px, calc((100% - 1220px) / 2));
          display: flex;
          align-items: center;
          gap: 10px;
          color: #77808a;
          font-size: 9px;
          letter-spacing: .15em;
          text-transform: uppercase;
        }
        .tb-journal .journal-scroll svg { color: var(--orange); }
        .tb-journal .journal-feature {
          display: grid;
          grid-template-columns: 1.13fr .87fr;
          min-height: 455px;
          margin-top: 0;
          background: var(--navy);
          color: white;
        }
        .tb-journal .journal-feature-photo {
          position: relative;
          display: block;
          min-height: 455px;
          overflow: hidden;
          background: #bd9b72;
        }
        .tb-journal .journal-feature-photo img {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          display: block;
          object-fit: cover;
          transition: transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .tb-journal .journal-feature-photo:hover img { transform: scale(1.035); }
        .tb-journal .journal-feature-photo::after {
          content: "";
          position: absolute;
          inset: 45% 0 0;
          background: linear-gradient(transparent, rgba(9, 25, 40, .48));
          pointer-events: none;
        }
        .tb-journal .journal-feature-photo figcaption {
          position: absolute;
          left: 25px;
          bottom: 22px;
          z-index: 1;
          color: white;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .tb-journal .journal-feature-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(35px, 5vw, 68px);
        }
        .tb-journal .journal-feature-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #b8c4ce;
          font-size: 10px;
          letter-spacing: .13em;
          text-transform: uppercase;
        }
        .tb-journal .journal-feature-meta span:first-child { color: #f5a266; }
        .tb-journal .journal-feature-meta i { width: 23px; height: 1px; background: var(--orange); }
        .tb-journal .journal-feature-number {
          margin: 26px 0 10px;
          color: rgba(255,255,255,.45);
          font: 500 15px var(--font-editorial);
        }
        .tb-journal .journal-feature h2 {
          max-width: 460px;
          margin: 0;
          color: white;
          font: 600 clamp(35px, 4vw, 54px)/1.06 var(--font-display);
          letter-spacing: -.055em;
        }
        .tb-journal .journal-feature-copy > p {
          max-width: 400px;
          margin: 19px 0 0;
          color: #c6d0d8;
          font-size: 13px;
          line-height: 1.8;
        }
        .tb-journal .journal-read-link {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          gap: 12px;
          margin-top: 26px;
          color: white;
          font-size: 12px;
          font-weight: 700;
          border-bottom: 1px solid rgba(244,123,32,.85);
          padding-bottom: 8px;
          transition: gap .2s ease, color .2s ease;
        }
        .tb-journal .journal-read-link svg { color: var(--orange); }
        .tb-journal .journal-read-link:hover { gap: 17px; color: #f5a266; }
        .tb-journal .journal-latest { padding: 95px 0 104px; }
        .tb-journal .journal-latest-head {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 30px;
          margin-bottom: 34px;
        }
        .tb-journal .journal-latest-head h2 {
          margin: 14px 0 0;
          color: var(--navy);
          font: 600 clamp(38px, 5vw, 61px)/1 var(--font-display);
          letter-spacing: -.065em;
        }
        .tb-journal .journal-latest-head p {
          max-width: 270px;
          margin: 0 0 3px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.75;
        }
        .tb-journal .journal-list { border-top: 1px solid var(--journal-line); }
        .tb-journal .journal-row {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr) 260px 28px;
          align-items: center;
          gap: 26px;
          padding: 25px 0;
          border-bottom: 1px solid var(--journal-line);
        }
        .tb-journal .journal-row-no {
          align-self: start;
          padding-top: 4px;
          color: var(--orange);
          font: 500 21px var(--font-editorial);
        }
        .tb-journal .journal-row-copy { padding: 4px 0; }
        .tb-journal .journal-row-meta {
          display: flex;
          align-items: center;
          gap: 13px;
          color: #77808a;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .tb-journal .journal-row-meta span:first-child { color: var(--orange); }
        .tb-journal .journal-row h3 {
          margin: 11px 0 7px;
          color: var(--navy);
          font: 600 clamp(22px, 2.6vw, 31px)/1.15 var(--font-display);
          letter-spacing: -.045em;
        }
        .tb-journal .journal-row-copy p {
          max-width: 570px;
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }
        .tb-journal .journal-row-photo {
          display: block;
          height: 150px;
          overflow: hidden;
          background: #e7dfd2;
        }
        .tb-journal .journal-row-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .7s cubic-bezier(.2,.7,.2,1);
        }
        .tb-journal .journal-row:hover .journal-row-photo img { transform: scale(1.045); }
        .tb-journal .journal-row-arrow {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          color: var(--navy);
          transition: color .2s ease, transform .2s ease;
        }
        .tb-journal .journal-row:hover .journal-row-arrow { color: var(--orange); transform: translate(2px, -2px); }
        .tb-journal .journal-endnote {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 50px;
          align-items: center;
          padding: 66px max(32px, calc((100% - 1220px) / 2));
          color: var(--navy);
          background: var(--orange);
        }
        .tb-journal .journal-endnote-label {
          padding-left: 15px;
          border-left: 1px solid rgba(16,35,56,.35);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .15em;
          line-height: 1.6;
          text-transform: uppercase;
        }
        .tb-journal .journal-endnote-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }
        .tb-journal .journal-endnote h2 {
          max-width: 610px;
          margin: 0;
          font: 600 clamp(32px, 4vw, 50px)/1.03 var(--font-display);
          letter-spacing: -.06em;
        }
        .tb-journal .journal-endnote-link {
          display: inline-flex;
          flex: none;
          align-items: center;
          gap: 11px;
          padding: 16px 19px;
          color: white;
          background: var(--navy);
          font-size: 11px;
          font-weight: 700;
          transition: background .2s ease, transform .2s ease;
        }
        .tb-journal .journal-endnote-link:hover { background: var(--navy-2); transform: translateY(-2px); }
        .tb-journal .journal-endnote-link svg { color: var(--orange); }
        @media (max-width: 850px) {
          .tb-journal .journal-wrap { width: min(100% - 42px, 680px); }
          .tb-journal .journal-hero { padding: 32px 0 65px; }
          .tb-journal .journal-hero-grid { grid-template-columns: 1fr; gap: 30px; padding-top: 42px; }
          .tb-journal .journal-hero-copy { padding-bottom: 0; }
          .tb-journal .journal-hero-visual { min-height: 390px; margin: 0 20px 0 0; }
          .tb-journal .journal-hero-photo { height: 390px; }
          .tb-journal .journal-scroll { display: none; }
          .tb-journal .journal-feature { grid-template-columns: 1fr 1fr; min-height: 400px; }
          .tb-journal .journal-feature-photo { min-height: 400px; }
          .tb-journal .journal-feature-copy { padding: 32px; }
          .tb-journal .journal-row { grid-template-columns: 40px minmax(0,1fr) 185px 24px; gap: 16px; }
          .tb-journal .journal-row-photo { height: 130px; }
          .tb-journal .journal-endnote { grid-template-columns: 1fr; gap: 24px; padding: 48px max(21px, calc((100% - 680px)/2)); }
        }
        @media (max-width: 600px) {
          .tb-journal .journal-wrap { width: calc(100% - 36px); }
          .tb-journal .journal-topline { font-size: 8px; letter-spacing: .12em; }
          .tb-journal .journal-hero { padding: 26px 0 49px; }
          .tb-journal .journal-hero-grid { gap: 26px; padding-top: 34px; }
          .tb-journal .journal-hero h1 { font-size: clamp(52px, 15vw, 72px); }
          .tb-journal .journal-deck { margin-top: 20px; font-size: 14px; }
          .tb-journal .journal-index-link { margin-top: 22px; }
          .tb-journal .journal-hero-visual { min-height: 300px; margin-right: 12px; padding: 0 13px 13px 0; }
          .tb-journal .journal-hero-photo { height: 300px; }
          .tb-journal .journal-photo-stamp { right: -6px; padding: 12px 14px; font-size: 10px; }
          .tb-journal .journal-photo-stamp b { font-size: 23px; }
          .tb-journal .journal-vertical-note { right: -13px; top: 14px; font-size: 8px; }
          .tb-journal .journal-feature { grid-template-columns: 1fr; }
          .tb-journal .journal-feature-photo { min-height: 285px; }
          .tb-journal .journal-feature-copy { padding: 32px 24px 36px; }
          .tb-journal .journal-feature h2 { font-size: 39px; }
          .tb-journal .journal-latest { padding: 65px 0 70px; }
          .tb-journal .journal-latest-head { grid-template-columns: 1fr; gap: 14px; margin-bottom: 24px; }
          .tb-journal .journal-latest-head h2 { font-size: 43px; }
          .tb-journal .journal-latest-head p { max-width: 330px; }
          .tb-journal .journal-row {
            grid-template-columns: 30px minmax(0,1fr) 24px;
            gap: 11px;
            padding: 20px 0;
          }
          .tb-journal .journal-row-no { font-size: 18px; }
          .tb-journal .journal-row-copy { grid-column: 2; grid-row: 1; }
          .tb-journal .journal-row h3 { font-size: 23px; margin: 9px 0 7px; }
          .tb-journal .journal-row-copy p { font-size: 12px; }
          .tb-journal .journal-row-photo { grid-column: 2 / 4; grid-row: 2; height: 170px; margin-top: 7px; }
          .tb-journal .journal-row-arrow { grid-column: 3; grid-row: 1; }
          .tb-journal .journal-endnote { padding: 38px 18px; gap: 20px; }
          .tb-journal .journal-endnote-inner { align-items: flex-start; flex-direction: column; gap: 22px; }
          .tb-journal .journal-endnote h2 { font-size: 38px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tb-journal *, .tb-journal *::before, .tb-journal *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
        }
      `}</style>
      <main className="tb-journal" id="journal">
        <section className="journal-hero">
          <div className="journal-wrap">
            <div className="journal-topline">
              <span>Field notes from 10Bench</span>
              <span>Ideas for better workdays</span>
            </div>
            <div className="journal-hero-grid">
              <div className="journal-hero-copy">
                <span className="preview-eyebrow">The 10Bench journal</span>
                <h1>A few thoughts <em>on working well.</em></h1>
                <p className="journal-deck">
                  Notes on focus, fresh perspectives, useful spaces, and the small
                  things that shape a workday.
                </p>
                <a className="journal-index-link" href="#journal">
                  Browse the latest notes <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
              <div className="journal-hero-visual">
                <a className="journal-hero-photo" href="#journal" aria-label="Explore the 10Bench journal">
                  <img
                    src="/__mockup/images/workspace-reception.jpeg"
                    alt="Warm timber reception at 10Bench with its welcoming light and bold orange detail"
                  />
                </a>
                <div className="journal-photo-stamp">
                  <b>10</b><span>A place for focus, conversation<br />and a change of pace.</span>
                </div>
                <span className="journal-vertical-note">Space to do your best work</span>
              </div>
            </div>
          </div>
          <a className="journal-scroll" href="#journal">
            <ArrowDown size={13} aria-hidden="true" /> Read the journal
          </a>
        </section>

        <section className="journal-wrap journal-feature" aria-label="Featured journal note">
          <a className="journal-feature-photo" href="#journal" aria-label={`Read ${featured.title}`}>
            <img src={featured.image} alt={featured.alt} />
            <figcaption>Inside 10Bench · A room to reset</figcaption>
          </a>
          <div className="journal-feature-copy">
            <div className="journal-feature-meta">
              <span>{featured.category}</span><i aria-hidden="true" /><span>{featured.date}</span>
            </div>
            <div className="journal-feature-number">01 / 03</div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <a className="journal-read-link" href="#journal">
              Read the note <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="journal-latest">
          <div className="journal-wrap">
            <div className="journal-latest-head">
              <div>
                <span className="preview-eyebrow">More from the journal</span>
                <h2>Good work, considered.</h2>
              </div>
              <p>Thoughtful ideas for the places we work, the way we meet, and everything in between.</p>
            </div>
            <div className="journal-list">
              {latest.map((article, index) => (
                <article className="journal-row" key={article.slug}>
                  <span className="journal-row-no">0{index + 2}</span>
                  <div className="journal-row-copy">
                    <div className="journal-row-meta">
                      <span>{article.category}</span><span>{article.date}</span>
                    </div>
                    <h3><a href="#journal">{article.title}</a></h3>
                    <p>{article.excerpt}</p>
                  </div>
                  <a className="journal-row-photo" href="#journal" aria-label={`Read ${article.title}`}>
                    <img src={article.image} alt={article.alt} />
                  </a>
                  <a className="journal-row-arrow" href="#journal" aria-label={`Read ${article.title}`}>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="journal-endnote">
          <div className="journal-endnote-label">A little room<br />changes a lot.</div>
          <div className="journal-endnote-inner">
            <h2>Make space for the work in front of you.</h2>
            <a className="journal-endnote-link" href="#journal">
              Back to the journal <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
    </CurrentShell>
  );
}
