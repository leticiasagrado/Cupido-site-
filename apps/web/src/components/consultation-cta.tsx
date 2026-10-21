import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';

export function ConsultationCta() {
  return <section className="consultation-cta"><span className="eyebrow">O PRÓXIMO CAPÍTULO COMEÇA AQUI</span><h2>Conhecer alguém<br /><em>pode voltar a ser simples.</em></h2><p>Tudo começa com uma conversa confidencial.</p><Link className="button button-burgundy" to="/candidatura?tipo=consulta">Solicitar consulta privada <ArrowUpRight size={17} /></Link><BrandMark monogram tone="seal" className="cta-monogram" /></section>;
}
