import { ArrowRight, ArrowUpRight, Check, Coffee, DoorOpen, Laptop, UsersRound } from "lucide-react";
import { CurrentShell } from "./_shared/CurrentShell";
import "./_group.css";

const formats = [
  {
    number: "01",
    icon: Laptop,
    title: "A place to focus",
    text: "Settle into a workday with a desk, a clear head, and a little separation between work and everything else. For independent professionals, remote workers, and anyone who needs a change of scene.",
    note: "For your own workday",
  },
  {
    number: "02",
    icon: DoorOpen,
    title: "A room to meet",
    text: "Bring a conversation into a dedicated room. Meet with colleagues, welcome a client, or give a presentation in a setting that feels ready for the moment.",
    note: "For conversations that matter",
  },
  {
    number: "03",
    icon: UsersRound,
    title: "Space for your team",
    text: "A shared base can make the work of growing together feel more connected. Explore a setup that can support your team’s day-to-day rhythm.",
    note: "For a shared rhythm",
  },
  {
    number: "04",
    icon: Coffee,
    title: "Space between tasks",
    text: "A good break can change the shape of an afternoon. The lounge offers a more relaxed place to recharge or continue the conversation.",
    note: "For a moment to reset",
  },
];

const faqs = [
  {
    question: "What workspace options are available at 10Bench?",
    answer: "The spaces include a place to focus, a dedicated room to meet, setups for teams, and a lounge to pause between tasks. The right fit depends on how you want to use the space.",
  },
  {
    question: "How can I find out about pricing?",
    answer: "Pricing can vary by workspace and what you have in mind. Enquire with 10Bench for current pricing details.",
  },
  {
    question: "Can I check availability for a meeting or team space?",
    answer: "Please enquire for current availability and to talk through the kind of space and timing you need.",
  },
  {
    question: "Is the meeting room set up for presentations?",
    answer: "The meeting room has a presentation screen and a long table in a glass-fronted setting. Enquire if you have a particular meeting format in mind.",
  },
  {
    question: "I’m not sure which option fits. What should I do?",
    answer: "Tell the team a little about your workday or gathering. They can help you think through which setting may suit it.",
  },
];

export function NewOfferings() {
  return (
    <CurrentShell>
      <main className="tb-offerings" id="offerings">
        <section className="tb-hero">
          <div className="preview-container tb-hero-grid">
            <div className="tb-hero-copy">
              <span className="preview-eyebrow">Our offering · 10Bench</span>
              <h1 className="preview-display">
                Work has<br />
                <span className="preview-editorial">more than</span><br />
                one setting.
              </h1>
              <p>
                A focused desk, a room to bring people together, a place to reset. Find the
                right setting for the work in front of you.
              </p>
              <a className="tb-text-link" href="#workspace-formats">
                Explore the spaces <ArrowRight size={16} />
              </a>
              <div className="tb-hero-index"><span>01 / 04</span><i /> A space to work your way</div>
            </div>
            <div className="tb-hero-image-wrap">
              <div className="tb-image-outline" />
              <img
                className="tb-hero-image"
                src="/__mockup/images/workspace-reception.jpeg"
                alt="Warm timber reception at 10Bench, opening onto the glass-fronted workspace"
              />
              <div className="tb-image-caption">
                <span className="tb-caption-mark">10</span>
                <span><b>A considered place to arrive</b><small>10Bench Coworking Spaces</small></span>
              </div>
              <div className="tb-photo-stamp">SPACE TO<br />DO GOOD WORK</div>
            </div>
          </div>
          <div className="tb-hero-bottom preview-container">
            <span>Different days ask for different things.</span>
            <span className="tb-scroll-note">Scroll to find your starting point <span>↓</span></span>
          </div>
        </section>

        <section className="tb-formats tb-section" id="workspace-formats">
          <div className="preview-container">
            <div className="tb-section-intro">
              <div>
                <span className="preview-eyebrow">Four ways to settle in</span>
                <h2 className="preview-display">Choose your<br /><em className="preview-editorial">kind of day.</em></h2>
              </div>
              <p>From heads-down time to a shared conversation, each setting gives the day a little room to take shape.</p>
            </div>
            <div className="tb-format-list">
              {formats.map(({ number, icon: Icon, title, text, note }) => (
                <article className="tb-format-row" key={number}>
                  <span className="tb-format-number">{number}</span>
                  <span className="tb-format-icon"><Icon size={23} strokeWidth={1.55} /></span>
                  <div className="tb-format-content">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <span className="tb-format-note">{note}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tb-meeting">
          <div className="tb-meeting-image">
            <img
              src="/__mockup/images/workspace-meeting.jpeg"
              alt="10Bench meeting room with a long timber table, presentation screen, and glass wall"
            />
            <span className="tb-photo-label">A room to think together</span>
          </div>
          <div className="tb-meeting-copy">
            <div className="tb-meeting-copy-inner">
              <span className="preview-eyebrow">Bring the conversation into focus</span>
              <h2 className="preview-display">Make room<br />for a <em className="preview-editorial">good idea.</em></h2>
              <p>With a long table, presentation screen, and glass-fronted setting, the meeting room gives your next discussion a place of its own.</p>
              <ul className="tb-detail-list">
                <li><Check size={16} />A dedicated meeting environment</li>
                <li><Check size={16} />Presentation screen in the room</li>
                <li><Check size={16} />A setting for conversation and collaboration</li>
              </ul>
              <a className="tb-dark-link" href="#enquire">Ask about meeting spaces <ArrowUpRight size={16} /></a>
              <div className="tb-meeting-footnote">For colleagues, clients, and the conversations between.</div>
            </div>
          </div>
        </section>

        <section className="tb-place-section tb-section">
          <div className="preview-container tb-place-grid">
            <div className="tb-place-copy">
              <span className="preview-eyebrow">A change of pace</span>
              <h2 className="preview-display">Focus, then<br /><em className="preview-editorial">take a breath.</em></h2>
              <p>The lounge offers a softer landing between tasks: a more relaxed place to recharge or carry a conversation on.</p>
              <a className="tb-text-link" href="#faqs">Questions about the space? <ArrowRight size={16} /></a>
              <div className="tb-place-aside"><span>10Bench</span><p>A workday with room to shift gears.</p></div>
            </div>
            <figure className="tb-lounge-figure">
              <img src="/__mockup/images/workspace-lounge.jpeg" alt="The colorful 10Bench lounge with small tables and relaxed seating" />
              <figcaption><span>01</span> A shared pause, in full colour.</figcaption>
            </figure>
          </div>
        </section>

        <section className="tb-faq tb-section" id="faqs">
          <div className="preview-container tb-faq-grid">
            <div className="tb-faq-heading">
              <span className="preview-eyebrow">A few useful answers</span>
              <h2 className="preview-display">Before you<br /><em className="preview-editorial">get in touch.</em></h2>
              <p>Have a question that is not covered here? Start a conversation and tell us what you need from the space.</p>
              <a className="tb-text-link" href="#enquire">Enquire with 10Bench <ArrowRight size={16} /></a>
            </div>
            <div className="tb-faq-list">
              {faqs.map((item, index) => (
                <details className="tb-faq-item" key={item.question} open={index === 0}>
                  <summary><span>{item.question}</span><span className="tb-faq-toggle" aria-hidden="true" /></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="tb-enquire" id="contact">
          <div className="preview-container tb-enquire-inner" id="enquire">
            <div>
              <span className="tb-enquire-kicker">Find your starting point</span>
              <h2 className="preview-display">Tell us what<br /><em className="preview-editorial">your day needs.</em></h2>
            </div>
            <div className="tb-enquire-action">
              <p>Share a little about your workday or the kind of gathering you have in mind. Enquire for current pricing and availability.</p>
              <a className="tb-enquire-button" href="#contact">Start a conversation <ArrowRight size={17} /></a>
              <small>No rates or availability are published here; ask 10Bench for current details.</small>
            </div>
            <span className="tb-enquire-watermark">10</span>
          </div>
        </section>
      </main>
      <style>{`
        .tb-offerings { color: var(--ink); }
        .tb-hero { position: relative; padding: 72px 0 0; background: var(--cream); }
        .tb-hero-grid { display: grid; grid-template-columns: .88fr 1.12fr; gap: clamp(40px, 7vw, 100px); align-items: center; }
        .tb-hero-copy { padding: 10px 0 36px; }
        .tb-hero-copy h1 { margin: 24px 0 26px; max-width: 600px; color: var(--navy); font-size: clamp(58px, 7vw, 92px); }
        .tb-hero-copy h1 .preview-editorial { color: var(--orange); }
        .tb-hero-copy > p { max-width: 410px; color: #596775; font-size: 16px; line-height: 1.85; margin: 0; }
        .tb-text-link, .tb-dark-link { display: inline-flex; align-items: center; gap: 12px; color: var(--navy); font-weight: 700; font-size: 13px; }
        .tb-text-link { margin-top: 30px; }
        .tb-text-link svg, .tb-dark-link svg { color: var(--orange); transition: transform .2s ease; }
        .tb-text-link:hover svg, .tb-dark-link:hover svg { transform: translateX(4px); }
        .tb-hero-index { display: flex; align-items: center; gap: 12px; margin-top: 62px; color: #707c85; font-size: 10px; letter-spacing: .13em; text-transform: uppercase; }
        .tb-hero-index span { color: var(--orange); font-weight: 700; }
        .tb-hero-index i { display: block; width: 28px; height: 1px; background: var(--orange); }
        .tb-hero-image-wrap { position: relative; min-height: 475px; margin: 0 15px 24px 0; }
        .tb-image-outline { position: absolute; inset: -14px -14px 14px 18px; border: 1px solid var(--orange); }
        .tb-hero-image { display: block; width: 100%; height: 475px; object-fit: cover; position: relative; }
        .tb-image-caption { position: absolute; left: -32px; bottom: 0; display: flex; align-items: center; gap: 14px; padding: 16px 23px; color: white; background: var(--navy); }
        .tb-caption-mark { display: grid; place-items: center; width: 35px; height: 35px; border: 1px solid rgba(255,255,255,.42); border-radius: 50%; color: var(--orange); font-family: var(--font-editorial); font-size: 14px; }
        .tb-image-caption b, .tb-image-caption small { display: block; }
        .tb-image-caption b { font-family: var(--font-display); font-size: 13px; font-weight: 600; }
        .tb-image-caption small { margin-top: 4px; color: #c8d1d8; font-size: 10px; letter-spacing: .06em; }
        .tb-photo-stamp { position: absolute; right: -28px; top: 30px; padding: 12px 15px; background: var(--orange); color: white; font-size: 9px; font-weight: 700; letter-spacing: .13em; line-height: 1.5; transform: rotate(3deg); }
        .tb-hero-bottom { display: flex; justify-content: space-between; align-items: center; padding-block: 24px; color: #526171; border-top: 1px solid rgba(16,35,56,.12); font-family: var(--font-editorial); font-size: 15px; font-style: italic; }
        .tb-scroll-note { color: #77818a; font-family: var(--font-body); font-size: 9px; font-style: normal; letter-spacing: .14em; text-transform: uppercase; }
        .tb-scroll-note span { padding-left: 12px; color: var(--orange); font-size: 15px; }
        .tb-section { padding: 108px 0; }
        .tb-formats { background: var(--paper); }
        .tb-section-intro { display: flex; align-items: end; justify-content: space-between; gap: 40px; margin-bottom: 52px; }
        .tb-section-intro h2, .tb-place-copy h2, .tb-faq-heading h2 { margin: 18px 0 0; color: var(--navy); font-size: clamp(42px, 5.5vw, 68px); }
        .tb-section-intro h2 em, .tb-place-copy h2 em, .tb-faq-heading h2 em { color: var(--orange); }
        .tb-section-intro > p { max-width: 340px; margin: 0 0 7px; color: var(--muted); font-size: 14px; line-height: 1.8; }
        .tb-format-list { border-top: 1px solid var(--line); }
        .tb-format-row { display: grid; grid-template-columns: 44px 52px minmax(260px,1fr) 190px; align-items: center; gap: 21px; padding: 26px 8px; border-bottom: 1px solid var(--line); transition: background .2s ease, padding .2s ease; }
        .tb-format-row:hover { padding-inline: 15px; background: #fbf8f2; }
        .tb-format-number { align-self: start; padding-top: 4px; color: var(--orange); font-family: var(--font-editorial); font-size: 22px; }
        .tb-format-icon { display: grid; place-items: center; width: 46px; height: 46px; color: var(--orange); border: 1px solid #f0d8c7; border-radius: 50%; }
        .tb-format-content h3 { margin: 0 0 7px; color: var(--navy); font-family: var(--font-display); font-size: 20px; font-weight: 600; letter-spacing: -.035em; }
        .tb-format-content p { max-width: 610px; margin: 0; color: var(--muted); font-size: 13px; line-height: 1.75; }
        .tb-format-note { justify-self: end; color: #89919a; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; }
        .tb-meeting { display: grid; grid-template-columns: 1.08fr .92fr; min-height: 570px; color: white; background: var(--navy); }
        .tb-meeting-image { position: relative; min-height: 570px; }
        .tb-meeting-image img { position: absolute; width: 100%; height: 100%; inset: 0; object-fit: cover; }
        .tb-meeting-image::after { content: ""; position: absolute; inset: 45% 0 0; background: linear-gradient(transparent, rgba(12,29,45,.68)); }
        .tb-photo-label { position: absolute; z-index: 1; bottom: 27px; left: max(32px, calc((100vw - 1220px)/2)); padding: 9px 12px; color: white; background: rgba(16,35,56,.85); font-size: 10px; letter-spacing: .13em; text-transform: uppercase; }
        .tb-meeting-copy { display: flex; align-items: center; padding: 72px clamp(38px, 7vw, 100px); }
        .tb-meeting-copy-inner { max-width: 500px; }
        .tb-meeting-copy .preview-eyebrow { color: #f6a367; }
        .tb-meeting-copy h2 { margin: 21px 0; font-size: clamp(42px, 5vw, 64px); }
        .tb-meeting-copy h2 em { color: #f6a367; }
        .tb-meeting-copy p { max-width: 420px; color: #c4cfd7; font-size: 14px; line-height: 1.85; }
        .tb-detail-list { display: grid; gap: 14px; margin: 28px 0 29px; padding: 0; list-style: none; color: #e2e7eb; font-size: 12px; }
        .tb-detail-list li { display: flex; align-items: center; gap: 12px; }
        .tb-detail-list svg { flex: none; color: var(--orange); }
        .tb-dark-link { color: white; }
        .tb-meeting-footnote { margin-top: 44px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.18); color: #aebbc5; font-family: var(--font-editorial); font-style: italic; font-size: 14px; }
        .tb-place-section { background: var(--cream); }
        .tb-place-grid { display: grid; grid-template-columns: .78fr 1.22fr; gap: 85px; align-items: center; }
        .tb-place-copy h2 { margin-bottom: 20px; }
        .tb-place-copy > p { max-width: 390px; color: var(--muted); font-size: 14px; line-height: 1.85; }
        .tb-place-aside { display: flex; gap: 14px; align-items: baseline; margin-top: 58px; padding-top: 18px; border-top: 1px solid #ded8cf; }
        .tb-place-aside span { color: var(--orange); font-family: var(--font-editorial); font-size: 19px; }
        .tb-place-aside p { margin: 0; color: #697680; font-size: 11px; letter-spacing: .07em; text-transform: uppercase; }
        .tb-lounge-figure { position: relative; margin: 0; padding: 0 0 30px 28px; }
        .tb-lounge-figure::before { content: ""; position: absolute; inset: 24px 0 0 0; border: 1px solid var(--orange); }
        .tb-lounge-figure img { position: relative; display: block; width: 100%; height: 430px; object-fit: cover; }
        .tb-lounge-figure figcaption { position: absolute; z-index: 1; left: 0; bottom: 0; padding: 16px 19px; color: white; background: var(--navy); font-size: 11px; letter-spacing: .05em; }
        .tb-lounge-figure figcaption span { margin-right: 14px; color: var(--orange); font-family: var(--font-editorial); font-size: 17px; }
        .tb-faq { background: var(--paper); }
        .tb-faq-grid { display: grid; grid-template-columns: .78fr 1.22fr; gap: 90px; align-items: start; }
        .tb-faq-heading { position: sticky; top: 30px; }
        .tb-faq-heading h2 { margin-bottom: 20px; }
        .tb-faq-heading > p { max-width: 340px; color: var(--muted); font-size: 13px; line-height: 1.8; }
        .tb-faq-list { border-top: 1px solid var(--line); }
        .tb-faq-item { border-bottom: 1px solid var(--line); }
        .tb-faq-item summary { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 21px 2px; color: var(--navy); font-family: var(--font-display); font-size: 15px; font-weight: 600; cursor: pointer; list-style: none; }
        .tb-faq-item summary::-webkit-details-marker { display: none; }
        .tb-faq-toggle { position: relative; display: block; width: 21px; height: 21px; flex: none; border: 1px solid #d8cfc4; border-radius: 50%; }
        .tb-faq-toggle::before, .tb-faq-toggle::after { content: ""; position: absolute; left: 5px; top: 9px; width: 9px; height: 1px; background: var(--orange); transition: transform .2s ease; }
        .tb-faq-toggle::after { transform: rotate(90deg); }
        .tb-faq-item[open] .tb-faq-toggle::after { transform: rotate(0); }
        .tb-faq-item p { max-width: 600px; margin: -3px 36px 22px 2px; color: var(--muted); font-size: 13px; line-height: 1.8; }
        .tb-enquire { position: relative; overflow: hidden; padding: 78px 0; color: white; background: var(--orange); }
        .tb-enquire-inner { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 50px; }
        .tb-enquire-kicker { color: var(--navy); font-size: 10px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .tb-enquire h2 { position: relative; z-index: 1; margin: 18px 0 0; color: var(--navy); font-size: clamp(40px, 5vw, 62px); }
        .tb-enquire h2 em { color: var(--paper); }
        .tb-enquire-action { position: relative; z-index: 1; width: min(100%, 380px); }
        .tb-enquire-action p { margin: 0 0 22px; color: #263c4d; font-size: 13px; line-height: 1.8; }
        .tb-enquire-button { display: inline-flex; min-height: 50px; align-items: center; justify-content: center; gap: 13px; padding: 0 19px; color: white; background: var(--navy); font-size: 12px; font-weight: 700; transition: background .2s ease, transform .2s ease; }
        .tb-enquire-button:hover { color: var(--navy); background: white; transform: translateY(-2px); }
        .tb-enquire-action small { display: block; margin-top: 13px; color: rgba(16,35,56,.78); font-size: 10px; line-height: 1.6; }
        .tb-enquire-watermark { position: absolute; right: 23%; bottom: -120px; color: rgba(255,255,255,.12); font-family: var(--font-display); font-size: 300px; font-weight: 800; line-height: 1; letter-spacing: -.11em; pointer-events: none; }
        @media (max-width: 850px) {
          .tb-hero-grid { grid-template-columns: 1fr 1fr; gap: 34px; }
          .tb-hero-copy h1 { font-size: clamp(54px, 8vw, 78px); }
          .tb-hero-image-wrap, .tb-hero-image { min-height: 410px; height: 410px; }
          .tb-format-row { grid-template-columns: 36px 48px minmax(200px,1fr); }
          .tb-format-note { grid-column: 3; justify-self: start; }
          .tb-meeting { grid-template-columns: 1fr 1fr; }
          .tb-place-grid, .tb-faq-grid { gap: 45px; }
        }
        @media (max-width: 640px) {
          .tb-hero { padding-top: 48px; }
          .tb-hero-grid { grid-template-columns: 1fr; gap: 29px; }
          .tb-hero-copy { padding-bottom: 0; }
          .tb-hero-copy h1 { font-size: clamp(55px, 14vw, 72px); }
          .tb-hero-copy > p { font-size: 14px; }
          .tb-hero-index { margin-top: 31px; }
          .tb-hero-image-wrap, .tb-hero-image { min-height: 340px; height: 340px; }
          .tb-hero-image-wrap { margin-right: 8px; margin-left: 8px; }
          .tb-image-caption { left: -8px; }
          .tb-photo-stamp { right: -9px; }
          .tb-hero-bottom { align-items: flex-start; gap: 12px; flex-direction: column; font-size: 14px; }
          .tb-section { padding: 72px 0; }
          .tb-section-intro { display: block; margin-bottom: 30px; }
          .tb-section-intro h2, .tb-place-copy h2, .tb-faq-heading h2 { font-size: 46px; }
          .tb-section-intro > p { margin-top: 17px; }
          .tb-format-row { grid-template-columns: 30px 42px 1fr; gap: 11px; padding: 22px 0; }
          .tb-format-number { font-size: 18px; }
          .tb-format-icon { width: 38px; height: 38px; }
          .tb-format-icon svg { width: 19px; }
          .tb-format-content h3 { font-size: 17px; }
          .tb-format-content p { font-size: 12px; }
          .tb-format-note { grid-column: 3; font-size: 9px; }
          .tb-meeting { display: flex; flex-direction: column; }
          .tb-meeting-image { min-height: 340px; }
          .tb-photo-label { left: 18px; bottom: 18px; }
          .tb-meeting-copy { padding: 54px 24px 58px; }
          .tb-meeting-copy h2 { font-size: 46px; }
          .tb-meeting-footnote { margin-top: 34px; }
          .tb-place-grid, .tb-faq-grid { grid-template-columns: 1fr; gap: 38px; }
          .tb-place-aside { margin-top: 38px; }
          .tb-lounge-figure img { height: 300px; }
          .tb-faq-heading { position: static; }
          .tb-faq-item summary { font-size: 14px; }
          .tb-enquire { padding: 62px 0; }
          .tb-enquire-inner { align-items: flex-start; flex-direction: column; gap: 27px; }
          .tb-enquire h2 { font-size: 46px; }
          .tb-enquire-watermark { right: -15px; bottom: 30px; font-size: 180px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tb-offerings *, .tb-offerings *::before, .tb-offerings *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
        }
      `}</style>
    </CurrentShell>
  );
}
