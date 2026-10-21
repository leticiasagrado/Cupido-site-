import type { Route } from './+types/rede-privada';
import { seo } from '@/lib/seo';
import { NetworkHero } from '@/components/rede-privada/network-hero';
import { HowItWorks } from '@/components/rede-privada/how-it-works';
import { NetworkForm } from '@/components/rede-privada/network-form';
import { PaidPlansCta } from '@/components/rede-privada/paid-plans-cta';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Rede Privada Gratuita — The Cupid Bureau',
    description: 'Faça parte de uma rede privada de pessoas que valorizam relações genuínas, discrição e encontros com intenção. Crie o seu perfil gratuito, em total confidencialidade.',
    path: '/rede-privada',
  });
}

export default function RedePrivadaPage() {
  return (
    <main id="conteudo">
      <NetworkHero />
      <HowItWorks />
      <section className="enquiry-layout" id="candidatura">
        <aside className="enquiry-aside">
          <h2>Crie o seu perfil<br /><em>gratuito e privado.</em></h2>
          <p>
            Partilhe as informações essenciais para iniciar a sua candidatura. Pode anexar
            fotografias agora ou mais tarde — a candidatura sem fotografia é permitida.
          </p>
          <p>
            A sua candidatura é analisada individualmente. Entraremos em contacto caso surja uma
            potencial compatibilidade, sempre respeitando o interesse mútuo.
          </p>
          <span className="eyebrow">PRIVADO DESDE O PRIMEIRO PASSO</span>
        </aside>
        <NetworkForm />
      </section>
      <PaidPlansCta />
    </main>
  );
}
