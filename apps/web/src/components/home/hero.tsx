import { Link } from 'react-router';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { imagery } from '@/data/brand';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero-image"
        src={imagery.hero}
        alt="Uma conversa tranquila a dois, numa esplanada intimista em Lisboa ao anoitecer"
        width="1536"
        height="672"
        fetchPriority="high"
      />
      <div className="hero-shade" />
      <div className="hero-content">
        <span className="eyebrow hero-eyebrow">
          <span className="little-line" /> PRIVATE MATCHMAKING & RELATIONSHIP CONCIERGE
        </span>
        <h1 id="hero-title">
          O amor merece mais
          <br />
          <em>do que o acaso.</em>
        </h1>
        <p className="hero-description">
          Uma experiência privada de matchmaking, onde a atenção humana, a discrição e a curadoria
          personalizada dão um novo significado à forma de conhecer alguém.
        </p>
        <p className="hero-signature">Menos acaso. Mais intenção.</p>
        <div className="hero-actions">
          <Link className="button button-cream" to="/servicos" data-cta="hero-matchmaking">
            Descobrir o matchmaking privado <ArrowUpRight size={17} />
          </Link>
          <Link className="hero-secondary" to="/rede-privada" data-cta="hero-network">
            Entrar na rede gratuita <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="hero-bottom">
        <span className="eyebrow">LIGAÇÕES HUMANAS. CURADORIA PRIVADA.</span>
        <a href="#diferenca" className="hero-scroll">
          <span>CONHEÇA O BUREAU</span>
          <ArrowDown size={16} />
        </a>
        <span className="hero-edition">PORTUGAL · EST. COM INTENÇÃO</span>
      </div>
    </section>
  );
}
