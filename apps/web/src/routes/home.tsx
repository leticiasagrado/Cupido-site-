import type { Route } from './+types/home';
import { useLoaderData } from 'react-router';
import { seo } from '@/lib/seo';
import { loadCampaign } from '@/lib/campaign.server';
import {
  CampaignBar,
  Hero2026,
  ValuesMarquee,
  PromoStrip,
  AcademyTeaser,
  FinalInvite2026,
} from '@/components/home26/home-2026';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'The Cupid Bureau — Menos acaso. Mais intenção.',
    description: 'Matchmaking privado em Portugal. Curadoria humana, discrição e acompanhamento personalizado para criar ligações com intenção. Conheça os serviços e a Rede Privada Gratuita.',
    image: '/images/share-lisbon.jpg',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'Organization', name: 'The Cupid Bureau', description: 'Private Matchmaking & Relationship Concierge' },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'The Cupid Bureau', inLanguage: 'pt-PT' },
    ],
  });
}

export async function loader({ request }: Route.LoaderArgs) {
  return { campaign: await loadCampaign(request) };
}

export default function HomePage() {
  const { campaign } = useLoaderData<typeof loader>();
  return (
    <main id="conteudo" className="h26">
      <CampaignBar campaign={campaign} lang="pt" />
      <Hero2026 campaign={campaign} lang="pt" />
      <ValuesMarquee lang="pt" />
      <PromoStrip campaign={campaign} lang="pt" />
      <AcademyTeaser lang="pt" />
      <FinalInvite2026 campaign={campaign} lang="pt" />
    </main>
  );
}
