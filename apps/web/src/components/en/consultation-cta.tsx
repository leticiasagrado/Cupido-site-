import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';

export function EnConsultationCta() {
  return <section className="consultation-cta"><span className="eyebrow">THE NEXT CHAPTER STARTS HERE</span><h2>Meeting someone<br /><em>can be simple again.</em></h2><p>It all begins with a confidential conversation.</p><Link className="button button-burgundy" to="/en/apply?tipo=consulta">Request a private consultation <ArrowUpRight size={17} /></Link><BrandMark monogram tone="seal" className="cta-monogram" /></section>;
}
