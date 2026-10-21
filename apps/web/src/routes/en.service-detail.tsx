import { Link } from 'react-router';
import { ArrowUpRight, Check } from 'lucide-react';
import { seo } from '@/lib/seo';
import { enServices } from '@/data/en-content';
import { EnPageIntro } from '@/components/en/page-intro';
import { EnConsultationCta } from '@/components/en/consultation-cta';
import type { Route } from './+types/en.service-detail';

export function loader({ params }: Route.LoaderArgs) {
  const service = enServices.find((item) => item.slug === params.slug);
  if (!service) throw new Response('Service not found', { status: 404 });
  return { service };
}

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  return seo({ matches, location }, { title: `${loaderData?.service.name ?? 'Service'} — The Cupid Bureau`, description: loaderData ? `${loaderData.service.tagline} Discover the ${loaderData.service.name} service from The Cupid Bureau. Private, monthly, with no mandatory lock-in.` : 'Discover the private matchmaking services of The Cupid Bureau.', path: `/en/services/${loaderData?.service.slug ?? ''}` });
}

export default function EnServicePage({ loaderData }: Route.ComponentProps) {
  const { service } = loaderData;
  return (
    <main id="conteudo">
      <EnPageIntro eyebrow={service.featured ? 'THE SIGNATURE EXPERIENCE' : 'THE BUREAU / PRIVATE MATCHMAKING'} title={<>{service.name}.<br /><em>{service.slug === 'bespoke-private-search' ? 'Entirely tailored to you.' : 'With intention.'}</em></>} description={service.description} breadcrumb={`Services / ${service.name}`} />
      <section className="single-service">
        <div>
          <div className="service-price service-price-large">
            {service.prefix ? <span className="price-prefix">{service.prefix}</span> : null}
            <span>{service.price}€</span>
            <small>/month</small>
          </div>
          <p>Monthly service. No mandatory lock-in.</p>
          <Link className="button button-burgundy" to={`/en/apply?tipo=consulta&servico=${service.slug}`}>{service.featured ? 'Speak with a matchmaker' : 'Request a consultation'} <ArrowUpRight size={17} /></Link>
          <p>Your consultation helps us assess the scope and fit of this guidance. The request does not constitute hiring.</p>
          <p className="service-ideal"><strong>Ideal for</strong>{service.ideal}</p>
        </div>
        <div>
          <h2>What is included</h2>
          <ul className="service-feature-list">
            {service.features.map((feature) => <li key={feature}><Check size={14} /> {feature}</li>)}
          </ul>
        </div>
      </section>
      <EnConsultationCta />
    </main>
  );
}
