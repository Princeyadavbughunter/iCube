'use client';

import { useEffect, useState } from "react";
import { BranchConfig } from "@/config/branch-configs";

import Header from "@/components/Header";
import Hero from "@/components/modern/Hero";
import AboutSection from "@/components/editorial/AboutSection";
import TreatmentsOverview from "@/components/modern/TreatmentsOverview";
import AdvancedTreatments from "@/components/modern/AdvancedTreatments";
import PatientJourney from "@/components/PatientJourney";
import TeamGrid from "@/components/editorial/TeamGrid";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import VideoStories from "@/components/modern/VideoStories";
import Testimonials from "@/components/editorial/Testimonials";
import FaqEditorial from "@/components/editorial/FaqEditorial";

import CtaBand from "@/components/editorial/CtaBand";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import PopupForm from "@/components/PopupForm";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { Rise, ScrollProgress } from "@/components/motion/Motion";

interface BranchPageClientProps {
  branch: BranchConfig;
}

export default function BranchPageClient({ branch }: BranchPageClientProps) {
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
        <Hero branch={branch} onBookAppointment={openPopup} />
        <Rise><TreatmentsOverview /></Rise>
        <Rise><AdvancedTreatments branch={branch} /></Rise>
        <Rise><AboutSection branch={branch} /></Rise>
        <Rise><PatientJourney /></Rise>
        <Rise><TeamGrid branch={branch} /></Rise>
        <Rise><BeforeAfterSlider branch={branch} /></Rise>
        <Rise><VideoStories /></Rise>
        <Rise><Testimonials branch={branch} /></Rise>
        <Rise><FaqEditorial branch={branch} onBookAppointment={openPopup} /></Rise>
        <Rise><CtaBand branch={branch} onBookAppointment={openPopup} /></Rise>
        <Rise y={16}><Footer branch={branch} /></Rise>
      </div>

      {/* Interactive Components */}
      <StickyCTA isVisible={showStickyCta} onBookAppointment={openPopup} branch={branch} />
      <PopupForm
        isOpen={showPopup}
        onClose={closePopup}
        branch={branch}
      />

    </div>
  );
}
