'use client';

import Image from "next/image";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";
import { BranchConfig } from "@/config/branch-configs";
import { locationsFor } from "@/config/locations";
import { useLang } from '@/components/LanguageProvider';

interface FooterProps {
  branch?: BranchConfig;
}

/**
 * A closing line, not a second page.
 *
 * This used to carry a four-column grid, a payment-methods panel and a second
 * map embed. On the implant page every one of those repeats something the
 * visitor has already passed: the contact block directly above holds the
 * address, both phone numbers, the hours and the map, and the CTA has by then
 * appeared ten times. Repeating it here only pushed the real ending further
 * away.
 *
 * So the footer does the one job left — say whose site this is, and close it.
 */
export default function Footer({ branch }: FooterProps) {
  const leadDoctor = branch?.copy.leadDoctor ?? "";
  const { t, lang } = useLang();
  const branchName = branch ? `I Cube Dental ${branch.name}` : "I Cube Dental";
  // Empty handles render nothing rather than a dead "#" link.
  const instagram = branch?.social.instagram ?? "";
  const facebook = branch?.social.facebook ?? "";
  // This page's own city has two clinics; both are shown here, since the
  // second one has no landing page of its own to be found on otherwise.
  const cityClinics = branch ? locationsFor(branch.slug) : [];

  return (
    <footer
      className="px-4 py-10 text-center sm:px-6 md:py-12"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-darker) 60%, var(--brand-teal-ink) 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <Image
          src="/icube-logo-light.png"
          alt="I Cube Dental"
          width={245}
          height={60}
          className="mx-auto h-10 w-auto"
        />

        {leadDoctor && (
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
            {leadDoctor}
          </p>
        )}

        {(instagram || facebook) && (
          <div className="mt-5 flex items-center justify-center gap-2.5">
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/15"
                aria-label={`${branchName} on Instagram`}
              >
                <Instagram size={15} />
              </a>
            )}
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/15"
                aria-label={`${branchName} on Facebook`}
              >
                <Facebook size={15} />
              </a>
            )}
          </div>
        )}

        {/* This branch's own city has two clinics. Both are listed here —
            it's the only place on the site the second one appears at all. */}
        {cityClinics.length > 1 && (
          <div className="mt-8 border-t border-white/10 pt-8 text-left">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
              {t.footer.ourClinics(branch!.city)}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {cityClinics.map((clinic) => {
                const label = lang === 'pa' ? clinic.pa.label : clinic.label;
                const address = lang === 'pa' ? clinic.pa.address : clinic.address;
                return (
                  <div
                    key={clinic.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="shrink-0 text-[var(--accent-gold)]" />
                      <span className="font-poppins text-[13.5px] font-bold text-white">
                        {label}
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-gray-400">{address}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <a
                        href={`tel:${clinic.phone}`}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-200 transition-colors hover:text-white"
                      >
                        <Phone size={12} />
                        {clinic.phone}
                      </a>
                      <a
                        href={clinic.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] font-semibold text-[var(--accent-gold)] transition-colors hover:text-white"
                      >
                        {t.footer.directions}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <p className="mt-6 text-[12px] text-gray-400">
          {t.footer.rights(new Date().getFullYear())}
        </p>

        {/* Agency credit. `rel="noopener"` because it opens in a new tab, and
            no `nofollow`: this is a genuine attribution, not paid placement. */}
        <p className="mt-2 text-[12px] text-gray-400">
          {t.footer.madeBy}{' '}
          <a
            href="https://adveraim.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-300 underline decoration-white/25 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60"
          >
            Adveraim
          </a>
        </p>

        {/* Required by Meta wherever a page is used as an ad destination. */}
        <p className="mx-auto mt-4 max-w-xl text-[10.5px] leading-relaxed text-gray-400">
          {t.footer.metaDisclaimer}
        </p>
      </div>
    </footer>
  );
}
