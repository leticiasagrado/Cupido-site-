import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { Cupid } from '@/components/cupid';

export function FaqAside() {
  return (
    <aside className="faq-aside" aria-label="O mascote da The Cupid Bureau">
      <Cupid variant="embrace" className="faq-cupid" />
      <div>
        <span className="eyebrow">AINDA COM UMA DÚVIDA</span>
        <h2>
          Uma conversa
          <br />
          <em>esclarece o resto.</em>
        </h2>
        <p>Se a resposta que procura não está aqui, escreva-nos. Cada mensagem é lida em privado.</p>
        <Link className="text-link" to="/contactos">
          Falar com a equipa <ArrowUpRight size={15} />
        </Link>
      </div>
    </aside>
  );
}
