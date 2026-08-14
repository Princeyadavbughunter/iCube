# I Cube Dental — Landing Page

Landing page for **I Cube Dental**, Ludhiana — Dr. Chandan Jain (Implantologist | MDS Prosthodontics | MDS Endodontics).
Built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Client details

| | |
|---|---|
| Clinic | I Cube Dental |
| Doctor | Dr. Chandan Jain |
| Specialty | Implantologist \| MDS Prosthodontics \| MDS Endodontics |
| Address | 1533, New Prem Nagar, Near Las Vegas Club, Ludhiana, Punjab – 141001 (near PAU Gate No. 4 / Akaash Institute) |
| Phone | 7011993633 · 9077700021 |
| Email | drcjain1@gmail.com |
| Timings | Mon–Sun, 10:00 AM – 8:00 PM |
| Experience | 14 years |
| Team | 7 |
| Implant pricing | From ₹25,000 |

**Positioning:** the differentiator is *not* the ₹25,000 price — it is advanced technology (in-house CBCT,
CAD/CAM, digital scanners) + an all-MDS specialist team + a dedicated implant operatory. All page copy
leads with that combination and treats price as secondary.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main landing page + JSON-LD schema
│   └── globals.css       # Global styles / brand tokens
├── components/           # All UI components
│   ├── HeroSection.tsx
│   ├── DoctorProfile.tsx
│   ├── ServiceHighlights.tsx
│   ├── WhyChooseUs.tsx
│   ├── GoogleReviews.tsx
│   ├── FAQSection.tsx
│   ├── Footer.tsx
│   └── ...more
└── config/
    └── branch-configs.ts  # Clinic data configuration (edit this to customize)
```

## Customization

Most clinic-specific data lives in **`src/config/branch-configs.ts`** — doctor details, address,
phones, email, timings, USPs, pricing, hero title and reviews.

## ⚠️ Before launch — assets still to be replaced

These are placeholders carried over from the template and **must** be swapped for real I Cube Dental
assets before the page goes live:

- `public/doctor.svg` — placeholder silhouette. Replace with a real photo of Dr. Chandan Jain
  (portrait, ~3:4) and update `doctors[0].image` in `branch-configs.ts`.
- `public/clinic1.jpeg`, `clinic2.jpeg`, `clinic3.jpeg` — photos of a **different** clinic.
  Replace with real I Cube Dental interior photos (implant operatory, CBCT, chairs).
- `public/clinic4.mp4` — hero video from a different clinic. Replace or remove.
- `public/icube_logo.svg` — an interim cube mark generated to match the theme. Replace with the
  clinic's official logo if they have one.
- `reviews` in `branch-configs.ts` — **placeholder review copy**. Replace with the clinic's real
  Google reviews before publishing; the section is labelled "verified Google reviews".
- Footer Instagram/Facebook links are still `#` — add the real profile URLs.
- Before/after images in `public/images/before-after/` are template stock — replace with real cases
  (with patient consent) or remove the section.
- `PopupForm.tsx` still posts to the previous client's Google Apps Script endpoint
  (`BOOKING_SCRIPT_URL`). Point it at the new CRM sheet for this clinic.
- `.env.local` — set `NEXT_PUBLIC_SITE_URL` to the real domain at deploy time.

## Build for Production

```bash
npm run build
npm start
```
