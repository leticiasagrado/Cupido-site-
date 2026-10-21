import type { Route } from './+types/como-funciona';
import { seo } from '@/lib/seo';
import { Bento } from '@/components/home26/home-2026';
import { PageIntro } from '@/components/page-intro';
import { ProcessTimeline } from '@/components/process/process-timeline';
import { ConsultationCta } from '@/components/consultation-cta';
export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Como funciona o matchmaking privado — The Cupid Bureau', description: 'Da candidatura ao primeiro encontro: conheça o nosso processo de matchmaking, com pesquisa humana, consentimento mútuo e acompanhamento privado.' });
}
export default function ProcessPage() {
  return <main id="conteudo"><PageIntro eyebrow="COMO FUNCIONA / PASSO A PASSO" title={<>O seu ritmo.<br /><em>O nosso cuidado.</em></>} description="Uma experiência privada desde o primeiro contacto. Cada etapa tem uma intenção: conhecer melhor, procurar com critério e criar espaço para uma ligação real." breadcrumb="Como funciona" /><div className="h26"><Bento lang="pt" showHeadLink={false} /></div><ProcessTimeline /><ConsultationCta /></main>;
}
