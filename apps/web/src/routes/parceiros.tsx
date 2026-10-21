import type { Route } from './+types/parceiros';
import { seo } from '@/lib/seo';
import { PageIntro } from '@/components/page-intro';
import { PartnerForm } from '@/components/parceiros/partner-form';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Parceiros, Imprensa e Espaços — The Cupid Bureau',
    description: 'Restaurantes, hotéis, marcas e imprensa podem tornar-se parceiros dos eventos e do concierge da The Cupid Bureau. Partilhe a sua ideia de colaboração.',
    path: '/parceiros',
  });
}

export default function ParceirosPage() {
  return (
    <main id="conteudo">
      <PageIntro
        eyebrow="PARCEIROS / COLABORAÇÕES COM INTENÇÃO"
        title={<>Boas parcerias.<br /><em>Lugares com intenção.</em></>}
        description="Restaurantes, hotéis, marcas e imprensa podem tornar-se parceiros dos nossos eventos privados e do nosso concierge. Se partilha o nosso cuidado pelo detalhe e pela discrição, gostaríamos de o conhecer."
        breadcrumb="Parceiros"
      />
      <section className="enquiry-layout">
        <aside className="enquiry-aside">
          <h2>Colaborar<br /><em>com o Bureau.</em></h2>
          <p>Trabalhamos com espaços cuidadosamente escolhidos e marcas que partilham os nossos valores de elegância, discrição e cuidado humano.</p>
          <p>Se é jornalista, uma marca ou um espaço que gostaria de acolher os nossos encontros e experiências, partilhe a sua ideia através do formulário. A equipa entrará em contacto.</p>
        </aside>
        <PartnerForm />
      </section>
    </main>
  );
}
