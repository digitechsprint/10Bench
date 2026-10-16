import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import "./_group.css";
import { CurrentShell } from "./_shared/CurrentShell";

export function NewContact() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Preview only — your message has not been sent or stored.");
  }

  return (
    <CurrentShell>
      <main className="tb-contact">
        <style>{`
          .tb-contact {
            --tc-ink: var(--navy);
            color: var(--ink);
            background: var(--paper);
          }
          .tb-contact * { box-sizing: border-box; }
          .tb-wrap { width: min(1220px, calc(100% - 64px)); margin: 0 auto; }
          .tb-contact a { text-decoration: none; }
          .tb-contact-hero {
            position: relative;
            min-height: 555px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: stretch;
            overflow: hidden;
            background: var(--cream);
          }
          .tb-hero-copy {
            width: min(610px, calc(100% - 64px));
            justify-self: end;
            align-self: center;
            padding: 78px 60px 94px 0;
            position: relative;
            z-index: 1;
          }
          .tb-kicker {
            display: flex;
            align-items: center;
            gap: 11px;
            color: var(--orange);
            text-transform: uppercase;
            letter-spacing: .19em;
            font-size: 10px;
            font-weight: 700;
          }
          .tb-kicker::before { content: ""; width: 27px; height: 1px; background: currentColor; }
          .tb-hero-copy h1 {
            max-width: 590px;
            margin: 24px 0 22px;
            color: var(--navy);
            font: 600 clamp(54px, 7vw, 91px)/.98 var(--font-display);
            letter-spacing: -.067em;
          }
          .tb-hero-copy h1 em {
            color: var(--orange);
            font: 500 .94em/.95 var(--font-editorial);
            letter-spacing: -.055em;
          }
          .tb-hero-copy > p {
            max-width: 435px;
            margin: 0;
            color: #5e6b76;
            font-size: 15px;
            line-height: 1.85;
          }
          .tb-hero-foot {
            display: flex;
            align-items: center;
            gap: 18px;
            margin-top: 37px;
            color: var(--navy);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .11em;
            text-transform: uppercase;
          }
          .tb-hero-foot span:first-child { width: 35px; height: 1px; background: var(--orange); }
          .tb-hero-foot svg { color: var(--orange); }
          .tb-hero-image {
            position: relative;
            min-height: 555px;
            overflow: hidden;
            background: #d7c7b2;
          }
          .tb-hero-image::before {
            content: "";
            position: absolute;
            z-index: 1;
            inset: 20px 20px 20px -1px;
            border-left: 1px solid rgba(244,123,32,.9);
            pointer-events: none;
          }
          .tb-hero-image img { width: 100%; height: 100%; position: absolute; inset: 0; object-fit: cover; object-position: 54% center; }
          .tb-image-caption {
            position: absolute;
            z-index: 2;
            left: 0;
            bottom: 0;
            padding: 18px 25px 19px;
            background: var(--navy);
            color: white;
            min-width: 235px;
          }
          .tb-image-caption strong { display: block; font: 600 14px var(--font-display); }
          .tb-image-caption span { display: block; margin-top: 5px; color: #cbd3d9; font-size: 10px; letter-spacing: .11em; text-transform: uppercase; }
          .tb-down {
            position: absolute;
            bottom: 27px;
            left: max(32px, calc((100% - 1220px)/2));
            color: #76808a;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: .18em;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .tb-down svg { color: var(--orange); }
          .tb-main-section { padding: 104px 0 96px; }
          .tb-form-grid {
            display: grid;
            grid-template-columns: .78fr 1.22fr;
            gap: clamp(45px, 8vw, 110px);
            align-items: start;
          }
          .tb-intro { padding-top: 13px; }
          .tb-intro h2 {
            max-width: 390px;
            margin: 19px 0 20px;
            color: var(--navy);
            font: 600 clamp(39px, 4.3vw, 58px)/1.04 var(--font-display);
            letter-spacing: -.06em;
          }
          .tb-intro h2 em { font: 500 .98em/.95 var(--font-editorial); letter-spacing: -.04em; }
          .tb-intro > p { max-width: 385px; margin: 0; color: #64717b; font-size: 14px; line-height: 1.9; }
          .tb-promise {
            margin-top: 30px;
            padding: 15px 0 15px 17px;
            border-left: 2px solid var(--orange);
            max-width: 390px;
            color: #596670;
            font-size: 12px;
            line-height: 1.75;
          }
          .tb-promise b { display: block; margin-bottom: 3px; color: var(--navy); font-size: 12px; }
          .tb-availability {
            display: flex;
            gap: 12px;
            align-items: center;
            margin-top: 37px;
            color: var(--navy);
            font-size: 12px;
            font-weight: 600;
          }
          .tb-availability-mark { width: 35px; height: 35px; display: grid; place-items: center; border-radius: 50%; background: var(--orange-soft); color: var(--orange); }
          .tb-form-panel {
            padding: 35px 38px 31px;
            background: var(--cream);
            border-top: 3px solid var(--orange);
          }
          .tb-form-head {
            display: flex;
            justify-content: space-between;
            align-items: start;
            gap: 20px;
            margin-bottom: 25px;
          }
          .tb-form-head h2 { margin: 0; color: var(--navy); font: 600 24px/1.2 var(--font-display); letter-spacing: -.04em; }
          .tb-preview-label { padding: 7px 9px; white-space: nowrap; background: #f0e7dc; color: #58646e; font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
          .tb-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 17px; }
          .tb-field { display: grid; gap: 7px; }
          .tb-field-full { grid-column: 1 / -1; }
          .tb-field label { color: #40505f; font-size: 11px; font-weight: 700; }
          .tb-field input, .tb-field select, .tb-field textarea {
            width: 100%;
            min-height: 47px;
            border: 1px solid #ded6cb;
            border-radius: 0;
            padding: 12px 13px;
            background: var(--paper);
            color: var(--ink);
            font: 400 12px var(--font-body);
          }
          .tb-field input::placeholder, .tb-field textarea::placeholder { color: #9a9b98; }
          .tb-field select { appearance: none; background-image: linear-gradient(45deg, transparent 50%, #68737b 50%), linear-gradient(135deg, #68737b 50%, transparent 50%); background-position: calc(100% - 17px) 20px, calc(100% - 12px) 20px; background-size: 5px 5px, 5px 5px; background-repeat: no-repeat; }
          .tb-field textarea { min-height: 112px; resize: vertical; line-height: 1.65; }
          .tb-submit-row { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-top: 20px; }
          .tb-submit {
            border: 0;
            min-height: 48px;
            padding: 0 19px;
            display: inline-flex;
            align-items: center;
            gap: 13px;
            color: white;
            background: var(--orange);
            font: 700 11px var(--font-body);
            cursor: pointer;
            transition: background .2s, transform .2s;
          }
          .tb-submit:hover { background: var(--navy); transform: translateY(-2px); }
          .tb-submit-note { max-width: 200px; margin: 0; color: #727b80; font-size: 10px; line-height: 1.55; text-align: right; }
          .tb-feedback { margin: 18px 0 0; padding: 12px 14px; color: var(--navy); background: rgba(255,255,255,.68); border-left: 2px solid var(--orange); font-size: 12px; line-height: 1.6; }
          .tb-explore {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            background: var(--navy);
            color: white;
          }
          .tb-explore-copy { padding: 68px max(42px, calc((100vw - 1220px)/2)) 69px max(42px, calc((100vw - 1220px)/2)); }
          .tb-explore-copy .tb-kicker { color: #f5a064; }
          .tb-explore-copy h2 { max-width: 480px; margin: 17px 0 16px; font: 600 clamp(36px, 4.4vw, 56px)/1.02 var(--font-display); letter-spacing: -.06em; }
          .tb-explore-copy h2 em { font: 500 .95em/.95 var(--font-editorial); }
          .tb-explore-copy p { max-width: 420px; margin: 0; color: #c6d0d8; font-size: 13px; line-height: 1.8; }
          .tb-spaces { display: grid; grid-template-columns: 1fr 1fr; min-height: 390px; }
          .tb-space-photo { position: relative; min-height: 390px; overflow: hidden; }
          .tb-space-photo img { width: 100%; height: 100%; position: absolute; inset: 0; object-fit: cover; transition: transform .6s; }
          .tb-space-photo:hover img { transform: scale(1.035); }
          .tb-space-photo::after { content: ""; position: absolute; inset: 42% 0 0; background: linear-gradient(transparent, rgba(16,35,56,.8)); }
          .tb-space-photo span { position: absolute; z-index: 1; bottom: 21px; left: 22px; color: white; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; }
          .tb-space-photo:first-child img { object-position: 48% center; }
          @media (max-width: 850px) {
            .tb-wrap { width: min(100% - 42px, 680px); }
            .tb-contact-hero { grid-template-columns: 1fr; }
            .tb-hero-copy { width: min(680px, calc(100% - 42px)); justify-self: center; padding: 73px 0 55px; }
            .tb-hero-copy h1 { max-width: 620px; }
            .tb-hero-image { min-height: 420px; }
            .tb-hero-image::before { inset: 14px; border: 1px solid rgba(244,123,32,.8); }
            .tb-down { display: none; }
            .tb-form-grid { grid-template-columns: 1fr; gap: 35px; }
            .tb-intro h2 { max-width: 540px; }
            .tb-explore { grid-template-columns: 1fr; }
            .tb-explore-copy { padding: 62px max(21px, calc((100vw - 680px)/2)); }
          }
          @media (max-width: 600px) {
            .tb-wrap { width: calc(100% - 36px); }
            .tb-hero-copy { width: calc(100% - 36px); padding: 58px 0 46px; }
            .tb-hero-copy h1 { font-size: clamp(51px, 14vw, 68px); }
            .tb-hero-copy > p { font-size: 14px; }
            .tb-hero-image { min-height: 315px; }
            .tb-image-caption { min-width: 200px; padding: 15px 17px; }
            .tb-main-section { padding: 66px 0 68px; }
            .tb-intro h2 { font-size: 43px; }
            .tb-form-panel { padding: 25px 18px 22px; }
            .tb-form-head { display: block; }
            .tb-preview-label { display: inline-flex; margin-top: 13px; }
            .tb-fields { grid-template-columns: 1fr; gap: 16px; }
            .tb-field-full { grid-column: auto; }
            .tb-submit-row { align-items: flex-start; flex-direction: column; }
            .tb-submit-note { max-width: none; text-align: left; }
            .tb-explore-copy { padding: 51px 18px 48px; }
            .tb-spaces { min-height: 290px; }
            .tb-space-photo { min-height: 290px; }
            .tb-space-photo span { left: 13px; bottom: 15px; font-size: 9px; }
          }
        `}</style>

        <section className="tb-contact-hero">
          <div className="tb-hero-copy">
            <span className="tb-kicker">Contact 10Bench</span>
            <h1>Let’s find a way to <em>make it work.</em></h1>
            <p>
              A place to focus, room to meet, or a change of scene for your team.
              Tell us what you’re looking for and start with a simple conversation.
            </p>
            <div className="tb-hero-foot">
              <span aria-hidden="true" />
              <span>A good workspace starts with a good question</span>
              <ArrowDown size={15} aria-hidden="true" />
            </div>
          </div>
          <div className="tb-hero-image">
            <img src="/__mockup/images/workspace-reception.jpeg" alt="10Bench reception with warm timber finishes, welcoming light, and a view into the workspace" />
            <div className="tb-image-caption">
              <strong>Come in, settle in</strong>
              <span>A first look at 10Bench</span>
            </div>
          </div>
          <div className="tb-down" aria-hidden="true"><span>Start here</span><ArrowDown size={13} /></div>
        </section>

        <section className="tb-main-section" id="enquiry">
          <div className="tb-wrap tb-form-grid">
            <div className="tb-intro">
              <span className="tb-kicker">Start here</span>
              <h2>A conversation is a <em>good first step.</em></h2>
              <p>
                Interested in a place to work, a room to meet, or space for a
                team? Share a little about what you have in mind. We can take
                it from there.
              </p>
              <div className="tb-promise">
                <b>No pressure. No assumptions.</b>
                Use the form to think through what would make a workspace feel
                right. This preview won’t send or save anything.
              </div>
              <div className="tb-availability">
                <span className="tb-availability-mark"><Check size={16} /></span>
                <span>Focus, meet, and reset — all in one place.</span>
              </div>
            </div>

            <form className="tb-form-panel" onSubmit={handleSubmit}>
              <div className="tb-form-head">
                <h2>Tell us what you’re looking for</h2>
                <span className="tb-preview-label">Form preview · no data sent</span>
              </div>
              <div className="tb-fields">
                <div className="tb-field">
                  <label htmlFor="tb-name">Your name</label>
                  <input id="tb-name" name="name" autoComplete="name" placeholder="Name" required />
                </div>
                <div className="tb-field">
                  <label htmlFor="tb-email">Email address</label>
                  <input id="tb-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                </div>
                <div className="tb-field tb-field-full">
                  <label htmlFor="tb-interest">What brings you to 10Bench?</label>
                  <select id="tb-interest" name="interest" defaultValue="" required>
                    <option value="" disabled>Choose an area of interest</option>
                    <option>Workspace options</option>
                    <option>Meeting room</option>
                    <option>Team workspace</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="tb-field tb-field-full">
                  <label htmlFor="tb-message">A little more about it</label>
                  <textarea id="tb-message" name="message" required placeholder="Share what a good workspace would make possible for you." />
                </div>
              </div>
              <div className="tb-submit-row">
                <button className="tb-submit" type="submit">Preview enquiry <ArrowRight size={15} /></button>
                <p className="tb-submit-note">Demonstration only. Your details are not sent or stored.</p>
              </div>
              {notice && <p className="tb-feedback" role="status">{notice}</p>}
            </form>
          </div>
        </section>

        <section className="tb-explore" aria-label="Explore the 10Bench spaces">
          <div className="tb-explore-copy">
            <span className="tb-kicker">A feel for the place</span>
            <h2>Different corners for <em>different kinds of work.</em></h2>
            <p>
              From a welcoming first hello to a room for the whole team, the
              space is made to let your workday change pace.
            </p>
          </div>
          <div className="tb-spaces">
            <div className="tb-space-photo">
              <img src="/__mockup/images/workspace-lounge.jpeg" alt="The colorful shared lounge at 10Bench" />
              <span>Room to reset</span>
            </div>
            <div className="tb-space-photo">
              <img src="/__mockup/images/workspace-meeting.jpeg" alt="A meeting room at 10Bench with a long shared table" />
              <span>Space to meet</span>
            </div>
          </div>
        </section>
      </main>
    </CurrentShell>
  );
}
