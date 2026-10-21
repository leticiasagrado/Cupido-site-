import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { imagery } from '@/data/brand';

export function Approach() {
  return <section className="approach section-rail" id="a-nossa-abordagem"><div className="section-index"><span>01</span><span>A NOSSA ABORDAGEM</span></div><div className="approach-copy"><span className="eyebrow">UMA OUTRA FORMA DE SE CONHECER</span><h2>Conhecer alguém<br />não deveria parecer<br /><em>um segundo emprego.</em></h2><p>Entre aplicações, conversas que não levam a lado nenhum e encontros sem compatibilidade, conhecer alguém pode tornar-se cansativo.</p><p className="approach-emphasis">Na The Cupid Bureau, fazemos diferente.</p><p>Conhecemos cada cliente individualmente, compreendemos os seus valores, estilo de vida e expectativas e procuramos pessoas que possam realmente fazer sentido.</p><Link className="text-link" to="/sobre">Um pouco mais sobre nós <ArrowUpRight size={16} /></Link></div><figure className="approach-media"><img src={imagery.conversation} alt="Mãos e taças de vinho numa mesa de um wine bar, à luz de uma vela" width="768" height="1024" loading="lazy" /><figcaption><span className="eyebrow">UM ENCONTRO. NÃO MAIS UM SWIPE.</span><span className="media-caption-mark">cb</span></figcaption><div className="photo-tag">A vida acontece<br /><em>fora do ecrã.</em></div></figure></section>;
}
