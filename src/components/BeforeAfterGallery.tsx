'use client';

interface BeforeAfterGalleryProps {
  onBookAppointment: () => void;
}

export default function BeforeAfterGallery({ onBookAppointment }: BeforeAfterGalleryProps) {
  const implantShowcase = [
    {
      src: "/images/implant/single.png",
      title: "Single Tooth Implant — natural-looking, permanent replacement"
    },
    {
      src: "/images/implant/all_in.png",
      title: "All-on-Implants — a full, confident smile in one solution"
    }
  ];

  return (
    <section className="p-4 md:p-8 lg:p-12 bg-[#faf8f4]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="text-[#303151] text-sm md:text-base font-medium mb-2">
            Permanent Teeth Replacement
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Dental Implant Solutions
          </h2>
        </div>

        {/* Implant Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full mb-12">
          {implantShowcase.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-[#f5efe4] aspect-[4/3] group flex items-center justify-center">
                <img
                  className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#303151] text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm opacity-90 font-bold z-10">
                  Dental Implants
                </div>
              </div>
              <p className="mt-4 text-center text-gray-700 font-medium italic">&quot;{item.title}&quot;</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="text-center bg-white p-6 md:p-8 rounded-xl shadow-lg mt-8 border border-[#303151]/10">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Ready for Your <span className="text-[#303151]">Smile Transformation?</span>
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Book a consultation with Dr. Chandan Jain — Implantologist, MDS Prosthodontics and MDS Endodontics — and get your case planned on in-house CBCT from the very first visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBookAppointment}
              className="bg-[#303151] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#262745] transition-colors"
            >
              Book Consultation
            </button>
            <a
              href="tel:7011993633"
              className="bg-[#1c1d33] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#121324] transition-colors text-center"
            >
              Call Now: 7011993633
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Professional consultation includes digital scan
          </p>
        </div>
      </div>
    </section>
  );
}
