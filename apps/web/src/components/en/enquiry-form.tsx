import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowUpRight, LockKeyhole, LoaderCircle, Check } from 'lucide-react';
import { pocketbaseClient } from '@/lib/pocketbase-client';
import { enServices } from '@/data/en-content';
import { enquiryPaths, ageRanges, situations, scopes, type EnquiryPath } from '@/data/enquiry';
import { Cupid } from '@/components/cupid';

type EnquiryKind = 'candidatura' | 'consulta' | 'contacto' | 'eventos';
const kinds: EnquiryKind[] = ['candidatura', 'consulta', 'contacto', 'eventos'];
const kindLabels: Record<EnquiryKind, string> = {
  candidatura: 'Application to the Bureau',
  consulta: 'Private consultation',
  contacto: 'Speak with the team',
  eventos: 'Interest in private events',
};

export function EnEnquiryForm({ forcePath, contact = false }: { forcePath?: EnquiryPath; contact?: boolean }) {
  const [params] = useSearchParams();
  const requestedKind = params.get('tipo') as EnquiryKind;
  const initialKind: EnquiryKind = contact ? 'contacto' : kinds.includes(requestedKind) ? requestedKind : 'candidatura';
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
    ? 'Tell us a little about yourself, your moment in life and why you would like to join our private network.'
    : kind === 'candidatura'
      ? 'Share a little about your moment in life and what you are looking for in this experience.'
      : 'Tell us how we can help.';

  const submitLabel = isRedePrivada
    ? 'Apply to the private network'
    : kind === 'candidatura'
      ? 'Send application'
      : kind === 'consulta'
        ? 'Request a private consultation'
        : kind === 'eventos'
          ? 'Express interest'
          : 'Send message';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    if (String(values.get('website') || '').trim()) {
      setError('We could not send your request. Please try again.');
      return;
    }
    const name = String(values.get('name') || '').trim();
    const city = String(values.get('city') || '').trim();
    const message = String(values.get('message') || '').trim();
    if (name.length < 2 || city.length < 2 || message.length < 10) {
      setError('Please fill in your name and city and write a message of at least 10 characters.');
      return;
    }
    if (values.get('consent') !== 'on' || values.get('adult') !== 'on') {
      setError('Please confirm you are 18 or older and that you authorise the processing of your data for this request.');
      return;
    }
    if (showScreeningFields) {
      const ageRange = String(values.get('ageRange') || '').trim();
      const situation = String(values.get('situation') || '').trim();
      const scope = String(values.get('scope') || '').trim();
      const motivation = String(values.get('motivation') || '').trim();
      if (!ageRange || !situation || !scope || motivation.length < 3) {
        setError('Please complete the age range, current situation, scope and main reason so we can continue the screening.');
        return;
      }
    }
    setError('');
    setPending(true);
    try {
      await pocketbaseClient.collection('bureau_enquiries').create({
        name, city, message,
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
      setError('We could not save your request. Check your connection and try again. Your data remains in the form.');
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <section className="enquiry-success" role="status" aria-live="polite">
        <Cupid />
        <span className="eyebrow">RECEIVED. WITH EVERY CARE.</span>
        <h2>
          {isRedePrivada
            ? 'Your private network application has reached Cupid.'
            : kind === 'candidatura'
              ? 'Your application has reached Cupid.'
              : 'Your request has reached Cupid.'}
        </h2>
        <p className="enquiry-success-nextstep">The next step is ours.</p>
        <p>Thank you for sharing this first step with us. The team will review your request and contact you through the details you provided.</p>
        <p>
          Your request has been stored privately.{' '}
          {kind === 'consulta'
            ? 'The consultation date will be arranged with you; there is no confirmed booking yet.'
            : isRedePrivada
              ? 'Joining the private network involves no hiring, payment or immediate introduction.'
              : 'There is no obligation to hire.'}
        </p>
        <Link to="/en/trust-privacy" className="text-link">Read our commitment <ArrowUpRight size={16} /></Link>
      </section>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <p className="form-section-label">01 / THE FIRST STEP IS GETTING TO KNOW YOU</p>
      <div className="form-fields">
        <div className="field field-wide">
          <label htmlFor="kind">How can we help?</label>
          <select id="kind" name="kind" value={kind} onChange={(event) => setKind(event.target.value as EnquiryKind)}>
            {kinds.map((option) => <option value={option} key={option}>{kindLabels[option]}</option>)}
          </select>
        </div>

        {showPathChooser && (
          <div className="field field-wide">
            <span className="path-chooser-label" id="path-chooser-label">What is your path?</span>
            <div className="path-chooser" role="radiogroup" aria-labelledby="path-chooser-label">
              {enquiryPaths.map((option) => (
                <button type="button" key={option.value} role="radio" aria-checked={path === option.value} className={`path-option ${path === option.value ? 'is-active' : ''}`} onClick={() => setPath(option.value)}>
                  <span className="path-option-mark">{path === option.value ? <Check size={13} /> : null}</span>
                  <span className="path-option-label">{option.label}</span>
                  <span className="path-option-desc">{option.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="field"><label htmlFor="name">Name *</label><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={160} placeholder="Your name" /></div>
        <div className="field"><label htmlFor="city">City / Country *</label><input id="city" name="city" autoComplete="address-level2" required minLength={2} maxLength={120} placeholder="Where you currently live" /></div>
        <div className="field"><label htmlFor="email">Email *</label><input type="email" id="email" name="email" autoComplete="email" required maxLength={254} placeholder="Your private email" /></div>
        <div className="field"><label htmlFor="phone">Phone <span>(optional)</span></label><input type="tel" id="phone" name="phone" autoComplete="tel" maxLength={40} placeholder="With country code" /></div>

        {showScreeningFields && (
          <>
            <div className="field"><label htmlFor="ageRange">Age range *</label><select id="ageRange" name="ageRange" defaultValue=""><option value="" disabled>Select</option>{ageRanges.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></div>
            <div className="field"><label htmlFor="situation">Current situation *</label><select id="situation" name="situation" defaultValue=""><option value="" disabled>Select</option>{situations.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></div>
            <div className="field field-wide"><label htmlFor="scope">Looking to meet people *</label><select id="scope" name="scope" defaultValue=""><option value="" disabled>Select</option>{scopes.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></div>
            <div className="field field-wide"><label htmlFor="motivation">What is the main reason you are looking for The Cupid Bureau? *</label><input id="motivation" name="motivation" maxLength={500} placeholder="In a few words, what brought you to us." /></div>
          </>
        )}

        {showServiceField && (
          <div className="field field-wide">
            <label htmlFor="service">Service of interest</label>
            <select id="service" name="service" defaultValue="por-definir">
              <option value="por-definir">I prefer to talk first</option>
              {enServices.map((service) => <option value={service.slug} key={service.slug}>{service.name}</option>)}
            </select>
          </div>
        )}

        {kind === 'consulta' && (
          <div className="field field-wide">
            <label htmlFor="availability">Availability to talk <span>(optional)</span></label>
            <input id="availability" name="availability" maxLength={240} placeholder="Preferred days, time and time zone" />
            <span className="field-note">Indicative. The team will confirm the date and format of the consultation with you.</span>
          </div>
        )}

        <div className="field field-wide">
          <label htmlFor="message">{isRedePrivada ? 'Tell us about yourself' : kind === 'candidatura' ? 'What brought you to us?' : 'Your message'} *</label>
          <textarea id="message" name="message" required minLength={10} maxLength={4000} rows={5} placeholder={messagePlaceholder} />
          <span className="field-note">Do not include identification documents, health data or other sensitive data. We will discuss relevant details in private.</span>
        </div>
      </div>

      <div className="form-trap" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>

      <div className="form-consent">
        <label className="checkbox-row"><input type="checkbox" name="adult" required /><span>I confirm I am 18 years or older. *</span></label>
        <label className="checkbox-row"><input type="checkbox" name="consent" required /><span>I have read the <Link to="/en/trust-privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> and I authorise, under the GDPR, the processing of the data I provide to analyse and respond to this request. I may withdraw this consent at any time without affecting processing already carried out, and exercise my rights of access, rectification and erasure. *</span></label>
        <label className="checkbox-row"><input type="checkbox" name="consentMarketing" /><span>I agree to receive news and campaigns from The Cupid Bureau. <span>(optional — not required for this request; I can withdraw this consent at any time)</span></span></label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button className="button button-burgundy" type="submit" disabled={pending}>
        {pending ? (<><LoaderCircle size={16} className="submission-spinner" /> Sending with care…</>) : (<>{submitLabel} <ArrowUpRight size={17} /></>)}
      </button>

      <p className="form-security"><LockKeyhole size={12} /><span>Private information. No public profiles. This request does not imply hiring, a confirmed booking or payment.</span></p>
    </form>
  );
}
