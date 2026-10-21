import { Link } from 'react-router';
import { ArrowUpRight, LockKeyhole, ShieldCheck, HeartHandshake, Database } from 'lucide-react';
import { trustPillars } from '@/data/confianca';

const pillarIcons = [LockKeyhole, ShieldCheck, HeartHandshake, Database];

export function TrustPillars() {
  return (
    <>
      <section className="trust-intro section-rail">
        <div className="section-index">
          <span>01</span>
          <span>QUATRO PILARES</span>
        </div>
        <div className="trust-intro-body">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CONFIANÇA &amp; PRIVACIDADE / O NOSSO COMPROMISSO</span>
              <h2>
                Confiança não se promete.
                <br />
                <em>Constrói-se.</em>
              </h2>
            </div>
            <p>
              A confiança é o fundamento de tudo o que fazemos. Sem ela, não existe matchmaking —
              existe apenas exposição. Estes são os quatro pilares que orientam cada relação com a
              The Cupid Bureau.
            </p>
          </div>
        </div>
      </section>

      <section className="trust-pillars">
        {trustPillars.map((pillar, index) => {
          const Icon = pillarIcons[index] ?? LockKeyhole;
          return (
            <article key={pillar.index} className="trust-pillar">
              <div className="trust-pillar-head">
                <span className="trust-pillar-number">{pillar.index}</span>
                <Icon size={26} />
              </div>
              <h3>{pillar.title}</h3>
              <p className="trust-pillar-summary">{pillar.summary}</p>
              <p className="trust-pillar-detail">{pillar.detail}</p>
            </article>
          );
        })}
      </section>

      <section className="trust-statement statement">
        <h2>
          A sua história é sua. <em>Partilhamo-la com cuidado.</em>
        </h2>
      </section>

      <section className="trust-cta consultation-cta">
        <span className="eyebrow">O PRÓXIMO PASSO É SEU</span>
        <h2>
          Comece com uma conversa
          <br />
          <em>em total confiança.</em>
        </h2>
        <p>Sem perfis públicos. Sem aplicações. Sem pressa.</p>
        <Link className="button button-burgundy" to="/candidatura">
          Iniciar candidatura <ArrowUpRight size={17} />
        </Link>
        <Link className="text-link" to="/politica-de-privacidade" style={{ marginTop: '18px' }}>
          Consultar a Política de Privacidade <ArrowUpRight size={15} />
        </Link>
      </section>
    </>
  );
}
