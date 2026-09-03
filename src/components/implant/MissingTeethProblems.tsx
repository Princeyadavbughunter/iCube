import { Check } from 'lucide-react';

/**
 * What a missing tooth actually costs you, day to day.
 *
 * This is the page's qualifying block: a visitor recognises two or three of
 * these and has effectively diagnosed themselves. Every item is a documented
 * consequence of tooth loss rather than a claim about this clinic, which is
 * why it reads the same on either branch.
 */
const problems = [
  {
    title: 'Aesthetic Concerns',
    body: 'A visible gap, and lips and cheeks that lose their support over time.',
  },
  {
    title: 'Chewing Difficulty',
    body: 'Food avoided or chewed on one side, which loads the remaining teeth.',
  },
  {
    title: 'Speech Issues',
    body: 'Certain sounds slur or whistle when a front tooth is missing.',
  },
  {
    title: 'Jawbone Loss',
    body: 'Bone under an empty socket resorbs once the root stops loading it.',
  },
  {
    title: 'Loss of Self-Confidence',
    body: 'Smiling with a hand over the mouth, or not smiling in photographs.',
  },
  {
    title: 'Nutritional Challenges',
    body: 'Harder foods dropped from the diet because they are no longer comfortable.',
  },
];

export default function MissingTeethProblems() {
  return (
    <section className="bg-[var(--accent-pink-soft)] px-4 py-16 sm:px-6 md:py-24 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="mx-auto mb-12 max-w-2xl text-center font-poppins text-[1.6rem] font-bold leading-snug tracking-tight text-[var(--brand-teal-deep)] sm:text-[2rem]">
          Are you facing any of the following problems due to missing teeth?
        </h2>

        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem.title} className="flex gap-3.5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-teal)] text-white">
                <Check size={14} strokeWidth={3} />
              </span>
              <div>
                <h3 className="font-poppins text-[15px] font-bold leading-snug text-[var(--brand-teal-deep)]">
                  {problem.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-gray-500">{problem.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
