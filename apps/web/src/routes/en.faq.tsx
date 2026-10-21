import { Plus } from 'lucide-react';
import { seo } from '@/lib/seo';
import { enFaqs } from '@/data/en-content';
import { EnPageIntro } from '@/components/en/page-intro';
import { EnConsultationCta } from '@/components/en/consultation-cta';
import type { Route } from './+types/en.faq';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Frequently asked questions — The Cupid Bureau', description: 'Clarify your questions about private matchmaking, consultations, confidentiality, introductions and monthly services with no mandatory lock-in.', path: '/en/faq', jsonLd: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: enFaqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) } });
}

export default function EnFaqPage() {
  return (
    <main id="conteudo">
      <EnPageIntro eyebrow="FAQ / WITH FULL TRANSPARENCY" title={<>Natural questions.<br /><em>Clear answers.</em></>} description="Trust begins with information. We gathered here the most frequent questions about how we work." breadcrumb="FAQ" />
      <section className="faq-section">
        {enFaqs.map((faq, index) => (
          <details key={faq.question} className="faq-item">
            <summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<Plus size={18} /></summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
      <EnConsultationCta />
    </main>
  );
}
