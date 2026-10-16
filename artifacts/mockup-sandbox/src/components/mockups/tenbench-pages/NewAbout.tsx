import "./_group.css";
import { CurrentShell } from "./_shared/CurrentShell";
import { ArrowRight, ArrowUpRight, MoveDownRight } from "lucide-react";

const rhythms = [
  {
    index: "01",
    title: "When the work needs quiet",
    text: "A desk and a little distance from the day can make it easier to settle into the task in front of you.",
    note: "A place to focus",
  },
  {
    index: "02",
    title: "When it needs another voice",
    text: "A change of setting can give a conversation, planning session, or shared piece of work a clearer centre.",
    note: "Room to meet",
  },
  {
    index: "03",
    title: "When you need to change gear",
    text: "Not every hour asks for the same energy. A different corner can offer a welcome pause before you begin again.",
    note: "Space to reset",
  },
];

const steps = [
  {
    number: "01",
    title: "Start with your day",
    text: "Think about the work you do, who you do it with, and what would make a different setting useful.",
  },
  {
    number: "02",
    title: "Explore the space",
    text: "Browse the rooms and working areas to get a sense of the atmosphere and the different ways the space can be used.",
  },
  {
    number: "03",
    title: "Find the right next step",
    text: "Share what you have in mind with 10Bench. You can ask questions and consider which workspace option may suit you.",
  },
];

export function NewAbout() {
  return (
    <CurrentShell>
      <main className="tb-about">
        <section className="tb-hero" id="home">
          <div className="tb-container tb-hero-grid">
            <div className="tb-hero-copy">
              <span className="tb-eyebrow">A space with a point of view</span>
              <p className="tb-overline">10Bench / About</p>
              <h1 className="tb-display">
                Work has its own <em>rhythm.</em>
              </h1>
              <p className="tb-lede">
                10Bench is a coworking space for the many ways a workday can
                unfold: focused, collaborative, and always your own.
              </p>
              <a className="tb-link" href="#about">
                The thinking behind 10Bench <ArrowRight size={16} />
              </a>
              <div className="tb-hero-foot">
                <span className="tb-foot-mark">10</span>
                <span>Space to focus. Room to meet.</span>
              </div>
            </div>
            <div className="tb-hero-visual">
              <div className="tb-hero-photo">
                <img
                  src="/__mockup/images/workspace-reception.jpeg"
                  alt="The welcoming reception at 10Bench, with warm wood, glass rooms and a sculptural orange feature"
                />
              </div>
              <div className="tb-image-stamp" aria-hidden="true">
                <span>Make room</span>
                <span>for good work</span>
              </div>
              <span className="tb-photo-caption">A first impression of 10Bench</span>
            </div>
          </div>
          <div className="tb-hero-side-note" aria-hidden="true">
            A little room to do your best work
          </div>
        </section>

        <section className="tb-story tb-section" id="about">
          <div className="tb-container tb-story-grid">
            <div className="tb-story-copy">
              <span className="tb-eyebrow">Why 10Bench</span>
              <h2 className="tb-display">
                A little more human.
                <br />
                A lot more <em>room.</em>
              </h2>
              <div className="tb-story-body">
                <p>
                  Not everyone works the same way. Some need the calm of their
                  own focus; others think best in company. Most need a bit of
                  both, depending on the day.
                </p>
                <p>
                  We built 10Bench around that everyday truth. A warm welcome,
                  thoughtfully made places to work, and distinct spaces for the
                  ways a workday can move.
                </p>
              </div>
              <div className="tb-story-signoff">
                <span className="tb-signoff-rule" />
                <span>Made for the work in front of you.</span>
              </div>
            </div>
            <figure className="tb-story-figure">
              <img
                src="/__mockup/images/workspace-lounge.jpeg"
                alt="The 10Bench lounge, with colourful chairs grouped around small tables beside glass-fronted rooms"
              />
              <figcaption>
                <span>More than one way to take a seat</span>
                <span>10Bench, inside</span>
              </figcaption>
              <span className="tb-story-index" aria-hidden="true">
                10<span>bench</span>
              </span>
            </figure>
          </div>
        </section>

        <section className="tb-rhythms" id="offerings">
          <div className="tb-container">
            <div className="tb-rhythm-heading">
              <div>
                <span className="tb-eyebrow">Different days, same welcome</span>
                <h2 className="tb-display">
                  What does your
                  <br />
                  workday <em>need?</em>
                </h2>
              </div>
              <p>
                Independent professionals and growing teams bring different
                rhythms. 10Bench makes room for a few ways to work, so the
                setting can feel more in step with the day.
              </p>
            </div>
            <div className="tb-rhythm-layout">
              <div className="tb-rhythm-photo">
                <img
                  src="/__mockup/images/workspace-meeting.jpeg"
                  alt="A meeting room at 10Bench with a long wood table, display screen and glass walls"
                />
                <span className="tb-photo-tag">A room for shared thinking</span>
              </div>
              <div className="tb-rhythm-list">
                {rhythms.map((item) => (
                  <article className="tb-rhythm-item" key={item.index}>
                    <span className="tb-rhythm-index">{item.index}</span>
                    <div className="tb-rhythm-content">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <span className="tb-rhythm-note">{item.note}</span>
                    </div>
                    <MoveDownRight className="tb-rhythm-arrow" size={18} aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="tb-look" id="gallery">
          <div className="tb-container tb-look-grid">
            <div className="tb-look-copy">
              <span className="tb-eyebrow">Step inside</span>
              <h2 className="tb-display">
                Thoughtful by design.
                <br />
                Welcoming by <em>nature.</em>
              </h2>
              <p>
                Warm wood, glass-fronted rooms and a bright lounge give the
                space its character. Take a closer look at the places that
                could become part of your workday.
              </p>
              <a className="tb-light-link" href="#explore">
                Explore how to get to know the space <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="tb-look-visual">
              <img
                src="/__mockup/images/workspace-lounge.jpeg"
                alt="A sunlit shared lounge at 10Bench with distinct seating areas and a central counter"
              />
              <div className="tb-look-caption">
                <span>10Bench</span>
                <span>Space to focus. Room to meet.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="tb-explore tb-section" id="explore">
          <div className="tb-container">
            <div className="tb-explore-heading">
              <span className="tb-eyebrow">Getting to know 10Bench</span>
              <h2 className="tb-display">
                A simple way to
                <br />
                <em>find your fit.</em>
              </h2>
              <p>
                No need to have it all figured out. Start with what you need
                from a workspace and take it one step at a time.
              </p>
            </div>
            <div className="tb-steps">
              {steps.map((step) => (
                <article className="tb-step" key={step.number}>
                  <span className="tb-step-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  <span className="tb-step-rule" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tb-contact" id="contact">
          <div className="tb-container tb-contact-inner">
            <div className="tb-contact-copy">
              <span className="tb-eyebrow">Your work, your way</span>
              <h2 className="tb-display">
                Curious what
                <br />
                could <em>work?</em>
              </h2>
              <p>
                Share a little about the way you work. The 10Bench team can
                help you explore the possibilities.
              </p>
            </div>
            <a className="tb-contact-button" href="#gallery">
              Explore the space <ArrowRight size={17} />
            </a>
            <span className="tb-contact-number" aria-hidden="true">10</span>
          </div>
        </section>
      </main>
      <style>{`
        .tb-about {
          --tb-space: clamp(26px, 5vw, 74px);
          color: var(--ink);
          background: var(--paper);
          font-family: var(--font-body);
        }
        .tb-about img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .tb-container { width: min(1220px, calc(100% - 64px)); margin-inline: auto; }
        .tb-section { padding-block: clamp(76px, 9vw, 132px); }
        .tb-display {
          font-family: var(--font-display);
          font-weight: 600;
          letter-spacing: -.068em;
          line-height: .99;
        }
        .tb-display em {
          font-family: var(--font-editorial);
          font-weight: 500;
          letter-spacing: -.04em;
        }
        .tb-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--orange);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
        }
        .tb-eyebrow::before { content: ""; width: 26px; height: 1px; background: currentColor; }
        .tb-hero {
          position: relative;
          overflow: hidden;
          padding: clamp(54px, 7vw, 100px) 0 clamp(76px, 9vw, 118px);
          background: var(--cream);
        }
        .tb-hero-grid {
          display: grid;
          grid-template-columns: .86fr 1.14fr;
          gap: clamp(45px, 7vw, 104px);
          align-items: center;
        }
        .tb-hero-copy { position: relative; z-index: 1; padding: 8px 0 4px; }
        .tb-overline {
          margin: 38px 0 0;
          color: #87909a;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .15em;
          text-transform: uppercase;
        }
        .tb-hero h1 {
          max-width: 610px;
          margin: 18px 0 24px;
          color: var(--navy);
          font-size: clamp(56px, 7vw, 91px);
        }
        .tb-hero h1 em { color: var(--orange); }
        .tb-lede {
          max-width: 430px;
          margin: 0;
          color: #5d6872;
          font-size: 16px;
          line-height: 1.85;
        }
        .tb-link, .tb-light-link {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          margin-top: 29px;
          color: var(--navy);
          font-size: 12px;
          font-weight: 700;
        }
        .tb-link svg, .tb-light-link svg { color: var(--orange); transition: transform .2s ease; }
        .tb-link:hover svg, .tb-light-link:hover svg { transform: translate(3px, -2px); }
        .tb-hero-foot {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 54px;
          color: #6c7781;
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .tb-foot-mark {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(16,35,56,.25);
          border-radius: 50%;
          color: var(--orange);
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: -.06em;
        }
        .tb-hero-visual { position: relative; min-width: 0; padding: 0 15px 22px 0; }
        .tb-hero-photo { position: relative; z-index: 1; height: clamp(380px, 42vw, 540px); overflow: hidden; }
        .tb-hero-photo img { object-position: 48% center; transition: transform .75s cubic-bezier(.2,.7,.2,1); }
        .tb-hero-visual:hover .tb-hero-photo img { transform: scale(1.025); }
        .tb-hero-visual::before {
          position: absolute;
          content: "";
          inset: -15px 0 38px 20px;
          border: 1px solid var(--orange);
        }
        .tb-image-stamp {
          position: absolute;
          z-index: 2;
          left: -34px;
          bottom: 55px;
          width: 117px;
          height: 117px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background: var(--orange);
          color: white;
          font-family: var(--font-editorial);
          font-size: 15px;
          font-style: italic;
          line-height: 1.35;
          transform: rotate(-8deg);
        }
        .tb-photo-caption {
          position: absolute;
          right: 16px;
          bottom: 0;
          color: #7a838c;
          font-size: 10px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .tb-hero-side-note {
          position: absolute;
          right: 24px;
          bottom: 38px;
          writing-mode: vertical-rl;
          color: #90979d;
          font-size: 9px;
          letter-spacing: .17em;
          text-transform: uppercase;
        }
        .tb-story-grid {
          display: grid;
          grid-template-columns: .83fr 1.17fr;
          gap: clamp(45px, 8vw, 112px);
          align-items: center;
        }
        .tb-story-copy h2 {
          margin: 19px 0 25px;
          color: var(--navy);
          font-size: clamp(40px, 5vw, 64px);
        }
        .tb-story-copy h2 em { color: var(--orange); }
        .tb-story-body {
          border-left: 1px solid var(--line);
          padding-left: 24px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.9;
        }
        .tb-story-body p { margin: 0 0 17px; }
        .tb-story-body p:last-child { margin-bottom: 0; }
        .tb-story-signoff {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 31px 0 0 24px;
          color: var(--navy);
          font-family: var(--font-editorial);
          font-size: 14px;
          font-style: italic;
        }
        .tb-signoff-rule { width: 28px; height: 1px; background: var(--orange); }
        .tb-story-figure {
          position: relative;
          height: clamp(350px, 43vw, 520px);
          margin: 0;
          background: var(--cream);
        }
        .tb-story-figure img { object-position: center; }
        .tb-story-figure::before {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 12px -12px -12px 12px;
          border: 1px solid rgba(244,123,32,.68);
          pointer-events: none;
        }
        .tb-story-figure figcaption {
          position: absolute;
          z-index: 2;
          right: 0;
          bottom: 0;
          display: grid;
          gap: 5px;
          padding: 16px 19px;
          background: var(--paper);
          color: var(--navy);
          font-size: 11px;
          font-weight: 700;
        }
        .tb-story-figure figcaption span:last-child {
          color: #7b858e;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .tb-story-index {
          position: absolute;
          left: -22px;
          top: 28px;
          z-index: 2;
          color: var(--orange);
          font-family: var(--font-display);
          font-size: 37px;
          font-weight: 800;
          letter-spacing: -.12em;
          text-shadow: 0 1px 0 var(--paper);
        }
        .tb-story-index span {
          margin-left: 5px;
          color: var(--navy);
          font-family: var(--font-body);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .tb-rhythms { padding: clamp(75px, 9vw, 118px) 0; background: var(--cream); }
        .tb-rhythm-heading {
          display: grid;
          grid-template-columns: 1fr .7fr;
          gap: 50px;
          align-items: end;
          margin-bottom: 52px;
        }
        .tb-rhythm-heading h2 {
          margin: 17px 0 0;
          color: var(--navy);
          font-size: clamp(43px, 5.2vw, 68px);
        }
        .tb-rhythm-heading h2 em { color: var(--orange); }
        .tb-rhythm-heading > p {
          max-width: 410px;
          margin: 0 0 5px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.85;
        }
        .tb-rhythm-layout {
          display: grid;
          grid-template-columns: .86fr 1.14fr;
          gap: clamp(30px, 6vw, 78px);
          align-items: stretch;
        }
        .tb-rhythm-photo { position: relative; min-height: 460px; background: #e8e1d8; }
        .tb-rhythm-photo img { position: absolute; inset: 0; object-position: 55% center; }
        .tb-photo-tag {
          position: absolute;
          left: 0;
          bottom: 0;
          padding: 14px 18px;
          background: var(--orange);
          color: white;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .tb-rhythm-list { border-top: 1px solid #d9d2c9; }
        .tb-rhythm-item {
          display: grid;
          grid-template-columns: 38px 1fr 18px;
          gap: 16px;
          align-items: start;
          padding: 24px 0 23px;
          border-bottom: 1px solid #d9d2c9;
        }
        .tb-rhythm-index {
          padding-top: 2px;
          color: var(--orange);
          font-family: var(--font-editorial);
          font-size: 19px;
        }
        .tb-rhythm-content h3 {
          margin: 0 0 8px;
          color: var(--navy);
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -.03em;
        }
        .tb-rhythm-content p {
          max-width: 425px;
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.75;
        }
        .tb-rhythm-note {
          display: inline-block;
          margin-top: 12px;
          color: #7b858e;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
        }
        .tb-rhythm-arrow { margin-top: 4px; color: var(--orange); }
        .tb-look { overflow: hidden; background: var(--navy); color: white; }
        .tb-look-grid {
          display: grid;
          grid-template-columns: .92fr 1.08fr;
          min-height: 550px;
          align-items: stretch;
        }
        .tb-look-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 78px clamp(32px, 6vw, 82px) 78px 0;
        }
        .tb-look-copy h2 {
          margin: 19px 0 20px;
          font-size: clamp(41px, 4.6vw, 61px);
        }
        .tb-look-copy h2 em { color: #f6a46a; }
        .tb-look-copy > p {
          max-width: 420px;
          margin: 0;
          color: #c5cfd6;
          font-size: 14px;
          line-height: 1.85;
        }
        .tb-light-link { color: white; margin-top: 26px; }
        .tb-look-visual { position: relative; min-height: 550px; }
        .tb-look-visual img { position: absolute; inset: 0; object-position: center; }
        .tb-look-visual::after {
          content: "";
          position: absolute;
          inset: 45% 0 0;
          background: linear-gradient(transparent, rgba(16,35,56,.75));
        }
        .tb-look-caption {
          position: absolute;
          z-index: 1;
          right: 26px;
          bottom: 26px;
          left: 26px;
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: end;
          color: white;
          font-size: 10px;
          letter-spacing: .13em;
          text-transform: uppercase;
        }
        .tb-look-caption span:first-child { font-family: var(--font-display); font-size: 14px; font-weight: 700; letter-spacing: .02em; }
        .tb-explore-heading {
          display: grid;
          grid-template-columns: 1fr .7fr;
          column-gap: 50px;
          align-items: end;
        }
        .tb-explore-heading .tb-eyebrow { grid-column: 1 / -1; margin-bottom: 17px; }
        .tb-explore-heading h2 {
          margin: 0;
          color: var(--navy);
          font-size: clamp(43px, 5vw, 67px);
        }
        .tb-explore-heading h2 em { color: var(--orange); }
        .tb-explore-heading > p {
          max-width: 400px;
          margin: 0 0 5px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.85;
        }
        .tb-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 58px;
          border-top: 1px solid var(--line);
        }
        .tb-step {
          position: relative;
          display: grid;
          grid-template-columns: 43px 1fr;
          gap: 14px;
          padding: 23px 0 0;
        }
        .tb-step-number {
          color: var(--orange);
          font-family: var(--font-editorial);
          font-size: 21px;
        }
        .tb-step h3 {
          margin: 2px 0 10px;
          color: var(--navy);
          font-family: var(--font-display);
          font-size: 18px;
          letter-spacing: -.03em;
        }
        .tb-step p {
          max-width: 300px;
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.8;
        }
        .tb-step-rule {
          position: absolute;
          top: -1px;
          left: 0;
          width: 38px;
          height: 2px;
          background: var(--orange);
        }
        .tb-contact { position: relative; overflow: hidden; padding: 75px 0; background: var(--orange); }
        .tb-contact-inner {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 38px;
        }
        .tb-contact .tb-eyebrow { color: var(--navy); }
        .tb-contact h2 {
          position: relative;
          z-index: 1;
          margin: 15px 0 13px;
          color: var(--navy);
          font-size: clamp(40px, 5vw, 64px);
        }
        .tb-contact h2 em { color: var(--paper); }
        .tb-contact-copy > p {
          position: relative;
          z-index: 1;
          max-width: 440px;
          margin: 0;
          color: #463a32;
          font-size: 13px;
          line-height: 1.75;
        }
        .tb-contact-button {
          position: relative;
          z-index: 2;
          display: inline-flex;
          min-height: 54px;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 0 22px;
          background: var(--navy);
          color: white;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          transition: transform .2s ease, background .2s ease;
        }
        .tb-contact-button:hover { transform: translateY(-2px); background: var(--navy-2); }
        .tb-contact-number {
          position: absolute;
          right: 30%;
          bottom: -110px;
          color: rgba(255,255,255,.14);
          font-family: var(--font-display);
          font-size: 260px;
          font-weight: 800;
          letter-spacing: -.14em;
          line-height: 1;
          pointer-events: none;
        }
        @media (max-width: 900px) {
          .tb-container { width: min(100% - 42px, 700px); }
          .tb-hero-grid, .tb-story-grid, .tb-rhythm-layout, .tb-look-grid { grid-template-columns: 1fr; }
          .tb-hero-grid { gap: 45px; }
          .tb-hero-copy { max-width: 640px; }
          .tb-hero-visual { margin-left: 14px; }
          .tb-hero-photo { height: min(64vw, 520px); min-height: 360px; }
          .tb-story-grid { gap: 43px; }
          .tb-story-copy { max-width: 620px; }
          .tb-story-figure { height: min(62vw, 500px); min-height: 350px; }
          .tb-rhythm-heading, .tb-explore-heading { grid-template-columns: 1fr; gap: 20px; }
          .tb-rhythm-heading > p, .tb-explore-heading > p { max-width: 560px; }
          .tb-rhythm-photo { min-height: 400px; }
          .tb-look-grid { width: 100%; }
          .tb-look-copy { width: min(100% - 42px, 700px); margin-inline: auto; padding: 68px 0 48px; }
          .tb-look-visual { min-height: min(68vw, 500px); }
          .tb-steps { gap: 20px; }
          .tb-contact-number { right: 22%; }
        }
        @media (max-width: 600px) {
          .tb-container { width: calc(100% - 36px); }
          .tb-hero { padding: 51px 0 64px; }
          .tb-hero h1 { font-size: clamp(52px, 15vw, 72px); }
          .tb-overline { margin-top: 29px; }
          .tb-lede { font-size: 15px; }
          .tb-hero-foot { margin-top: 34px; }
          .tb-hero-visual { margin-left: 9px; padding-right: 9px; }
          .tb-hero-photo { height: 350px; min-height: 0; }
          .tb-image-stamp { left: -18px; bottom: 48px; width: 92px; height: 92px; font-size: 12px; }
          .tb-hero-side-note { display: none; }
          .tb-photo-caption { right: 7px; font-size: 8px; }
          .tb-section { padding-block: 75px; }
          .tb-story-copy h2, .tb-rhythm-heading h2, .tb-explore-heading h2 { font-size: 43px; }
          .tb-story-figure { height: 340px; min-height: 0; }
          .tb-story-figure::before { inset: 8px -7px -8px 8px; }
          .tb-story-index { left: -11px; top: 21px; font-size: 29px; }
          .tb-story-body { padding-left: 17px; font-size: 13px; }
          .tb-story-signoff { margin-left: 17px; font-size: 13px; }
          .tb-rhythms { padding: 74px 0; }
          .tb-rhythm-heading { gap: 17px; margin-bottom: 32px; }
          .tb-rhythm-heading > p, .tb-explore-heading > p { font-size: 13px; }
          .tb-rhythm-layout { gap: 28px; }
          .tb-rhythm-photo { min-height: 310px; }
          .tb-rhythm-item { grid-template-columns: 29px 1fr 16px; gap: 11px; padding: 20px 0; }
          .tb-rhythm-content h3 { font-size: 16px; }
          .tb-rhythm-content p { font-size: 12px; }
          .tb-look-copy { width: calc(100% - 36px); padding: 64px 0 38px; }
          .tb-look-copy h2 { font-size: 42px; }
          .tb-look-visual { min-height: 330px; }
          .tb-look-caption { right: 17px; bottom: 18px; left: 17px; font-size: 8px; }
          .tb-look-caption span:first-child { font-size: 12px; }
          .tb-explore-heading { gap: 17px; }
          .tb-explore-heading .tb-eyebrow { margin-bottom: 0; }
          .tb-steps { grid-template-columns: 1fr; gap: 0; margin-top: 36px; }
          .tb-step { padding: 20px 0 22px; border-bottom: 1px solid var(--line); }
          .tb-step-rule { top: -1px; }
          .tb-step p { max-width: none; }
          .tb-contact { padding: 61px 0; }
          .tb-contact-inner { display: block; }
          .tb-contact h2 { font-size: 43px; }
          .tb-contact-button { margin-top: 24px; }
          .tb-contact-number { right: 0; bottom: -113px; font-size: 205px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tb-about *, .tb-about *::before, .tb-about *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
        }
      `}</style>
    </CurrentShell>
  );
}
