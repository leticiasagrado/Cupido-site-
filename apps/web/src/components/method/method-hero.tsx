import { ArrowDown } from 'lucide-react';
import { imagery } from '@/data/brand';

const METHOD_IMAGE = imagery.methodHero;
const METHOD_IMAGE_SRCSET = imagery.methodHeroSrcset;

export function MethodHero() {
  return (
    <section className="method-hero">
      <img
        className="method-hero-image"
        src={METHOD_IMAGE}
        srcSet={METHOD_IMAGE_SRCSET}
        sizes="100vw"
        alt="Mesa elegante para dois junto a uma janela, com luz dourada da tarde — atmosfera de discrição e encontro."
      />
      <div className="method-hero-shade" aria-hidden="true" />
      <div className="method-hero-content">
        <span className="eyebrow method-hero-eyebrow">
          <span className="little-line" /> THE CUPID METHOD / O NOSSO MÉTODO
        </span>
        <h1>
          A compatibilidade começa
          <br />
          muito antes do <em>primeiro encontro.</em>
        </h1>
        <p className="method-hero-lead">
          Na The Cupid Bureau, acreditamos que conhecer alguém verdadeiramente compatível exige
          mais do que coincidências. Exige escuta, atenção aos detalhes e uma compreensão genuína
          do que cada pessoa procura.
        </p>
        <a className="method-hero-scroll" href="#etapas">
          <ArrowDown size={14} /> As cinco etapas
        </a>
      </div>
    </section>
  );
}
