import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, LockKeyhole, LoaderCircle, ShieldCheck } from 'lucide-react';
import { pocketbaseClient } from '@/lib/pocketbase-client';
import { requestTypeOptions, type PrivacyRequestType } from '@/data/privacy-request';
import { Cupid } from '@/components/cupid';

export function PrivacyRequestForm() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const values = new FormData(event.currentTarget);
    if (String(values.get('website_trap') || '').trim()) {
      setError('Não foi possível enviar o pedido. Por favor, tente novamente.');
      return;
    }
    const name = String(values.get('name') || '').trim();
    const email = String(values.get('email') || '').trim();
    const requestType = String(values.get('requestType') || '').trim();
    if (name.length < 2 || email.length < 3 || !requestType) {
      setError('Preencha o nome, um email válido e o tipo de pedido.');
      return;
    }
    setError('');
    setPending(true);
    try {
      await pocketbaseClient.collection('privacy_requests').create({
        name,
        email,
        requestType,
        details: String(values.get('details') || '').trim(),
        status: 'novo',
      });
      setSuccess(true);
    } catch {
      setError('Não foi possível guardar o seu pedido. Verifique a sua ligação e tente novamente.');
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <section className="enquiry-success" role="status" aria-live="polite">
        <Cupid />
        <span className="eyebrow">PEDIDO REGISTADO. COM TODO O CUIDADO.</span>
        <h2>Recebemos o seu pedido.</h2>
        <p className="enquiry-success-nextstep">O próximo passo é nosso.</p>
        <p>
          A nossa equipa irá analisar o seu pedido e entrar em contacto através do email indicado.
          Poderemos solicitar uma verificação proporcional da sua identidade para proteger os seus
          dados antes de divulgar ou alterar qualquer informação.
        </p>
        <Link to="/politica-de-privacidade" className="text-link">
          Consultar a Política de Privacidade <ArrowUpRight size={16} />
        </Link>
      </section>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <p className="form-section-label">01 / EXERÇA OS SEUS DIREITOS</p>

      <div className="privacy-notice field-wide">
        <details className="privacy-accordion">
          <summary>
            <ShieldCheck size={14} />
            Os seus direitos sobre os dados — resumo
          </summary>
          <div className="privacy-notice-body">
            <p>
              Nos termos do Regulamento Geral de Protecção de Dados, pode exercer os direitos de
              acesso, rectificação, apagamento, limitação, oposição, portabilidade e retirada de
              consentimento. A retirada de consentimento não afecta a licitude do tratamento já
              efectuado.
            </p>
            <p>
              A eliminação pode não ser imediata quando existam obrigações legais de conservação.
              Para proteger os seus dados, poderemos solicitar uma verificação proporcional da sua
              identidade antes de divulgar ou alterar informações.
            </p>
            <p>
              Consulte a <Link to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade completa</Link>.
            </p>
          </div>
        </details>
      </div>

      <div className="form-fields">
        <div className="field">
          <label htmlFor="pr-name">Nome *</label>
          <input id="pr-name" name="name" autoComplete="name" required minLength={2} maxLength={160} placeholder="O seu nome" />
        </div>
        <div className="field">
          <label htmlFor="pr-email">Email *</label>
          <input type="email" id="pr-email" name="email" autoComplete="email" required maxLength={254} placeholder="O email utilizado na sua candidatura" />
        </div>
        <div className="field field-wide">
          <label htmlFor="pr-requestType">Tipo de pedido *</label>
          <select id="pr-requestType" name="requestType" defaultValue="">
            <option value="" disabled>Selecionar</option>
            {requestTypeOptions.map((option) => (
              <option value={option.value} key={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="field field-wide">
          <label htmlFor="pr-details">Detalhes <span>(opcional)</span></label>
          <textarea id="pr-details" name="details" maxLength={2000} rows={4} placeholder="Indique, se desejar, os dados a que se refere o pedido." />
        </div>
      </div>

      <div className="form-trap" aria-hidden="true">
        <label htmlFor="website_trap">Deixe este campo vazio</label>
        <input id="website_trap" name="website_trap" tabIndex={-1} autoComplete="off" />
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button className="button button-burgundy" type="submit" disabled={pending}>
        {pending ? (
          <>
            <LoaderCircle size={16} className="submission-spinner" /> A enviar com cuidado…
          </>
        ) : (
          <>
            Enviar pedido de privacidade <ArrowUpRight size={17} />
          </>
        )}
      </button>

      <p className="form-security">
        <LockKeyhole size={12} />
        <span>Pedido confidencial. Apenas a equipa autorizada consulta estes pedidos. Não partilhamos os seus dados.</span>
      </p>
    </form>
  );
}
