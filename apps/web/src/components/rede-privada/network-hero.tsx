import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { imagery } from '@/data/brand';
import { Cupid } from '@/components/cupid';

export function NetworkHero() {
  return (
    <section className="hero network-hero">
      <img className="hero-image" src={imagery.conversation} alt="" width="1600" height="900" />
      <div className="hero-shade" aria-hidden="true" />
      <Cupid variant="search" className="network-hero-cupid h26-float" decorative />
      <div className="hero-content">
        <span className="eyebrow hero-eyebrow"><span className="little-line" /> A NOSSA REDE PRIVADA</span>
        <h1>Talvez alguém<br /><em>esteja à sua procura.</em></h1>
        <p className="hero-description">
          Faça parte de uma rede privada de pessoas que valorizam relações genuínas, discrição e
          encontros com intenção.
        </p>
        <div className="hero-actions">
          <Link className="button button-burgundy" to="#candidatura">
            Criar o meu perfil gratuito <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="hero-footnote">Sem mensalidades. Sem perfis públicos. Sem obrigação de contratar qualquer serviço.</p>
      </div>
    </section>
  );
}
