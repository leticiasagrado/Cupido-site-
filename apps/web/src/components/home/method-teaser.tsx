import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { methodTeaserSteps } from '@/data/home';

export function MethodTeaser() {
  return (
    <section className="section-rail method-teaser" id="metodo">
      <div className="section-index">
        <span>02</span>
        <span>THE CUPID METHOD</span>
      </div>
      <div className="method-teaser-body">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A COMPATIBILIDADE COMEÇA ANTES DO ENCONTRO</span>
            <h2>
              A compatibilidade começa
              <br />
              <em>antes do primeiro encontro.</em>
            </h2>
          </div>
          <p>
            A nossa abordagem valoriza a compreensão das expectativas, das afinidades e dos
            objectivos relacionais, respeitando a individualidade de cada pessoa.
          </p>
        </div>
        <ol className="method-teaser-steps">
          {methodTeaserSteps.map((step) => (
            <li key={step.number}>
              <span className="method-teaser-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link className="text-link" to="/o-nosso-metodo" data-cta="method-link">
          Conhecer o nosso método <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
