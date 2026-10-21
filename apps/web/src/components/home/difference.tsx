import { imagery } from '@/data/brand';
import { differencePillars } from '@/data/home';

export function Difference() {
  return (
    <section className="section-rail difference" id="diferenca">
      <div className="section-index">
        <span>01</span>
        <span>A NOSSA DIFERENÇA</span>
      </div>
      <div className="difference-body">
        <div className="difference-split">
          <div className="difference-copy">
            <span className="eyebrow">NÃO SOMOS MAIS UMA APLICAÇÃO</span>
            <h2>
              Não somos mais uma
              <br />
              <em>aplicação de encontros.</em>
            </h2>
            <p>
              Na The Cupid Bureau, acreditamos que conhecer alguém não deve significar percorrer
              intermináveis perfis. Privilegiamos uma abordagem privada, cuidada e humana, onde cada
              possibilidade é considerada com intenção.
            </p>
          </div>
          <figure className="difference-media">
            <img
              src={imagery.difference}
              srcSet={imagery.differenceSrcset}
              sizes="(min-width: 850px) 38vw, (min-width: 640px) 50vw, 100vw"
              alt="Mãos femininas a segurar uma chávena de porcelana sobre uma toalha de linho, em luz suave de janela — um momento tranquilo e intencional."
              loading="lazy"
            />
            <figcaption>
              <span className="eyebrow">DISCREÇÃO · CURADORIA</span>
              <span className="media-caption-mark">intenção</span>
            </figcaption>
          </figure>
        </div>
        <div className="difference-pillars">
          {differencePillars.map((pillar) => (
            <div key={pillar.number} className="difference-pillar">
              <span className="difference-pillar-number">{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
