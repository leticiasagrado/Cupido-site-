import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, LockKeyhole, LoaderCircle, Check } from 'lucide-react';
import { pocketbaseClient } from '@/lib/pocketbase-client';
import { partnerTypes, type PartnerType } from '@/data/partners';
import { Cupid } from '@/components/cupid';

export function PartnerForm() {
  const [partnerType, setPartnerType] = useState<PartnerType>('parceiro');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    if (String(values.get('website_trap') || '').trim()) {
      setError('Não foi possível enviar o pedido. Por favor, tente novamente.');
      return;
    }
    const name = String(values.get('name') || '').trim();
    const message = String(values.get('message') || '').trim();
    const email = String(values.get('email') || '').trim();
    if (name.length < 2 || email.length < 3 || message.length < 10) {
      setError('Preencha o nome, um email válido e uma mensagem com pelo menos 10 caracteres.');
      return;
    }
    if (values.get('consent') !== 'on') {
      setError('Confirme que autoriza o tratamento dos dados para este pedido.');
      return;
    }
    setError('');
    setPending(true);
    try {
      await pocketbaseClient.collection('partner_enquiries').create({
        name,
        email,
        message,
        phone: String(values.get('phone') || '').trim(),
        organization: String(values.get('organization') || '').trim(),
        partnerType,
        brand: String(values.get('brand') || '').trim(),
        city: String(values.get('city') || '').trim(),
        website: String(values.get('website') || '').trim(),
        consent: true,
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
        <span className="eyebrow">RECEBIDO. COM TODO O CUIDADO.</span>
        <h2>Cupid recebeu o seu contacto.</h2>
        <p>
          Obrigada pelo interesse em colaborar com a The Cupid Bureau. A equipa irá analisar o seu
          pedido e entrar em contacto através dos dados que indicou.
        </p>
        <Link to="/parceiros" className="text-link">
          Voltar aos parceiros <ArrowUpRight size={16} />
        </Link>
      </section>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <p className="form-section-label">01 / VAMOS CONHECER-NOS</p>

      <div className="form-fields">
        <div className="field field-wide">
          <span className="path-chooser-label" id="partner-type-label">
            Qual é o tipo de colaboração?
          </span>
          <div className="path-chooser" role="radiogroup" aria-labelledby="partner-type-label">
            {partnerTypes.map((option) => (
              <button
                type="button"
                key={option.value}
                role="radio"
                aria-checked={partnerType === option.value}
                className={`path-option ${partnerType === option.value ? 'is-active' : ''}`}
                onClick={() => setPartnerType(option.value)}
              >
                <span className="path-option-mark">
                  {partnerType === option.value ? <Check size={13} /> : null}
                </span>
                <span className="path-option-label">{option.label}</span>
                <span className="path-option-desc">{option.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="p-name">Nome *</label>
          <input id="p-name" name="name" autoComplete="name" required minLength={2} maxLength={160} placeholder="O seu nome" />
        </div>
        <div className="field">
          <label htmlFor="p-organization">Organização / Veículo</label>
          <input id="p-organization" name="organization" maxLength={200} placeholder="Empresa, publicação ou projecto" />
        </div>
        <div className="field">
          <label htmlFor="p-email">Email *</label>
          <input type="email" id="p-email" name="email" autoComplete="email" required maxLength={254} placeholder="O seu email profissional" />
        </div>
        <div className="field">
          <label htmlFor="p-phone">Telemóvel <span>(opcional)</span></label>
          <input type="tel" id="p-phone" name="phone" autoComplete="tel" maxLength={40} placeholder="Com indicativo do país" />
        </div>
        <div className="field">
          <label htmlFor="p-brand">Marca / Espaço</label>
          <input id="p-brand" name="brand" maxLength={200} placeholder="Nome da marca ou espaço" />
        </div>
        <div className="field">
          <label htmlFor="p-city">Cidade / País</label>
          <input id="p-city" name="city" autoComplete="address-level2" maxLength={120} placeholder="Onde se localiza" />
        </div>
        <div className="field field-wide">
          <label htmlFor="p-website">Website <span>(opcional)</span></label>
          <input type="url" id="p-website" name="website" maxLength={500} placeholder="https://" />
        </div>
        <div className="field field-wide">
          <label htmlFor="p-message">A sua mensagem *</label>
          <textarea id="p-message" name="message" required minLength={10} maxLength={4000} rows={5} placeholder="Conte-nos sobre a sua ideia de colaboração." />
        </div>
      </div>

      <div className="form-trap" aria-hidden="true">
        <label htmlFor="website_trap">Deixe este campo vazio</label>
        <input id="website_trap" name="website_trap" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-consent">
        <label className="checkbox-row">
          <input type="checkbox" name="consent" required />
          <span>
            Li a <Link to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</Link> e autorizo, nos termos do RGPD, o tratamento dos dados que forneço para análise e resposta a este pedido de colaboração. *
          </span>
        </label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button className="button button-burgundy" type="submit" disabled={pending}>
        {pending ? (
          <>
            <LoaderCircle size={16} className="submission-spinner" /> A enviar com cuidado…
          </>
        ) : (
          <>
            Enviar pedido de colaboração <ArrowUpRight size={17} />
          </>
        )}
      </button>

      <p className="form-security">
        <LockKeyhole size={12} />
        <span>Informação privada. Este pedido não implica qualquer compromisso ou pagamento.</span>
      </p>
    </form>
  );
}
