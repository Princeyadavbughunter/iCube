import Image from "next/image";

export default function ServiceHighlights() {
  const serviceData = [
    {
      title: "Single Tooth Implants",
      image: "/images/implant/single.png",
      description:
        "Replace a missing tooth with a permanent, natural-looking implant that protects neighbouring teeth and feels just like your own.",
      benefits: [
        "CBCT-planned placement",
        "Preserves adjacent teeth",
        "Titanium-grade durability",
        "Digital scan — no messy impressions",
      ],
    },
    {
      title: "Multiple & Bridge Implants",
      image: "/images/implant/Multiple.png",
      description:
        "Implant-supported bridges replace several missing teeth with a strong, stable solution — no slipping dentures, no compromise.",
      benefits: [
        "Replace multiple teeth",
        "Implant-supported bridges",
        "Stable, secure chewing",
        "Placed in a dedicated operatory",
      ],
    },
    {
      title: "Full-Arch Implant Rehabilitation",
      image: "/images/implant/all_in.png",
      description:
        "A complete arch of fixed teeth supported on implants — planned in 3D on CBCT and restored under MDS Prosthodontics supervision.",
      benefits: [
        "Complete bite restoration",
        "3D-guided surgical planning",
        "Fixed — never removed at night",
        "Youthful facial support",
      ],
    },
    {
      title: "Prosthodontics & CAD/CAM Crowns",
      image: "/images/implant/supported.png",
      description:
        "Crowns, bridges and full-mouth prosthetics designed and milled on CAD/CAM for a precise fit, accurate bite and natural finish.",
      benefits: [
        "MDS Prosthodontics led",
        "CAD/CAM digital precision",
        "Natural shade matching",
        "Long-term reliability",
      ],
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[var(--brand-dark)] via-[var(--brand-darker)] to-[var(--brand-dark)] text-white py-20 md:py-28 px-4 md:px-8 lg:px-12 overflow-hidden">
      {/* Decorative aura — pink + teal accents on dark */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full blur-[110px] opacity-25"
           style={{ background: 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-20 w-[450px] h-[450px] rounded-full blur-[100px] opacity-20"
           style={{ background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto">
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 badge-pink px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Advanced <span className="text-gradient-logo">Implant Dentistry</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--brand-teal)] rounded-full mb-4" />
          <p className="text-gray-300 max-w-2xl mb-14">
            From a single implant to full-mouth rehabilitation — every case is planned on in-house CBCT, scanned digitally and restored with CAD/CAM. Root canal therapy and complex endodontics are handled in-house by an MDS Endodontist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {serviceData.map((service, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-[28px] flex flex-col hover:border-[var(--brand-teal)]/50 hover:bg-white/10 transition-all duration-500 card-3d-tilt fade-up stagger-${index + 1} group overflow-hidden`}
            >
              {/* Pink/teal corner glow on hover */}
              <div aria-hidden className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                   style={{ background: index % 2 === 0 ? 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' : 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)' }} />

              <div className="relative rounded-2xl mb-6 aspect-[4/3] flex items-center justify-center overflow-hidden bg-white/5 border border-slate-600/30 p-4 shadow-inner">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110 p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-teal)]/10 via-transparent to-[var(--accent-pink)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="relative font-bold mb-3 text-lg text-white group-hover:text-[var(--brand-teal)] transition-colors">{service.title}</h3>
              <p className="relative text-[14px] text-gray-400 leading-relaxed mb-6 flex-grow">{service.description}</p>
              <ul className="relative space-y-3 text-[12px] text-slate-300">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 group/item">
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[var(--accent-pink)] to-[var(--brand-teal)] group-hover/item:scale-125 transition-transform" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
