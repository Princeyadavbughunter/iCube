'use client';

import { useEffect, useMemo, useState } from "react";
import { BranchConfig } from "@/config/branch-configs";

import Header from "@/components/Header";
import ImplantHero from "@/components/implant/ImplantHero";
import ImplantTrustBar from "@/components/implant/ImplantTrustBar";
import MissingTeethProblems from "@/components/implant/MissingTeethProblems";
import ImplantPlanning from "@/components/implant/ImplantPlanning";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import VideoStories from "@/components/modern/VideoStories";
import Testimonials from "@/components/editorial/Testimonials";
import WhyChooseImplants from "@/components/implant/WhyChooseImplants";
import EvaluationVisit from "@/components/implant/EvaluationVisit";
import ClinicInside from "@/components/implant/ClinicInside";
import AboutSection from "@/components/editorial/AboutSection";
import TeamGrid from "@/components/editorial/TeamGrid";
import ImplantFaq from "@/components/implant/ImplantFaq";
import ContactBlock from "@/components/implant/ContactBlock";
import ConsultCta from "@/components/implant/ConsultCta";

import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import PopupForm from "@/components/PopupForm";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { LanguageProvider, useLang } from "@/components/LanguageProvider";
import { localizeBranch } from "@/config/branch-pa";
import { Rise, ScrollProgress } from "@/components/motion/Motion";

interface BranchPageClientProps {
  branch: BranchConfig;
}

/**
 * The branch landing page.
 *
 * Wrapped in `LanguageProvider` so every section below can render in English
 * or Punjabi from the header toggle. The provider has to sit here rather than
 * in the root layout: this is the first client component on the route, and the
 * language is client state.
 */
export default function BranchPageClient({ branch }: BranchPageClientProps) {
  return (
    <LanguageProvider>
      <BranchPage branch={branch} />
    </LanguageProvider>
  );
}

function BranchPage({ branch: source }: BranchPageClientProps) {
  const { lang } = useLang();

  // Swapping the config once, here, is what keeps the sections below language-
  // agnostic: every one of them already reads its prose off `branch`, so none
  // of them needs to know a second language exists.
  const branch = useMemo(() => localizeBranch(source, lang), [source, lang]);

  const [showStickyCta, setShowStickyCta] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Scroll handler for sticky CTA — rAF-throttled + idempotent setState
  useEffect(() => {
    let ticking = false;
    let lastVisible = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 300;
        if (next !== lastVisible) {
          lastVisible = next;
          setShowStickyCta(next);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show popup after scroll intent (user has engaged past hero) OR a long delay as fallback.
  // This replaces the intrusive 12s timer and only triggers once.
  useEffect(() => {
    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setShowPopup(true);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(fallbackTimer);
    };

    const onScroll = () => {
      // Trigger after the user has scrolled past ~60% of the hero
      if (window.scrollY > window.innerHeight * 0.6) {
        trigger();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const fallbackTimer = setTimeout(trigger, 45000); // 45s fallback if user never scrolls

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (!showPopup) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showPopup]);

  // Section visibility observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('section, .fade-up').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <SmoothScroll />
      <ScrollProgress />

      {/* Main Content */}
      <div className="relative z-10">
        <Header onBookAppointment={openPopup} branch={branch} />

        {/* The hero is above the fold, so it is deliberately not wrapped in a
            Reveal — an entrance animation would only delay first paint. */}
        <ImplantHero branch={branch} onBookAppointment={openPopup} />

        {/* ---- Qualify: the credentials, then the problem ---- */}
        <Rise><ImplantTrustBar branch={branch} /></Rise>
        <Rise><MissingTeethProblems /></Rise>

        {/* ---- Explain: the surgeon, on film ---- */}
        <Rise><ImplantPlanning branch={branch} onBookAppointment={openPopup} /></Rise>

        {/* ---- Show: the clinic's own results ---- */}
        <Rise>
          <BeforeAfterSlider
            branch={branch}
            heading="Our patients regained their smiles, confidence and quality of life"
            disclaimer="Results may vary and depend on the individual case."
          >
            <ConsultCta branch={branch} onBookAppointment={openPopup} />
          </BeforeAfterSlider>
        </Rise>

        {/* ---- Reassure: the room, the surgeon, the team ---- */}
        <Rise><ClinicInside branch={branch} onBookAppointment={openPopup} /></Rise>
        <Rise>
          <AboutSection branch={branch}>
            <ConsultCta branch={branch} onBookAppointment={openPopup} />
          </AboutSection>
        </Rise>
        <Rise><TeamGrid branch={branch} heading="A skilled team delivering precision and comfort" /></Rise>

        {/* ---- Answer: why here, and what the first visit costs you ---- */}
        <Rise><WhyChooseImplants branch={branch} /></Rise>
        <Rise><EvaluationVisit branch={branch} onBookAppointment={openPopup} /></Rise>

        {/* ---- Prove: patients in their own words, then strangers on Google.
            Last on purpose — by this point the visitor has the clinic, the
            surgeon and the price, and other people's verdicts are what settles
            it. Google is placed after our own films because a review we cannot
            edit carries more weight than one we filmed. */}
        <Rise>
          <VideoStories
            kicker="PATIENT STORIES"
            heading="Don't just take our word for it"
            disclaimer="Results may vary and depend on the individual case."
          >
            <ConsultCta branch={branch} onBookAppointment={openPopup} />
          </VideoStories>
        </Rise>
        <Rise>
          <Testimonials branch={branch} heading="What our patients say on Google">
            <ConsultCta branch={branch} onBookAppointment={openPopup} />
          </Testimonials>
        </Rise>

        {/* ---- Close: objections, then directions ---- */}
        <Rise><ImplantFaq branch={branch} onBookAppointment={openPopup} /></Rise>
        <Rise><ContactBlock branch={branch} onBookAppointment={openPopup} /></Rise>
        <Rise y={16}><Footer branch={branch} /></Rise>
      </div>

      {/* Interactive Components */}
      <StickyCTA isVisible={showStickyCta} onBookAppointment={openPopup} branch={branch} />
      <WhatsAppButton branch={branch} />
      <PopupForm
        isOpen={showPopup}
        onClose={closePopup}
        branch={branch}
      />

    </div>
  );
}
