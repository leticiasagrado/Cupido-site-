import { methodPrinciples } from '@/data/method';

export function MethodPrinciples() {
  return (
    <>
      <section className="method-principles">
        {methodPrinciples.map((principle) => (
          <article key={principle.index} className="method-principle">
            <div className="method-principle-head">
              <span className="method-principle-index">{principle.index}</span>
              <span className="method-principle-roman">{principle.index}</span>
            </div>
            <h3>{principle.title}</h3>
            <p className="method-principle-summary">{principle.summary}</p>
            <p className="method-principle-detail">{principle.detail}</p>
          </article>
        ))}
      </section>

      <section className="statement method-statement">
        <h2>
          Conhecer alguém é um acto de cuidado. <em>Não de cálculo.</em>
        </h2>
      </section>
    </>
  );
}
