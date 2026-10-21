import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  LoaderCircle,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { Cupid } from '@/components/cupid';
import { intentionOptions } from '@/data/network-application';
import type { NetworkIntention } from '@/data/network-application';
import { PhotoUploader } from '@/components/rede-privada/photo-uploader';
import type { PreparedPhoto } from '@/lib/photo-processing';

const POCKETBASE_API_URL = '/hcgi/platform';

type Step = 1 | 2 | 3 | 4;

function calculateAge(birthDate: string): number {
  if (!birthDate) return 0;
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return 0;
  const today = new Date();
  let age = today.getUTCFullYear() - birth.getUTCFullYear();
  const monthDiff = today.getUTCMonth() - birth.getUTCMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getUTCDate() < birth.getUTCDate())) {
    age -= 1;
  }
  return age;
}

export function NetworkForm() {
  const [step, setStep] = useState<Step>(1);
  const [pending, setPending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Step 1
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cityCountry, setCityCountry] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2
  const [intention, setIntention] = useState<NetworkIntention | ''>('');
  const [aboutYou, setAboutYou] = useState('');

  // Step 3
  const [photos, setPhotos] = useState<PreparedPhoto[]>([]);

  // Consents
  const [consentAdult, setConsentAdult] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentSharePhotos, setConsentSharePhotos] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);

  const age = calculateAge(birthDate);
  const isAdult = age >= 18;

  function step1Valid() {
    return (
      firstName.trim().length >= 2 &&
      lastName.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      birthDate !== '' &&
      isAdult &&
      cityCountry.trim().length >= 2
    );
  }

  function step2Valid() {
    return intention !== '';
  }

  function goNext() {
    setError('');
    if (step === 1) {
      if (!step1Valid()) {
        setError(
          isAdult
            ? 'Preencha o nome, apelido, email, data de nascimento e cidade. A inscrição é exclusiva para maiores de 18 anos.'
            : 'A inscrição na rede privada é exclusiva para pessoas com 18 anos ou mais.',
        );
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!step2Valid()) {
        setError('Indique o que procura nesta fase da sua vida.');
        return;
      }
      setStep(3);
    }
  }

  function goBack() {
    setError('');
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    if (!consentAdult) {
      setError('Confirme que tem 18 anos ou mais.');
      setStep(3);
      return;
    }
    if (!consentPrivacy) {
      setError('Tem de aceitar a Política de Privacidade para submeter a candidatura.');
      setStep(3);
      return;
    }

    setError('');
    setPending(true);
    setProgress(0);

    const formData = new FormData();
    formData.set('firstName', firstName.trim());
    formData.set('lastName', lastName.trim());
    formData.set('email', email.trim());
    formData.set('birthDate', birthDate);
    formData.set('cityCountry', cityCountry.trim());
    formData.set('phone', phone.trim());
    formData.set('intention', intention);
    formData.set('aboutYou', aboutYou.trim().slice(0, 500));
    formData.set('consentAdult', 'true');
    formData.set('consentPrivacy', 'true');
    formData.set('consentSharePhotos', consentSharePhotos ? 'true' : 'false');
    formData.set('consentMarketing', consentMarketing ? 'true' : 'false');
    formData.set('status', 'pending');

    photos.forEach((photo) => {
      formData.append('photos', photo.file, photo.file.name);
    });

    try {
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${POCKETBASE_API_URL}/api/collections/network_applications/records`);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            let message = 'Não foi possível enviar a candidatura. Tente novamente.';
            try {
              const body = JSON.parse(xhr.responseText);
              if (body?.message) message = body.message;
            } catch {
              /* keep default message */
            }
            reject(new Error(message));
          }
        };

        xhr.onerror = () => reject(new Error('Falha de ligação. Verifique a sua internet e tente novamente.'));
        xhr.send(formData);
      });

      // Revoke preview URLs to free memory.
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar a candidatura.');
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <section className="enquiry-success network-success" role="status" aria-live="polite">
        <Cupid />
        <span className="eyebrow">RECEBIDO. EM TOTAL CONFIANÇA.</span>
        <h2>A sua candidatura foi recebida.</h2>
        <p className="enquiry-success-nextstep">O próximo passo é nosso.</p>
        <p>
          Obrigado por dar este primeiro passo com a The Cupid Bureau. A nossa equipa poderá entrar
          em contacto caso sejam necessárias informações adicionais ou surja uma potencial
          compatibilidade.
        </p>
        <p>
          A sua candidatura foi guardada de forma privada. Receberá um email de confirmação. A
          inscrição não garante admissão na rede, apresentações ou encontros.
        </p>
        <Link to="/confianca-privacidade" className="text-link">
          Conheça o nosso compromisso <ArrowUpRight size={16} />
        </Link>
      </section>
    );
  }

  return (
    <form className="network-form" onSubmit={handleSubmit}>
      <p className="form-section-label">
        ETAPA {step === 4 ? 3 : step} / 3 — {step === 1 ? 'SOBRE SI' : step === 2 ? 'AS SUAS INTENÇÕES' : 'AS SUAS FOTOGRAFIAS'}
      </p>

      <div className="network-progress" aria-hidden="true">
        <span className={step >= 1 ? 'is-active' : ''} />
        <span className={step >= 2 ? 'is-active' : ''} />
        <span className={step >= 3 ? 'is-active' : ''} />
      </div>

      {step === 1 ? (
        <div className="form-fields">
          <div className="field">
            <label htmlFor="firstName">Nome próprio *</label>
            <input id="firstName" name="firstName" autoComplete="given-name" required minLength={2} maxLength={80} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="O seu nome próprio" />
          </div>
          <div className="field">
            <label htmlFor="lastName">Apelido *</label>
            <input id="lastName" name="lastName" autoComplete="family-name" required minLength={2} maxLength={80} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="O seu apelido" />
          </div>
          <div className="field">
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" name="email" autoComplete="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="O seu email privado" />
          </div>
          <div className="field">
            <label htmlFor="birthDate">Data de nascimento *</label>
            <input type="date" id="birthDate" name="birthDate" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} max={new Date().toISOString().slice(0, 10)} />
            <span className="field-note">A inscrição é exclusiva para maiores de 18 anos.</span>
          </div>
          <div className="field field-wide">
            <label htmlFor="cityCountry">Cidade e país de residência *</label>
            <input id="cityCountry" name="cityCountry" autoComplete="address-level2" required minLength={2} maxLength={160} value={cityCountry} onChange={(e) => setCityCountry(e.target.value)} placeholder="Ex.: Lisboa, Portugal" />
          </div>
          <div className="field field-wide">
            <label htmlFor="phone">Contacto telefónico <span>(opcional)</span></label>
            <input type="tel" id="phone" name="phone" autoComplete="tel" maxLength={40} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Com indicativo do país" />
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="form-fields">
          <div className="field field-wide">
            <span className="path-chooser-label" id="intention-label">O que procura nesta fase da sua vida? *</span>
            <div className="path-chooser" role="radiogroup" aria-labelledby="intention-label">
              {intentionOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  role="radio"
                  aria-checked={intention === option.value}
                  className={`path-option ${intention === option.value ? 'is-active' : ''}`}
                  onClick={() => setIntention(option.value)}
                >
                  <span className="path-option-mark">
                    {intention === option.value ? <Check size={13} /> : null}
                  </span>
                  <span className="path-option-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="field field-wide">
            <label htmlFor="aboutYou">Gostaria de nos contar um pouco mais sobre si? <span>(opcional)</span></label>
            <textarea id="aboutYou" name="aboutYou" maxLength={500} rows={4} value={aboutYou} onChange={(e) => setAboutYou(e.target.value)} placeholder="Em poucas palavras, se desejar." />
            <span className="field-note">{aboutYou.length}/500 caracteres. Não inclua informações de saúde, orientação sexual, religião, histórico íntimo ou dados psicológicos.</span>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="form-fields">
          <div className="field field-wide">
            <label htmlFor="photos">As suas fotografias <span>(opcional)</span></label>
            <PhotoUploader photos={photos} onChange={setPhotos} onError={(m) => setError(m)} />
          </div>

          <div className="field field-wide photo-privacy-note">
            <strong>As suas fotografias são privadas.</strong>
            <p>
              As imagens não serão publicadas no website nem disponibilizadas para consulta por
              outros membros. Poderão ser utilizadas pela equipa para avaliar a candidatura e, quando
              aplicável, partilhadas individualmente com potenciais candidatos, apenas mediante
              autorização específica. Não utilizamos fotografias para reconhecimento facial,
              identificação biométrica, publicidade ou treino de inteligência artificial.
            </p>
          </div>

          <div className="privacy-notice field-wide" aria-label="Informação de privacidade">
            <details className="privacy-accordion">
              <summary>
                <ShieldCheck size={14} />
                Como tratamos os seus dados — resumo
              </summary>
              <div className="privacy-notice-body">
                <p><strong>Responsável pelo tratamento:</strong> The Cupid Bureau. A identificação jurídica completa do responsável e o contacto de protecção de dados serão disponibilizados antes do início de qualquer serviço.</p>
                <p><strong>Finalidades:</strong> analisar a sua candidatura à rede privada e, eventualmente, avaliar uma potencial compatibilidade.</p>
                <p><strong>Fundamento jurídico:</strong> o seu consentimento para a análise da candidatura e, quando aplicável, o consentimento específico para a partilha de fotografias.</p>
                <p><strong>Partilha:</strong> os seus dados não são públicos. As fotografias são privadas e só são partilhadas individualmente mediante autorização específica.</p>
                <p><strong>Conservação:</strong> durante o tempo necessário para analisar a candidatura e cumprir obrigações legais aplicáveis. Pode solicitar a eliminação a qualquer momento.</p>
                <p><strong>Os seus direitos:</strong> acesso, rectificação, apagamento, limitação, oposição, portabilidade e retirada de consentimento. Exerça-os através da <Link to="/pedidos-privacidade">página de pedidos de privacidade</Link> ou dos <Link to="/contactos">contactos</Link>.</p>
                <p>Consulte a <Link to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade completa</Link>.</p>
              </div>
            </details>
          </div>

          <div className="form-consent field-wide">
            <label className="checkbox-row">
              <input type="checkbox" checked={consentAdult} onChange={(e) => setConsentAdult(e.target.checked)} />
              <span>Confirmo que tenho 18 anos ou mais. *</span>
            </label>
            <label className="checkbox-row">
              <input type="checkbox" checked={consentPrivacy} onChange={(e) => setConsentPrivacy(e.target.checked)} />
              <span>
                Li a <Link to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</Link> e autorizo o tratamento dos dados que forneço para análise da minha candidatura à rede privada. Entendo que posso solicitar a eliminação dos meus dados a qualquer momento. *
              </span>
            </label>
            <label className="checkbox-row">
              <input type="checkbox" checked={consentSharePhotos} onChange={(e) => setConsentSharePhotos(e.target.checked)} />
              <span>
                Autorizo, de forma livre e informada, a eventual partilha das minhas fotografias com
                potenciais compatibilidades, sempre mediante interesse mútuo. <span>(opcional — não é necessário para a inscrição)</span>
              </span>
            </label>
            <label className="checkbox-row">
              <input type="checkbox" checked={consentMarketing} onChange={(e) => setConsentMarketing(e.target.checked)} />
              <span>
                Aceito receber novidades e campanhas da The Cupid Bureau. <span>(opcional — não é necessário para a inscrição e posso retirar este consentimento a qualquer momento)</span>
              </span>
            </label>
          </div>
        </div>
      ) : null}

      {error ? <p className="form-error" role="alert">{error}</p> : null}

      {pending ? (
        <div className="upload-progress" role="status" aria-live="polite">
          <div className="upload-progress-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <span className="upload-progress-label">
            <LoaderCircle size={14} className="submission-spinner" /> A enviar com cuidado… {progress}%
          </span>
        </div>
      ) : null}

      <div className="network-actions">
        {step > 1 && step < 4 ? (
          <button type="button" className="button button-outline" onClick={goBack} disabled={pending}>
            <ArrowLeft size={16} /> Voltar
          </button>
        ) : null}
        {step < 3 ? (
          <button type="button" className="button button-burgundy" onClick={goNext} disabled={pending}>
            Continuar <ArrowRight size={16} />
          </button>
        ) : null}
        {step === 3 ? (
          <button type="submit" className="button button-burgundy" disabled={pending}>
            {pending ? 'A enviar…' : 'Criar o meu perfil gratuito'} <ArrowUpRight size={17} />
          </button>
        ) : null}
      </div>

      <p className="form-security">
        <LockKeyhole size={12} />
        <span>
          Informação privada. Sem perfis públicos. A candidatura não garante admissão, apresentações
          ou encontros. Pode solicitar a eliminação dos seus dados a qualquer momento.
        </span>
      </p>
    </form>
  );
}
