import type { Route } from './+types/service-detail';
import { seo } from '@/lib/seo';
import { services } from '@/data/services';
import { PageIntro } from '@/components/page-intro';
import { ServiceExperience } from '@/components/services/service-experience';
export function loader({ params }: Route.LoaderArgs) {
  const service = services.find(item => item.slug === params.slug);
  if (!service) throw new Response('Serviço não encontrado', { status: 404 });
  return { service };
}
export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  return seo({ matches, location }, { title: `${loaderData?.service.name ?? 'Serviço'} — The Cupid Bureau`, description: loaderData ? `${loaderData.service.tagline} Conheça o acompanhamento ${loaderData.service.name} da The Cupid Bureau. Serviço privado, mensal e sem fidelização obrigatória.` : 'Conheça os serviços de matchmaking privado da The Cupid Bureau.' });
}
export default function ServicePage({ loaderData }: Route.ComponentProps) {
  const { service } = loaderData;
  return <main id="conteudo"><PageIntro eyebrow={service.featured ? 'THE SIGNATURE EXPERIENCE' : 'THE BUREAU / PRIVATE MATCHMAKING'} title={<>{service.name}.<br /><em>{service.slug === 'bespoke-private-search' ? 'Inteiramente à sua medida.' : 'Com intenção.'}</em></>} description={service.description} breadcrumb={`Serviços / ${service.name}`} /><ServiceExperience service={service} /></main>;
}
