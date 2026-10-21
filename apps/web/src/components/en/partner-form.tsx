import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, LockKeyhole, LoaderCircle, Check } from 'lucide-react';
import { pocketbaseClient } from '@/lib/pocketbase-client';
import { partnerTypes, type PartnerType } from '@/data/partners';
import { Cupid } from '@/components/cupid';

export function EnPartnerForm() {
  const [partnerType, setPartnerType] = useState<PartnerType>('parceiro');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const typeLabels: Record<PartnerType, string> = { imprensa: 'Press', parceiro: 'Partner / Brand', espaco: 'Venue / Restaurant / Hotel' };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const values = new FormData(event.currentTarget);
    if (String(values.get('website_trap') || '').trim()) { setError('We could not send your request. Please try again.'); return; }
    const name = String(values.get('name') || '').trim();
    const message = String(values.get('message') || '').trim();
    const email = String(values.get('email') || '').trim();
    if (name.length < 2 || email.length < 3 || message.length < 10) { setError('Please fill in your name, a valid email and a message of at least 10 characters.'); return; }
    if (values.get('consent') !== 'on') { setError('Please confirm you authorise the processing of your data for this request.'); return; }
    setError(''); setPending(true);
    try {
      await pocketbaseClient.collection('partner_enquiries').create({
        name, email, message,
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
      setError('We could not save your request. Check your connection and try again.');
    } finally { setPending(false); }
  }

  if (success) {
    return (
      <section className="enquiry-success" role="status" aria-live="polite">
        <Cupid />
        <span className="eyebrow">RECEIVED. WITH EVERY CARE.</span>
        <h2>Cupid received your message.</h2>
        <p className="enquiry-success-nextstep">The next step is ours.</p>
        <p>Thank you for your interest in collaborating with The Cupid Bureau. The team will review your request and contact you.</p>
        <Link to="/en/partners" className="text-link">Back to partners <ArrowUpRight size={16} /></Link>
      </section>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <p className="form-section-label">01 / LET'S GET TO KNOW EACH OTHER</p>
      <div className="form-fields">
        <div className="field field-wide">
          <span className="path-chooser-label" id="partner-type-label">What kind of collaboration?</span>
          <div className="path-chooser" role="radiogroup" aria-labelledby="partner-type-label">
            {partnerTypes.map((option) => (
              <button type="button" key={option.value} role="radio" aria-checked={partnerType === option.value} className={`path-option ${partnerType === option.value ? 'is-active' : ''}`} onClick={() => setPartnerType(option.value)}>
                <span className="path-option-mark">{partnerType === option.value ? <Check size={13} /> : null}</span>
                <span className="path-option-label">{typeLabels[option.value]}</span>
                <span className="path-option-desc">{option.description}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="field"><label htmlFor="p-name">Name *</label><input id="p-name" name="name" autoComplete="name" required minLength={2} maxLength={160} placeholder="Your name" /></div>
        <div className="field"><label htmlFor="p-organization">Organisation / Outlet</label><input id="p-organization" name="organization" maxLength={200} placeholder="Company, publication or project" /></div>
        <div className="field"><label htmlFor="p-email">Email *</label><input type="email" id="p-email" name="email" autoComplete="email" required maxLength={254} placeholder="Your professional email" /></div>
        <div className="field"><label htmlFor="p-phone">Phone <span>(optional)</span></label><input type="tel" id="p-phone" name="phone" autoComplete="tel" maxLength={40} placeholder="With country code" /></div>
        <div className="field"><label htmlFor="p-brand">Brand / Venue</label><input id="p-brand" name="brand" maxLength={200} placeholder="Name of the brand or venue" /></div>
        <div className="field"><label htmlFor="p-city">City / Country</label><input id="p-city" name="city" autoComplete="address-level2" maxLength={120} placeholder="Where you are based" /></div>
        <div className="field field-wide"><label htmlFor="p-website">Website <span>(optional)</span></label><input type="url" id="p-website" name="website" maxLength={500} placeholder="https://" /></div>
        <div className="field field-wide"><label htmlFor="p-message">Your message *</label><textarea id="p-message" name="message" required minLength={10} maxLength={4000} rows={5} placeholder="Tell us about your collaboration idea." /></div>
      </div>
      <div className="form-trap" aria-hidden="true"><label htmlFor="website_trap">Leave this field empty</label><input id="website_trap" name="website_trap" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-consent">
        <label className="checkbox-row"><input type="checkbox" name="consent" required /><span>I have read the <Link to="/en/trust-privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> and I authorise, under the GDPR, the processing of the data I provide to analyse and respond to this collaboration request. *</span></label>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-burgundy" type="submit" disabled={pending}>
        {pending ? (<><LoaderCircle size={16} className="submission-spinner" /> Sending with care…</>) : (<>Send collaboration request <ArrowUpRight size={17} /></>)}
      </button>
      <p className="form-security"><LockKeyhole size={12} /><span>Private information. This request implies no commitment or payment.</span></p>
    </form>
  );
}
