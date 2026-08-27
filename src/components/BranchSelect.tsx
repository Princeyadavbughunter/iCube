'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, Star } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import { team } from '@/config/team';
import SmoothScroll from '@/components/motion/SmoothScroll';

interface BranchSelectProps {
  branches: BranchConfig[];
}

// Ease-out quint — most of the travel happens early, which reads as settling
// into place rather than sliding in. Same curve as the branch pages.
const EASE = [0.22, 1, 0.36, 1] as const;

const riseIn = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* ------------------------------------------------------------------ *
 * Atmosphere — mesh wash, glossy spheres, sparkles
 * ------------------------------------------------------------------ */

/**
 * The page's background.
 *
 * Four soft radial washes over a near-white base, in the brand's gold and
 * navy rather than the reference's pink and mint. Everything is
 * `pointer-events-none` and sits behind the content; nothing here is
 * interactive or announced.
 */
function Atmosphere({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(60% 45% at 12% 8%, rgba(220,190,141,0.38) 0%, transparent 70%),
            radial-gradient(55% 40% at 88% 12%, rgba(48,49,81,0.13) 0%, transparent 70%),
            radial-gradient(70% 50% at 50% 100%, rgba(220,190,141,0.22) 0%, transparent 70%),
            radial-gradient(45% 35% at 95% 70%, rgba(143,107,44,0.10) 0%, transparent 70%),
            #fbfbfa
          `,
        }}
      />

      {/* Glossy spheres. The highlight is an off-centre white radial, which is
          what stops them reading as flat circles. */}
      <Sphere className="left-[6%] top-[22%] h-14 w-14 md:h-20 md:w-20" tone="gold" delay={0} reduceMotion={reduceMotion} />
      <Sphere className="right-[9%] top-[36%] h-16 w-16 md:h-24 md:w-24" tone="navy" delay={1.4} reduceMotion={reduceMotion} />
      <Sphere className="left-[14%] bottom-[16%] h-10 w-10 md:h-14 md:w-14" tone="gold" delay={2.6} reduceMotion={reduceMotion} />

      {/* Sparkles */}
      {[
        'left-[46%] top-[9%]', 'right-[6%] top-[16%]', 'left-[8%] bottom-[34%]',
        'right-[12%] bottom-[22%]', 'left-[30%] bottom-[8%]', 'right-[34%] top-[6%]',
      ].map((pos, i) => (
        <span
          key={pos}
          className={`absolute ${pos} select-none text-[13px] md:text-base ${
            i % 2 ? 'text-[var(--brand-teal)]/25' : 'text-[var(--accent-gold-deep)]/40'
          }`}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

function Sphere({
  className,
  tone,
  delay,
  reduceMotion,
}: {
  className: string;
  tone: 'gold' | 'navy';
  delay: number;
  reduceMotion: boolean | null;
}) {
  const fill =
    tone === 'gold'
      ? 'radial-gradient(circle at 32% 28%, #ffffff 0%, #f0dcb9 18%, #dcbe8d 52%, #a9803f 100%)'
      : 'radial-gradient(circle at 32% 28%, #ffffff 0%, #9fa3c4 16%, #4a4c78 55%, #23243d 100%)';

  return (
    <motion.span
      className={`absolute rounded-full ${className}`}
      style={{ background: fill, boxShadow: '0 18px 40px -14px rgba(16,17,36,0.35)' }}
      animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function BranchPanel({
  branch,
  index,
  hovered,
  setHovered,
  reduceMotion,
}: {
  branch: BranchConfig;
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
  reduceMotion: boolean | null;
}) {
  const isHovered = hovered === index;
  const { card } = branch;
  const hasPhoto = Boolean(card.image);
  const lead = branch.doctors[0];

  return (
    <motion.div
      className="relative flex flex-1"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + index * 0.12 }}
      onHoverStart={() => setHovered(index)}
      onHoverEnd={() => setHovered(null)}
      onFocus={() => setHovered(index)}
      onBlur={() => setHovered(null)}
    >
      <Link
        href={`/${branch.slug}`}
        className="group relative flex w-full flex-col justify-end overflow-hidden rounded-[26px] shadow-[0_24px_60px_-24px_rgba(16,17,36,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2 min-h-[560px] sm:min-h-[620px] lg:min-h-[660px]"
        aria-label={`Open the I Cube Dental ${branch.name} clinic page`}
      >
        {/* Backdrop — the lead doctor's portrait, or the designed panel when
            no photograph has been supplied. Never a stock interior. */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered && !reduceMotion ? 1.05 : 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {hasPhoto ? (
            <Image
              src={card.image}
              alt={`${lead.name} — I Cube Dental ${branch.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              // object-top keeps face in frame for tall portraits (Ludhiana).
              // object-center works better for square headshots (Chandigarh).
              className={`object-cover ${index === 0 ? 'object-top' : 'object-center'}`}
              priority={index === 0}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(155deg, ${branch.accent} 0%, var(--brand-teal-ink) 100%)` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-4 select-none font-poppins text-[12rem] font-bold leading-none text-white/[0.07]"
              >
                {branch.name.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>

        {/* Legibility scrim. Two stops rather than three: the copy sits low, so
            the upper half stays bright and the portrait keeps its detail. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e1c] via-[#0d0e1c]/55 to-transparent" />
        <motion.div
          aria-hidden
          className="absolute inset-0 mix-blend-soft-light"
          style={{ background: `linear-gradient(160deg, ${branch.accent} 0%, transparent 65%)` }}
          animate={{ opacity: isHovered ? 0.9 : 0.55 }}
          transition={{ duration: 0.5, ease: EASE }}
        />

        {/* ---- Top rail: branch number + speciality badge ---- */}
        <div className="absolute inset-x-4 top-4 z-10 flex items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--brand-teal-deep)] shadow-sm backdrop-blur">
            <MapPin size={11} className="text-[var(--accent-pink)]" />
            Branch {index + 1}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sm"
            style={{ background: index === 0 ? 'var(--brand-teal)' : 'var(--accent-pink)' }}
          >
            <Sparkles size={11} />
            {card.badge}
          </span>
        </div>

        {/* ---- Stat pills, stacked down the right ---- */}
        <div className="absolute right-4 top-16 z-10 flex flex-col gap-2 sm:right-5 sm:top-20">
          {card.stats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-[68px] rounded-xl bg-white/95 px-3 py-2 text-center shadow-sm backdrop-blur"
            >
              <div className="font-poppins text-sm font-black leading-none text-[var(--brand-teal-deep)]">
                {stat.value}
              </div>
              <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ---- Bottom content ---- */}
        <div className="relative z-10 p-5 text-white sm:p-7">
          {/* Treatment chips */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {card.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90 ring-1 ring-white/25 backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <h2 className="font-poppins text-[2.6rem] font-bold leading-[0.95] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {branch.name}
          </h2>

          <p className="mt-2.5 text-[15px] text-white/80">
            Led by <strong className="font-bold text-white">{lead.name}</strong>
          </p>
          <p className="mt-1 text-[12.5px] italic leading-snug text-white/60">
            {branch.copy.leadDoctorCreds}
          </p>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10.5px] font-black uppercase tracking-[0.16em] text-white/85">
                {card.daysUpper}
              </div>
              <div className="mt-0.5 text-[12.5px] text-white/60">{branch.contact.timings}</div>
            </div>

            <span
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-lg transition-transform group-hover:scale-[1.03]"
              style={{ background: index === 0 ? 'var(--brand-teal)' : 'var(--accent-pink)' }}
            >
              Visit Clinic
              <motion.span
                animate={{ x: isHovered && !reduceMotion ? 4 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="inline-flex"
              >
                <ArrowRight size={14} strokeWidth={2.8} />
              </motion.span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Page furniture
 * ------------------------------------------------------------------ */

function TopBar({ branches }: { branches: BranchConfig[] }) {
  return (
    <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 pt-6 sm:px-6 lg:px-10">
      <Image
        src="/icube-logo.avif"
        alt="I Cube Dental"
        width={160}
        height={40}
        priority
        className="h-8 w-auto md:h-9"
      />
      <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-teal)] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white md:text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)]" />
        {branches.map((b) => b.name).join(' · ')}
      </span>
    </div>
  );
}

/**
 * The four headline figures.
 *
 * Every one of these is checkable against the config: two branches, the lead
 * doctor's published experience, the size of the specialist team, and the
 * implant starting price. Nothing invented — an unverifiable "15K+ smiles" on
 * a medical page is a liability, not a flourish.
 */
function StatsCard({ branches }: { branches: BranchConfig[] }) {
  const stats = [
    { value: String(branches.length), label: 'Branches' },
    { value: branches[0].copy.experience.replace(' years', ''), label: 'Years' },
    { value: String(team.length), label: 'MDS Specialists' },
    { value: '₹25K', label: 'Implants from' },
  ];

  return (
    <div className="mx-auto mt-9 w-fit rounded-2xl bg-white/85 px-2 py-4 shadow-[0_20px_50px_-24px_rgba(16,17,36,0.28)] ring-1 ring-white/70 backdrop-blur-md sm:px-4">
      <dl className="flex items-center">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 text-center sm:px-7 ${i > 0 ? 'border-l border-gray-200' : ''}`}
          >
            <dd className="font-poppins text-xl font-black leading-none text-[var(--brand-teal-deep)] sm:text-2xl">
              {s.value}
            </dd>
            <dt className="mt-1.5 text-[8.5px] font-bold uppercase tracking-[0.14em] text-gray-500 sm:text-[10px]">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Social proof at the foot of the page.
 *
 * The avatar stack is the four specialists' own initials, and the review count
 * is the number of real Google reviews carried on the branch pages — so both
 * halves of this are things we can actually show.
 */
function ProofPill({ branches }: { branches: BranchConfig[] }) {
  const reviewCount = branches.reduce((n, b) => n + b.reviews.length, 0);

  return (
    <div className="relative z-10 mt-14 flex justify-center px-4 md:mt-20">
      <div className="flex items-center gap-4 rounded-full bg-white/85 py-3 pl-3 pr-6 shadow-[0_20px_50px_-24px_rgba(16,17,36,0.28)] ring-1 ring-white/70 backdrop-blur-md">
        <div className="flex -space-x-2.5">
          {team.map((m, i) => (
            <span
              key={m.name}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white"
              style={{ background: i % 2 ? 'var(--accent-pink)' : 'var(--brand-teal)' }}
            >
              {m.initials}
            </span>
          ))}
        </div>
        <div>
          <div className="font-poppins text-[13.5px] font-bold leading-tight text-[var(--brand-teal-deep)]">
            Treated by {team.length} MDS specialists
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-gray-500">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className="fill-[var(--accent-gold-deep)] text-[var(--accent-gold-deep)]"
                />
              ))}
            </span>
            {reviewCount} Google reviews on these pages
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export default function BranchSelect({ branches }: BranchSelectProps) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden pb-16">
      <SmoothScroll />
      <Atmosphere reduceMotion={reduceMotion} />

      <TopBar branches={branches} />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl px-4 pt-12 text-center sm:px-6 md:pt-16"
      >
        <motion.span
          variants={riseIn}
          className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-1.5 text-[12px] font-semibold text-[var(--brand-teal-deep)] shadow-sm ring-1 ring-white/70 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Painless · Premium · Specialist-led
        </motion.span>

        <motion.h1
          variants={riseIn}
          className="mt-7 font-poppins text-[2.6rem] font-black leading-[1.02] tracking-tight text-[var(--brand-teal-deep)] sm:text-6xl lg:text-[4.6rem]"
        >
          Welcome to{' '}
          <span className="relative whitespace-nowrap">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(100deg, #c9a468 0%, #8f6b2c 45%, #303151 100%)',
              }}
            >
              I Cube Dental
            </span>
            {/* Swash under the name, gold running into navy. */}
            <svg
              aria-hidden
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              className="absolute -bottom-1 left-0 h-[10px] w-full md:-bottom-2 md:h-[14px]"
            >
              <defs>
                <linearGradient id="swash" x1="0" x2="1">
                  <stop offset="0%" stopColor="#c9a468" />
                  <stop offset="100%" stopColor="#303151" />
                </linearGradient>
              </defs>
              <path
                d="M2 8 C 70 2, 150 10, 298 4"
                fill="none"
                stroke="url(#swash)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          variants={riseIn}
          className="mx-auto mt-7 max-w-2xl text-[16px] leading-relaxed text-gray-600 md:text-lg"
        >
          Specialist-led implant dentistry with in-house CBCT and CAD/CAM, in Ludhiana and
          Chandigarh.{' '}
          <strong className="font-bold text-[var(--brand-teal)]">Choose your branch</strong> — we
          will take it from there.
        </motion.p>

        <motion.p
          variants={riseIn}
          lang="pa"
          className="mx-auto mt-2.5 max-w-2xl text-[15px] text-gray-500 md:text-base"
        >
          ਆਪਣਾ ਸ਼ਹਿਰ ਚੁਣੋ — ਬਾਕੀ ਅਸੀਂ ਸੰਭਾਲ ਲਵਾਂਗੇ।
        </motion.p>

        <motion.div variants={riseIn}>
          <StatsCard branches={branches} />
        </motion.div>
      </motion.div>

      {/* ---- Chooser ---- */}
      <div className="relative z-10 mx-auto mt-16 max-w-6xl px-4 sm:px-6 md:mt-24 lg:px-10">
        <div className="mb-7 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gray-300" />
          <span className="text-[10.5px] font-bold uppercase tracking-[0.25em] text-gray-400">
            Pick your branch
          </span>
          <span className="h-px w-8 bg-gray-300" />
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {branches.map((branch, i) => (
            <BranchPanel
              key={branch.slug}
              branch={branch}
              index={i}
              hovered={hovered}
              setHovered={setHovered}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>

      <ProofPill branches={branches} />

      <p className="relative z-10 mt-12 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400 md:text-[11px]">
        Punjab&apos;s specialist-led implant centres
      </p>
    </main>
  );
}
