import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

export function HomePromise() {
  return <section className="home-promise" id="promessa"><div className="promise-inner"><span className="eyebrow">PORQUE EXISTIMOS</span><h2>Procurar amor<br /><em>não deveria ser exaustivo.</em></h2><p className="promise-lead">Entre aplicações, conversas que não levam a lado nenhum e encontros sem compatibilidade, conhecer alguém tornou-se um segundo emprego. A The Cupid Bureau existe para mudar isso — com discrição, curadoria humana e acompanhamento em cada passo.</p><Link className="text-link" to="/sobre">Conhecer o Bureau <ArrowUpRight size={16} /></Link></div></section>;
}
