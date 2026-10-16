'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ease } from '../components/motion';

// The first page load is covered by the intro, so only client-side navigations animate in.
let firstLoad = true;

export default function Template({ children }: { children: ReactNode }) {
  const animateIn = !firstLoad;
  useEffect(() => { firstLoad = false; }, []);
  return <>
    {animateIn && <motion.div className="page-wipe" aria-hidden="true" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }} />}
    <motion.div initial={animateIn ? { opacity: 0, y: 40 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: animateIn ? 0.25 : 0 }}>
      {children}
    </motion.div>
  </>;
}
