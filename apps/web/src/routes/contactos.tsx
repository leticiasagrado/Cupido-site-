import type { Route } from './+types/contactos';
import { seo } from '@/lib/seo';
import { PageIntro } from '@/components/page-intro';
import { ContactOptions } from '@/components/contact/contact-options';
import { EnquiryPanel } from '@/components/enquiry/enquiry-panel';
export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Contactos e consultas privadas — The Cupid Bureau', description: 'Fale com a equipa da The Cupid Bureau. Envie uma mensagem, esclareça dúvidas ou peça uma consulta privada para conhecer o nosso acompanhamento.' });
}
export default function ContactPage() {
  return <main id="conteudo"><PageIntro eyebrow="CONTACTOS / ESTAMOS A OUVIR" title={<>Uma pergunta.<br /><em>Uma possibilidade.</em></>} description="Uma conversa humana, desde o primeiro contacto. Conte-nos como podemos ajudar." breadcrumb="Contactos" /><ContactOptions /><EnquiryPanel contact /></main>;
}
