import type { Route } from './+types/eventos-privados';
import { seo } from '@/lib/seo';
import { imagery } from '@/data/brand';
import { PageIntro } from '@/components/page-intro';
import { EventExperience } from '@/components/events/event-experience';
import { ConsultationCta } from '@/components/consultation-cta';
export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Eventos privados — The Cupid Bureau', description: 'Experiências intimistas em ambientes cuidadosamente escolhidos. Manifeste interesse nos eventos privados da The Cupid Bureau, com discrição e intenção.', image: imagery.venue });
}
export default function EventsPage() {
  return <main id="conteudo"><PageIntro eyebrow="EVENTOS PRIVADOS / LIGAÇÕES NO MUNDO REAL" title={<>Boas conversas.<br /><em>Lugares com intenção.</em></>} description="Experiências de pequena escala. Pessoas reais. O tempo e o espaço para se conhecerem naturalmente." breadcrumb="Eventos privados" /><EventExperience /><ConsultationCta /></main>;
}
