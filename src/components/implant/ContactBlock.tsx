import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import ConsultCta from './ConsultCta';

/**
 * Where to go and how to reach the clinic, with the map beside it.
 *
 * Last block before the footer, and the one a visitor scrolls back to after
 * they have decided — so it repeats the address in full rather than assuming
 * they read it in the header, and every phone number is a live tel: link
 * because most of this traffic is on a phone already.
 */
export default function ContactBlock({
  branch,
  onBookAppointment,
}: {
  branch: BranchConfig;
  onBookAppointment: () => void;
}) {
  const { contact } = branch;
  const whatsappNumber = contact.phones[0].replace(/[^\d]/g, '');
  const whatsappText = encodeURIComponent(
    `Hello! I would like to book an implant consultation at I Cube Dental (${branch.name}).`,
  );

  return (
    <section className="bg-[var(--accent-pink-soft)] px-4 py-16 sm:px-6 md:py-24 lg:px-10" id="contact">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="overflow-hidden rounded-[22px] border border-gray-200 bg-white shadow-[0_18px_50px_-30px_rgba(16,17,36,0.45)]">
            <iframe
              src={contact.googleMapEmbed}
              title={`Map to I Cube Dental ${branch.name}`}
              className="h-full min-h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="rounded-[22px] border border-gray-200 bg-white p-7 sm:p-9">
            <h2 className="font-poppins text-[1.35rem] font-bold tracking-tight text-[var(--brand-teal-deep)] sm:text-[1.6rem]">
              Visit I Cube Dental {branch.name}
            </h2>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3.5">
                <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--accent-gold-deep)]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                    Location
                  </p>
                  <a
                    href={contact.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[13.5px] leading-relaxed text-gray-600 hover:text-[var(--brand-teal)]"
                  >
                    {contact.address}
                  </a>
                </div>
              </div>

              <div className="flex gap-3.5">
                <Phone size={17} className="mt-0.5 shrink-0 text-[var(--accent-gold-deep)]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                    Contact us
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {contact.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="text-[14px] font-bold text-[var(--brand-teal-deep)] hover:text-[var(--brand-teal)]"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-[var(--brand-teal)]"
                  >
                    <Mail size={13} />
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-3.5">
                <Clock size={17} className="mt-0.5 shrink-0 text-[var(--accent-gold-deep)]" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                    Clinic hours
                  </p>
                  <p className="mt-1 text-[13.5px] text-gray-600">
                    {contact.timings} — {contact.daysLine.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--accent-whatsapp)]/40 bg-[var(--accent-whatsapp)]/10 px-6 py-3 text-[13.5px] font-bold text-[#128C4A] transition-colors hover:bg-[var(--accent-whatsapp)]/20"
            >
              <MessageCircle size={15} />
              Message us on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-11">
          <ConsultCta branch={branch} onBookAppointment={onBookAppointment} />
        </div>
      </div>
    </section>
  );
}
