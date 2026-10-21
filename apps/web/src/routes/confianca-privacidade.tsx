import type { Route } from './+types/confianca-privacidade';
import { seo } from '@/lib/seo';
import { PageIntro } from '@/components/page-intro';
import { TrustPillars } from '@/components/confianca/trust-pillars';
import { VerificationPortrait } from '@/components/confianca/verification-portrait';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo(
    { matches, location },
    {
      title: 'Confiança & Privacidade — The Cupid Bureau',
      description:
        'Confidencialidade, verificação, consentimento mútuo e protecção dos dados: os quatro pilares que orientam cada relação com a The Cupid Bureau.',
      path: '/confianca-privacidade',
    },
  );
}

export default function ConfiancaPrivacidadePage() {
  return (
    <main id="conteudo">
      <PageIntro
        eyebrow="CONFIANÇA & PRIVACIDADE / O NOSSO COMPROMISSO"
        title={
          <>
            Quatro pilares.
            <br />
            <em>Uma promessa.</em>
          </>
        }
        description="A privacidade não é aqui uma nota jurídica — é parte do serviço. Estes são os princípios que orientam cada conversa, cada apresentação e cada relação com a The Cupid Bureau."
        breadcrumb="Confiança & Privacidade"
      />
      <VerificationPortrait />
      <TrustPillars />
    </main>
  );
}
