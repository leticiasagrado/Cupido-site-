import { useSearchParams } from 'react-router';
import type { Route } from './+types/candidatura';
import { seo } from '@/lib/seo';
import { PageIntro } from '@/components/page-intro';
import { EnquiryPanel } from '@/components/enquiry/enquiry-panel';
export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Candidatura e consulta privada — The Cupid Bureau', description: 'Dê o primeiro passo para um acompanhamento privado. Envie a sua candidatura ou solicite uma consulta confidencial à equipa da The Cupid Bureau.', path: '/candidatura' });
}
export default function ApplicationPage() {
  const [params] = useSearchParams();
  const consultation = params.get('tipo') === 'consulta';
  const events = params.get('tipo') === 'eventos';
  return <main id="conteudo"><PageIntro eyebrow={consultation ? 'CONSULTA PRIVADA / O PRIMEIRO CONTACTO' : events ? 'EVENTOS PRIVADOS / MANIFESTAÇÃO DE INTERESSE' : 'CANDIDATURA / UM NOVO CAPÍTULO'} title={consultation ? <>Tudo começa<br /><em>com uma conversa.</em></> : events ? <>Boas conversas.<br /><em>Novas possibilidades.</em></> : <>A sua história.<br /><em>Com mais intenção.</em></>} description={consultation || events ? 'Partilhe um pouco sobre si. A nossa equipa irá analisar o seu pedido com atenção e entrar em contacto de forma privada.' : 'Dois percursos, uma mesma intenção: conhecer pessoas com compatibilidade real. Pode contratar um serviço de matchmaking privado ou integrar a nossa rede privada, aberto a uma eventual apresentação.'} breadcrumb={consultation ? 'Consulta privada' : 'Candidatura'} /><EnquiryPanel /></main>;
}
