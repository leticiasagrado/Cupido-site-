import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';

export function PaidPlansCta() {
  return (
    <section className="consultation-cta paid-plans-cta">
      <span className="eyebrow">OS SERVIÇOS PRIVADOS DE MATCHMAKING</span>
      <h2>Prefere que procuremos<br /><em>activamente por si?</em></h2>
      <p>
        A nossa rede gratuita permite que o seu perfil seja considerado quando surgir uma potencial
        compatibilidade. Com os serviços privados de matchmaking, uma equipa dedica-se activamente à
        sua pesquisa, selecção e acompanhamento.
      </p>
      <Link className="button button-burgundy" to="/servicos">
        Conhecer os planos de matchmaking <ArrowUpRight size={17} />
      </Link>
      <BrandMark monogram tone="seal" className="cta-monogram" />
    </section>
  );
}
