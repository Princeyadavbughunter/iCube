import type { ReactNode } from 'react';
import { Parallax } from '@/components/motion/Motion';

/**
 * Shared furniture for the editorial layout.
 *
 * The look is set by restraint rather than decoration: a small uppercase
 * kicker, a tight left-aligned heading, generous whitespace, and one accent
 * colour used sparingly. Nothing here should reach for a gradient or a shadow
 * unless it is carrying real hierarchy.
 */

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-gold-deep)]">
      <span className="h-px w-6 bg-[var(--accent-gold)]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-poppins text-[2rem] font-bold leading-[1.15] tracking-tight text-[var(--brand-teal-deep)] sm:text-4xl lg:text-[2.75rem] ${className}`}
    >
      {children}
    </h2>
  );
}

/** Punjabi line that sits under a heading. Same promise, not decoration. */
export function PaLine({ children }: { children: ReactNode }) {
  return (
    <p lang="pa" className="mt-2.5 text-[17px] font-medium leading-snug text-[var(--brand-teal)] sm:text-lg">
      {children}
    </p>
  );
}

export function Lede({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-gray-500">{children}</p>;
}

/**
 * Image slot with an offset accent square behind it, as in the reference.
 * When no photograph has been supplied it renders a designed panel instead —
 * never a stock photo of another practice.
 */
export function MediaFrame({
  children,
  offset = 'br',
  className = '',
}: {
  children: ReactNode;
  /** Corner the accent square peeks out from. */
  offset?: 'br' | 'bl' | 'tr' | 'tl';
  className?: string;
}) {
  const pos = {
    br: '-bottom-5 -right-5',
    bl: '-bottom-5 -left-5',
    tr: '-top-5 -right-5',
    tl: '-top-5 -left-5',
  }[offset];

  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden
        className={`absolute ${pos} -z-10 h-28 w-28 rounded-2xl bg-[var(--accent-gold)] opacity-90 sm:h-36 sm:w-36`}
      />
      {/* The image drifts against the scroll inside a fixed frame, which is
          what gives the section depth without moving the layout. */}
      <Parallax amount={26} className="relative rounded-[20px] bg-gray-100 shadow-[0_18px_50px_-24px_rgba(16,17,36,0.35)]">
        {children}
      </Parallax>
    </div>
  );
}

/**
 * Stand-in for a photograph the clinic has not supplied yet.
 *
 * Deliberately designed rather than a grey box: the page still has to look
 * finished while we wait, and the label tells whoever is reviewing it exactly
 * what is missing.
 */
export function PhotoPending({ label, ratio = 'aspect-[4/3]' }: { label: string; ratio?: string }) {
  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden`}
      style={{ background: 'linear-gradient(150deg, var(--brand-teal) 0%, var(--brand-teal-ink) 100%)' }}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <span className="font-poppins text-4xl font-bold text-[var(--accent-gold)] opacity-70">iC</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">{label}</span>
      </div>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand-teal)] px-7 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[var(--brand-teal-dark)] active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  href,
  className = '',
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--brand-teal)]/25 bg-white px-7 py-3.5 text-[14px] font-bold text-[var(--brand-teal-deep)] transition-colors hover:border-[var(--brand-teal)] hover:bg-[var(--accent-pink-soft)] ${className}`}
    >
      {children}
    </a>
  );
}
