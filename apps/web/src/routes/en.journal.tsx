import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { seo } from '@/lib/seo';
import { enArticles } from '@/data/articles-en';
import { EnPageIntro } from '@/components/en/page-intro';
import { EnConsultationCta } from '@/components/en/consultation-cta';
import type { Route } from './+types/en.journal';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Journal — The Cupid Bureau', description: 'Ideas with intention about private matchmaking, relationships and self-knowledge. Three reads to begin.', path: '/en/journal' });
}

export default function EnJournalPage() {
  return (
    <main id="conteudo">
      <EnPageIntro eyebrow="JOURNAL / IDEAS WITH INTENTION" title={<>Ideas<br /><em>with intention.</em></>} description="Reflections on private matchmaking, relationships and what we are truly looking for. Three reads to begin." breadcrumb="Journal" />
      <section className="journal-list">
        <span className="eyebrow">JOURNAL / IDEAS WITH INTENTION</span>
        <h2>Three reads<br /><em>to begin.</em></h2>
        <div className="journal-grid">
          {enArticles.map((article, index) => (
            <Link key={article.slug} to={`/en/journal/${article.slug}`} className="journal-card">
              <span className="journal-card-top">{`0${index + 1}`} / {article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <span className="journal-card-meta">{article.date} · {article.readingTime}</span>
              <span className="journal-card-link">Read article <ArrowUpRight size={16} /></span>
            </Link>
          ))}
        </div>
      </section>
      <EnConsultationCta />
    </main>
  );
}
