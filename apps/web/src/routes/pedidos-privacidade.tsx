import type { Route } from './+types/pedidos-privacidade';
import { seo } from '@/lib/seo';
import { PageIntro } from '@/components/page-intro';
import { PrivacyRequestForm } from '@/components/privacidade/privacy-request-form';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Pedidos de Privacidade — The Cupid Bureau',
    description: 'Exerça os seus direitos sobre os dados pessoais: acesso, rectificação, apagamento, limitação, oposição, portabilidade e retirada de consentimento.',
    path: '/pedidos-privacidade',
  });
}

export default function PedidosPrivacidadePage() {
  return (
    <main id="conteudo">
      <PageIntro
        eyebrow="PRIVACIDADE / OS SEUS DIREITOS"
        title={<>Os seus dados.<br /><em>A sua decisão.</em></>}
        description="Pode exercer a qualquer momento os direitos previstos no Regulamento Geral de Protecção de Dados. Este pedido é confidencial e tratado apenas pela equipa autorizada."
        breadcrumb="Pedidos de Privacidade"
      />
      <section className="enquiry-layout">
        <aside className="enquiry-aside">
          <span className="eyebrow">COMO FUNCIONA</span>
          <h2>Um processo discreto e seguro.</h2>
          <p>
            Recebemos o seu pedido e a nossa equipa analisa-o com cuidado. Para proteger os seus
            dados, poderemos solicitar uma verificação proporcional da sua identidade antes de
            divulgar ou alterar qualquer informação.
          </p>
          <p>
            A retirada de um consentimento não afecta a licitude do tratamento já efectuado. A
            eliminação pode não ser imediata quando existam obrigações legais de conservação
            aplicáveis.
          </p>
          <p>
            Pode também exercer os seus direitos através dos{' '}
            <a href="/contactos">contactos directos</a> ou apresentar reclamação à Comissão
            Nacional de Protecção de Dados, em www.cnpd.pt.
          </p>
        </aside>
        <PrivacyRequestForm />
      </section>
    </main>
  );
}
