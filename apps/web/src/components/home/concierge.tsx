import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { imagery } from '@/data/brand';
import { conciergePoints } from '@/data/home';

export function Concierge() {
  return (
    <section className="section-rail concierge" id="concierge">
      <div className="section-index">
        <span>05</span>
        <span>EXPERIÊNCIA CONCIERGE</span>
      </div>
      <div className="concierge-body">
        <div className="concierge-split">
          <div className="concierge-copy">
            <div className="section-heading">
              <div>
                <span className="eyebrow">EXPERIÊNCIA CONCIERGE</span>
                <h2>
                  Há encontros que merecem ser
                  <br />
                  <em>cuidadosamente preparados.</em>
                </h2>
              </div>
              <p>
                Para quem valoriza a discrição, o tempo e uma abordagem personalizada, os nossos
                serviços concierge proporcionam uma experiência mais próxima e adaptada às
                necessidades individuais.
              </p>
            </div>
            <ul className="concierge-points">
              {conciergePoints.map((point) => (
                <li key={point}>
                  <span className="small-diamond" />
                  {point}
                </li>
              ))}
            </ul>
            <Link className="text-link" to="/servicos/elite-concierge" data-cta="concierge-plans">
              Conhecer os planos concierge <ArrowUpRight size={16} />
            </Link>
          </div>
          <figure className="concierge-media">
            <img
              src={imagery.concierge}
              srcSet={imagery.conciergeSrcset}
              sizes="(min-width: 850px) 34vw, (min-width: 640px) 50vw, 100vw"
              alt="Detalhe de uma toalha de linho cremoso com um ramo de alecrim e uma fita de seda bordeaux — atenção concierge ao detalhe."
              loading="lazy"
            />
            <figcaption>
              <span className="eyebrow">ATELIER DO ENCONTRO</span>
              <span className="media-caption-mark">pormenor</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
