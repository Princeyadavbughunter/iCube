import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { BranchConfig } from "@/config/branch-configs";

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
  const branchName = branch ? `I Cube Dental ${branch.name}` : "I Cube Dental";
  // Empty handles render nothing rather than a dead "#" link.
  const instagram = branch?.social.instagram ?? "";
  const facebook = branch?.social.facebook ?? "";

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

        <p className="mt-6 text-[12px] text-gray-400">
          &copy; I Cube Dental {new Date().getFullYear()}. All rights reserved.
        </p>

        {/* Required by Meta wherever a page is used as an ad destination. */}
        <p className="mx-auto mt-4 max-w-xl text-[10.5px] leading-relaxed text-gray-400">
          This website is not a part of Facebook or Facebook Inc. Additionally, this site is NOT
          endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK Inc.
        </p>
      </div>
    </footer>
  );
}
