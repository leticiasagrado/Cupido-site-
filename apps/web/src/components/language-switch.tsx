import { Link, useLocation } from 'react-router';

const PT_TO_EN: Record<string, string> = {
  '/': '/en',
  '/sobre': '/en/about',
  '/como-funciona': '/en/how-it-works',
  '/servicos': '/en/services',
  '/rede-privada': '/en/private-network',
  '/parceiros': '/en/partners',
  '/journal': '/en/journal',
  '/eventos-privados': '/en/events',
  '/confianca-privacidade': '/en/trust-privacy',
  '/candidatura': '/en/apply',
  '/perguntas-frequentes': '/en/faq',
  '/contactos': '/en/contact',
};

const EN_TO_PT: Record<string, string> = Object.fromEntries(
  Object.entries(PT_TO_EN).map(([pt, en]) => [en, pt]),
);

export function LanguageSwitch() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, '');
  const isEnglish = pathname.startsWith('/en');
  const target = isEnglish
    ? EN_TO_PT[pathname] ?? '/'
    : PT_TO_EN[pathname] ?? '/en';

  return (
    <Link
      to={target}
      className="language-switch"
      aria-label={isEnglish ? 'Ver em português' : 'View in English'}
    >
      {isEnglish ? 'PT' : 'EN'}
    </Link>
  );
}
