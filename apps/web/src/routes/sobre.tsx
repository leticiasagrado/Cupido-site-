import type { Route } from './+types/sobre';
import { seo } from '@/lib/seo';
import { imagery } from '@/data/brand';
import { PageIntro } from '@/components/page-intro';
import { BrandStory } from '@/components/about/brand-story';
import { Approach } from '@/components/about/approach';
import { HumanMethod } from '@/components/about/human-method';
import { Privacy } from '@/components/about/privacy';
import { Audience } from '@/components/about/audience';
import { Compatibility } from '@/components/about/compatibility';
import { ConsultationCta } from '@/components/consultation-cta';
import { StatementBand } from '@/components/home/statement-band';
export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Sobre — The Cupid Bureau', description: 'Conheça a The Cupid Bureau: uma boutique de matchmaking privado em Portugal, guiada pela curadoria humana, intenção e confidencialidade.', image: imagery.venue });
}
export default function AboutPage() {
  return <main id="conteudo"><PageIntro eyebrow="O BUREAU / A NOSSA ESSÊNCIA" title={<>Sobre a<br /><em>The Cupid Bureau.</em></>} description="Curadoria humana para histórias que merecem mais do que um algoritmo." breadcrumb="Sobre" /><BrandStory /><StatementBand /><Approach /><HumanMethod /><Privacy /><Audience /><Compatibility /><ConsultationCta /></main>;
}
