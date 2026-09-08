/**
 * Every physical clinic the practice runs — four in total, two per city.
 *
 * `branch-configs.ts` only carries the one address each landing page is built
 * around (the branch that page's hero, contact block and schema markup all
 * point at). This file is the complete list, so the footer can show a visitor
 * both of their city's clinics — including the second one, which has no page
 * of its own and would otherwise be invisible on the site.
 *
 * No photograph per location: the practice has not supplied one for the
 * second clinic in either city, and a placeholder or a borrowed photo of the
 * other branch would misrepresent the room a visitor actually walks into.
 */
export type ClinicLocation = {
  /** Which landing page this clinic belongs under. */
  branch: 'ludhiana' | 'chandigarh';
  /** Distinguishes this clinic from the other one in the same city, e.g. "New Prem Nagar". */
  label: string;
  address: string;
  /** Digits only — formatted for display where it's shown, and used as-is in `tel:`. */
  phone: string;
  mapsLink: string;
  pa: { label: string; address: string };
};

export const locations: ClinicLocation[] = [
  {
    branch: 'ludhiana',
    label: 'New Prem Nagar',
    address: '1st Floor, 1533, New Prem Nagar, Civil Lines, Ludhiana, Punjab 141001',
    phone: '9077700021',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=I+Cube+Dental+New+Prem+Nagar+Ludhiana',
    pa: {
      label: 'ਨਿਊ ਪ੍ਰੇਮ ਨਗਰ',
      address: 'ਪਹਿਲੀ ਮੰਜ਼ਿਲ, 1533, ਨਿਊ ਪ੍ਰੇਮ ਨਗਰ, ਸਿਵਲ ਲਾਈਨਜ਼, ਲੁਧਿਆਣਾ, ਪੰਜਾਬ 141001',
    },
  },
  {
    branch: 'ludhiana',
    label: 'Raikot',
    address: 'Opp. Gurudwara Tahliana Sahib, Raikot, Punjab 141109',
    phone: '9711757597',
    mapsLink:
      'https://www.google.com/maps/search/?api=1&query=I+Cube+Dental+Raikot+Opp+Gurudwara+Tahliana+Sahib',
    pa: {
      label: 'ਰਾਏਕੋਟ',
      address: 'ਗੁਰਦੁਆਰਾ ਤਹਿਲੀਆਣਾ ਸਾਹਿਬ ਦੇ ਸਾਹਮਣੇ, ਰਾਏਕੋਟ, ਪੰਜਾਬ 141109',
    },
  },
  {
    branch: 'chandigarh',
    label: 'Sector 35-C',
    address: 'SCO 103, First Floor, Sector 35-C, Chandigarh 160022',
    phone: '9077700020',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=iCube+Dental+SCO+103+Sector+35C+Chandigarh',
    pa: {
      label: 'ਸੈਕਟਰ 35-ਸੀ',
      address: 'SCO 103, ਪਹਿਲੀ ਮੰਜ਼ਿਲ, ਸੈਕਟਰ 35-ਸੀ, ਚੰਡੀਗੜ੍ਹ 160022',
    },
  },
  {
    branch: 'chandigarh',
    label: 'Sector 46-C',
    address: 'SCO 74, First Floor, Sector 46-C, Chandigarh 160047',
    phone: '9458848586',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=iCube+Dental+SCO+74+Sector+46C+Chandigarh',
    pa: {
      label: 'ਸੈਕਟਰ 46-ਸੀ',
      address: 'SCO 74, ਪਹਿਲੀ ਮੰਜ਼ਿਲ, ਸੈਕਟਰ 46-ਸੀ, ਚੰਡੀਗੜ੍ਹ 160047',
    },
  },
];

/** Both of a branch's own-city clinics, in published order. */
export function locationsFor(slug: string): ClinicLocation[] {
  return locations.filter((l) => l.branch === slug);
}
