import { useLoaderData } from 'react-router';
import { seo } from '@/lib/seo';
import { loadCampaign } from '@/lib/campaign.server';
import {
  CampaignBar,
  Hero2026,
  ValuesMarquee,
  PromoStrip,
  FinalInvite2026,
} from '@/components/home26/home-2026';
import type { Route } from './+types/en.home';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'The Cupid Bureau — Less chance. More intention.',
    description: 'Private matchmaking in Portugal. Human curation, personalised guidance and confidentiality to create intentional connections, month by month.',
    image: '/images/share-lisbon.jpg',
    path: '/en',
  });
}

export async function loader({ request }: Route.LoaderArgs) {
  return { campaign: await loadCampaign(request) };
}

export default function EnHomePage() {
  const { campaign } = useLoaderData<typeof loader>();
  return (
    <main id="conteudo" className="h26">
      <CampaignBar campaign={campaign} lang="en" />
      <Hero2026 campaign={campaign} lang="en" />
      <ValuesMarquee lang="en" />
      <PromoStrip campaign={campaign} lang="en" />
      <FinalInvite2026 campaign={campaign} lang="en" />
    </main>
  );
}
