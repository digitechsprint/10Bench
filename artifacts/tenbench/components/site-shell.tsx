'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/offerings', label: 'Our Offering' },
  { href: '/gallery', label: 'Gallery Tour' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact Us' },
];

export function Intro() {
  const [open, setOpen] = useState(true);
  const reduceMotion = useReducedMotion();
  const enter = () => setOpen(false);
  return (
    <div className={`intro ${open ? '' : 'is-leaving'}`} aria-hidden={!open}>
      <input
        id="intro-enter-toggle"
        className="intro-dismiss"
        type="checkbox"
        aria-hidden="true"
        tabIndex={-1}
        onChange={enter}
      />
      <motion.div
        className="intro-content"
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease: 'easeOut' }}
      >
        <img className="intro-logo" src="/images/10bench-logo.jpeg" alt="10Bench Coworking Spaces" />
        <div className="intro-rule" />
        <p>A little room to do your best work.</p>
        <label
          className="enter-button"
          htmlFor="intro-enter-toggle"
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              event.currentTarget.click();
            }
          }}
        >
          Enter 10Bench <ArrowRight size={15} aria-hidden="true" />
        </label>
        <label className="intro-skip" htmlFor="intro-enter-toggle">Skip intro</label>
      </motion.div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand" aria-label="10Bench home" onClick={() => setMenuOpen(false)}>
          <img src="/images/10bench-logo.jpeg" alt="10Bench Coworking Spaces" />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(item => <Link key={item.href} href={item.href} className={`nav-link ${active(item.href) ? 'active' : ''}`}>{item.label}</Link>)}
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>
          {navItems.map(item => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return <footer className="footer">
    <div className="container">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="10Bench home"><img src="/images/10bench-logo.jpeg" alt="10Bench Coworking Spaces" /></Link>
          <p>Space to focus. Room to meet. A welcoming place for the work you want to do.</p>
        </div>
        <div><h3>Explore</h3><nav className="footer-links" aria-label="Footer explore navigation">
          <Link href="/about">About 10Bench</Link><Link href="/offerings">Our offering</Link><Link href="/gallery">Gallery tour</Link><Link href="/blogs">Journal</Link>
        </nav></div>
        <div><h3>Start a conversation</h3><nav className="footer-links" aria-label="Footer contact navigation">
          <Link href="/contact">Contact us</Link><Link href="/contact#enquiry">Ask about the space</Link><Link href="/blogs">Ideas for better work</Link>
        </nav></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} 10Bench Coworking Spaces</span><span>Made for the way work happens now.</span></div>
    </div>
  </footer>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  return <div className="site-shell"><Intro /><Header />{children}<Footer /></div>;
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduceMotion ? 0 : .55, ease: [.22, .7, .2, 1] }}>{children}</motion.div>;
}

export function ContactForm() {
  const [notice, setNotice] = useState('');
  return <form className="contact-form" id="enquiry" onSubmit={event => { event.preventDefault(); setNotice('This is a website preview: your message has not been sent or stored. Please get in touch through a verified 10Bench contact channel.'); }}>
    <h2>Tell us what you’re looking for</h2>
    <div className="form-grid">
      <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required placeholder="Name" /></div>
      <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></div>
      <div className="field full"><label htmlFor="interest">What brings you to 10Bench?</label><select id="interest" name="interest" defaultValue=""><option value="" disabled>Choose an area of interest</option><option>Workspace options</option><option>Meeting room</option><option>Team workspace</option><option>Something else</option></select></div>
      <div className="field full"><label htmlFor="message">A little more about it</label><textarea id="message" name="message" required placeholder="Share what a good workspace would make possible for you." /></div>
    </div>
    <button className="button form-submit" type="submit">Prepare enquiry <ArrowRight size={16} /></button>
    {notice && <p className="form-feedback" role="status">{notice}</p>}
  </form>;
}
