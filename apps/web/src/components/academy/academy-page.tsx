import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import { ArrowRight, LoaderCircle, LockKeyhole, ShieldCheck } from 'lucide-react';
import { pocketbaseClient } from '@/lib/pocketbase-client';
import { Cupid } from '@/components/cupid';
import { academyCourses, academyProducts, type AcademyItemId } from '@/data/academy';

type Lang = 'pt' | 'en';

const copy = {
  pt: {
    coursesEyebrow: 'Os cursos',
    coursesA: 'Seis percursos para',
    coursesB: 'cultivar o amor.',
    soon: 'Em breve',
    notify: 'Quero ser avisado/a',
    productsEyebrow: 'Produtos digitais',
    productsA: 'Pequenos passos,',
    productsB: 'grandes conversas.',
    noPlan: 'Não precisa de contratar um plano de matchmaking para aceder à Academia.',
    disclaimerTitle: 'Responsabilidade profissional',
    disclaimer:
      'A The Cupid Academy oferece educação e orientação relacional. Não substitui acompanhamento psicológico ou psicoterapia, e não promete resultados amorosos. Os preços e conteúdos são indicativos e podem ser ajustados antes do lançamento.',
    formEyebrow: 'Lista de espera',
    formA: 'Seja o primeiro',
    formB: 'a saber.',
    formText: 'Inscreva-se na lista de espera e avisamos quando as inscrições abrirem. Sem pagamento e sem compromisso.',
    name: 'Nome *',
    email: 'Email *',
    course: 'Curso de interesse *',
    all: 'Todos os cursos e produtos',
    message: 'Mensagem',
    optional: '(opcional)',
    consent: 'Li a Política de Privacidade e autorizo o tratamento dos meus dados para ser avisado/a sobre a The Cupid Academy. *',
    marketing: 'Aceito receber novidades e campanhas da The Cupid Bureau.',
    submit: 'Entrar na lista de espera',
    sending: 'A enviar…',
    errorFields: 'Preencha o nome, um email válido e aceite a Política de Privacidade.',
    errorSave: 'Não foi possível guardar o seu pedido. Verifique a sua ligação e tente novamente.',
    successEyebrow: 'Está na lista',
    successTitle: 'Avisamos assim que as inscrições abrirem.',
    successText: 'Enviámos uma confirmação para o seu email.',
    security: 'Os seus dados são usados apenas para o avisar sobre a Academia.',
    privacyHref: '/politica-de-privacidade',
  },
  en: {
    coursesEyebrow: 'The courses',
    coursesA: 'Six paths to',
    coursesB: 'nurture love.',
    soon: 'Coming soon',
    notify: 'Notify me',
    productsEyebrow: 'Digital products',
    productsA: 'Small steps,',
    productsB: 'meaningful conversations.',
    noPlan: 'You do not need a matchmaking plan to join the Academy.',
    disclaimerTitle: 'Professional responsibility',
    disclaimer:
      'The Cupid Academy offers relationship education and guidance. It does not replace psychological support or psychotherapy, and does not promise romantic outcomes. Prices and content are indicative and may change before launch.',
    formEyebrow: 'Waiting list',
    formA: 'Be the first',
    formB: 'to know.',
    formText: 'Join the waiting list and we will tell you when enrolment opens. No payment, no commitment.',
    name: 'Name *',
    email: 'Email *',
    course: 'Course of interest *',
    all: 'All courses and products',
    message: 'Message',
    optional: '(optional)',
    consent: 'I have read the Privacy Policy and agree to my data being used to notify me about The Cupid Academy. *',
    marketing: 'I agree to receive news and campaigns from The Cupid Bureau.',
    submit: 'Join the waiting list',
    sending: 'Sending…',
    errorFields: 'Please enter your name, a valid email and accept the Privacy Policy.',
    errorSave: 'We could not save your request. Check your connection and try again.',
    successEyebrow: "You're on the list",
    successTitle: 'We will let you know as soon as enrolment opens.',
    successText: 'We have sent a confirmation to your email.',
    security: 'Your details are only used to notify you about the Academy.',
    privacyHref: '/en/trust-privacy',
  },
} as const;

export function AcademySections({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [selected, setSelected] = useState<AcademyItemId>('todos');

  function pick(id: AcademyItemId) {
    setSelected(id);
    if (typeof document !== 'undefined') {
      document.getElementById('lista-de-espera')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="h26 academy">
      <section className="h26-section" aria-labelledby="academy-courses-title">
        <div className="h26-section-head">
          <div>
            <span className="h26-eyebrow academy-eyebrow h26-reveal">{t.coursesEyebrow}</span>
            <h2 id="academy-courses-title" className="h26-reveal">
              {t.coursesA} <em>{t.coursesB}</em>
            </h2>
          </div>
        </div>
        <div className="academy-grid">
          {academyCourses.map((course, index) => (
            <article key={course.id} className={`academy-card h26-reveal ${course.featured ? 'is-featured' : ''}`}>
              <span className="academy-card-top">
                <span className="h26-eyebrow">{`0${index + 1} · ${course.category[lang]}`}</span>
                <span className="academy-soon">{t.soon}</span>
              </span>
              <h3>{course.name[lang]}</h3>
              <p>{course.description[lang]}</p>
              <span className="academy-meta">
                <span>{course.format[lang]}</span>
                <strong>{course.price[lang]}</strong>
              </span>
              <button type="button" className="academy-notify" onClick={() => pick(course.id)}>
                {t.notify} <ArrowRight size={15} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="h26-section" aria-labelledby="academy-products-title">
        <div className="academy-products">
          <div>
            <span className="h26-eyebrow academy-eyebrow h26-reveal">{t.productsEyebrow}</span>
            <h2 id="academy-products-title" className="h26-reveal">
              {t.productsA} <em>{t.productsB}</em>
            </h2>
            <Cupid variant="embrace" className="academy-products-cupid h26-float" decorative />
          </div>
          <ul className="academy-product-list">
            {academyProducts.map((product) => (
              <li key={product.id} className="h26-reveal">
                <span>{product.name[lang]}</span>
                <strong>{product.price[lang]}</strong>
                <button type="button" className="academy-notify" onClick={() => pick(product.id)}>
                  {t.notify} <ArrowRight size={14} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="academy-band h26-reveal">{t.noPlan}</div>

      <section className="h26-section">
        <aside className="academy-disclaimer h26-reveal">
          <ShieldCheck size={22} aria-hidden="true" />
          <div>
            <strong>{t.disclaimerTitle}</strong>
            <p>{t.disclaimer}</p>
          </div>
        </aside>
      </section>

      <section className="h26-section" id="lista-de-espera" aria-labelledby="academy-form-title">
        <div className="academy-form-wrap h26-reveal">
          <div className="academy-form-intro">
            <span className="h26-eyebrow academy-eyebrow">{t.formEyebrow}</span>
            <h2 id="academy-form-title">
              {t.formA} <em>{t.formB}</em>
            </h2>
            <p>{t.formText}</p>
          </div>
          <AcademyForm lang={lang} selected={selected} onSelect={setSelected} />
        </div>
      </section>
    </div>
  );
}

function AcademyForm({ lang, selected, onSelect }: { lang: Lang; selected: AcademyItemId; onSelect: (id: AcademyItemId) => void }) {
  const t = copy[lang];
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const values = new FormData(event.currentTarget);
    if (String(values.get('website_trap') || '').trim()) {
      setError(t.errorSave);
      return;
    }
    const name = String(values.get('name') || '').trim();
    const email = String(values.get('email') || '').trim();
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || values.get('consent') !== 'on') {
      setError(t.errorFields);
      return;
    }
    setError('');
    setPending(true);
    try {
      await pocketbaseClient.collection('academy_interest').create({
        name,
        email,
        course: selected,
        message: String(values.get('message') || '').trim().slice(0, 1000),
        lang,
        consent: true,
        consentMarketing: values.get('consentMarketing') === 'on',
      });
      setSuccess(true);
    } catch {
      setError(t.errorSave);
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div className="academy-success" role="status" aria-live="polite">
        <Cupid variant="embrace" className="academy-success-cupid" decorative />
        <span className="h26-eyebrow academy-eyebrow">{t.successEyebrow}</span>
        <h3>{t.successTitle}</h3>
        <p>{t.successText}</p>
      </div>
    );
  }

  return (
    <form className="academy-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="ac-name">{t.name}</label>
        <input id="ac-name" name="name" autoComplete="name" required minLength={2} maxLength={160} />
      </div>
      <div className="field">
        <label htmlFor="ac-email">{t.email}</label>
        <input id="ac-email" type="email" name="email" autoComplete="email" required maxLength={254} />
      </div>
      <div className="field field-wide">
        <label htmlFor="ac-course">{t.course}</label>
        <select id="ac-course" name="course" value={selected} onChange={(e) => onSelect(e.target.value as AcademyItemId)}>
          <option value="todos">{t.all}</option>
          {academyCourses.map((c) => <option key={c.id} value={c.id}>{c.name[lang]}</option>)}
          {academyProducts.map((p) => <option key={p.id} value={p.id}>{p.name[lang]}</option>)}
        </select>
      </div>
      <div className="field field-wide">
        <label htmlFor="ac-message">{t.message} <span>{t.optional}</span></label>
        <textarea id="ac-message" name="message" rows={3} maxLength={1000} />
      </div>
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="ac-website_trap">Leave empty</label>
        <input id="ac-website_trap" name="website_trap" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="checkbox-row field-wide">
        <input type="checkbox" name="consent" required />
        <span>
          {t.consent} <Link to={t.privacyHref} target="_blank" rel="noopener noreferrer">↗</Link>
        </span>
      </label>
      <label className="checkbox-row field-wide">
        <input type="checkbox" name="consentMarketing" />
        <span>{t.marketing}</span>
      </label>
      {error ? <p className="form-error field-wide" role="alert">{error}</p> : null}
      <button className="h26-pill h26-pill-dark field-wide academy-submit" type="submit" disabled={pending}>
        {pending ? <><LoaderCircle size={16} className="submission-spinner" /> {t.sending}</> : <>{t.submit} <span className="h26-pill-arrow"><ArrowRight size={16} /></span></>}
      </button>
      <p className="form-security field-wide"><LockKeyhole size={12} /> <span>{t.security}</span></p>
    </form>
  );
}
