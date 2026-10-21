import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { articles } from '@/data/articles';

export function ArticleList() {
  return (
    <section className="journal-list">
      <span className="eyebrow">JOURNAL / IDEIAS COM INTENÇÃO</span>
      <h2>Três leituras<br /><em>para começar.</em></h2>
      <div className="journal-grid">
        {articles.map((article, index) => (
          <Link key={article.slug} to={`/journal/${article.slug}`} className="journal-card">
            <span className="journal-card-top">{`0${index + 1}`} / {article.category}</span>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <span className="journal-card-meta">{article.date} · {article.readingTime}</span>
            <span className="journal-card-link">Ler artigo <ArrowUpRight size={16} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
