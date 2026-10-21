import type { Route } from './+types/o-nosso-metodo';
import { seo } from '@/lib/seo';
import { MethodHero } from '@/components/method/method-hero';
import { MethodSteps } from '@/components/method/method-steps';
import { MethodPrinciples } from '@/components/method/method-principles';
import { MethodDifferentiation } from '@/components/method/method-differentiation';
import { MethodConfidentiality, MethodCta } from '@/components/method/method-confidentiality';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo(
    { matches, location },
    {
      title: 'O Nosso Método — The Cupid Bureau',
      description:
        'The Cupid Method: descoberta, afinidades, curadoria humana, interesse mútuo e acompanhamento. Um método humano de matchmaking, feito de escuta e curadoria cuidada.',
      path: '/o-nosso-metodo',
    },
  );
}

export default function ONossoMetodoPage() {
  return (
    <main id="conteudo">
      <MethodHero />
      <MethodSteps />
      <MethodPrinciples />
      <MethodDifferentiation />
      <MethodConfidentiality />
      <MethodCta />
    </main>
  );
}
