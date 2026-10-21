/**
 * Price helpers for the Founding Members campaign.
 *
 * Service prices are stored as Portuguese-formatted strings ("350", "1.200")
 * in `src/data/services.ts`. These helpers parse, compute the promotional
 * first-month price, and format values in pt-PT (comma decimal, dot thousands,
 * space before €) so the homepage reads identically on server and client.
 */

/** Parse a Portuguese price string ("1.200" → 1200) into a number. */
export function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/\./g, ''), 10);
}

/** Format a number as a pt-PT euro string: 297.5 → "297,50 €", 1020 → "1.020 €". */
export function formatEuro(value: number): string {
  // Built by hand: Intl's pt-PT format skips the separator on 4-digit numbers
  // ("1020") and uses a space elsewhere, while the site writes "1.020".
  const hasFraction = value % 1 !== 0;
  const [whole, fraction] = Math.abs(value).toFixed(hasFraction ? 2 : 0).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const sign = value < 0 ? '-' : '';
  return `${sign}${grouped}${fraction ? `,${fraction}` : ''} €`;
}

/** Compute the promotional price: regular × (1 − discount/100). */
export function promotionalPrice(regular: number, discountPercent: number): number {
  return (regular * (100 - discountPercent)) / 100;
}
