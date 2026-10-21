import { Link } from 'react-router';
import { ArrowUpRight, Check } from 'lucide-react';
import type { BureauService } from '@/data/services';

export function ServiceExperience({ service }: { service: BureauService }) {
  return (
    <>
      <section className="single-service">
        <div>
          <div className="service-price service-price-large">
            {service.prefix ? <span className="price-prefix">{service.prefix}</span> : null}
            <span>{service.price}€</span>
            <small>/mês</small>
          </div>
          <p>Serviço mensal. Sem fidelização obrigatória.</p>
          <Link className="button button-burgundy" to={`/candidatura?tipo=consulta&servico=${service.slug}`}>{service.cta} <ArrowUpRight size={17} /></Link>
          <p>A sua consulta ajuda-nos a avaliar o âmbito e a adequação deste acompanhamento. O pedido não constitui contratação.</p>
          <p className="service-ideal"><strong>IDEAL PARA</strong>{service.ideal}</p>
        </div>
        <div>
          <h2>{service.slug === 'bespoke-private-search' ? 'Uma estratégia à sua medida.' : 'Cada detalhe tem intenção.'}</h2>
          <ul className="service-feature-list">{service.features.map(feature => <li key={feature}><Check size={15} /><span>{feature}</span></li>)}</ul>
        </div>
      </section>
      <section className="statement">
        <h2>Não prometemos quantidade.<br /><em>Procuramos compatibilidade.</em></h2>
        <p style={{ marginTop: 22, fontSize: 12 }}>Cada apresentação depende de avaliação humana, interesse mútuo e consentimento.</p>
      </section>
      <div className="offline-note">Pesquisa, curadoria e acompanhamento são o centro do serviço. A contratação e os pagamentos acontecem directamente com a equipa, fora deste website.</div>
      <div style={{ textAlign: 'center', padding: '25px 20px 50px' }}><Link className="text-link" to="/servicos">Comparar todos os serviços <ArrowUpRight size={16} /></Link></div>
    </>
  );
}
