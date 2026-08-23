'use client';

import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/**
 * The page's motion vocabulary.
 *
 * One easing curve throughout — ease-out quint, where most of the travel
 * happens early — so every entrance reads as settling into place rather than
 * sliding in. A slight blur on the way in is what separates this from a plain
 * fade: it reads as the element resolving into focus.
 *
 * Everything here degrades to a static render under prefers-reduced-motion.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise + de-blur, fired once when the block reaches the viewport. */
export function Rise({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent that walks its children in one after another.
 * Pair with <StaggerItem> for each child.
 */
export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: 0.05 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22, filter: 'blur(5px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Media that drifts against the scroll.
 *
 * The child is scaled up slightly so the drift never exposes an edge, and the
 * offset is spring-damped so it trails the scroll instead of tracking it
 * exactly — which is what makes it read as depth rather than as jitter.
 */
export function Parallax({
  children,
  amount = 40,
  className,
}: {
  children: ReactNode;
  /** Total px of travel across the element's pass through the viewport. */
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, restDelta: 0.001 });

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.div style={{ y }} className="h-[112%] w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/** Thin progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[var(--brand-teal)] via-[var(--accent-gold-deep)] to-[var(--accent-gold)]"
    />
  );
}
