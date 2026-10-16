import React from "react";

const nav = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Our Offering", "#offerings"],
  ["Gallery Tour", "#gallery"],
  ["Blogs", "#journal"],
  ["Contact Us", "#contact"],
];

export function CurrentShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="preview-page">
      <header className="preview-header">
        <div className="preview-container preview-header-inner">
          <a className="preview-logo" href="#home" aria-label="10Bench home">
            <img src="/__mockup/images/10bench-logo.jpeg" alt="10Bench Coworking Spaces" />
          </a>
          <nav className="preview-nav" aria-label="Main navigation">
            {nav.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </nav>
          <a className="preview-button" href="#contact">Start a conversation</a>
        </div>
      </header>
      {children}
      <footer className="preview-footer">
        <div className="preview-container">
          <div className="preview-footer-row">
            <img src="/__mockup/images/10bench-logo.jpeg" alt="10Bench" />
            <p>Space to focus. Room to meet. A welcoming place for the work you want to do.</p>
            <small>© 10Bench Coworking Spaces</small>
          </div>
        </div>
      </footer>
    </div>
  );
}
