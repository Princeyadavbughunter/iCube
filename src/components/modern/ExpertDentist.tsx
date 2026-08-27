import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import type { BranchConfig } from '@/config/branch-configs';
import { team } from '@/config/team';

export default function ExpertDentist({ branch }: { branch: BranchConfig }) {
  // Find the lead doctor based on branch.copy.leadDoctor or default to the first team member
  const leadDoctorName = branch.copy.leadDoctor;
  const doctor = team.find(member => member.name.includes(leadDoctorName)) || team[0];

  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-br from-[var(--brand-teal-deep)] to-[var(--brand-teal)] text-white overflow-hidden relative">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent-gold)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent-gold)]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl md:text-[2.5rem] font-bold tracking-tight mb-4">
            Meet Our <span className="text-[var(--accent-gold)]">Experienced Dentist</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Expert care delivered by highly qualified specialists dedicated to your smile.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center fade-up stagger-2">
          {/* Doctor Image */}
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image 
                src={doctor.image} 
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Doctor Info */}
          <div className="w-full md:w-3/5">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">{doctor.name}</h3>
              <p className="text-[var(--accent-gold)] font-semibold text-lg">{doctor.credentials}</p>
              <p className="text-gray-300 uppercase tracking-widest text-sm mt-1">{doctor.role}</p>
            </div>
            
            <p className="text-gray-200 mb-8 leading-relaxed">
              {doctor.pedigree}
            </p>

            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                'Specialist in Implants & Cosmetics',
                'Advanced Painless Techniques',
                '10+ Years of Experience',
                'Customized Treatment Plans'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-100 font-medium">
                  <CheckCircle2 size={20} className="text-[var(--accent-gold)] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
