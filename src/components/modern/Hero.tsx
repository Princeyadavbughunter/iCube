'use client';

import { Star, Phone, CheckCircle2 } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import Image from 'next/image';
import VslPlayer from '@/components/VslPlayer';
import HeroVideo from '@/components/HeroVideo';
import ImplantShowcase from '@/components/ImplantShowcase';

interface HeroProps {
  branch: BranchConfig;
  onBookAppointment: () => void;
}

export default function Hero({ branch, onBookAppointment }: HeroProps) {
  const phone = branch.contact.phones[0];
  const reviewCount = branch.reviews.length;

  return (
    <section className="relative px-4 pt-32 pb-14 sm:px-6 md:pt-40 md:pb-24 lg:px-10 overflow-hidden bg-gradient-to-b from-[var(--bg-medical-light)] to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-40 mix-blend-multiply pointer-events-none"></div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16 z-10">
        
        {/* ---- Left: Content ---- */}
        <div className="max-w-xl fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-[var(--glass-border)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-teal)] animate-pulse"></span>
            <span className="text-xs font-bold text-[var(--brand-teal)] tracking-wider uppercase">{branch.name}</span>
          </div>

          <h1 className="font-poppins text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--brand-teal-deep)] sm:text-5xl lg:text-[3.5rem] mb-6">
            Premium Painless Dentistry in <span className="text-[var(--brand-teal)]">{branch.name}</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            {branch.pa.heroSub} Experience expert care with advanced technology, ensuring your comfort and a healthy smile.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onBookAppointment}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Book Your Consultation
            </button>
            <a 
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="px-8 py-3.5 rounded-full font-bold text-[var(--brand-teal)] border-2 border-[var(--brand-teal)] hover:bg-[var(--brand-teal)] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Call {phone}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 inline-flex">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-[var(--accent-gold-deep)] text-[var(--accent-gold-deep)]" />
              ))}
            </div>
            <div className="text-sm">
              <strong className="text-[var(--brand-teal-deep)] font-bold">5.0/5</strong> based on <span className="font-semibold">{reviewCount}+ reviews</span>
            </div>
          </div>
        </div>

        {/* ---- Right: Visual ---- */}
        <div className="relative fade-up stagger-2 lg:ml-auto w-full max-w-lg">
          {/* Main Image Container */}
          <div className="relative z-10 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] w-full bg-gray-100">
             {branch.vsl.src ? (
                <VslPlayer branch={branch} />
             ) : branch.heroVideo ? (
                <HeroVideo src={branch.heroVideo} poster={branch.heroPoster} label={branch.name} />
             ) : (
                <ImplantShowcase />
             )}
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-8 -left-4 sm:-left-12 z-20 glass-card rounded-2xl p-5 w-[240px] animate-[float-slow_6s_ease-in-out_infinite]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-teal)]/10 flex items-center justify-center text-[var(--brand-teal)]">
                <Star size={20} className="fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--brand-teal-deep)] text-sm">Expert Dental Care</h4>
              </div>
            </div>
            <ul className="space-y-2">
              {[ 'Advanced Technology', 'Painless Treatments', 'Specialist Doctors' ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                  <CheckCircle2 size={14} className="text-[var(--brand-teal)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--brand-teal)]/5 rounded-full blur-3xl"></div>
        </div>

      </div>
    </section>
  );
}
