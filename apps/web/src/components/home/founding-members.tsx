import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { Cupid } from '@/components/cupid';

export function FoundingMembers({ discount }: { discount: number }) {
  return (
    <section className="founding-members" id="founding-members">
      <Cupid variant="mark" className="founding-members-cupid" />
      <div className="founding-members-inner">
        <span className="eyebrow founding-members-eyebrow">
          FOUNDING MEMBERS · EDIÇÃO DE LANÇAMENTO
        </span>
        <h2>
          O início de uma nova forma
          <br />
          <em>de encontrar o amor.</em>
        </h2>
        <p className="founding-members-lead">
          Para celebrar o lançamento da The Cupid Bureau, os primeiros clientes poderão beneficiar
          de uma condição especial: {discount}% de desconto no primeiro mês dos nossos serviços de
          matchmaking privado.
        </p>
        <div className="founding-members-highlight">
          <span className="founding-members-discount">{discount}%</span>
          <span className="founding-members-highlight-label">
            de privilégio de lançamento
            <br />
            no primeiro mês dos planos privados
          </span>
        </div>
        <Link className="button button-cream" to="#planos" data-cta="founding-members-plans">
          Descobrir os planos de lançamento <ArrowUpRight size={17} />
        </Link>
        <p className="founding-members-conditions">
          Desconto aplicável apenas ao primeiro mês dos quatro planos pagos. A partir do segundo
          mês, em caso de renovação, aplica-se o preço habitual previamente comunicado e aceite.
        </p>
      </div>
    </section>
  );
}
