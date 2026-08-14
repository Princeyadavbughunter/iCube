'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  benefit: string;
}

const faqs: FAQItem[] = [
  // ── Implant FAQs ──
  {
    question: "What are dental implants and are they permanent?",
    answer:
      "Dental implants are titanium posts that act as permanent roots for replacement teeth. They fuse with your jawbone, making them the most stable, natural-looking and lifelong solution for missing teeth.",
    benefit: "Regain your natural smile and bite for a lifetime.",
  },
  {
    question: "Why does in-house CBCT matter for my implant?",
    answer:
      "A CBCT is a 3D scan of your jaw that shows exact bone height, width and the position of nerves and sinuses — detail an ordinary X-ray cannot give. Because our CBCT is in-house, your scan, diagnosis and treatment plan happen in the same visit, and Dr. Chandan Jain can plan the precise implant position in 3D before any surgery begins.",
    benefit: "Your implant is planned in 3D before it is ever placed.",
  },
  {
    question: "What is a dedicated implant operatory, and why should I care?",
    answer:
      "Implant placement is a surgical procedure. We have a separate operatory used only for implant surgery — set up for a controlled, sterile surgical environment rather than shared with routine dental work. It is a standard of infection control and surgical precision that a general dental chair is not designed for.",
    benefit: "Implant surgery in a purpose-built surgical suite, not a shared chair.",
  },
  {
    question: "Is the dental implant procedure painful?",
    answer:
      "The procedure is carried out under local anaesthesia, so you will not feel pain during treatment. Because the implant position is planned in advance on CBCT, the surgery itself is more precise and less invasive, and most patients report mild soreness for a day or two — comparable to a routine extraction.",
    benefit: "Precise, planned placement means a far more comfortable recovery.",
  },
  {
    question: "How much do dental implants cost at I Cube Dental?",
    answer:
      "Dental implants start from ₹25,000. The final cost depends on the implant system, the number of teeth being replaced, whether bone grafting is needed and the type of crown chosen. Every case is assessed individually on CBCT and you receive a clear, itemised quote before treatment begins — no surprises at the counter.",
    benefit: "Transparent, itemised pricing agreed before treatment starts.",
  },

  // ── Specialist team & technology FAQs ──
  {
    question: "What does 'MDS specialist' actually mean for my treatment?",
    answer:
      "MDS is a three-year postgraduate specialisation completed after the general BDS dental degree. Dr. Chandan Jain holds MDS qualifications in both Prosthodontics and Endodontics, and our team are MDS specialists trained at India's leading dental colleges. In practice it means your root canal is done by an endodontist and your crown by a prosthodontist — not by a generalist doing a bit of everything.",
    benefit: "Every procedure handled by a specialist in that exact field.",
  },
  {
    question: "What is CAD/CAM, and how does it improve my crown?",
    answer:
      "CAD/CAM means your crown or bridge is designed on a computer from a digital scan of your teeth and then milled to that exact design. It removes the guesswork and distortion of conventional putty impressions, so the fit at the gum line, the bite and the contact with neighbouring teeth are far more accurate — which is what makes a restoration last and look natural.",
    benefit: "A digitally precise fit you can feel when you bite.",
  },
  {
    question: "Can I get a root canal done here too?",
    answer:
      "Yes. Endodontics is one of our core specialisations — Dr. Chandan Jain is MDS in Endodontics, so root canal treatment, retreatment of failed root canals and complex or curved-canal cases are all handled in-house. If that tooth then needs a crown, the same team completes it with CAD/CAM, so nothing gets referred out or delayed.",
    benefit: "Root canal and crown completed by specialists in one place.",
  },
  {
    question: "What are your clinic timings and where are you located?",
    answer:
      "We are open Monday to Sunday, 10:00 AM to 8:00 PM — all seven days. The clinic is at 1533, New Prem Nagar, Ludhiana, near Las Vegas Club, close to PAU Gate No. 4 and Akaash Institute. Call 7011993633 or 9077700021 to book a consultation.",
    benefit: "Open all seven days, in a central and easy-to-reach location.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden" id="faq">
      {/* decorative blob */}
      <div aria-hidden className="pointer-events-none absolute -top-10 right-0 w-80 h-80 rounded-full blur-3xl opacity-20"
           style={{ background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute bottom-0 -left-10 w-96 h-96 rounded-full blur-3xl opacity-20"
           style={{ background: 'radial-gradient(circle, var(--brand-teal) 0%, transparent 70%)' }} />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-pink px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles size={12} />
            <span>Got Questions? We Have Answers</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 leading-tight">
            Common <span className="text-gradient-logo">Questions</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg font-light">
            Empowering your decision with transparent information and clinical insights.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group transition-all duration-300 rounded-2xl border bg-white/90 backdrop-blur-sm ${
                openIndex === index
                ? 'border-[var(--accent-pink)]/20 depth-stack'
                : 'border-gray-100 hover:border-[var(--brand-teal)]/30 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                className="w-full p-5 md:p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${
                  openIndex === index ? 'text-[var(--brand-teal-deep)]' : 'text-gray-800'
                }`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 ml-4 w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                  ? 'bg-gradient-to-br from-[var(--accent-pink)] to-[var(--brand-teal)] border-transparent text-white rotate-90 shadow-md'
                  : 'bg-gray-50 border-gray-100 text-gray-400 group-hover:border-[var(--brand-teal)]/30 group-hover:text-[var(--brand-teal-deep)]'
                }`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-6 md:px-6 md:pb-8 pt-0">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--brand-teal)]/30 to-transparent mb-6" />

                      <div className="space-y-4">
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                        <p className="text-[var(--brand-teal-deep)] text-base font-medium leading-relaxed italic border-l-2 border-[var(--accent-pink)] pl-4">
                          &quot;{faq.benefit}&quot;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-xs">
            Still have questions? <a href="tel:7011993633" className="text-[var(--accent-pink)] font-bold underline hover:text-[var(--accent-pink-dark)] transition-colors">Contact our specialists</a>.
          </p>
        </div>
      </div>
    </section>
  );
}