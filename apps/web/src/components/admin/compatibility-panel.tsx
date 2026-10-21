import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router';
import {
  ArrowUpRight,
  RefreshCw,
  LockKeyhole,
  ChevronDown,
  ChevronUp,
  Trash2,
  HeartHandshake,
  NotebookPen,
} from 'lucide-react';
import pb from '@/lib/pocketbase-client';
import { AdminNav } from '@/components/admin/admin-nav';
import { statusLabels, statusTone } from '@/data/network-application';
import type { NetworkStatus } from '@/data/network-application';

const POCKETBASE_API_URL = '/hcgi/platform';

type Application = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  cityCountry: string;
  phone: string;
  intention: string;
  aboutYou: string;
  photos: string[];
  consentSharePhotos: boolean;
  status: NetworkStatus | '';
  created: string;
};

type NoteType = 'observacao' | 'contacto' | 'feedback' | 'compatibilidade';
type CompatibilityTone = 'potencial' | 'a-avaliar' | 'descartada';

type CompatibilityNote = {
  id: string;
  candidate: string;
  relatedCandidate: string;
  noteType: NoteType;
  note: string;
  compatibilityTone: CompatibilityTone | '';
  created: string;
};

const intentionLabels: Record<string, string> = {
  'relacao-seria': 'Uma relação séria e duradoura',
  'conhecer-intencao': 'Conhecer alguém com intenção e tranquilidade',
  'a-definir': 'Ainda estou a definir o que procuro',
};

const noteTypeLabels: Record<NoteType, string> = {
  observacao: 'Observação',
  contacto: 'Registo de contacto',
  feedback: 'Feedback',
  compatibilidade: 'Sugestão de compatibilidade',
};

const toneLabels: Record<CompatibilityTone, string> = {
  potencial: 'Potencial',
  'a-avaliar': 'A avaliar',
  descartada: 'Descartada',
};

function fileUrl(recordId: string, filename: string, token: string): string {
  return `${POCKETBASE_API_URL}/api/files/network_applications/${recordId}/${filename}?token=${token}`;
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('pt-PT', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' });
}

function ageFromBirth(iso: string): number {
  if (!iso) return 0;
  const birth = new Date(iso);
  if (Number.isNaN(birth.getTime())) return 0;
  const today = new Date();
  let age = today.getUTCFullYear() - birth.getUTCFullYear();
  const m = today.getUTCMonth() - birth.getUTCMonth();
  if (m < 0 || (m === 0 && today.getUTCDate() < birth.getUTCDate())) age -= 1;
  return age;
}

export function CompatibilityPanel() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [notes, setNotes] = useState<CompatibilityNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fileToken, setFileToken] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [draftNote, setDraftNote] = useState<Record<string, { type: NoteType; text: string; related: string; tone: CompatibilityTone }>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = await pb.files.getToken();
      setFileToken(token);
      const [apps, noteRecords] = await Promise.all([
        pb.collection('network_applications').getFullList({ sort: '-created' }),
        pb.collection('compatibility_notes').getFullList({ sort: '-created' }),
      ]);
      setApplications(apps as unknown as Application[]);
      setNotes(noteRecords as unknown as CompatibilityNote[]);
    } catch {
      setError('Não foi possível carregar os dados. Verifique o seu acesso de administrador.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const interval = setInterval(() => {
      pb.files.getToken().then(setFileToken).catch(() => {});
    }, 150000);
    return () => clearInterval(interval);
  }, [load]);

  function getDraft(id: string) {
    return (
      draftNote[id] ?? { type: 'observacao' as NoteType, text: '', related: '', tone: 'a-avaliar' as CompatibilityTone }
    );
  }

  function setDraft(id: string, patch: Partial<{ type: NoteType; text: string; related: string; tone: CompatibilityTone }>) {
    setDraftNote((prev) => ({ ...prev, [id]: { ...getDraft(id), ...patch } }));
  }

  async function saveNote(candidateId: string) {
    const draft = getDraft(candidateId);
    if (draft.text.trim().length < 2) {
      setError('A nota deve ter pelo menos 2 caracteres.');
      return;
    }
    try {
      const payload: Record<string, unknown> = {
        candidate: candidateId,
        noteType: draft.type,
        note: draft.text.trim().slice(0, 2000),
      };
      if (draft.type === 'compatibilidade') {
        if (!draft.related) {
          setError('Seleccione o candidato relacionado para a sugestão de compatibilidade.');
          return;
        }
        payload.relatedCandidate = draft.related;
        payload.compatibilityTone = draft.tone;
      }
      const rec = await pb.collection('compatibility_notes').create(payload);
      setNotes((prev) => [rec as unknown as CompatibilityNote, ...prev]);
      setDraftNote((prev) => {
        const next = { ...prev };
        delete next[candidateId];
        return next;
      });
      setError('');
    } catch {
      setError('Não foi possível guardar a nota.');
    }
  }

  async function removeNote(noteId: string) {
    try {
      await pb.collection('compatibility_notes').delete(noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch {
      setError('Não foi possível eliminar a nota.');
    }
  }

  const candidateName = (id: string) => {
    const c = applications.find((a) => a.id === id);
    return c ? `${c.firstName} ${c.lastName}` : 'Candidato removido';
  };

  return (
    <div className="admin-panel">
      <AdminNav />
      <header className="admin-header">
        <div>
          <span className="eyebrow">PAINEL ADMINISTRATIVO</span>
          <h1>The Cupid Method — Curadoria</h1>
          <p>
            {applications.length} candidato{applications.length !== 1 ? 's' : ''} · {notes.length} nota{notes.length !== 1 ? 's' : ''} profissional{notes.length !== 1 ? 'is' : ''}
          </p>
        </div>
        <div className="admin-actions-top">
          <button type="button" className="button button-outline" onClick={() => void load()} disabled={loading}>
            <RefreshCw size={15} className={loading ? 'submission-spinner' : ''} /> Actualizar
          </button>
          <Link className="text-link" to="/">
            Voltar ao site <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      <p className="admin-notice">
        <LockKeyhole size={12} /> Área restrita à equipa de matchmaking. As notas devem ser factuais,
        proporcionais e relacionadas com a prestação do serviço. Não são permitidos diagnósticos
        informais, classificações de saúde mental ou comentários depreciativos sobre candidatos.
      </p>

      {error ? <p className="form-error" role="alert">{error}</p> : null}

      {loading ? (
        <p className="admin-empty">A carregar candidaturas…</p>
      ) : applications.length === 0 ? (
        <p className="admin-empty">Ainda não existem candidaturas para analisar.</p>
      ) : (
        <ul className="admin-list">
          {applications.map((app) => {
            const isOpen = expanded[app.id] ?? false;
            const status: NetworkStatus = app.status || 'pending';
            const candidateNotes = notes.filter(
              (n) => n.candidate === app.id && n.noteType !== 'compatibilidade',
            );
            const suggestions = notes.filter(
              (n) => n.candidate === app.id && n.noteType === 'compatibilidade',
            );
            const draft = getDraft(app.id);
            return (
              <li key={app.id} className={`admin-card is-${statusTone[status]}`}>
                <div className="admin-card-head">
                  <div className="admin-card-id">
                    <span className={`admin-status admin-status-${statusTone[status]}`}>{statusLabels[status]}</span>
                    <h2>{app.firstName} {app.lastName}</h2>
                    <span className="admin-card-meta">{app.email} · {app.cityCountry} · {ageFromBirth(app.birthDate)} anos</span>
                    <span className="admin-card-date">Recebida em {formatDate(app.created)}</span>
                  </div>
                  <button
                    type="button"
                    className="admin-expand"
                    onClick={() => setExpanded((p) => ({ ...p, [app.id]: !isOpen }))}
                    aria-label={isOpen ? 'Fechar ficha' : 'Abrir ficha'}
                  >
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {isOpen ? (
                  <div className="admin-card-body">
                    <div className="admin-detail-grid">
                      <div>
                        <span className="admin-detail-label">Intenção declarada</span>
                        <p>{intentionLabels[app.intention] || app.intention || '—'}</p>
                      </div>
                      <div>
                        <span className="admin-detail-label">Disponibilidade geográfica</span>
                        <p>{app.cityCountry || '—'}</p>
                      </div>
                      <div>
                        <span className="admin-detail-label">Contacto</span>
                        <p>{app.phone || '—'}</p>
                      </div>
                      <div>
                        <span className="admin-detail-label">Partilha de fotos</span>
                        <p>{app.consentSharePhotos ? 'Autorizada' : 'Não autorizada'}</p>
                      </div>
                    </div>

                    {app.aboutYou ? (
                      <div className="admin-detail-block">
                        <span className="admin-detail-label">Sobre si (declarado)</span>
                        <p>{app.aboutYou}</p>
                      </div>
                    ) : null}

                    {app.photos.length > 0 ? (
                      <div className="admin-photos">
                        <span className="admin-detail-label">Fotografias ({app.photos.length})</span>
                        <div className="admin-photo-grid">
                          {app.photos.map((filename, index) => (
                            <a
                              key={filename}
                              href={fileUrl(app.id, filename, fileToken)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-photo"
                            >
                              <img src={fileUrl(app.id, filename, fileToken)} alt={`Fotografia ${index + 1} de ${app.firstName}`} loading="lazy" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="admin-no-photos">Sem fotografias anexadas.</p>
                    )}

                    <div className="compat-notes">
                      <span className="admin-detail-label">
                        <NotebookPen size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
                        Notas profissionais ({candidateNotes.length})
                      </span>
                      {candidateNotes.length === 0 ? (
                        <p className="admin-no-photos">Sem notas registadas.</p>
                      ) : (
                        <ul className="compat-notes-list">
                          {candidateNotes.map((n) => (
                            <li key={n.id} className="compat-note-item">
                              <div>
                                <span className="compat-note-type">{noteTypeLabels[n.noteType]}</span>
                                <span className="compat-note-date">{formatDate(n.created)}</span>
                              </div>
                              <p>{n.note}</p>
                              <button type="button" className="admin-delete" onClick={() => void removeNote(n.id)} aria-label="Eliminar nota">
                                <Trash2 size={14} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="compat-note-form">
                        <div className="compat-note-form-row">
                          <label className="admin-field">
                            <span>Tipo de nota</span>
                            <select value={draft.type} onChange={(e) => setDraft(app.id, { type: e.target.value as NoteType })}>
                              <option value="observacao">Observação</option>
                              <option value="contacto">Registo de contacto</option>
                              <option value="feedback">Feedback</option>
                              <option value="compatibilidade">Sugestão de compatibilidade</option>
                            </select>
                          </label>
                          {draft.type === 'compatibilidade' ? (
                            <>
                              <label className="admin-field">
                                <span>Candidato relacionado</span>
                                <select value={draft.related} onChange={(e) => setDraft(app.id, { related: e.target.value })}>
                                  <option value="">Seleccione…</option>
                                  {applications.filter((a) => a.id !== app.id).map((a) => (
                                    <option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>
                                  ))}
                                </select>
                              </label>
                              <label className="admin-field">
                                <span>Tom</span>
                                <select value={draft.tone} onChange={(e) => setDraft(app.id, { tone: e.target.value as CompatibilityTone })}>
                                  <option value="potencial">Potencial</option>
                                  <option value="a-avaliar">A avaliar</option>
                                  <option value="descartada">Descartada</option>
                                </select>
                              </label>
                            </>
                          ) : null}
                        </div>
                        <label className="admin-field admin-field-grow">
                          <span>Nota factual e proporcional</span>
                          <textarea
                            rows={2}
                            value={draft.text}
                            onChange={(e) => setDraft(app.id, { text: e.target.value })}
                            placeholder="Registo profissional, relacionado com a prestação do serviço."
                          />
                        </label>
                        <button type="button" className="button button-burgundy compat-note-submit" onClick={() => void saveNote(app.id)}>
                          Guardar nota
                        </button>
                      </div>
                    </div>

                    <div className="compat-suggestions">
                      <span className="admin-detail-label">
                        <HeartHandshake size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
                        Sugestões de compatibilidade ({suggestions.length})
                      </span>
                      {suggestions.length === 0 ? (
                        <p className="admin-no-photos">Sem sugestões registadas. As sugestões apoiam a decisão humana — não realizam apresentações automáticas.</p>
                      ) : (
                        <ul className="compat-suggest-list">
                          {suggestions.map((s) => (
                            <li key={s.id} className={`compat-suggest-item is-${s.compatibilityTone || 'a-avaliar'}`}>
                              <div>
                                <span className="compat-suggest-name">{candidateName(s.relatedCandidate)}</span>
                                <span className="compat-suggest-tone">{toneLabels[(s.compatibilityTone || 'a-avaliar') as CompatibilityTone]}</span>
                              </div>
                              <p>{s.note}</p>
                              <button type="button" className="admin-delete" onClick={() => void removeNote(s.id)} aria-label="Eliminar sugestão">
                                <Trash2 size={14} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
