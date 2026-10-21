import { Plus } from 'lucide-react';
import { homeFaqs } from '@/data/home';

export function HomeFaq() {
  return (
    <section className="section-rail home-faq" id="faq">
      <div className="section-index">
        <span>06</span>
        <span>PERGUNTAS FREQUENTES</span>
      </div>
      <div className="home-faq-body">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PERGUNTAS FREQUENTES</span>
            <h2>
              As respostas
              <br />
              <em>às suas dúvidas.</em>
            </h2>
          </div>
        </div>
        <div className="home-faq-list">
          {homeFaqs.map((faq, index) => (
            <details className="home-faq-item" key={faq.question}>
              <summary>
                <span className="home-faq-number">{String(index + 1).padStart(2, '0')}</span>
                <span>{faq.question}</span>
                <Plus size={18} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
