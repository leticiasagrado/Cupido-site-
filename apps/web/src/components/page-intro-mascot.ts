import type { CupidVariant } from '@/components/cupid';

/**
 * Which Cupid illustration each inner page shows in its intro. Pages not listed
 * (legal pages, privacy requests) keep the plain CB seal.
 */
const byPath: [RegExp, CupidVariant][] = [
  [/^\/(en\/)?(servicos|services)(\/|$)/, 'mascot'],
  [/^\/(en\/)?(como-funciona|how-it-works)$/, 'embrace'],
  [/^\/(en\/)?(sobre|about)$/, 'mark'],
  [/^\/(en\/)?(candidatura|apply|contactos|contact)$/, 'embrace'],
  [/^\/(en\/)?(perguntas-frequentes|faq)$/, 'search'],
  [/^\/(en\/)?(confianca-privacidade|trust-privacy)$/, 'search'],
  [/^\/(en\/)?journal$/, 'lisbon'],
  [/^\/eventos-privados$/, 'embrace'],
  [/^\/(en\/)?(parceiros|partners)$/, 'mark'],
  [/^\/en\/private-network$/, 'search'],
];

export function mascotFor(pathname: string): CupidVariant | null {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  return byPath.find(([pattern]) => pattern.test(path))?.[1] ?? null;
}
