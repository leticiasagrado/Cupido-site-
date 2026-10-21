import { LockKeyhole, FileText } from 'lucide-react';
import { questionnaireThemes, questionnaireDraftNotice, questionnaireGuardrails } from '@/data/method';

/**
 * Pré-visualização interna do questionário aprofundado de compatibilidade.
 * MODO RASCUNHO — não recolhe nem armazena dados. Não activo. A activação
 * depende da actualização e aprovação da Política de Privacidade e de convite
 * individual da equipa.
 */
export function QuestionnairePreview() {
  return (
    <section className="questionnaire-preview">
      <header className="questionnaire-head">
        <span className="eyebrow">RASCUNHO INTERNO / NÃO ACTIVO</span>
        <h2>Questionário de compatibilidade — pré-visualização</h2>
        <p className="questionnaire-draft-notice">
          <LockKeyhole size={14} /> {questionnaireDraftNotice}
        </p>
      </header>

      <p className="questionnaire-intro">
        Estrutura organizada em quatro temas. Será disponibilizado apenas numa fase posterior do
        processo, mediante convite da equipa e depois de verificados os requisitos de privacidade.
        Os campos abaixo são uma pré-visualização da estrutura — não enviam dados.
      </p>

      <ol className="questionnaire-themes">
        {questionnaireThemes.map((theme) => (
          <li key={theme.letter} className="questionnaire-theme">
            <div className="questionnaire-theme-head">
              <span className="questionnaire-theme-letter">{theme.letter}</span>
              <div>
                <h3>{theme.title}</h3>
                <p>{theme.intro}</p>
              </div>
            </div>
            <ul className="questionnaire-questions">
              {theme.questions.map((q) => (
                <li key={q.label} className="questionnaire-question">
                  <FileText size={13} />
                  <div>
                    <span className="questionnaire-question-label">{q.label}</span>
                    {q.help ? <span className="questionnaire-question-help">{q.help}</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="questionnaire-guardrails">
        <span className="admin-detail-label">Limites e protecção de dados</span>
        <ul>
          {questionnaireGuardrails.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
