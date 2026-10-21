import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

const steps = [
  ['01', 'Candidatura', 'Partilha connosco, em privado, quem é e o que procura.'],
  ['02', 'Curadoria', 'Conhecemos a sua história e procuramos, com critério, quem faz sentido.'],
  ['03', 'Encontro', 'Mediamos uma apresentação com consentimento mútuo e acompanhamos o resultado.'],
];

export function ProcessTeaser() {
  return <section className="process-teaser section-rail"><div className="section-index"><span>01</span><span>COMO FUNCIONA</span></div><div className="process-teaser-body"><div className="section-heading"><div><span className="eyebrow">TRÊS PASSOS. UMA CONVERSA.</span><h2>Simples.<br /><em>Com intenção.</em></h2></div><Link className="text-link" to="/como-funciona">Ver o processo completo <ArrowUpRight size={16} /></Link></div><ol className="teaser-steps">{steps.map(([num, title, desc]) => <li key={num}><span className="teaser-number">{num}</span><div><h3>{title}</h3><p>{desc}</p></div></li>)}</ol></div></section>;
}
