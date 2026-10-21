import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';

export function ServicesPreview() {
  return (
    <section className="services-preview section-rail">
      <div className="section-index"><span>02</span><span>OS NOSSOS SERVIÇOS</span></div>
      <div className="services-preview-body">
        <div className="section-heading">
          <div>
            <span className="eyebrow">UM SERVIÇO. DIFERENTES NÍVEIS DE CUIDADO.</span>
            <h2>Escolha o nível<br /><em>de acompanhamento.</em></h2>
          </div>
          <Link className="text-link" to="/servicos">Conhecer todos os serviços <ArrowUpRight size={16} /></Link>
        </div>
        <div className="service-preview-grid">
          {services.map((service, index) => (
            <Link key={service.slug} to={`/servicos/${service.slug}`} className={`service-preview ${service.featured ? 'featured' : ''} ${service.aspirational ? 'is-aspirational' : ''}`}>
              <span className="service-card-top">{service.featured ? 'SIGNATURE EXPERIENCE' : service.aspirational ? 'O SALTO ASPIRACIONAL' : `0${index + 1} / THE BUREAU`}</span>
              <h3>{service.name}</h3>
              <div className="service-price">
                {service.prefix ? <span className="price-prefix">{service.prefix}</span> : null}
                <span>{service.price}€</span>
                <small>/mês</small>
              </div>
              <p>{service.tagline}</p>
              <span className="service-card-link">Conhecer o serviço <ArrowUpRight size={17} /></span>
            </Link>
          ))}
        </div>
        <div className="services-note">
          <span className="small-diamond" />
          <p>Todos os serviços funcionam mês a mês. <strong>Sem fidelização obrigatória.</strong></p>
          <span className="eyebrow">O SEU TEMPO. A SUA ESCOLHA.</span>
        </div>
      </div>
    </section>
  );
}
