import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import type { Article } from '@/data/articles';
import { Cupid } from '@/components/cupid';

export function ArticleBody({ article }: { article: Article }) {
  return (
    <>
      <article className="journal-article">
        <span className="eyebrow">{article.category}</span>
        <h1 className="journal-title">{article.title}</h1>
        <p className="journal-meta">{article.date} · {article.readingTime}</p>
        <p className="journal-excerpt">{article.excerpt}</p>
        <div className="journal-body">
          {article.body.map((section) => (
            <section key={section.heading} className="journal-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
      <aside className="journal-aside">
        <Cupid variant="mark" />
        <h2>Conversámos?</h2>
        <p>Se estas ideias ressoam consigo, talvez seja o momento de uma conversa privada.</p>
        <Link className="text-link" to="/candidatura?tipo=consulta">
          Solicitar consulta privada <ArrowUpRight size={16} />
        </Link>
        <Link className="text-link" to="/journal">
          Voltar ao Journal <ArrowUpRight size={16} />
        </Link>
      </aside>
    </>
  );
}
