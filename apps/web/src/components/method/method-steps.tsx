import { methodSteps } from '@/data/method';

export function MethodSteps() {
  return (
    <section className="section-rail method-steps" id="etapas">
      <div className="section-index">
        <span>05</span>
        <span>AS CINCO ETAPAS</span>
      </div>
      <div className="method-steps-body">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE CUPID METHOD / O PERCURSO</span>
            <h2>
              Um método humano,
              <br />
              <em>passo a passo.</em>
            </h2>
          </div>
          <p>
            Da primeira conversa ao acompanhamento, cada etapa respeita o ritmo, a discrição e o
            consentimento de quem participa. Nada é automático; nada é apressado.
          </p>
        </div>

        <ol className="method-steps-list">
          {methodSteps.map((step) => (
            <li key={step.number} className="method-step">
              <span className="method-step-number">{step.number}</span>
              <div className="method-step-copy">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="method-steps-note">
          O método apoia a decisão humana com escuta, atenção aos detalhes e curadoria cuidada
          em cada etapa.
        </p>
      </div>
    </section>
  );
}
