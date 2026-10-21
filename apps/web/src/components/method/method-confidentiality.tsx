import { Link } from 'react-router';
import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { MethodHero } from '@/components/method/method-hero';
import { MethodSteps } from '@/components/method/method-steps';
import { MethodPrinciples } from '@/components/method/method-principles';
import { MethodDifferentiation } from '@/components/method/method-differentiation';
import { methodDraftNotice } from '@/data/method';

const confidentialityPoints: string[] = [
  'Os questionários não são públicos.',
  'Um candidato não acede às respostas de outro.',
  'As informações são acessíveis apenas à equipa autorizada.',
  'As fotografias permanecem privadas.',
  'A partilha com potenciais compatibilidades é limitada e autorizada.',
  'Os registos de consentimento e de acesso são mantidos de forma apropriada.',
];

export function MethodConfidentiality() {
  return (
    <section className="section-rail method-confidentiality">
      <div className="section-index">
        <span>08</span>
        <span>CONFIDENCIALIDADE</span>
      </div>
      <div className="method-confidentiality-body">
        <span className="eyebrow">THE CUPID METHOD / DISCRICÃO</span>
        <h2>
          O que é partilhado connosco
          <br />
          <em>fica connosco.</em>
        </h2>
        <ul className="method-confidentiality-list">
          {confidentialityPoints.map((point) => (
            <li key={point}>
              <LockKeyhole size={14} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="method-confidentiality-note">
          Não enviamos questionários completos por email. A partilha de informação é sempre
          proporcional, autorizada e registada.
        </p>
      </div>
    </section>
  );
}

export function MethodCta() {
  return (
    <section className="consultation-cta method-cta">
      <span className="eyebrow">O PRÓXIMO PASSO É SEU</span>
      <h2>
        Comece com uma conversa
        <br />
        <em>em total confiança.</em>
      </h2>
      <p>Sem perfis públicos. Sem aplicações. Sem pressa. Apenas escuta humana e curadoria.</p>
      <Link className="button button-burgundy" to="/candidatura">
        Iniciar candidatura <ArrowUpRight size={17} />
      </Link>
      <Link className="text-link" to="/confianca-privacidade" style={{ marginTop: '18px' }}>
        Conheça o nosso compromisso de privacidade <ArrowUpRight size={15} />
      </Link>
    </section>
  );
}
