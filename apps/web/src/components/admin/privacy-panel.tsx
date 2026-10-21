import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Trash2, RefreshCw, LockKeyhole, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import pb from '@/lib/pocketbase-client';
import { AdminNav } from '@/components/admin/admin-nav';
import {
  requestTypeLabels,
  requestStatusLabels,
  requestStatusTone,
  type PrivacyRequestStatus,
  type PrivacyRequestType,
} from '@/data/privacy-request';

type PrivacyRequest = {
  id: string;
  name: string;
  email: string;
  requestType: PrivacyRequestType | '';
  details: string;
  status: PrivacyRequestStatus | '';
  adminNotes: string;
  identityVerified: boolean;
  created: string;
};

function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('pt-PT', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' });
}

export function PrivacyAdminPanel() {
  const [requests, setRequests] = useState<PrivacyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const records = await pb.collection('privacy_requests').getFullList({ sort: '-created' });
      setRequests(records as unknown as PrivacyRequest[]);
    } catch {
      setError('Não foi possível carregar os pedidos. Verifique o seu acesso de administrador.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function updateStatus(id: string, status: PrivacyRequestStatus) {
    try {
      await pb.collection('privacy_requests').update(id, { status });
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch {
      setError('Não foi possível actualizar o estado do pedido.');
    }
  }

  async function toggleIdentity(id: string, current: boolean) {
    try {
      await pb.collection('privacy_requests').update(id, { identityVerified: !current });
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, identityVerified: !current } : r)));
    } catch {
      setError('Não foi possível actualizar a verificação de identidade.');
    }
  }

  async function saveNotes(id: string, notes: string) {
    try {
      await pb.collection('privacy_requests').update(id, { adminNotes: notes });
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, adminNotes: notes } : r)));
    } catch {
      setError('Não foi possível guardar as notas.');
    }
  }

  async function remove(id: string) {
    if (!confirm('Eliminar este pedido de privacidade? Esta acção é definitiva.')) return;
    try {
      await pb.collection('privacy_requests').delete(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setError('Não foi possível eliminar o pedido.');
    }
  }

  const newCount = requests.filter((r) => !r.status || r.status === 'novo').length;

  return (
    <div className="admin-panel">
      <AdminNav />
      <header className="admin-header">
        <div>
          <span className="eyebrow">PAINEL ADMINISTRATIVO</span>
          <h1>Pedidos de Privacidade</h1>
          <p>
            {requests.length} pedido{requests.length !== 1 ? 's' : ''} · {newCount} novo{newCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="admin-actions-top">
          <button type="button" className="button button-outline" onClick={() => void load()} disabled={loading}>
            <RefreshCw size={15} className={loading ? 'submission-spinner' : ''} /> Actualizar
          </button>
          <Link className="text-link" to="/admin/rede-privada">
            Candidaturas <ArrowUpRight size={14} />
          </Link>
          <Link className="text-link" to="/">
            Voltar ao site <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      <p className="admin-notice">
        <LockKeyhole size={12} /> Área restrita a administradores. Verifique a identidade do
        requerente antes de divulgar ou alterar dados. Registe o tratamento em notas internas.
      </p>

      {error ? <p className="form-error" role="alert">{error}</p> : null}

      {loading ? (
        <p className="admin-empty">A carregar pedidos…</p>
      ) : requests.length === 0 ? (
        <p className="admin-empty">Ainda não existem pedidos de privacidade.</p>
      ) : (
        <ul className="admin-list">
          {requests.map((req) => {
            const isOpen = expanded[req.id] ?? false;
            const status: PrivacyRequestStatus = req.status || 'novo';
            const reqType = req.requestType || 'acesso';
            return (
              <li key={req.id} className={`admin-card is-${requestStatusTone[status]}`}>
                <div className="admin-card-head">
                  <div className="admin-card-id">
                    <span className={`admin-status admin-status-${requestStatusTone[status]}`}>{requestStatusLabels[status]}</span>
                    <h2>{req.name}</h2>
                    <span className="admin-card-meta">{requestTypeLabels[reqType]} · {req.email}</span>
                    <span className="admin-card-date">Recebido em {formatDate(req.created)}</span>
                  </div>
                  <button
                    type="button"
                    className="admin-expand"
                    onClick={() => setExpanded((p) => ({ ...p, [req.id]: !isOpen }))}
                    aria-label={isOpen ? 'Fechar detalhes' : 'Abrir detalhes'}
                  >
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {isOpen ? (
                  <div className="admin-card-body">
                    <div className="admin-detail-grid">
                      <div>
                        <span className="admin-detail-label">Tipo de pedido</span>
                        <p>{requestTypeLabels[reqType]}</p>
                      </div>
                      <div>
                        <span className="admin-detail-label">Email</span>
                        <p>{req.email}</p>
                      </div>
                      <div>
                        <span className="admin-detail-label">Identidade verificada</span>
                        <p>{req.identityVerified ? 'Sim' : 'Não verificada'}</p>
                      </div>
                      <div>
                        <span className="admin-detail-label">Estado</span>
                        <p>{requestStatusLabels[status]}</p>
                      </div>
                    </div>

                    {req.details ? (
                      <div className="admin-detail-block">
                        <span className="admin-detail-label">Detalhes</span>
                        <p>{req.details}</p>
                      </div>
                    ) : null}

                    <div className="admin-controls">
                      <label className="admin-field">
                        <span>Estado</span>
                        <select
                          value={status}
                          onChange={(e) => void updateStatus(req.id, e.target.value as PrivacyRequestStatus)}
                        >
                          <option value="novo">Novo</option>
                          <option value="em-tratamento">Em tratamento</option>
                          <option value="concluido">Concluído</option>
                          <option value="recusado">Recusado</option>
                        </select>
                      </label>
                      <label className="admin-field admin-field-grow">
                        <span>Notas internas</span>
                        <textarea
                          rows={2}
                          defaultValue={req.adminNotes || ''}
                          onBlur={(e) => void saveNotes(req.id, e.target.value)}
                          placeholder="Registe o tratamento do pedido e a verificação de identidade."
                        />
                      </label>
                      <button
                        type="button"
                        className={`admin-verify ${req.identityVerified ? 'is-verified' : ''}`}
                        onClick={() => void toggleIdentity(req.id, req.identityVerified)}
                      >
                        <ShieldCheck size={16} /> {req.identityVerified ? 'Verificada' : 'Marcar verificada'}
                      </button>
                      <button type="button" className="admin-delete" onClick={() => void remove(req.id)} aria-label="Eliminar pedido">
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
