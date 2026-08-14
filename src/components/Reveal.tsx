'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Seconds to hold before the entrance starts. */
  delay?: number;
  /** Distance in px the block rises from. */
  y?: number;
  className?: string;
}

/**
 * Scroll entrance for a landing-page block.
 *
 * Fires once, the first time the block reaches the viewport, then leaves the
 * element with `transform: none` so it never becomes a containing block for
 * anything fixed-position further down the tree.
 *
 * The easing is an ease-out quint — most of the travel happens in the first
 * third of the duration, which is what reads as "settling into place" rather
 * than "sliding in".
 */
export default function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  // Honour the OS reduced-motion setting: render in the final state, no motion.
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      // Server-rendered at opacity:0, so a no-JS client would see nothing here.
      // The `<noscript>` rule in the root layout keys off this attribute to
      // force the block visible in that case.
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
