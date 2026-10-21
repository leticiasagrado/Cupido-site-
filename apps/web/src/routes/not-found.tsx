import { Link } from 'react-router';
import type { Route } from './+types/not-found';
import { seo } from '@/lib/seo';
import { Cupid } from '@/components/cupid';
export function loader() { throw new Response('Página não encontrada', { status: 404 }); }
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Página não encontrada — The Cupid Bureau', description: 'A página que procura não está disponível. Regresse ao início para conhecer a The Cupid Bureau.', noindex: true }); }
export default function NotFound() { return <main id="conteudo" className="not-found"><Cupid variant="embrace" className="not-found-cupid h26-float" decorative /><h1>Parece que nos desencontrámos.</h1><p>A página que procura não está disponível.</p><Link className="button button-burgundy" to="/">Regressar ao início</Link></main>; }
export function ErrorBoundary() { return <NotFound />; }
