import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowUpRight, LockKeyhole, LoaderCircle, Check } from 'lucide-react';
import { pocketbaseClient } from '@/lib/pocketbase-client';
import { services } from '@/data/services';
import {
  enquiryPaths,
  ageRanges,
  situations,
  scopes,
  type EnquiryPath,
} from '@/data/enquiry';
import { Cupid } from '@/components/cupid';

type EnquiryKind = 'candidatura' | 'consulta' | 'contacto' | 'eventos';
const kinds: EnquiryKind[] = ['candidatura', 'consulta', 'contacto', 'eventos'];
const kindLabels: Record<EnquiryKind, string> = {
  candidatura: 'Candidatura ao Bureau',
  consulta: 'Consulta privada',
  contacto: 'Falar com a equipa',
  eventos: 'Interesse em eventos privados',
};

export function EnquiryForm({ contact = false, forcePath }: { contact?: boolean; forcePath?: EnquiryPath }) {
  const [params] = useSearchParams();
  const requestedKind = params.get('tipo') as EnquiryKind;
  const initialKind: EnquiryKind = contact
    ? 'contacto'
    : kinds.includes(requestedKind)
      ? requestedKind
      : 'candidatura';
  const requestedService = params.get('servico');
  const initialService = services.some((service) => service.slug === requestedService)
    ? requestedService!
    : 'por-definir';
  const [kind, setKind] = useState<EnquiryKind>(initialKind);
  const [path, setPath] = useState<EnquiryPath>(forcePath ?? 'contratar');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const showPathChooser = !forcePath && kind === 'candidatura';
  const showScreeningFields = kind === 'candidatura' || kind === 'consulta';
  const isRedePrivada = (forcePath ?? (showPathChooser ? path : '')) === 'rede-privada';
  const showServiceField = !isRedePrivada && kind !== 'eventos' && kind !== 'contacto';

  const messagePlaceholder = isRedePrivada
    ? 'Fale-nos um pouco sobre si, sobre o seu momento de vida e porque gostaria de integrar a nossa rede privada.'
    : kind === 'candidatura'
      ? 'Partilhe um pouco sobre o seu momento de vida e o que procura nesta experiência.'
      : 'Diga-nos como podemos ajudar.';

  const submitLabel = isRedePrivada
    ? 'Candidatar-me à rede privada'
    : kind === 'candidatura'
      ? 'Enviar candidatura'
      : kind === 'consulta'
        ? 'Solicitar consulta privada'
        : kind === 'eventos'
          ? 'Manifestar interesse'
          : 'Enviar mensagem';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    if (String(values.get('website') || '').trim()) {
      setError('Não foi possível enviar o pedido. Por favor, tente novamente.');
      return;
    }
    const name = String(values.get('name') || '').trim();
    const city = String(values.get('city') || '').trim();
    const message = String(values.get('message') || '').trim();
    if (name.length < 2 || city.length < 2 || message.length < 10) {
      setError('Preencha o nome e a cidade e escreva uma mensagem com pelo menos 10 caracteres.');
      return;
    }
    if (values.get('consent') !== 'on' || values.get('adult') !== 'on') {
      setError('Confirme que é maior de idade e que autoriza o tratamento dos dados para este pedido.');
      return;
    }
    if (showScreeningFields) {
      const ageRange = String(values.get('ageRange') || '').trim();
      const situation = String(values.get('situation') || '').trim();
      const scope = String(values.get('scope') || '').trim();
      const motivation = String(values.get('motivation') || '').trim();
      if (!ageRange || !situation || !scope || motivation.length < 3) {
        setError('Preencha a faixa etária, a situação actual, o âmbito e o principal motivo para continuarmos a triagem.');
        return;
      }
    }
    setError('');
    setPending(true);
    try {
      await pocketbaseClient.collection('bureau_enquiries').create({
        name,
        city,
        message,
        email: String(values.get('email') || '').trim(),
        phone: String(values.get('phone') || '').trim(),
        kind,
        path: forcePath ?? (showPathChooser ? path : kind === 'consulta' ? 'contratar' : ''),
        service: String(values.get('service') || 'por-definir'),
        availability: String(values.get('availability') || '').trim(),
        ageRange: String(values.get('ageRange') || '').trim(),
        situation: String(values.get('situation') || '').trim(),
        scope: String(values.get('scope') || '').trim(),
        motivation: String(values.get('motivation') || '').trim(),
        consent: true,
        adult: true,
        consentMarketing: values.get('consentMarketing') === 'on',
      });
      setSuccess(true);
    } catch {
      setError('Não foi possível guardar o seu pedido. Verifique a sua ligação e tente novamente. Os seus dados continuam no formulário.');
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <section className="enquiry-success" role="status" aria-live="polite">
        <Cupid />
        <span className="eyebrow">RECEBIDO. COM TODO O CUIDADO.</span>
        <h2>
          {isRedePrivada
            ? 'A sua candidatura à rede privada já chegou às mãos de Cupid.'
            : kind === 'candidatura'
              ? 'A sua candidatura já chegou às mãos de Cupid.'
              : 'O seu pedido já chegou às mãos de Cupid.'}
        </h2>
        <p className="enquiry-success-nextstep">O próximo passo é nosso.</p>
        <p>
          Obrigada por partilhar este primeiro passo connosco. A equipa irá analisar o seu pedido e
          entrar em contacto através dos dados que indicou.
        </p>
        <p>
          O seu pedido foi guardado de forma privada.{' '}
          {kind === 'consulta'
            ? 'A data da consulta será combinada consigo; ainda não existe uma marcação confirmada.'
            : isRedePrivada
              ? 'Integrar a rede privada não implica contratação, pagamento ou qualquer apresentação imediata.'
              : 'Não existe qualquer obrigação de contratação.'}
        </p>
        <Link to="/confianca-privacidade" className="text-link">
          Conheça o nosso compromisso <ArrowUpRight size={16} />
        </Link>
      </section>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <p className="form-section-label">01 / O PRIMEIRO PASSO É CONHECÊ-LO</p>

      <div className="form-fields">
        <div className="field field-wide">
          <label htmlFor="kind">Como podemos ajudar?</label>
          <select
            id="kind"
            name="kind"
            value={kind}
            onChange={(event) => setKind(event.target.value as EnquiryKind)}
          >
            {kinds.map((option) => (
              <option value={option} key={option}>
                {kindLabels[option]}
              </option>
            ))}
          </select>
        </div>

        {showPathChooser && (
          <div className="field field-wide">
            <span className="path-chooser-label" id="path-chooser-label">
              Qual é o seu percurso?
            </span>
            <div className="path-chooser" role="radiogroup" aria-labelledby="path-chooser-label">
              {enquiryPaths.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  role="radio"
                  aria-checked={path === option.value}
                  className={`path-option ${path === option.value ? 'is-active' : ''}`}
                  onClick={() => setPath(option.value)}
                >
                  <span className="path-option-mark">
                    {path === option.value ? <Check size={13} /> : null}
                  </span>
                  <span className="path-option-label">{option.label}</span>
                  <span className="path-option-desc">{option.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="field">
          <label htmlFor="name">Nome *</label>
          <input id="name" name="name" autoComplete="name" required minLength={2} maxLength={160} placeholder="O seu nome" />
        </div>
        <div className="field">
          <label htmlFor="city">Cidade / País *</label>
          <input id="city" name="city" autoComplete="address-level2" required minLength={2} maxLength={120} placeholder="Onde vive actualmente" />
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input type="email" id="email" name="email" autoComplete="email" required maxLength={254} placeholder="O seu email privado" />
        </div>
        <div className="field">
          <label htmlFor="phone">Telemóvel <span>(opcional)</span></label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" maxLength={40} placeholder="Com indicativo do país" />
        </div>

        {showScreeningFields && (
          <>
            <div className="field">
              <label htmlFor="ageRange">Faixa etária *</label>
              <select id="ageRange" name="ageRange" defaultValue="">
                <option value="" disabled>
                  Selecionar
                </option>
                {ageRanges.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="situation">Situação actual *</label>
              <select id="situation" name="situation" defaultValue="">
                <option value="" disabled>
                  Selecionar
                </option>
                {situations.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field field-wide">
              <label htmlFor="scope">Pretende conhecer pessoas *</label>
              <select id="scope" name="scope" defaultValue="">
                <option value="" disabled>
                  Selecionar
                </option>
                {scopes.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field field-wide">
              <label htmlFor="motivation">Qual é o principal motivo para procurar a The Cupid Bureau? *</label>
              <input id="motivation" name="motivation" maxLength={500} placeholder="Em poucas palavras, o que a trouxe até nós." />
            </div>
          </>
        )}

        {showServiceField && (
          <div className="field field-wide">
            <label htmlFor="service">Acompanhamento de interesse</label>
            <select id="service" name="service" defaultValue={initialService}>
              <option value="por-definir">Prefiro conversar primeiro</option>
              {services.map((service) => (
                <option value={service.slug} key={service.slug}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {kind === 'consulta' && (
          <div className="field field-wide">
            <label htmlFor="availability">Disponibilidade para conversar <span>(opcional)</span></label>
            <input id="availability" name="availability" maxLength={240} placeholder="Dias, horário e fuso horário preferidos" />
            <span className="field-note">Indicativa. A equipa confirmará consigo a data e o formato da consulta.</span>
          </div>
        )}

        <div className="field field-wide">
          <label htmlFor="message">{isRedePrivada ? 'Fale-nos sobre si' : kind === 'candidatura' ? 'O que o trouxe até nós?' : 'A sua mensagem'} *</label>
          <textarea id="message" name="message" required minLength={10} maxLength={4000} rows={5} placeholder={messagePlaceholder} />
          <span className="field-note">Não inclua documentos de identificação, dados de saúde ou outros dados sensíveis. Falaremos dos detalhes relevantes em privado.</span>
        </div>
      </div>

      <div className="form-trap" aria-hidden="true">
        <label htmlFor="website">Deixe este campo vazio</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-consent">
        <label className="checkbox-row">
          <input type="checkbox" name="adult" required />
          <span>Confirmo que tenho 18 anos ou mais. *</span>
        </label>
        <label className="checkbox-row">
          <input type="checkbox" name="consent" required />
          <span>
            Li a <Link to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</Link> e autorizo, nos termos do Regulamento Geral de Protecção de Dados (RGPD), o tratamento dos dados que forneço para análise e resposta a este pedido. Posso retirar este consentimento a qualquer momento, sem afectar o tratamento já efectuado, e exercer os meus direitos de acesso, rectificação e apagamento. *
          </span>
        </label>
        <label className="checkbox-row">
          <input type="checkbox" name="consentMarketing" />
          <span>
            Aceito receber novidades e campanhas da The Cupid Bureau. <span>(opcional — não é necessário para este pedido e posso retirar este consentimento a qualquer momento)</span>
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
            {submitLabel} <ArrowUpRight size={17} />
          </>
        )}
      </button>

      <p className="form-security">
        <LockKeyhole size={12} />
        <span>Informação privada. Sem perfis públicos. Este pedido não implica contratação, marcação confirmada ou pagamento.</span>
      </p>
    </form>
  );
}
