import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { parsePrice, formatEuro, promotionalPrice } from '@/lib/pricing';

type CampaignInfo = { discount: number } | null;

export function Plans({ campaign }: { campaign: CampaignInfo }) {
  return (
    <section className="section-rail plans" id="planos">
      <div className="section-index">
        <span>03</span>
        <span>PLANOS PRIVADOS</span>
      </div>
      <div className="plans-body">
        <div className="section-heading">
          <div>
            <span className="eyebrow">O SEU TEMPO É PRECIOSO</span>
            <h2>
              O seu tempo é precioso.
              <br />
              <em>A sua vida afectiva também.</em>
            </h2>
          </div>
          {campaign ? (
            <span className="plans-campaign-tag">
              FOUNDING MEMBERS · −{campaign.discount}% no 1º mês
            </span>
          ) : null}
        </div>
        <div className="plans-grid">
          {services.map((service, index) => {
            const regular = parsePrice(service.price);
            const promo = campaign ? promotionalPrice(regular, campaign.discount) : null;
            const prefix = service.prefix ? `${service.prefix} ` : '';
            return (
              <article
                key={service.slug}
                className={`plan-card ${service.featured ? 'is-featured' : ''} ${service.aspirational ? 'is-aspirational' : ''}`}
              >
                <span className="plan-card-top">
                  {service.featured
                    ? 'SIGNATURE EXPERIENCE'
                    : service.aspirational
                      ? 'O SALTO ASPIRACIONAL'
                      : `0${index + 1} / THE BUREAU`}
                </span>
                <h3>{service.name}</h3>
                {campaign && promo !== null ? (
                  <div className="plan-pricing plan-pricing-promo">
                    <div className="plan-price-regular">
                      <span className="plan-price-label">Preço habitual</span>
                      <span className="plan-price-strike">
                        {prefix}
                        {formatEuro(regular)}
                        <small>/mês</small>
                      </span>
                    </div>
                    <div className="plan-price-promo">
                      <span className="plan-price-label">1º mês Founding Members</span>
                      <span className="plan-price-promo-value">
                        {prefix}
                        {formatEuro(promo)}
                      </span>
                      <span className="plan-discount-badge">−{campaign.discount}%</span>
                    </div>
                    <p className="plan-renewal">
                      Renovação: {formatEuro(regular)}
                      <small>/mês</small>
                    </p>
                  </div>
                ) : (
                  <div className="plan-pricing">
                    <div className="plan-price-single">
                      {service.prefix ? <span className="price-prefix">{service.prefix}</span> : null}
                      <span>{formatEuro(regular)}</span>
                      <small>/mês</small>
                    </div>
                  </div>
                )}
                <p className="plan-tagline">{service.tagline}</p>
                <Link
                  className="button button-burgundy"
                  to={`/candidatura?tipo=consulta&servico=${service.slug}`}
                  data-cta="plan-consultation"
                >
                  Solicitar uma consulta privada <ArrowUpRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
        <div className="plans-note">
          <span className="small-diamond" />
          <p>
            Todos os serviços funcionam mês a mês. <strong>Sem fidelização obrigatória.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
