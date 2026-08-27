import { Shield, Sparkles, Activity, Clock } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';

export default function WhyChooseUs({ branch }: { branch: BranchConfig }) {
  const features = [
    {
      icon: <Shield size={24} className="text-[var(--brand-teal)]" />,
      title: 'MDS Specialist Doctors',
      description: 'Every case is handled by highly experienced and qualified MDS specialists.',
    },
    {
      icon: <Activity size={24} className="text-[var(--brand-teal)]" />,
      title: 'Advanced Technology',
      description: 'In-house CBCT, digital scanners, and CAD/CAM crowns for precision.',
    },
    {
      icon: <Sparkles size={24} className="text-[var(--brand-teal)]" />,
      title: 'Premium Quality',
      description: 'We use only top-tier materials to ensure long-lasting, natural results.',
    },
    {
      icon: <Clock size={24} className="text-[var(--brand-teal)]" />,
      title: 'Efficient Treatments',
      description: 'Faster turnaround times with our dedicated in-house dental lab.',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-[var(--bg-medical-light)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-up">
          <div className="inline-block px-4 py-1 rounded-full bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-sm font-bold tracking-wider mb-4">
            OUR PROMISE
          </div>
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-[var(--brand-teal-deep)] tracking-tight">
            Why Choose {branch.name} for Dental Care
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i}
              className="bg-white rounded-2xl p-8 card-3d-tilt border border-[var(--glass-border)] relative overflow-hidden group fade-up"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity duration-300 group-hover:opacity-10">
                {feature.icon}
              </div>
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-medical-light)] flex items-center justify-center mb-6 ring-1 ring-[var(--brand-teal)]/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--brand-teal-deep)] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
