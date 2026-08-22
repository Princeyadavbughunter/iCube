'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, Clock, MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';

interface BranchSelectProps {
  branches: BranchConfig[];
}

/* ------------------------------------------------------------------ *
 * Shared motion presets
 * ------------------------------------------------------------------ */

// Ease-out quint — most of the travel happens early, which reads as
// "settling into place" rather than "sliding in". Matches <Reveal />.
const EASE = [0.22, 1, 0.36, 1] as const;

const riseIn = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* ------------------------------------------------------------------ *
 * Top scroll-progress bar
 * ------------------------------------------------------------------ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Spring the raw progress so the bar glides instead of snapping per frame.
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
    >
      <div className="h-full w-full bg-gradient-to-r from-[var(--brand-teal)] via-[var(--accent-gold-deep)] to-[var(--accent-pink)]" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Hero — the split branch chooser
 * ------------------------------------------------------------------ */

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
              // object-top keeps the face in frame as the card gets taller.
              className="object-cover object-top"
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
 * Hero — the two-card branch chooser
 * ------------------------------------------------------------------ */

function Hero({ branches, reduceMotion }: { branches: BranchConfig[]; reduceMotion: boolean | null }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 md:pb-24 md:pt-28 lg:px-10">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 top-32 h-[460px] w-[460px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)' }}
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-5xl text-center"
      >
        <motion.span
          variants={riseIn}
          className="badge-pink inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] md:text-[11px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
          Ludhiana &middot; Chandigarh
        </motion.span>

        <motion.h1
          variants={riseIn}
          className="mt-6 font-poppins text-[2.4rem] font-bold leading-[1.06] tracking-tight text-gray-900 sm:text-5xl lg:text-[4.25rem]"
        >
          Two clinics.
          <br className="hidden sm:block" />{' '}
          <span className="text-gradient-teal">One standard of care.</span>
        </motion.h1>

        {/* Punjabi runs directly under the English headline — same promise,
            not a decorative flourish. */}
        <motion.p
          variants={riseIn}
          className="mx-auto mt-3 max-w-2xl text-lg font-medium text-[var(--brand-teal)] md:text-xl"
          lang="pa"
        >
          ਦੋ ਕਲੀਨਿਕ। ਇੱਕੋ ਪੱਧਰ ਦਾ ਇਲਾਜ।
        </motion.p>

        <motion.p
          variants={riseIn}
          className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-600 md:text-lg"
        >
          I Cube Dental runs specialist-led implant centres in{' '}
          <strong className="font-semibold text-gray-800">Ludhiana</strong> and{' '}
          <strong className="font-semibold text-gray-800">Chandigarh</strong> — each with in-house
          CBCT, digital scanners and a dedicated implant operatory. Pick your city to see that
          clinic&apos;s doctors, timings and pricing.
        </motion.p>

        <motion.p
          variants={riseIn}
          className="mt-5 text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400"
        >
          Choose your city ↓ <span lang="pa" className="normal-case tracking-normal">ਆਪਣਾ ਸ਼ਹਿਰ ਚੁਣੋ</span>
        </motion.p>
      </motion.div>

      <div className="relative mx-auto mt-10 grid max-w-6xl gap-5 md:mt-14 lg:grid-cols-2 lg:gap-6">
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
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Stats band — figures drift horizontally as the section scrolls past
 * ------------------------------------------------------------------ */

const STATS = [
  { value: '2', label: 'Specialist centres' },
  { value: '13+', label: 'Years of experience' },
  { value: '100%', label: 'In-house CBCT planning' },
  { value: '₹25k', label: 'Implants starting from' },
];

function StatsBand({ reduceMotion }: { reduceMotion: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const drift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [40, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-14 md:py-20"
      style={{ background: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-darker) 60%, var(--brand-teal-ink) 100%)' }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/3 h-[380px] w-[380px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)' }}
      />
      <motion.div style={{ x: drift }} className="relative mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-y-10 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={riseIn} className="px-2 text-center">
              <p className="font-poppins text-4xl font-bold tracking-tight text-[var(--accent-gold)] md:text-5xl">
                {stat.value}
              </p>
              <p className="mx-auto mt-2 max-w-[9rem] text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-white/55">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Shared-standard section — what both branches guarantee
 * ------------------------------------------------------------------ */

const SHARED = [
  {
    icon: '🩻',
    title: 'In-house CBCT',
    body: 'Your 3D scan, diagnosis and implant plan happen in the same visit — never sent out to a third-party imaging centre.',
  },
  {
    icon: '🦷',
    title: 'Dedicated implant suite',
    body: 'Implant surgery runs in its own operatory, set up for a controlled sterile field — not in a shared dental chair.',
  },
  {
    icon: '🎓',
    title: 'MDS specialist team',
    body: 'Your root canal is done by an endodontist and your crown by a prosthodontist. No generalist doing a bit of everything.',
  },
  {
    icon: '💠',
    title: 'Digital scanners & CAD/CAM',
    body: 'No putty impressions. Crowns are designed from a digital scan and milled to that exact fit — at Chandigarh, often in a single day.',
  },
  {
    icon: '📋',
    title: 'Transparent pricing',
    body: 'Implants from ₹25,000 with an itemised quote agreed before treatment begins. Part-payment options available.',
  },
  {
    icon: '🤝',
    title: 'Post-treatment support',
    body: 'Scheduled follow-ups and aftercare at both centres, so the work is reviewed long after the final fitting.',
  },
];

function SharedStandard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={riseIn}
            className="badge-pink inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
            Same protocol, both cities
          </motion.span>
          <motion.h2
            variants={riseIn}
            className="mt-5 font-poppins text-3xl font-bold tracking-tight text-gray-900 md:text-5xl"
          >
            Whichever branch you walk into,{' '}
            <span className="text-gradient-logo">nothing gets outsourced.</span>
          </motion.h2>
          <motion.div
            style={{ scaleX: lineScale }}
            className="mx-auto mt-6 h-0.5 w-24 origin-center rounded-full bg-gradient-to-r from-[var(--accent-pink)] to-[var(--brand-teal)]"
          />
          <motion.p variants={riseIn} className="mt-6 text-sm leading-relaxed text-gray-600 md:text-base">
            Both centres are built on the same idea — a complete treatment ecosystem rather than a
            dentist who also places implants. Scan, plan, surgery, crown and follow-up all stay
            inside the same building, under the same specialists.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SHARED.map((item) => (
            <motion.div
              key={item.title}
              variants={riseIn}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="depth-stack group rounded-[24px] border border-white/60 bg-white/85 p-6 backdrop-blur-sm"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-pink-soft)] to-[var(--brand-teal)]/10 text-2xl transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </span>
              <h3 className="mt-4 font-poppins text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Branch detail cards — the full comparison, with maps
 * ------------------------------------------------------------------ */

function BranchDetailCard({
  branch,
  index,
  progress,
  reduceMotion,
}: {
  branch: BranchConfig;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  // Opposing vertical drift gives the pair a subtle counter-scroll parallax.
  const range = reduceMotion ? [0, 0] : index === 0 ? [26, -26] : [-26, 26];
  const y = useTransform(progress, [0, 1], range);

  return (
    <motion.article
      variants={riseIn}
      style={{ y }}
      className="depth-stack relative flex flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white"
    >
      <span aria-hidden className="h-1.5 w-full" style={{ background: branch.accent }} />

      <div className="flex flex-1 flex-col p-7 md:p-9">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-400">
              I Cube Dental
            </p>
            <h3 className="mt-1 font-poppins text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {branch.name}
            </h3>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white"
            style={{ background: branch.accent }}
          >
            {branch.copy.experience}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[var(--bg-surface-soft)] p-3.5 ring-1 ring-gray-100">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-poppins text-sm font-bold text-white"
            style={{ background: branch.accent }}
          >
            {branch.doctors[0].initials}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold text-gray-900">{branch.doctors[0].name}</p>
            <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-pink)]">
              {branch.copy.leadDoctorCreds}
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-2.5">
          {branch.usps.slice(0, 4).map((usp) => (
            <li key={usp} className="flex items-start gap-2.5 text-sm text-gray-700">
              <span
                className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                style={{ background: branch.accent, height: '1.125rem', width: '1.125rem' }}
              >
                ✓
              </span>
              {usp}
            </li>
          ))}
        </ul>

        <dl className="mt-6 space-y-3 border-t border-gray-100 pt-6 text-sm">
          <div className="flex items-start gap-3">
            <MapPin size={15} className="mt-0.5 shrink-0 text-gray-400" />
            <dd className="text-gray-600">
              {branch.contact.address.split(' | ').map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </dd>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={15} className="shrink-0 text-gray-400" />
            <dd className="text-gray-600">
              {branch.contact.timings}{' '}
              <span className="text-gray-400">· {branch.contact.daysLine}</span>
            </dd>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={15} className="shrink-0 text-gray-400" />
            <dd className="flex flex-wrap gap-x-3 gap-y-1">
              {branch.contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="font-bold text-gray-800 transition-colors hover:text-[var(--accent-pink)]"
                >
                  {phone}
                </a>
              ))}
            </dd>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={15} className="shrink-0 text-gray-400" />
            <dd>
              <a
                href={`mailto:${branch.contact.email}`}
                className="break-all italic text-gray-600 transition-colors hover:text-[var(--accent-pink)]"
              >
                {branch.contact.email}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-6 h-[170px] overflow-hidden rounded-2xl border-4 border-white ring-1 ring-gray-100">
          <iframe
            src={branch.contact.googleMapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`I Cube Dental ${branch.name} — map`}
            className="grayscale transition-all duration-700 hover:grayscale-0"
          />
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
          <Link
            href={`/${branch.slug}`}
            className="btn-3d gradient-sheen inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5"
            style={{ background: branch.accent }}
          >
            Open {branch.name} Site
            <ArrowRight size={14} strokeWidth={2.6} />
          </Link>
          <a
            href={`tel:${branch.contact.phones[0].replace(/\s/g, '')}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.16em] text-gray-700 transition-colors hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)]"
          >
            <Phone size={14} strokeWidth={2.6} />
            Call Clinic
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function BranchDetails({
  branches,
  reduceMotion,
}: {
  branches: BranchConfig[];
  reduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section id="branches" className="relative bg-[var(--bg-medical-light)] px-4 py-20 md:px-8 md:py-28">
      <div ref={ref} className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={riseIn}
            className="badge-pink inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
            Compare the two centres
          </motion.span>
          <motion.h2
            variants={riseIn}
            className="mt-5 font-poppins text-3xl font-bold tracking-tight text-gray-900 md:text-5xl"
          >
            Find the branch <span className="text-gradient-logo">nearest to you</span>
          </motion.h2>
          <motion.p variants={riseIn} className="mt-5 text-sm leading-relaxed text-gray-600 md:text-base">
            Same brand, same clinical protocol — different doctors, timings and specialities. Open a
            branch to see its full site, before-and-after cases, FAQs and booking form.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8"
        >
          {branches.map((branch, i) => (
            <BranchDetailCard
              key={branch.slug}
              branch={branch}
              index={i}
              progress={scrollYProgress}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Closing CTA + footer
 * ------------------------------------------------------------------ */

function ClosingCta({ branches }: { branches: BranchConfig[] }) {
  return (
    <section
      className="relative overflow-hidden px-4 py-20 md:px-8 md:py-28"
      style={{ background: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-darker) 60%, var(--brand-teal-ink) 100%)' }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)' }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' }}
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <motion.h2
          variants={riseIn}
          className="font-poppins text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl"
        >
          Ready to get your case <span className="text-[var(--accent-gold)]">planned in 3D?</span>
        </motion.h2>
        <motion.p variants={riseIn} className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
          Pick your city and book a consultation. Your CBCT, diagnosis and treatment plan happen in
          the same visit — at either centre.
        </motion.p>

        <motion.div variants={riseIn} className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          {branches.map((branch) => (
            <Link
              key={branch.slug}
              href={`/${branch.slug}`}
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white/8 px-7 py-4 ring-1 ring-white/15 backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white hover:text-[var(--brand-teal-deep)]"
            >
              <span className="text-left">
                <span className="block font-poppins text-lg font-bold text-white transition-colors group-hover:text-[var(--brand-teal-deep)]">
                  {branch.name}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50 transition-colors group-hover:text-gray-500">
                  {branch.contact.phones[0]}
                </span>
              </span>
              <ArrowRight
                size={18}
                strokeWidth={2.6}
                className="text-[var(--accent-gold)] transition-transform group-hover:translate-x-1"
              />
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function SelectFooter({ branches }: { branches: BranchConfig[] }) {
  return (
    <footer className="border-t border-gray-100 bg-white px-4 py-12 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div>
          <Image
            src="/icube-logo.avif"
            alt="I Cube Dental"
            width={245}
            height={60}
            className="mx-auto h-10 w-auto md:mx-0"
          />
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-gray-500">
            Specialist-led implant and multi-speciality dental care in Ludhiana and Chandigarh.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          {branches.map((branch) => (
            <div key={branch.slug}>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                {branch.name}
              </p>
              <Link
                href={`/${branch.slug}`}
                className="mt-2 block text-sm font-bold text-gray-800 transition-colors hover:text-[var(--accent-pink)]"
              >
                {branch.doctors[0].name} ↗
              </Link>
              <a
                href={`tel:${branch.contact.phones[0].replace(/\s/g, '')}`}
                className="mt-1 block text-xs text-gray-500 transition-colors hover:text-[var(--accent-pink)]"
              >
                {branch.contact.phones[0]}
              </a>
              <p className="mt-1 text-xs text-gray-400">{branch.contact.timings}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-center text-[10px] text-gray-400">
        &copy; {new Date().getFullYear()} I Cube Dental. Made with{' '}
        <span className="text-[var(--accent-pink)]">🤍</span> for beautiful smiles.
      </p>
    </footer>
  );
}

/* ------------------------------------------------------------------ *
 * Page shell
 * ------------------------------------------------------------------ */

export default function BranchSelect({ branches }: BranchSelectProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />

      {/* Slim brand bar — no branch context yet, so no per-branch phone here */}
      <header className="glass-header fixed inset-x-0 top-0 z-50 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center" aria-label="I Cube Dental home">
            <Image
              src="/icube-logo.avif"
              alt="I Cube Dental"
              width={245}
              height={60}
              className="h-8 w-auto md:h-9"
              priority
            />
          </Link>
          <a
            href="#branches"
            className="rounded-full bg-[var(--brand-teal)] px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--brand-teal-dark)] md:text-[11px]"
          >
            Our Branches
          </a>
        </div>
      </header>

      <main>
        <Hero branches={branches} reduceMotion={reduceMotion} />
        <StatsBand reduceMotion={reduceMotion} />
        <SharedStandard />
        <BranchDetails branches={branches} reduceMotion={reduceMotion} />
        <ClosingCta branches={branches} />
      </main>

      <SelectFooter branches={branches} />
    </div>
  );
}
