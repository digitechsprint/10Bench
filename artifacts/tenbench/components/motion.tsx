'use client';

import { cloneElement, isValidElement, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';

export const ease = [0.22, 1, 0.36, 1] as const;

/* Intro gate: entrance animations wait until the intro curtain starts lifting. */
let introDone = false;
const introListeners = new Set<() => void>();
export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  introListeners.forEach(listener => listener());
}
export function useIntroDone() {
  return useSyncExternalStore(
    listener => { introListeners.add(listener); return () => { introListeners.delete(listener); }; },
    () => introDone,
    () => false,
  );
}

function useEntrance<T extends Element>(amount = 0.18) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  const ready = useIntroDone();
  const reduce = useReducedMotion();
  return { ref, reduce, show: Boolean(reduce) || (inView && ready) };
}

export function Reveal({ children, className = '', delay = 0, y = 36 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const { ref, reduce, show } = useEntrance<HTMLDivElement>(0.12);
  return <motion.div
    ref={ref}
    className={className}
    initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
    animate={show ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
    transition={{ duration: 1, ease, delay }}
  >{children}</motion.div>;
}

type SplitContext = { show: boolean; reduce: boolean | null; delay: number; stagger: number; count: number };

// Each word animates itself with an index-based delay, so nesting depth doesn't matter.
function splitWords(node: ReactNode, key: string, ctx: SplitContext): ReactNode {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node).split(/(\s+)/).map((part, index) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return part;
      const order = ctx.count++;
      return <span className="split-mask" key={`${key}-${index}`}><motion.span
        className="split-word"
        initial={ctx.reduce ? false : { y: '115%', rotate: 5 }}
        animate={ctx.show ? { y: '0%', rotate: 0 } : undefined}
        transition={{ duration: 1.05, ease, delay: ctx.delay + order * ctx.stagger }}
      >{part}</motion.span></span>;
    });
  }
  if (Array.isArray(node)) return node.map((child, index) => splitWords(child, `${key}-${index}`, ctx));
  // In development, server-component JSX reaches client components as resolved lazy wrappers.
  const lazy = node as { $$typeof?: symbol; _init?: (payload: unknown) => ReactNode; _payload?: unknown } | null;
  if (lazy && typeof lazy === 'object' && lazy.$$typeof === Symbol.for('react.lazy') && lazy._init) {
    try { return splitWords(lazy._init(lazy._payload), key, ctx); } catch { return node; }
  }
  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    if (element.type === 'br') return cloneElement(element, { key });
    return cloneElement(element, { key }, splitWords(element.props.children, key, ctx));
  }
  return node;
}

type SplitTag = 'h1' | 'h2' | 'p';
export function SplitText({ as = 'h2', className = '', children, delay = 0, stagger = 0.055 }: { as?: SplitTag; className?: string; children: ReactNode; delay?: number; stagger?: number }) {
  const { ref, reduce, show } = useEntrance<HTMLHeadingElement>(0.3);
  const Tag = motion[as] as typeof motion.h2;
  return <Tag ref={ref} className={className}>{splitWords(children, 'w', { show, reduce, delay, stagger, count: 0 })}</Tag>;
}

export function ImageReveal({ src, alt, className = '', children, delay = 0, parallax = true, cursor = 'View', as = 'div' }: {
  src: string; alt: string; className?: string; children?: ReactNode; delay?: number; parallax?: boolean; cursor?: string; as?: 'div' | 'figure';
}) {
  const { ref, reduce, show } = useEntrance<HTMLDivElement>(0.15);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const Frame = as === 'figure' ? motion.figure : motion.div;
  // The observed frame stays unclipped (IntersectionObserver ignores fully clipped targets); the clip lives on an inner layer.
  return <Frame ref={ref} className={`image-frame img-reveal ${className}`} data-cursor={cursor || undefined}>
    <motion.div
      className="img-clip"
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={show ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
      transition={{ duration: 1.35, ease, delay }}
    >
    <motion.div className="img-parallax" style={parallax && !reduce ? { y } : undefined}>
      <div className="img-zoom">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          initial={reduce ? false : { scale: 1.3 }}
          animate={show ? { scale: 1 } : undefined}
          transition={{ duration: 1.8, ease, delay }}
        />
      </div>
    </motion.div>
    </motion.div>
    {children}
  </Frame>;
}

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  return <motion.span
    ref={ref}
    className="magnetic"
    style={{ x, y }}
    onPointerMove={event => {
      if (event.pointerType !== 'mouse' || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((event.clientX - rect.left - rect.width / 2) * strength);
      y.set((event.clientY - rect.top - rect.height / 2) * strength);
    }}
    onPointerLeave={() => { x.set(0); y.set(0); }}
  >{children}</motion.span>;
}

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export function Marquee({ items, speed = 3 }: { items: string[]; speed?: number }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(-1);
  const x = useTransform(baseX, value => `${wrap(-25, -50, value)}%`);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = 1; else if (factor > 0) direction.current = -1;
    let moveBy = direction.current * speed * (delta / 1000);
    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });
  const row = items.map((item, index) => <span key={item} className={`marquee-item ${index % 2 ? 'is-outline' : ''}`}>{item}<i aria-hidden="true">✦</i></span>);
  return <div className="marquee" aria-label={items.join(', ')}>
    <motion.div className="marquee-track" style={{ x }} aria-hidden="true">{row}{row}{row}{row}</motion.div>
  </div>;
}

function ScrollWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const accent = children.startsWith('*') && children.endsWith('*');
  return <><motion.span className={accent ? 'editorial' : undefined} style={{ opacity }}>{accent ? children.slice(1, -1) : children}</motion.span>{' '}</>;
}

/** Text that lights up word by word as it scrolls through the viewport. Wrap a word in *asterisks* for the editorial accent. */
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 50%'] });
  const words = text.split(' ');
  return <p ref={ref} className={`scroll-words ${className}`}>
    {words.map((word, index) => <ScrollWord key={index} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>{word}</ScrollWord>)}
  </p>;
}

export function RotatingBadge({ text, className = '' }: { text: string; className?: string }) {
  return <div className={`rotating-badge ${className}`} aria-hidden="true">
    <svg viewBox="0 0 200 200">
      <defs><path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
      <text><textPath href="#badge-circle" textLength="480" lengthAdjust="spacingAndGlyphs">{text}</textPath></text>
    </svg>
    <span className="rotating-badge-core"><ArrowUpRight size={26} strokeWidth={1.6} /></span>
  </div>;
}

export type GalleryItem = { src: string; alt: string; title: string; label: string; text?: string };

export function HorizontalGallery({ intro, items }: { intro: ReactNode; items: GalleryItem[] }) {
  const target = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px)');
    const measure = () => {
      const on = query.matches && !reduce;
      setEnabled(on);
      setDistance(on && track.current ? Math.max(0, track.current.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [reduce]);
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.3 });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <section ref={target} className={`hgallery ${enabled ? 'is-pinned' : ''}`} style={enabled ? { height: `calc(100vh + ${distance}px)` } : undefined}>
    <div className="hgallery-sticky">
      <motion.div ref={track} className="hgallery-track" style={enabled ? { x } : undefined}>
        <div className="hgallery-intro">{intro}</div>
        {items.map((item, index) => <figure key={item.title} className="hgallery-card" data-cursor="Explore">
          <div className="hgallery-photo"><img src={item.src} alt={item.alt} loading="lazy" /></div>
          <figcaption><span className="hgallery-index">0{index + 1}</span><div><span className="hgallery-label">{item.label}</span><strong>{item.title}</strong></div></figcaption>
        </figure>)}
        <Link href="/gallery" className="hgallery-end" data-cursor="Tour">
          <span>Continue the<br />gallery tour</span><ArrowRight size={28} strokeWidth={1.4} />
        </Link>
      </motion.div>
      {enabled && <div className="hgallery-progress" aria-hidden="true"><motion.i style={{ scaleX: progress }} /></div>}
    </div>
  </section>;
}

/** Feeds the pointer position into each `.spot` child as --mx/--my, for a glow that follows the cursor. */
export function Spotlight({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={className} onPointerMove={event => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('.spot');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }}>{children}</div>;
}

/** Gallery tiles that open a full-screen lightbox with keyboard navigation. */
export function LightboxGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null);
      if (event.key === 'ArrowRight') setOpen(index => index === null ? null : (index + 1) % items.length);
      if (event.key === 'ArrowLeft') setOpen(index => index === null ? null : (index - 1 + items.length) % items.length);
    };
    document.documentElement.classList.add('is-locked');
    window.addEventListener('keydown', onKey);
    return () => { document.documentElement.classList.remove('is-locked'); window.removeEventListener('keydown', onKey); };
  }, [open, items.length]);
  const current = open === null ? null : items[open];
  return <>
    <div className="tour-grid">
      {items.map((item, index) => <div
        key={item.title}
        role="button"
        tabIndex={0}
        className="tour-tile-button"
        onClick={() => setOpen(index)}
        onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpen(index); } }}
        aria-label={`Open ${item.title}`}
      >
        <ImageReveal as="figure" className="tour-tile" src={item.src} alt={item.alt} cursor="Open" delay={index * 0.1}>
          <figcaption><span>{item.label}</span>{item.title}{item.text && <em> — {item.text}</em>}</figcaption>
        </ImageReveal>
      </div>)}
    </div>
    <AnimatePresence>
      {current && open !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={current.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} onClick={() => setOpen(null)}>
        <motion.figure key={current.src} initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease }} onClick={event => event.stopPropagation()}>
          <img src={current.src} alt={current.alt} />
          <figcaption><span>{String(open + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>{current.title}</figcaption>
        </motion.figure>
        <button type="button" className="lightbox-close" onClick={() => setOpen(null)} aria-label="Close"><X size={22} /></button>
        <button type="button" className="lightbox-nav prev" onClick={event => { event.stopPropagation(); setOpen((open - 1 + items.length) % items.length); }} aria-label="Previous image"><ArrowLeft size={20} /></button>
        <button type="button" className="lightbox-nav next" onClick={event => { event.stopPropagation(); setOpen((open + 1) % items.length); }} aria-label="Next image"><ArrowRight size={20} /></button>
      </motion.div>}
    </AnimatePresence>
  </>;
}
