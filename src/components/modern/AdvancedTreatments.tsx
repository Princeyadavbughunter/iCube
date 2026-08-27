import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';

export default function AdvancedTreatments({ branch }: { branch: BranchConfig }) {
  const treatments = [
    {
      id: 'aligners',
      title: 'Invisible Aligners',
      description: "The world's most advanced clear aligner system. Get a perfect smile without wires or brackets.",
      image: '/treatment/aliners.webp',
      features: ['Transparent & Removable', 'No food restrictions', 'Faster results', 'Comfortable fit'],
    },
    {
      id: 'implants',
      title: 'Dental Implants',
      description: 'Comprehensive restoration for missing teeth, combining implants and crowns for total function.',
      image: '/treatment/implant.webp',
      features: ['Lifetime warranty', 'Natural look & feel', 'Prevents bone loss', 'High success rate'],
    },
    {
      id: 'smile',
      title: 'Smile Designing',
      description: 'Transform your smile with our premium cosmetic solutions, including porcelain veneers and bonding.',
      image: '/treatment/smile_04-1.webp',
      features: ['Veneers & Laminates', 'Gum contouring', 'Stain removal', 'Symmetrical smile'],
    },
    {
      id: 'rootcanal',
      title: 'Painless Root Canal',
      description: 'Single sitting root canal treatment using advanced microscopes for a completely painless experience.',
      image: '/treatment/rct-1-2.webp',
      features: ['Endodontist specialist', 'Microscope assisted', 'Zero pain protocol', 'Saves natural tooth'],
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[#22272e] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 fade-up">
          <div className="inline-block px-3 py-1 rounded bg-[#ec4899] text-white text-xs font-bold tracking-wider mb-4">
            OUR EXPERTISE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Advanced <span className="text-gray-400">Treatments</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base">
            Comprehensive solutions tailored to your unique dental needs, using world-class materials and technology.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((treatment, i) => (
            <div 
              key={treatment.id}
              className="bg-transparent border border-gray-700 rounded-3xl p-5 hover:border-gray-500 transition-colors duration-300 fade-up"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative h-44 w-full bg-gray-800 rounded-2xl overflow-hidden mb-6">
                <Image src={treatment.image} alt={treatment.title} fill className="object-cover" />
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-3">{treatment.title}</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed min-h-[80px]">
                  {treatment.description}
                </p>
                
                <ul className="space-y-3">
                  {treatment.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[13px] text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ec4899] mt-1.5 shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
