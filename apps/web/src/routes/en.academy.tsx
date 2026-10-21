import type { Route } from './+types/en.academy';
import { seo } from '@/lib/seo';
import { EnPageIntro } from '@/components/en/page-intro';
import { AcademySections } from '@/components/academy/academy-page';
import { EnConsultationCta } from '@/components/en/consultation-cta';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'The Cupid Academy — courses on confidence and relationships',
    description: 'The Cupid Bureau digital academy: courses on confidence, communication, first dates and conscious relationships. Join the waiting list.',
    image: '/images/share-lisbon.jpg',
    path: '/en/academy',
  });
}

export default function EnAcademyPage() {
  return (
    <main id="conteudo">
      <EnPageIntro
        eyebrow="THE CUPID BUREAU PRESENTS"
        title={<>The Cupid Academy.<br /><em>Love can also be learned and nurtured.</em></>}
        description="A digital academy dedicated to self-knowledge, confidence, communication and building more conscious relationships."
        breadcrumb="Academy"
      />
      <AcademySections lang="en" />
      <EnConsultationCta />
    </main>
  );
}
