import type { Route } from './+types/journal';
import { seo } from '@/lib/seo';
import { PageIntro } from '@/components/page-intro';
import { ArticleList } from '@/components/journal/article-list';
import { ConsultationCta } from '@/components/consultation-cta';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Journal — The Cupid Bureau',
    description: 'Ideias com intenção sobre matchmaking privado, relações e autoconhecimento. Três leituras para começar, da The Cupid Bureau.',
    path: '/journal',
  });
}

export default function JournalPage() {
  return (
    <main id="conteudo">
      <PageIntro
        eyebrow="JOURNAL / IDEIAS COM INTENÇÃO"
        title={<>Ideias<br /><em>com intenção.</em></>}
        description="Reflexões sobre matchmaking privado, relações e o que realmente procuramos. Três leituras para começar."
        breadcrumb="Journal"
      />
      <ArticleList />
      <ConsultationCta />
    </main>
  );
}
