/**
 * Firm brand — identity of the advisory firm using Brillian.
 *
 * Swap these values (or replace `logoSrc` with a hosted asset) to white-label
 * the prototype for a different firm. To use a real image, drop a file into
 * `public/firm-logo.svg` (or .png) and set `logoSrc: '/firm-logo.svg'`.
 */

export interface FirmBrand {
  /** Display name, e.g. "Edward Jones". */
  name: string;
  /** 1–2 char fallback shown when no logo image is provided. */
  initials: string;
  /** Background color used for the initials avatar (Chakra token). */
  color: string;
  /** Contrast color for the initials text. */
  textColor: string;
  /** Optional square mark. When set, renders in avatars instead of initials. */
  logoSrc?: string;
  /** Optional horizontal wordmark. When set, co-brand lockups use it instead of avatar + name. */
  wordmarkSrc?: string;
}

export const firmBrand: FirmBrand = {
  name: 'Edward Jones',
  initials: 'EJ',
  color: 'citron.400',
  textColor: 'fg',
  // logoSrc: '/firm-logo.svg', // ← square mark; drop a file in public/ and uncomment
  wordmarkSrc: '/edward-jones.svg',
};
