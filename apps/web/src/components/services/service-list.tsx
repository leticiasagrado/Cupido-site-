import { Link } from 'react-router';
import { ArrowUpRight, Check } from 'lucide-react';
import { Cupid } from '@/components/cupid';
import { services, comparisonRows } from '@/data/services';
import { ComparisonTable } from '@/components/services/comparison-table';

export function ServiceList() {
  return (
    <>
      <section className="service-list">
        {services.map((service, index) => (
          <article className={`service-detail-row ${service.featured ? 'is-featured' : ''} ${service.aspirational ? 'is-aspirational' : ''}`} key={service.slug}>
            <div className="service-summary">
              <span className="eyebrow">{service.featured ? 'THE SIGNATURE EXPERIENCE' : service.aspirational ? 'O SALTO ASPIRACIONAL' : `0${index + 1} / PRIVATE MATCHMAKING`}</span>
              {service.featured ? <span className="service-recommend-tag">O nosso acompanhamento mais escolhido</span> : null}
              <h2>{service.name}</h2>
              <div className="service-price">
                {service.prefix ? <span className="price-prefix">{service.prefix}</span> : null}
                <span>{service.price}€</span>
                <small>/mês</small>
              </div>
              <p className="service-positioning">{service.positioning}</p>
              <p>{service.tagline}</p>
              <Link className="button button-burgundy" to={`/candidatura?tipo=consulta&servico=${service.slug}`}>{service.cta} <ArrowUpRight size={16} /></Link>
              <Link className="text-link" to={`/servicos/${service.slug}`}>Explorar o {service.name} <ArrowUpRight size={15} /></Link>
            </div>
            <div>
              <ul className="service-feature-list">
                {service.features.map(feature => <li key={feature}><Check size={14} /><span>{feature}</span></li>)}
              </ul>
              <p className="service-ideal"><strong>IDEAL PARA</strong>{service.ideal}</p>
            </div>
          </article>
        ))}
      </section>

      <ComparisonTable
        services={services}
        rows={comparisonRows}
        labels={{
          monthly: 'COMPARAÇÃO / MÊS A MÊS',
          recommended: 'Mais escolhido',
          aspirational: 'O salto aspiracional',
          optional: (value) => value,
          cta: 'Explorar',
          pathPrefix: '/servicos',
        }}
      />

      <section className="statement">
        <Cupid variant="mark" className="statement-cupid" />
        <h2>Mês a mês.<br /><em>Sem fidelização obrigatória.</em></h2>
        <p style={{ marginTop: 22, fontSize: 12 }}>Paga pela pesquisa, curadoria e acompanhamento.<br />Não por um número de encontros ou por uma promessa de resultado.</p>
      </section>
      <div className="offline-note">A candidatura e o pedido de consulta não implicam contratação. As condições são explicadas pela equipa; contratação e pagamentos são tratados fora deste website.</div>
    </>
  );
}
