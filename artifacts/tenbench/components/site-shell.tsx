'use client';

import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUp, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Magnetic, Reveal, ease, markIntroDone, useIntroDone } from './motion';
import { ContactProvider, useContact } from './contact-context';
import type { Contact } from './site-content';

export { Reveal } from './motion';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/offerings', label: 'Our Offering' },
  { href: '/gallery', label: 'Gallery Tour' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact Us' },
];

const INTRO_KEY = 'tenbench-intro-seen';

export function Intro() {
  const [phase, setPhase] = useState<'playing' | 'leaving' | 'gone'>('playing');
  const [count, setCount] = useState(0);
  const reduceMotion = useReducedMotion();

  const leave = () => {
    setPhase(current => current === 'gone' ? current : 'leaving');
    markIntroDone();
    try { sessionStorage.setItem(INTRO_KEY, '1'); } catch {}
  };

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(INTRO_KEY) === '1'; } catch {}
    if (seen || reduceMotion) { setPhase('gone'); markIntroDone(); return; }
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const progress = Math.min(1, (now - start) / 2100);
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
    });
    const leaveTimer = setTimeout(leave, 2500);
    return () => { cancelAnimationFrame(frame); clearTimeout(leaveTimer); };
  }, [reduceMotion]);

  useEffect(() => {
    if (phase !== 'leaving') return;
    const goneTimer = setTimeout(() => setPhase('gone'), 1300);
    return () => clearTimeout(goneTimer);
  }, [phase]);

  if (phase === 'gone') return null;
  return <div className={`intro ${phase === 'leaving' ? 'is-leaving' : ''}`} aria-hidden="true">
    <div className="intro-panel intro-panel-orange" />
    <div className="intro-panel intro-panel-navy">
      <div className="intro-content">
        <div className="intro-mark">
          <span className="intro-one">1</span>
          <span className="intro-ring">
            <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" pathLength="1" /></svg>
            <span className="intro-bench"><i /><b /></span>
          </span>
          <span className="intro-word">{'bench'.split('').map((letter, index) => <span key={index} style={{ animationDelay: `${0.55 + index * 0.06}s` }}>{letter}</span>)}</span>
        </div>
        <p className="intro-sub">Coworking spaces</p>
        <div className="intro-foot">
          <span>A little room to do your best work</span>
          <span className="intro-count">{String(count).padStart(3, '0')}</span>
        </div>
        <div className="intro-bar"><i style={{ transform: `scaleX(${count / 100})` }} /></div>
      </div>
      <button type="button" className="intro-skip" onClick={leave} tabIndex={-1}>Skip intro</button>
    </div>
  </div>;
}

export function Header() {
  const contact = useContact();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  useMotionValueEvent(scrollY, 'change', latest => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 260);
    setScrolled(latest > 20);
  });

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', menuOpen);
    return () => document.documentElement.classList.remove('is-locked');
  }, [menuOpen]);

  return <>
    <motion.header
      className={`topbar ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
      animate={{ y: hidden && !menuOpen ? '-105%' : '0%' }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="container topbar-inner">
        <Link href="/" className="brand" aria-label="10Bench home">
          <img src="/images/10bench-logo.jpeg" alt="10Bench Coworking Spaces" />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(item => <Link key={item.href} href={item.href} className={`nav-link ${active(item.href) ? 'active' : ''}`}>
            {active(item.href) && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="nav-label" data-text={item.label}>{item.label}</span>
          </Link>)}
        </nav>
        <div className="topbar-actions">
          <Magnetic><Link href="/contact" className="button header-cta">Book a visit <ArrowUpRight size={14} /></Link></Magnetic>
          <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <i /><i />
          </button>
        </div>
      </div>
    </motion.header>
    <AnimatePresence>
      {menuOpen && <motion.nav
        className="mobile-nav"
        aria-label="Mobile navigation"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        exit={{ clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="mobile-nav-links">
          {navItems.map((item, index) => <div key={item.href} className="split-mask">
            <motion.div initial={{ y: '110%' }} animate={{ y: '0%' }} exit={{ y: '110%' }} transition={{ duration: 0.7, ease, delay: 0.15 + index * 0.05 }}>
              <Link href={item.href} className={active(item.href) ? 'active' : ''} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}</Link>
            </motion.div>
          </div>)}
        </div>
        <motion.div className="mobile-nav-foot" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} exit={{ opacity: 0 }}>
          <div className="mobile-nav-actions">
            <Link href="/contact" className="button" onClick={() => setMenuOpen(false)}>Book a visit <ArrowRight size={15} /></Link>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="button button-ghost"><FaWhatsapp size={17} /> WhatsApp</a>
          </div>
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </motion.div>
      </motion.nav>}
    </AnimatePresence>
  </>;
}

export function Footer() {
  const contact = useContact();
  return <footer className="footer">
    <div className="footer-glow" aria-hidden="true" />
    <div className="container">
      <Reveal className="footer-cta">
        <div>
          <h2 className="display">Let’s find you <span className="editorial">a good seat.</span></h2>
          <p>Come by Sector 4, Vaishali for a look around, or send us a message on WhatsApp.</p>
        </div>
        <div className="footer-cta-actions">
          <Magnetic><Link href="/contact" className="button">Book a visit <ArrowUpRight size={15} /></Link></Magnetic>
          <Magnetic><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="button button-ghost"><FaWhatsapp size={16} /> WhatsApp</a></Magnetic>
        </div>
      </Reveal>
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="10Bench home"><span>10</span>bench</Link>
          <p>Coworking spaces in Vaishali, Ghaziabad. Desks, cabins and a meeting room for the way work happens now.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/about">About</Link><Link href="/offerings">Workspaces</Link><Link href="/gallery">Gallery</Link><Link href="/blogs">Journal</Link>
          </nav>
        </div>
        <div>
          <h3>Contact</h3>
          <ul className="footer-contact">
            <li><Phone size={14} aria-hidden="true" /><a href={contact.phoneHref}>{contact.phone}</a></li>
            <li><Mail size={14} aria-hidden="true" /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><MessageCircle size={14} aria-hidden="true" /><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h3>Visit</h3>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer-address"><MapPin size={14} aria-hidden="true" /><span>{contact.street},<br />{contact.locality}</span></a>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer-directions">Get directions <ArrowUpRight size={13} /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} 10Bench Coworking Spaces. All rights reserved.</span>
        <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">Back to top <ArrowUp size={13} /></button>
      </div>
    </div>
  </footer>;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.5 });

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (event: PointerEvent) => { x.set(event.clientX); y.set(event.clientY); setVisible(true); };
    const over = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.('[data-cursor], a, button, [role="button"], label, summary, input, textarea, select');
      setHovering(Boolean(target));
      setLabel(target?.getAttribute('data-cursor') ?? '');
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return <motion.div className={`cursor ${visible ? 'is-visible' : ''} ${hovering ? 'is-hover' : ''} ${label ? 'has-label' : ''}`} style={{ x: springX, y: springY }} aria-hidden="true">
    <span className="cursor-dot">{label}</span>
  </motion.div>;
}

function WhatsAppButton() {
  const contact = useContact();
  const ready = useIntroDone();
  return <motion.a
    className="wa-float"
    href={contact.whatsapp}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with 10Bench on WhatsApp"
    data-cursor="Chat"
    initial={{ scale: 0, opacity: 0 }}
    animate={ready ? { scale: 1, opacity: 1 } : undefined}
    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.2 }}
  >
    <FaWhatsapp size={28} aria-hidden="true" />
    <span className="wa-float-label">Chat with us</span>
  </motion.a>;
}

/** Phone-only bottom bar: the three actions a visitor on a phone most wants, always one tap away. */
function MobileActionBar() {
  const contact = useContact();
  return <nav className="mobile-bar" aria-label="Quick contact">
    <a href={contact.phoneHref}><Phone size={18} aria-hidden="true" />Call</a>
    <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><FaWhatsapp size={19} aria-hidden="true" />WhatsApp</a>
    <Link href="/contact" className="mobile-bar-cta">Book a visit <ArrowRight size={15} aria-hidden="true" /></Link>
  </nav>;
}

export function SiteShell({ children, contact }: { children: ReactNode; contact: Contact }) {
  const pathname = usePathname();
  return <ContactProvider value={contact}>
    {pathname.startsWith('/admin') ? children : <div className="site-shell">
      <Intro />
      <ScrollProgress />
      <Cursor />
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </div>}
  </ContactProvider>;
}

export function ContactForm() {
  const contact = useContact();
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [notice, setNotice] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState('sending');
    setNotice('');
    try {
      const response = await fetch('/api/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), page: window.location.pathname }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Sorry, your enquiry could not be sent.');
      form.reset();
      setState('sent');
      setNotice('Thank you! Your enquiry has reached the 10Bench team and they’ll be in touch.');
    } catch (error) {
      setState('error');
      setNotice(`${(error as Error).message} You can also call ${contact.phone} or email ${contact.email}.`);
    }
  }

  return <form className="contact-form" id="enquiry" onSubmit={submit}>
    <h2>Tell us what you’re looking for</h2>
    <div className="form-grid">
      <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required maxLength={120} placeholder="Name" /></div>
      <div className="field"><label htmlFor="phone">Phone <span className="field-optional">(optional)</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+91" /></div>
      <div className="field full"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={160} placeholder="you@example.com" /></div>
      <div className="field full"><label htmlFor="interest">What brings you to 10Bench?</label><select id="interest" name="interest" defaultValue=""><option value="" disabled>Choose an area of interest</option><option>Open desk</option><option>Private cabin for a team</option><option>Meeting room</option><option>Booking a visit</option><option>Something else</option></select></div>
      <div className="field full"><label htmlFor="message">A little more about it</label><textarea id="message" name="message" required maxLength={3000} placeholder="Team size, when you’d like to start, anything you need." /></div>
      {/* Honeypot: hidden from people, often filled in by spam bots. */}
      <div className="field-trap" aria-hidden="true"><label htmlFor="company">Company</label><input id="company" name="company" tabIndex={-1} autoComplete="off" /></div>
    </div>
    <Magnetic><button className="button form-submit" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send enquiry'} <ArrowRight size={16} /></button></Magnetic>
    <AnimatePresence>{notice && <motion.p key={state} className={`form-feedback is-${state}`} role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>{notice}</motion.p>}</AnimatePresence>
  </form>;
}
