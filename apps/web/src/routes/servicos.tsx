import type { Route } from './+types/servicos';
import { useLoaderData } from 'react-router';
import { seo } from '@/lib/seo';
import { loadCampaign } from '@/lib/campaign.server';
import { Plans2026 } from '@/components/home26/home-2026';
import { FoundingMembers } from '@/components/home/founding-members';
import { Concierge } from '@/components/home/concierge';
import { PageIntro } from '@/components/page-intro';
import { ServiceList } from '@/components/services/service-list';
import { ConsultationCta } from '@/components/consultation-cta';
export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Serviços de matchmaking privado — The Cupid Bureau', description: 'Private, Signature, Elite Concierge e Bespoke Private Search: quatro níveis de matchmaking e acompanhamento personalizado, sem fidelização obrigatória.' });
}
export async function loader({ request }: Route.LoaderArgs) {
  return { campaign: await loadCampaign(request) };
}
export default function ServicesPage() {
  const { campaign } = useLoaderData<typeof loader>();
  return <main id="conteudo"><PageIntro eyebrow="SERVIÇOS / DIFERENTES NÍVEIS DE CUIDADO" title={<>O seu processo.<br /><em>O acompanhamento<br />que fizer sentido para si.</em></>} description="Da curadoria dentro da nossa rede a uma pesquisa internacional à medida. Encontramos consigo o nível de acompanhamento adequado ao seu momento de vida." breadcrumb="Serviços" />{campaign ? <FoundingMembers discount={campaign.discount} /> : null}<div className="h26"><Plans2026 campaign={campaign} lang="pt" /></div><ServiceList /><Concierge /><ConsultationCta /></main>;
}
