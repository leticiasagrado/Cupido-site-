import type { Route } from './+types/perguntas-frequentes';
import { seo } from '@/lib/seo';
import { faqs } from '@/data/faq';
import { PageIntro } from '@/components/page-intro';
import { FaqList } from '@/components/faq/faq-list';
import { FaqAside } from '@/components/faq/faq-aside';
import { ConsultationCta } from '@/components/consultation-cta';
export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Perguntas frequentes — The Cupid Bureau', description: 'Esclareça as suas dúvidas sobre matchmaking privado, consultas, confidencialidade, apresentações e serviços mensais sem fidelização obrigatória.', jsonLd: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) } });
}
export default function FaqPage() {
  return <main id="conteudo"><PageIntro eyebrow="FAQ / COM TODA A TRANSPARÊNCIA" title={<>Perguntas naturais.<br /><em>Respostas claras.</em></>} description="A confiança começa com informação. Reunimos aqui as dúvidas mais frequentes sobre a nossa forma de trabalhar." breadcrumb="Perguntas frequentes" /><FaqList /><FaqAside /><ConsultationCta /></main>;
}
