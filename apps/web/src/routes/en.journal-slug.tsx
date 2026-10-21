import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { seo } from '@/lib/seo';
import { getEnArticle } from '@/data/articles-en';
import { Cupid } from '@/components/cupid';
import type { Route } from './+types/en.journal-slug';

export function loader({ params }: Route.LoaderArgs) {
  const article = getEnArticle(params.slug);
  if (!article) throw new Response('Article not found', { status: 404 });
  return { article };
}

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: `${loaderData?.article.title ?? 'Journal'} — The Cupid Bureau`,
    description: loaderData?.article.excerpt ?? 'Ideas with intention from The Cupid Bureau.',
    path: `/en/journal/${loaderData?.article.slug ?? ''}`,
    jsonLd: loaderData ? { '@context': 'https://schema.org', '@type': 'Article', headline: loaderData.article.title, description: loaderData.article.excerpt, datePublished: loaderData.article.isoDate, inLanguage: 'en', author: { '@type': 'Organization', name: 'The Cupid Bureau' } } : undefined,
  });
}

export default function EnJournalArticlePage({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;
  return (
    <main id="conteudo">
      <article className="journal-article">
        <span className="eyebrow">{article.category}</span>
        <h1 className="journal-title">{article.title}</h1>
        <p className="journal-meta">{article.date} · {article.readingTime}</p>
        <p className="journal-excerpt">{article.excerpt}</p>
        <div className="journal-body">
          {article.body.map((section) => (
            <section key={section.heading} className="journal-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </section>
          ))}
        </div>
      </article>
      <aside className="journal-aside">
        <Cupid variant="mark" />
        <h2>Shall we talk?</h2>
        <p>If these ideas resonate with you, it may be time for a private conversation.</p>
        <Link className="text-link" to="/en/apply?tipo=consulta">Request a private consultation <ArrowUpRight size={16} /></Link>
        <Link className="text-link" to="/en/journal">Back to the Journal <ArrowUpRight size={16} /></Link>
      </aside>
    </main>
  );
}
