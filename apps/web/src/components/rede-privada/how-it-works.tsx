import { howItWorksSteps } from '@/data/network-application';

export function HowItWorks() {
  return (
    <section className="section-rail how-it-works">
      <div className="section-index">
        <span>01</span>
        <span>COMO FUNCIONA</span>
      </div>
      <div className="how-it-works-body">
        <span className="eyebrow">TRÊS PASSOS SIMPLES</span>
        <h2>Um percurso<br /><em>sem pressa.</em></h2>
        <ol className="home-steps">
          {howItWorksSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="how-it-works-note">
          A inscrição não garante admissão na rede, apresentações ou encontros. Cada candidatura é
          analisada individualmente, em total confidencialidade.
        </p>
      </div>
    </section>
  );
}
