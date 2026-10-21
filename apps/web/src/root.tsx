import {
	data,
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from 'react-router';
import type { Route } from './+types/root';
import stylesheet from '@/index.css?url';
import { siteOrigin } from '@/lib/site-origin.server';
import { HorizonsPreviewScripts } from './horizons-preview-scripts';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { CupidIntro } from '@/components/cupid-intro';
export const links: Route.LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
	{ rel: 'icon', href: '/images/favicon-48.png', type: 'image/png' },
	{ rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' },
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap',
	},
];

/**
 * Publishes the site's public origin, which `seo()` reads to build canonical and
 * `og:url` tags, and advertises the sitemap to crawlers that read response
 * headers rather than HTML.
 *
 * A `meta` export can only reach server data through `matches`, and the `headers`
 * export cannot see loader data at all, so both have to travel this way.
 */
export function loader({ request }: Route.LoaderArgs) {
	const origin = siteOrigin(request);

	return data(
		{ origin },
		{ headers: { Link: `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml"` } },
	);
}

/**
 * A page route that exports `headers` replaces this one, so merge `parentHeaders`
 * there rather than returning only that route's own headers.
 */
export function headers({ loaderHeaders }: Route.HeadersArgs) {
	return loaderHeaders;
}

export function Layout({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const lang = location.pathname.startsWith('/en') ? 'en' : 'pt-PT';
	return (
		<html lang={lang}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<HorizonsPreviewScripts />
			</head>
			<body>
				<div id="root">{children}</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <><a className="skip-link" href="#conteudo">Saltar para o conteúdo</a><CupidIntro /><SiteHeader /><Outlet /><SiteFooter /><WhatsAppButton /></>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = 'Algo não correu como esperado.';
	let details = 'Ocorreu um erro inesperado. Por favor, tente novamente.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? 'Página não encontrada' : 'Não foi possível abrir esta página';
		details =
			error.status === 404
				? 'A página que procura não existe ou já não está disponível.'
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack ? (
				<pre>
					<code>{stack}</code>
				</pre>
			) : null}
		</main>
	);
}
