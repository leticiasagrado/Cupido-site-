import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Trash2, RefreshCw, LockKeyhole, ChevronDown, ChevronUp } from 'lucide-react';
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
  adminNotes: string;
  created: string;
};

const intentionLabels: Record<string, string> = {
  'relacao-seria': 'Uma relação séria e duradoura',
  'conhecer-intencao': 'Conhecer alguém com intenção e tranquilidade',
  'a-definir': 'Ainda estou a definir o que procuro',
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

export function NetworkAdminPanel() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fileToken, setFileToken] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = await pb.files.getToken();
      setFileToken(token);
      const records = await pb.collection('network_applications').getFullList({
        sort: '-created',
      });
      setApplications(records as unknown as Application[]);
    } catch {
      setError('Não foi possível carregar as candidaturas. Verifique o seu acesso de administrador.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    // Refresh the short-lived file token periodically so photos keep loading.
    const interval = setInterval(() => {
      pb.files.getToken().then(setFileToken).catch(() => {});
    }, 150000);
    return () => clearInterval(interval);
  }, [load]);

  async function updateStatus(id: string, status: NetworkStatus) {
    try {
      await pb.collection('network_applications').update(id, { status });
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    } catch {
      setError('Não foi possível actualizar o estado da candidatura.');
    }
  }

  async function saveNotes(id: string, notes: string) {
    try {
      await pb.collection('network_applications').update(id, { adminNotes: notes });
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, adminNotes: notes } : a)));
    } catch {
      setError('Não foi possível guardar as notas.');
    }
  }

  async function remove(id: string) {
    if (!confirm('Eliminar esta candidatura e as suas fotografias? Esta acção é definitiva.')) return;
    try {
      await pb.collection('network_applications').delete(id);
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError('Não foi possível eliminar a candidatura.');
    }
  }

  const pendingCount = applications.filter((a) => !a.status || a.status === 'pending').length;

  return (
    <div className="admin-panel">
      <AdminNav />
      <header className="admin-header">
        <div>
          <span className="eyebrow">PAINEL ADMINISTRATIVO</span>
          <h1>Rede Privada — Candidaturas</h1>
          <p>
            {applications.length} candidatura{applications.length !== 1 ? 's' : ''} · {pendingCount} pendente{pendingCount !== 1 ? 's' : ''}
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
        <LockKeyhole size={12} /> Área restrita a administradores. As fotografias são privadas e não
        devem ser partilhadas fora do processo de avaliação, salvo autorização específica do candidato.
      </p>

      {error ? <p className="form-error" role="alert">{error}</p> : null}

      {loading ? (
        <p className="admin-empty">A carregar candidaturas…</p>
      ) : applications.length === 0 ? (
        <p className="admin-empty">Ainda não existem candidaturas à rede privada.</p>
      ) : (
        <ul className="admin-list">
          {applications.map((app) => {
            const isOpen = expanded[app.id] ?? false;
            const status: NetworkStatus = app.status || 'pending';
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
                    aria-label={isOpen ? 'Fechar detalhes' : 'Abrir detalhes'}
                  >
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {isOpen ? (
                  <div className="admin-card-body">
                    <div className="admin-detail-grid">
                      <div>
                        <span className="admin-detail-label">Intenção</span>
                        <p>{intentionLabels[app.intention] || app.intention || '—'}</p>
                      </div>
                      <div>
                        <span className="admin-detail-label">Telemóvel</span>
                        <p>{app.phone || '—'}</p>
                      </div>
                      <div>
                        <span className="admin-detail-label">Data de nascimento</span>
                        <p>{app.birthDate || '—'}</p>
                      </div>
                      <div>
                        <span className="admin-detail-label">Partilha de fotos</span>
                        <p>{app.consentSharePhotos ? 'Autorizada' : 'Não autorizada'}</p>
                      </div>
                    </div>

                    {app.aboutYou ? (
                      <div className="admin-detail-block">
                        <span className="admin-detail-label">Sobre si</span>
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

                    <div className="admin-controls">
                      <label className="admin-field">
                        <span>Estado</span>
                        <select
                          value={status}
                          onChange={(e) => void updateStatus(app.id, e.target.value as NetworkStatus)}
                        >
                          <option value="pending">Pendente</option>
                          <option value="approved">Aprovada</option>
                          <option value="rejected">Rejeitada</option>
                          <option value="info-requested">Informação solicitada</option>
                        </select>
                      </label>
                      <label className="admin-field admin-field-grow">
                        <span>Notas internas</span>
                        <textarea
                          rows={2}
                          defaultValue={app.adminNotes || ''}
                          onBlur={(e) => void saveNotes(app.id, e.target.value)}
                          placeholder="Notas visíveis apenas para a equipa."
                        />
                      </label>
                      <button type="button" className="admin-delete" onClick={() => void remove(app.id)} aria-label="Eliminar candidatura">
                        <Trash2 size={16} /> Eliminar
                      </button>
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
