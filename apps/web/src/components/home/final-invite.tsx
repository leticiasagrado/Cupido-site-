import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';

type CampaignInfo = { discount: number } | null;

export function FinalInvite({ campaign }: { campaign: CampaignInfo }) {
  return (
    <section className="final-invite">
      <span className="eyebrow final-invite-eyebrow">O PRÓXIMO CAPÍTULO COMEÇA AQUI</span>
      <h2>
        A sua próxima história pode começar
        <br />
        <em>com uma decisão.</em>
      </h2>
      <p className="final-invite-subtitle">
        Descubra uma forma mais privada, intencional e humana de conhecer alguém.
      </p>
      <div className="final-invite-actions">
        <Link className="button button-cream" to="/candidatura?tipo=consulta" data-cta="final-consultation">
          Solicitar uma consulta privada <ArrowUpRight size={17} />
        </Link>
        <Link className="final-invite-secondary" to="/rede-privada" data-cta="final-network">
          Entrar na rede gratuita <ArrowUpRight size={16} />
        </Link>
      </div>
      {campaign ? (
        <p className="final-invite-campaign">
          Founding Members — {campaign.discount}% de desconto no primeiro mês dos planos privados.
        </p>
      ) : null}
      <BrandMark monogram tone="light" className="final-invite-monogram" />
    </section>
  );
}
