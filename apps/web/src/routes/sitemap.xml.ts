import type { Route } from './+types/sitemap.xml';
import { siteOrigin } from '@/lib/site-origin.server';

type SitemapEntry = {
	path: string;
	lastmod?: string;
};

const STATIC_PATHS = ['/', '/sobre', '/como-funciona', '/o-nosso-metodo', '/servicos', '/servicos/private-matchmaking', '/servicos/signature', '/servicos/elite-concierge', '/servicos/bespoke-private-search', '/eventos-privados', '/confianca-privacidade', '/pedidos-privacidade', '/rede-privada', '/parceiros', '/journal', '/candidatura', '/perguntas-frequentes', '/contactos', '/politica-de-privacidade', '/termos-e-condicoes', '/politica-de-cookies', '/condicoes-comerciais', '/regras-rede-privada', '/conduta-confidencialidade', '/en', '/en/about', '/en/how-it-works', '/en/services', '/en/services/private-matchmaking', '/en/services/signature', '/en/services/elite-concierge', '/en/services/bespoke-private-search', '/en/private-network', '/en/partners', '/en/journal', '/en/trust-privacy', '/en/apply', '/en/faq', '/en/contact'];

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function toLoc(origin: string, path: string): string {
	return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}

function serializeSitemap(origin: string, entries: SitemapEntry[]): string {
	const urls = entries
		.map(entry => {
			const loc = escapeXml(toLoc(origin, entry.path));
			const lastmod = entry.lastmod
				? `\n\t\t<lastmod>${escapeXml(entry.lastmod)}</lastmod>`
				: '';

			return `\t<url>\n\t\t<loc>${loc}</loc>${lastmod}\n\t</url>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/**
 * Public dynamic URLs (blog posts, PDPs, articles).
 * Return `{ path, lastmod }` in the same change that adds a collection.
 * Return `[]` only while the site has no public records; clear those URLs
 * again in the same change that removes the collection.
 */
async function getDynamicEntries(): Promise<SitemapEntry[]> {
	const { articles } = await import('@/data/articles');
	const { enArticles } = await import('@/data/articles-en');
	const pt = articles.map((article) => ({ path: `/journal/${article.slug}`, lastmod: article.isoDate }));
	const en = enArticles.map((article) => ({ path: `/en/journal/${article.slug}`, lastmod: article.isoDate }));
	return [...pt, ...en];
}

export async function loader({ request }: Route.LoaderArgs) {
	const origin = siteOrigin(request);
	const entries: SitemapEntry[] = [
		...STATIC_PATHS.map(path => ({ path })),
		...(await getDynamicEntries()),
	];

	return new Response(serializeSitemap(origin, entries), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
			'Access-Control-Allow-Origin': '*',
		},
	});
}
