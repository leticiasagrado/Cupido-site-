import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';
import { Cupid } from '@/components/cupid';
import { mascotFor } from '@/components/page-intro-mascot';

export function EnPageIntro({ eyebrow, title, description, breadcrumb, children }: { eyebrow: string; title: ReactNode; description?: string; breadcrumb: string; children?: ReactNode }) {
  const mascot = mascotFor(useLocation().pathname);
  return <section className={`page-intro${mascot ? ' has-mascot' : ''}`}>{mascot ? <><span className="intro-blob" aria-hidden="true" /><Cupid variant={mascot} className="intro-cupid h26-float" decorative /></> : <BrandMark monogram tone="seal" className="intro-seal" />}<div className="breadcrumb"><Link to="/en">Home</Link><ChevronRight size={11} /><span>{breadcrumb}</span></div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}{children && <div className="intro-actions">{children}</div>}</section>;
}
