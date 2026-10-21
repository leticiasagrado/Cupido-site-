import { Link } from 'react-router';
import type { LegalDocument } from '@/data/legal';

export function LegalContent({ document }: { document: LegalDocument }) {
  return <article className="legal-content"><aside className="legal-notice">{document.notice}</aside>{document.sections.map(section => <section className="legal-section" key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}<section className="legal-section"><h2>Falar com a equipa</h2><p>Para esclarecer uma questão ou exercer os seus direitos, utilize a página de <Link to="/contactos">Contactos</Link>. Consulte também a <Link to="/politica-de-privacidade">Política de Privacidade</Link>, os <Link to="/termos-e-condicoes">Termos e Condições</Link> e a <Link to="/politica-de-cookies">Política de Cookies</Link>.</p></section></article>;
}
