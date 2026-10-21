import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';
import { LanguageSwitch } from '@/components/language-switch';
import { navigation } from '@/data/brand';
import { enNavigation } from '@/data/en-content';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isEn = location.pathname.startsWith('/en');
  const nav = isEn ? enNavigation : navigation;
  const applyHref = isEn ? '/en/apply' : '/candidatura';
  const contactHref = isEn ? '/en/contact' : '/contactos';
  const applyLabel = isEn ? 'Apply' : 'Candidatar-me';
  const ariaHome = isEn ? 'The Cupid Bureau — home' : 'The Cupid Bureau — início';
  const navLabel = isEn ? 'Main navigation' : 'Navegação principal';
  const mobileLabel = isEn ? 'Mobile navigation' : 'Navegação móvel';
  const openLabel = isEn ? (open ? 'Close menu' : 'Open menu') : (open ? 'Fechar menu' : 'Abrir menu');

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to={isEn ? '/en' : '/'} className="logo-link" aria-label={ariaHome} onClick={() => setOpen(false)}><BrandMark /></Link>
        <nav className="desktop-nav" aria-label={navLabel}>
          {nav.map(item => <NavLink key={item.href} to={item.href} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{item.label}</NavLink>)}
        </nav>
        <Link className="button button-burgundy header-cta" to={applyHref}><BrandMark monogram tone="light" className="button-mark" />{applyLabel} <ArrowUpRight size={15} /></Link>
        <LanguageSwitch />
        <button className="mobile-menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={openLabel}>{open ? <X /> : <Menu />}</button>
      </div>
      {open ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label={mobileLabel}>
          <BrandMark monogram tone="seal" className="menu-seal" />
          {nav.map(item => <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)}>{item.label}</NavLink>)}
          <Link to={contactHref} onClick={() => setOpen(false)}>{isEn ? 'Contact' : 'Contactos'}</Link>
          <Link className="button button-burgundy" to={applyHref} onClick={() => setOpen(false)}>{applyLabel} <ArrowUpRight size={16} /></Link>
        </nav>
      ) : null}
    </header>
  );
}
