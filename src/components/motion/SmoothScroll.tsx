'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Inertial smooth scrolling — the "Framer site" feel.
 *
 * Lenis intercepts wheel and key input and eases the scroll position, so
 * momentum carries and stops settle instead of snapping. Three deliberate
 * choices:
 *
 * - Touch is left alone (`smoothWheel` only). Native momentum on iOS and
 *   Android is already good, and overriding it makes a phone feel laggy.
 * - The whole thing is skipped under prefers-reduced-motion. Hijacking the
 *   scroll is exactly what that setting exists to prevent.
 * - In-page anchors are handled here, because once Lenis owns the scroll
 *   position the browser's native `#hash` jump fights it.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      // ~1.05s to settle: long enough to read as weight, short enough that a
      // deliberate scroll still feels responsive.
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native touch scrolling is untouched — see note above.
      syncTouch: false,
      wheelMultiplier: 1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor clicks must go through Lenis or they fight over scrollTop.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      // Offset clears the fixed header.
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
