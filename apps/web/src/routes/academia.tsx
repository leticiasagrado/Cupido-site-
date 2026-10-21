import type { Route } from './+types/academia';
import { seo } from '@/lib/seo';
import { PageIntro } from '@/components/page-intro';
import { AcademySections } from '@/components/academy/academy-page';
import { ConsultationCta } from '@/components/consultation-cta';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'The Cupid Academy — cursos de autoconhecimento e relações',
    description: 'A academia digital da The Cupid Bureau: cursos sobre confiança, comunicação, primeiros encontros e relações conscientes. Inscreva-se na lista de espera.',
    image: '/images/share-lisbon.jpg',
  });
}

export default function AcademyPage() {
  return (
    <main id="conteudo">
      <PageIntro
        eyebrow="THE CUPID BUREAU APRESENTA"
        title={<>The Cupid Academy.<br /><em>O amor também se aprende a cultivar.</em></>}
        description="Uma academia digital dedicada ao autoconhecimento, à confiança, à comunicação e à construção de relações mais conscientes."
        breadcrumb="Academia"
      />
      <AcademySections lang="pt" />
      <ConsultationCta />
    </main>
  );
}
