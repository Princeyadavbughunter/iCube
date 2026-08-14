import { BranchConfig } from "@/config/branch-configs";

interface WhyChooseUsProps {
  branch?: BranchConfig;
}

export default function WhyChooseUs({ branch }: WhyChooseUsProps) {
  const points = [
    {
      icon: "🎓",
      title: "All-MDS Specialist Team",
      desc: `Led by ${branch?.doctors ? branch.doctors.map(d => d.name).join(' & ') : "our specialists"} — MDS Prosthodontics and MDS Endodontics — alongside a team trained at India's top dental colleges. Not a general practice: every case is handled by a specialist.`,
    },
    {
      icon: "🔬",
      title: "In-House CBCT & Digital Scanning",
      desc: "3D CBCT imaging and intraoral digital scanners on site — no external labs, no waiting. Your implant position is planned digitally before a single instrument is used.",
    },
    {
      icon: "🦷",
      title: "Dedicated Implant Operatory",
      desc: "A separate, purpose-built surgical suite reserved exclusively for implant procedures — the sterility and precision standard a shared dental chair simply cannot match.",
    },
    {
      icon: "⚙️",
      title: "CAD/CAM Precision Restorations",
      desc: "Crowns, bridges and full-arch work designed and milled to digital tolerances for a fit, bite and finish that look and feel completely natural.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden">
      {/* decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-30"
           style={{ background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
           style={{ background: 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center md:text-left mb-12 fade-up">
          <span className="inline-flex items-center gap-2 badge-pink px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
            Why I Cube Dental
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Why Choose <span className="text-gradient-logo">I Cube Dental</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--brand-teal)] rounded-full mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {points.map((item, i) => (
            <div
              key={i}
              className={`relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-white/80 depth-stack card-3d-tilt fade-up stagger-${(i % 4) + 1} overflow-hidden`}
            >
              <div aria-hidden className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-30 pointer-events-none"
                   style={{ background: i % 2 === 0 ? 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)' : 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' }} />

              <div className="relative flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-pink-soft)] to-[var(--brand-teal)]/15 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
