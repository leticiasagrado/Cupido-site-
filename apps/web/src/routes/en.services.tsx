import { Link, useLoaderData } from 'react-router';
import { loadCampaign } from '@/lib/campaign.server';
import { Plans2026 } from '@/components/home26/home-2026';
import { ArrowUpRight, Check } from 'lucide-react';
import { seo } from '@/lib/seo';
import { enServices, enComparisonRows } from '@/data/en-content';
import { EnPageIntro } from '@/components/en/page-intro';
import { EnConsultationCta } from '@/components/en/consultation-cta';
import { ComparisonTable } from '@/components/services/comparison-table';
import type { Route } from './+types/en.services';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Private matchmaking services — The Cupid Bureau', description: 'Private, Signature, Elite Concierge and Bespoke Private Search: four levels of matchmaking and personalised guidance, with no mandatory lock-in.', path: '/en/services' });
}

export async function loader({ request }: Route.LoaderArgs) {
  return { campaign: await loadCampaign(request) };
}

export default function EnServicesPage() {
  const { campaign } = useLoaderData<typeof loader>();
  return (
    <main id="conteudo">
      <EnPageIntro eyebrow="SERVICES / DIFFERENT LEVELS OF CARE" title={<>Your process.<br /><em>The guidance<br />that suits you.</em></>} description="From curation within our network to a tailored international search. We find with you the level of guidance suited to your moment in life." breadcrumb="Services" />
      <div className="h26"><Plans2026 campaign={campaign} lang="en" /></div>
      <section className="service-list">
        {enServices.map((service, index) => (
          <div key={service.slug} className={`service-detail-row ${service.featured ? 'is-featured' : ''} ${service.aspirational ? 'is-aspirational' : ''}`}>
            <div className="service-summary">
              <span className="eyebrow">{service.featured ? 'THE SIGNATURE EXPERIENCE' : service.aspirational ? 'THE ASPIRATIONAL LEAP' : `0${index + 1} / PRIVATE MATCHMAKING`}</span>
              {service.featured ? <span className="service-recommend-tag">Our most chosen guidance</span> : null}
              <h2>{service.name}.</h2>
              <div className="service-price">
                {service.prefix ? <span className="price-prefix">{service.prefix}</span> : null}
                <span>{service.price}€</span>
                <small>/month</small>
              </div>
              <p className="service-positioning">{service.positioning}</p>
              <p>{service.description}</p>
              <Link className="text-link" to={`/en/services/${service.slug}`}>Explore the service <ArrowUpRight size={16} /></Link>
            </div>
            <div>
              <ul className="service-feature-list">
                {service.features.map((feature) => <li key={feature}><Check size={14} /> {feature}</li>)}
              </ul>
              <p className="service-ideal"><strong>Ideal for</strong>{service.ideal}</p>
            </div>
          </div>
        ))}
      </section>

      <ComparisonTable
        services={enServices}
        rows={enComparisonRows}
        labels={{
          monthly: 'COMPARISON / MONTH TO MONTH',
          recommended: 'Most chosen',
          aspirational: 'The aspirational leap',
          optional: (value) => value,
          cta: 'Explore',
          pathPrefix: '/en/services',
        }}
      />

      <EnConsultationCta />
    </main>
  );
}
