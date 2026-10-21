import type { Route } from './+types/journal-slug';
import { seo } from '@/lib/seo';
import { getArticle, articles } from '@/data/articles';
import { ArticleBody } from '@/components/journal/article-body';

export function loader({ params }: Route.LoaderArgs) {
  const article = getArticle(params.slug);
  if (!article) throw new Response('Artigo não encontrado', { status: 404 });
  return { article };
}

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: `${loaderData?.article.title ?? 'Journal'} — The Cupid Bureau`,
    description: loaderData?.article.excerpt ?? 'Ideias com intenção da The Cupid Bureau.',
    path: `/journal/${loaderData?.article.slug ?? ''}`,
    jsonLd: loaderData ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: loaderData.article.title,
      description: loaderData.article.excerpt,
      datePublished: loaderData.article.isoDate,
      inLanguage: 'pt-PT',
      author: { '@type': 'Organization', name: 'The Cupid Bureau' },
    } : undefined,
  });
}

export default function JournalArticlePage({ loaderData }: Route.ComponentProps) {
  return <main id="conteudo"><ArticleBody article={loaderData.article} /></main>;
}

export function links(): { rel: string; href: string }[] {
  return articles.map((article) => ({
    rel: 'prefetch',
    href: `/journal/${article.slug}`,
  }));
}
