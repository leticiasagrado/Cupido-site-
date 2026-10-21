import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

const planDifferentiation: { plan: string; positioning: string; methodScope: string }[] = [
  {
    plan: 'Private',
    positioning: 'Primeiro acompanhamento',
    methodScope: 'Descoberta e curadoria humana dentro da rede existente.',
  },
  {
    plan: 'Signature',
    positioning: 'Equilíbrio recomendado',
    methodScope: 'Análise de afinidades e acompanhamento do feedback.',
  },
  {
    plan: 'Elite Concierge',
    positioning: 'Acompanhamento elevado',
    methodScope: 'Curadoria alargada e acompanhamento mais próximo, conforme incluído.',
  },
  {
    plan: 'Bespoke Private Search',
    positioning: 'Pesquisa dedicada',
    methodScope: 'Pesquisa activa e curadoria personalizada, no âmbito acordado.',
  },
];

export function MethodDifferentiation() {
  return (
    <section className="section-rail method-differentiation">
      <div className="section-index">
        <span>07</span>
        <span>DIFERENCIAÇÃO</span>
      </div>
      <div className="method-differentiation-body">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE CUPID METHOD / OS PLANOS</span>
            <h2>
              O método serve os planos,
              <br />
              <em>não os uniformiza.</em>
            </h2>
          </div>
          <p>
            O método de compatibilidade acompanha os diferentes planos da The Cupid Bureau,
            adaptando-se aos serviços incluídos em cada um — da curadoria essencial à pesquisa
            dedicada e ao acompanhamento mais próximo.
          </p>
        </div>

        <ul className="method-plans">
          {planDifferentiation.map((plan) => (
            <li key={plan.plan} className="method-plan">
              <span className="method-plan-name">{plan.plan}</span>
              <span className="method-plan-positioning">{plan.positioning}</span>
              <p>{plan.methodScope}</p>
            </li>
          ))}
        </ul>

        <p className="method-differentiation-note">
          As diferenças comerciais entre Private, Signature, Elite Concierge e Bespoke Private Search
          permanecem as estabelecidas. Consulte os{' '}
          <Link to="/servicos">serviços</Link> para os detalhes de cada plano.
        </p>

        <Link className="text-link" to="/servicos">
          Ver os serviços <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
