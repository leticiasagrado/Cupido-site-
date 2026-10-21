import { Link } from 'react-router';
import { ArrowUpRight, LockKeyhole, Stethoscope } from 'lucide-react';
import { psychologistFields, psychologistDraftNotice, psychologistGuardrails } from '@/data/method';
import { AdminNav } from '@/components/admin/admin-nav';

/**
 * Área administrativa para uma eventual colaboração futura com psicólogas.
 * RASCUNHO — não publicada. A colaboração não existe actualmente. Não cria
 * perfis fictícios nem anuncia avaliações psicológicas inexistentes.
 */
export function PsychologistPanel() {
  return (
    <div className="admin-panel">
      <AdminNav />
      <header className="admin-header">
        <div>
          <span className="eyebrow">PAINEL ADMINISTRATIVO / RASCUNHO</span>
          <h1>Colaboração profissional — Psicólogas</h1>
          <p>Estrutura preparada para uma eventual colaboração futura. Não activa.</p>
        </div>
        <div className="admin-actions-top">
          <Link className="text-link" to="/">
            Voltar ao site <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      <p className="admin-notice">
        <LockKeyhole size={12} /> {psychologistDraftNotice}
      </p>

      <section className="psych-intro section-rail">
        <div className="section-index">
          <span>06</span>
          <span>COLABORAÇÃO FUTURA</span>
        </div>
        <div className="psych-intro-body">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE CUPID METHOD / COLABORAÇÃO</span>
              <h2>
                Uma estrutura pronta,
                <br />
                <em>quando fizer sentido.</em>
              </h2>
            </div>
            <p>
              A The Cupid Bureau prepara uma arquitectura para eventual colaboração com psicólogas
              devidamente habilitadas. Esta colaboração não existe actualmente e só será activada
              com profissionais credenciados, normas profissionais e legais aplicáveis e
              consentimento adequado.
            </p>
          </div>
        </div>
      </section>

      <section className="psych-fields">
        <div className="psych-fields-head">
          <Stethoscope size={20} />
          <h2>Campos a definir futuramente</h2>
          <p>Cada colaboração deverá documentar, no mínimo, os seguintes elementos.</p>
        </div>
        <ul className="psych-field-list">
          {psychologistFields.map((field) => (
            <li key={field.label} className="psych-field">
              <span className="psych-field-label">{field.label}</span>
              <p>{field.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="psych-guardrails">
        <span className="admin-detail-label">Limites éticos e legais</span>
        <ul>
          {psychologistGuardrails.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
