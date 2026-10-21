import { Plus } from 'lucide-react';
import { faqs } from '@/data/faq';

export function FaqList() {
  return <section className="faq-section" aria-label="Respostas às perguntas frequentes">{faqs.map((faq, index) => <details className="faq-item" key={faq.question}><summary><span>{String(index + 1).padStart(2, '0')}</span><span>{faq.question}</span><Plus size={20} /></summary><p>{faq.answer}</p></details>)}</section>;
}
