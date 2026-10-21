import { Link } from 'react-router';
import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';
import { imagery } from '@/data/brand';

export function Privacy() {
  return <section className="privacy-section section-rail"><div className="section-index"><span>03</span><span>DISCRIÇÃO, SEM EXCEPÇÕES</span></div><div className="privacy-body"><div className="privacy-copy"><span className="eyebrow"><LockKeyhole size={13} /> CONFIDENCIAL POR NATUREZA</span><h2>Privacidade não é um extra.<br /><em>É parte do serviço.</em></h2><p>Os nossos clientes não são expostos publicamente. Não existe catálogo de membros. Não existe pesquisa pública de perfis.</p><p>As informações são partilhadas de forma gradual e apenas quando existe interesse numa potencial apresentação.</p><div className="privacy-links"><Link className="text-link" to="/confianca-privacidade">Confiança &amp; Privacidade <ArrowUpRight size={16} /></Link><Link className="text-link" to="/politica-de-privacidade">Política de Privacidade <ArrowUpRight size={16} /></Link></div></div><div className="privacy-visual"><img src={imagery.letter} alt="Um envelope de papel texturado com um selo bordô, sobre uma mesa de pedra clara" width="1024" height="768" loading="lazy" /><BrandMark monogram className="privacy-monogram" /></div></div></section>;
}
