'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUp, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Magnetic, Reveal, ease, markIntroDone, useIntroDone } from './motion';
import { contact } from './site-content';

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
          <a href="mailto:spaces@10bench.in">spaces@10bench.in</a>
          <a href="tel:+919773987782">+91 97739 87782</a>
        </motion.div>
      </motion.nav>}
    </AnimatePresence>
  </>;
}

export function Footer() {
  return <footer className="footer">
    <div className="container">
      <div className="footer-cta">
        <Reveal><span className="eyebrow">Have a workday in mind?</span><h2 className="display">Let’s find you <span className="editorial">a good seat.</span></h2></Reveal>
        <Reveal delay={0.1} className="footer-cta-action"><Magnetic strength={0.4}><Link href="/contact" className="footer-orb" data-cursor="Say hi">Start a<br />conversation<ArrowUpRight size={22} /></Link></Magnetic></Reveal>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <p>Space to focus. Room to meet. A welcoming place for the work you want to do.</p>
          <ul className="footer-contact">
            <li><Mail size={15} aria-hidden="true" /><a href="mailto:spaces@10bench.in">spaces@10bench.in</a></li>
            <li><Phone size={15} aria-hidden="true" /><a href="tel:+919773987782">+91 97739 87782</a></li>
            <li><MessageCircle size={15} aria-hidden="true" /><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>
            <li><MapPin size={15} aria-hidden="true" /><a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">{contact.address}</a></li>
          </ul>
        </div>
        <div><h3>Explore</h3><nav className="footer-links" aria-label="Footer explore navigation">
          <Link href="/about">About 10Bench</Link><Link href="/offerings">Our offering</Link><Link href="/gallery">Gallery tour</Link><Link href="/blogs">Journal</Link>
        </nav></div>
        <div><h3>Start a conversation</h3><nav className="footer-links" aria-label="Footer contact navigation">
          <Link href="/contact">Contact us</Link><Link href="/contact#enquiry">Ask about the space</Link><Link href="/blogs">Ideas for better work</Link>
        </nav></div>
      </div>
      <motion.div
        className="footer-wordmark"
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {'10bench'.split('').map((letter, index) => <motion.span
          key={index}
          variants={{ hidden: { y: '100%' }, show: { y: '0%', transition: { duration: 1.1, ease } } }}
          className={index < 2 ? 'is-accent' : ''}
        >{letter}</motion.span>)}
      </motion.div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} 10Bench Coworking Spaces</span>
        <span>Made for the way work happens now.</span>
        <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <ArrowUp size={14} /></button>
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

export function SiteShell({ children }: { children: ReactNode }) {
  return <div className="site-shell">
    <Intro />
    <ScrollProgress />
    <Cursor />
    <Header />
    {children}
    <Footer />
    <WhatsAppButton />
  </div>;
}

export function ContactForm() {
  const [notice, setNotice] = useState('');
  return <form className="contact-form" id="enquiry" onSubmit={event => { event.preventDefault(); setNotice('This is a website preview: your message has not been sent or stored. Please email spaces@10bench.in or call +91 97739 87782.'); }}>
    <h2>Tell us what you’re looking for</h2>
    <div className="form-grid">
      <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required placeholder="Name" /></div>
      <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></div>
      <div className="field full"><label htmlFor="interest">What brings you to 10Bench?</label><select id="interest" name="interest" defaultValue=""><option value="" disabled>Choose an area of interest</option><option>Open desk</option><option>Dedicated desk</option><option>Private cabin for a team</option><option>Meeting room</option><option>Booking a visit</option><option>Something else</option></select></div>
      <div className="field full"><label htmlFor="message">A little more about it</label><textarea id="message" name="message" required placeholder="Share what a good workspace would make possible for you." /></div>
    </div>
    <Magnetic><button className="button form-submit" type="submit">Prepare enquiry <ArrowRight size={16} /></button></Magnetic>
    <AnimatePresence>{notice && <motion.p className="form-feedback" role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>{notice}</motion.p>}</AnimatePresence>
  </form>;
}
