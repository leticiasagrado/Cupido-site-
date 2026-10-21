import type { Route } from './+types/legal';
import { seo } from '@/lib/seo';
import { legalDocuments } from '@/data/legal';
import { PageIntro } from '@/components/page-intro';
import { LegalContent } from '@/components/legal/legal-content';
export function loader({ url }: Route.LoaderArgs) {
  const document = legalDocuments.find(item => `/${item.slug}` === url.pathname.replace(/\/$/, ''));
  if (!document) throw new Response('Página não encontrada', { status: 404 });
  return { document };
}
export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  return seo({ matches, location }, { title: `${loaderData?.document.title ?? 'Informação legal'} — The Cupid Bureau`, description: loaderData?.document.description ?? 'Informação sobre a utilização do website The Cupid Bureau.' });
}
export default function LegalPage({ loaderData }: Route.ComponentProps) {
  const { document } = loaderData;
  return <main id="conteudo"><PageIntro eyebrow={document.eyebrow} title={document.title} description={document.description} breadcrumb={document.title} /><LegalContent document={document} /></main>;
}
