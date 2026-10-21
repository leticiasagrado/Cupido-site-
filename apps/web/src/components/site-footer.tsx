import { Link, useLocation } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';
import { contactPhone, contactPhoneHref, navigation, footerExtraLinks } from '@/data/brand';
import { enNavigation } from '@/data/en-content';

export function SiteFooter() {
  const location = useLocation();
  const isEn = location.pathname.startsWith('/en');
  const nav = isEn ? enNavigation : navigation;
  const homeHref = isEn ? '/en' : '/';
  const applyHref = isEn ? '/en/apply?tipo=consulta' : '/candidatura?tipo=consulta';
  const contactHref = isEn ? '/en/contact' : '/contactos';
  const ctaText = isEn ? 'Let’s talk.' : 'Vamos conversar.';
  const contactTeamText = isEn ? 'Contact the team' : 'Contactar a equipa';
  const tagline = isEn ? 'Human relationships.\nWith intention, discretion and care.' : 'Relações humanas.\nCom intenção, discrição e cuidado.';
  const bureauLabel = isEn ? 'THE BUREAU' : 'O BUREAU';
  const ctaEyebrow = isEn ? 'IT ALL STARTS WITH A CONVERSATION' : 'TUDO COMEÇA COM UMA CONVERSA';
  const locationText = isEn ? 'Portugal · National and international search' : 'Portugal · Pesquisa nacional e internacional';
  const copyright = isEn ? '© 2026 The Cupid Bureau. All rights reserved.' : '© 2026 The Cupid Bureau. Todos os direitos reservados.';
  const signature = isEn ? 'LESS CHANCE. MORE INTENTION.' : 'MENOS ACASO. MAIS INTENÇÃO.';
  const privacyLabel = isEn ? 'Privacy' : 'Privacidade';
  const termsLabel = isEn ? 'Terms & conditions' : 'Termos e condições';
  const cookiesLabel = isEn ? 'Cookies' : 'Cookies';
  const conditionsLabel = isEn ? 'Commercial conditions' : 'Condições comerciais';
  const requestsLabel = isEn ? 'Privacy requests' : 'Pedidos de privacidade';
  const privacyHref = isEn ? '/politica-de-privacidade' : '/politica-de-privacidade';
  const termsHref = isEn ? '/termos-e-condicoes' : '/termos-e-condicoes';
  const cookiesHref = isEn ? '/politica-de-cookies' : '/politica-de-cookies';
  const conditionsHref = '/condicoes-comerciais';
  const requestsHref = '/pedidos-privacidade';

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link to={homeHref} aria-label="The Cupid Bureau — home"><BrandMark /></Link>
          <p>{tagline.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">{bureauLabel}</span>
          {nav.map(item => <Link key={item.href} to={item.href}>{item.label}</Link>)}
          {footerExtraLinks.map(item => {
            const enHref = item.href === '/parceiros' ? '/en/partners' : item.href === '/contactos' ? '/en/contact' : item.href;
            const enLabel = item.href === '/parceiros' ? 'Partners' : item.href === '/eventos-privados' ? 'Events' : 'Contact';
            return <Link key={item.href} to={isEn ? enHref : item.href}>{isEn ? enLabel : item.label}</Link>;
          })}
        </div>
        <div className="footer-contact">
          <span className="eyebrow">{ctaEyebrow}</span>
          <Link className="footer-cta" to={applyHref}>{ctaText} <ArrowUpRight size={27} /></Link>
          <Link to={contactHref}>{contactTeamText}</Link>
          <a href={contactPhoneHref}>{contactPhone}</a>
          <a href="mailto:cupidbureau@yahoo.com">cupidbureau@yahoo.com</a>
          <span className="footer-location">{locationText}</span>
        </div>
        <BrandMark monogram tone="light" className="footer-monogram" />
      </div>
      <div className="footer-bottom">
        <span>{copyright}</span>
        <div>
          <Link to={privacyHref}>{privacyLabel}</Link>
          <Link to={requestsHref}>{requestsLabel}</Link>
          <Link to={termsHref}>{termsLabel}</Link>
          <Link to={conditionsHref}>{conditionsLabel}</Link>
          <Link to={cookiesHref}>{cookiesLabel}</Link>
        </div>
        <span className="footer-signature">{signature}</span>
      </div>
    </footer>
  );
}
