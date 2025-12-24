export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  dialCode: string;
}

export const countries: Country[] = [
  {
    name: 'Argentina',
    code: 'AR',
    dialCode: '+54',
  },
  {
    name: 'Australia',
    code: 'AU',
    dialCode: '+61',
  },
  {
    name: 'Austria',
    code: 'AT',
    dialCode: '+43',
  },
  {
    name: 'Bangladesh',
    code: 'BD',
    dialCode: '+880',
  },
  {
    name: 'Belgium',
    code: 'BE',
    dialCode: '+32',
  },
  {
    name: 'Brazil',
    code: 'BR',
    dialCode: '+55',
  },
  {
    name: 'Canada',
    code: 'CA',
    dialCode: '+1',
  },
  {
    name: 'Chile',
    code: 'CL',
    dialCode: '+56',
  },
  {
    name: 'China',
    code: 'CN',
    dialCode: '+86',
  },
  {
    name: 'Colombia',
    code: 'CO',
    dialCode: '+57',
  },
  {
    name: 'Czech Republic',
    code: 'CZ',
    dialCode: '+420',
  },
  {
    name: 'Denmark',
    code: 'DK',
    dialCode: '+45',
  },
  {
    name: 'Egypt',
    code: 'EG',
    dialCode: '+20',
  },
  {
    name: 'Finland',
    code: 'FI',
    dialCode: '+358',
  },
  {
    name: 'France',
    code: 'FR',
    dialCode: '+33',
  },
  {
    name: 'Germany',
    code: 'DE',
    dialCode: '+49',
  },
  {
    name: 'Greece',
    code: 'GR',
    dialCode: '+30',
  },
  {
    name: 'Hong Kong',
    code: 'HK',
    dialCode: '+852',
  },
  {
    name: 'Hungary',
    code: 'HU',
    dialCode: '+36',
  },
  {
    name: 'India',
    code: 'IN',
    dialCode: '+91',
  },
  {
    name: 'Indonesia',
    code: 'ID',
    dialCode: '+62',
  },
  {
    name: 'Ireland',
    code: 'IE',
    dialCode: '+353',
  },
  {
    name: 'Israel',
    code: 'IL',
    dialCode: '+972',
  },
  {
    name: 'Italy',
    code: 'IT',
    dialCode: '+39',
  },
  {
    name: 'Japan',
    code: 'JP',
    dialCode: '+81',
  },
  {
    name: 'Kenya',
    code: 'KE',
    dialCode: '+254',
  },
  {
    name: 'Kuwait',
    code: 'KW',
    dialCode: '+965',
  },
  {
    name: 'Malaysia',
    code: 'MY',
    dialCode: '+60',
  },
  {
    name: 'Mexico',
    code: 'MX',
    dialCode: '+52',
  },
  {
    name: 'Nepal',
    code: 'NP',
    dialCode: '+977',
  },
  {
    name: 'Netherlands',
    code: 'NL',
    dialCode: '+31',
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    dialCode: '+64',
  },
  {
    name: 'Nigeria',
    code: 'NG',
    dialCode: '+234',
  },
  {
    name: 'Norway',
    code: 'NO',
    dialCode: '+47',
  },
  {
    name: 'Pakistan',
    code: 'PK',
    dialCode: '+92',
  },
  {
    name: 'Peru',
    code: 'PE',
    dialCode: '+51',
  },
  {
    name: 'Philippines',
    code: 'PH',
    dialCode: '+63',
  },
  {
    name: 'Poland',
    code: 'PL',
    dialCode: '+48',
  },
  {
    name: 'Portugal',
    code: 'PT',
    dialCode: '+351',
  },
  {
    name: 'Qatar',
    code: 'QA',
    dialCode: '+974',
  },
  {
    name: 'Romania',
    code: 'RO',
    dialCode: '+40',
  },
  {
    name: 'Russia',
    code: 'RU',
    dialCode: '+7',
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    dialCode: '+966',
  },
  {
    name: 'Singapore',
    code: 'SG',
    dialCode: '+65',
  },
  {
    name: 'South Africa',
    code: 'ZA',
    dialCode: '+27',
  },
  {
    name: 'South Korea',
    code: 'KR',
    dialCode: '+82',
  },
  {
    name: 'Spain',
    code: 'ES',
    dialCode: '+34',
  },
  {
    name: 'Sri Lanka',
    code: 'LK',
    dialCode: '+94',
  },
  {
    name: 'Sweden',
    code: 'SE',
    dialCode: '+46',
  },
  {
    name: 'Switzerland',
    code: 'CH',
    dialCode: '+41',
  },
  {
    name: 'Taiwan',
    code: 'TW',
    dialCode: '+886',
  },
  {
    name: 'Thailand',
    code: 'TH',
    dialCode: '+66',
  },
  {
    name: 'Turkey',
    code: 'TR',
    dialCode: '+90',
  },
  {
    name: 'Ukraine',
    code: 'UA',
    dialCode: '+380',
  },
  { name: 'United Kingdom', code: 'UK', dialCode: '+44' },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    dialCode: '+971',
  },
  {
    name: 'United States',
    code: 'US',
    dialCode: '+1',
  },
  {
    name: 'Vietnam',
    code: 'VN',
    dialCode: '+84',
  },
];

/**
 * Get country by ISO code
 */
export function getCountryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}

/**
 * Get country by dial code
 */
export function getCountryByDialCode(dialCode: string): Country | undefined {
  return countries.find((c) => c.dialCode === dialCode);
}

/**
 * Get dial code options for select dropdowns
 * Format: "+1 (US)" for display, "+1" for value
 */
export function getDialCodeOptions() {
  return (
    countries
      .map((country) => ({
        label: `${country.code} (${country.dialCode})`,
        value: country.dialCode,
        country: country.name,
      }))
      // .filter(
      //   (option, index, self) =>
      //     // Remove duplicates (e.g., US and Canada both have +1)
      //     index === self.findIndex((o) => o.value === option.value)
      // )
      .sort((a, b) => String(a.label).localeCompare(String(b.label)))
  );
}

/**
 * Get country options for select dropdowns
 */
export function getCountryOptions() {
  return countries
    .map((country) => ({
      label: country.name,
      value: country.code,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
