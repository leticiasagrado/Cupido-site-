import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { ArrowUpRight, LoaderCircle, LockKeyhole } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { BrandMark } from '@/components/brand-mark';

export function meta() {
  return [
    { title: 'Entrar — The Cupid Bureau' },
    { name: 'description', content: 'Acesso à área administrativa.' },
    { name: 'robots', content: 'noindex, nofollow' },
  ];
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  // Only follow same-site paths, so a crafted link cannot send people elsewhere.
  const rawNext = params.get('next') || '/';
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') && !rawNext.startsWith('/\\') ? rawNext : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError('');
    setPending(true);
    try {
      await login(email.trim(), password);
      navigate(next, { replace: true });
    } catch {
      setError('Credenciais inválidas. Verifique o email e a palavra-passe.');
    } finally {
      setPending(false);
    }
  }

  return (
    <main id="conteudo" className="login-main">
      <section className="login-card">
        <BrandMark monogram tone="seal" className="login-seal" />
        <span className="eyebrow">ACESSO PRIVADO</span>
        <h1>Entrar</h1>
        <p>Área reservada à equipa da The Cupid Bureau.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="O seu email" />
          </div>
          <div className="field">
            <label htmlFor="password">Palavra-passe</label>
            <input type="password" id="password" name="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="A sua palavra-passe" />
          </div>
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <button className="button button-burgundy" type="submit" disabled={pending}>
            {pending ? <><LoaderCircle size={16} className="submission-spinner" /> A entrar…</> : <>Entrar <ArrowUpRight size={17} /></>}
          </button>
          <p className="form-security">
            <LockKeyhole size={12} /> Acesso restrito a administradores autorizados.
          </p>
        </form>
        <Link to="/" className="text-link">Voltar ao início <ArrowUpRight size={14} /></Link>
      </section>
    </main>
  );
}
