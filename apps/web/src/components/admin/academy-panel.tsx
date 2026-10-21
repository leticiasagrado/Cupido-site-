import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, LockKeyhole, RefreshCw, Trash2 } from 'lucide-react';
import pb from '@/lib/pocketbase-client';
import { AdminNav } from '@/components/admin/admin-nav';
import { academyCourses, academyProducts } from '@/data/academy';

type Interest = {
  id: string;
  name: string;
  email: string;
  course: string;
  message: string;
  lang: string;
  consentMarketing: boolean;
  created: string;
};

const labels: Record<string, string> = {
  todos: 'Todos os cursos',
  ...Object.fromEntries(academyCourses.map((c) => [c.id, c.name.pt])),
  ...Object.fromEntries(academyProducts.map((p) => [p.id, p.name.pt])),
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' });
}

export function AcademyAdminPanel() {
  const [items, setItems] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const records = await pb.collection('academy_interest').getFullList({ sort: '-created' });
      setItems(records as unknown as Interest[]);
    } catch {
      setError('Não foi possível carregar a lista de espera. Verifique o seu acesso de administrador.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove(id: string) {
    if (!confirm('Eliminar este registo da lista de espera? Esta acção é definitiva.')) return;
    try {
      await pb.collection('academy_interest').delete(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      setError('Não foi possível eliminar o registo.');
    }
  }

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((i) => map.set(i.course, (map.get(i.course) ?? 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);

  const visible = filter ? items.filter((i) => i.course === filter) : items;

  return (
    <div className="admin-panel">
      <AdminNav />
      <header className="admin-header">
        <div>
          <span className="eyebrow">PAINEL ADMINISTRATIVO</span>
          <h1>The Cupid Academy</h1>
          <p>{items.length} pessoa{items.length !== 1 ? 's' : ''} na lista de espera</p>
        </div>
        <div className="admin-actions-top">
          <button type="button" className="button button-outline" onClick={() => void load()} disabled={loading}>
            <RefreshCw size={15} className={loading ? 'submission-spinner' : ''} /> Actualizar
          </button>
          <Link className="text-link" to="/academia">
            Ver a Academia <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      <p className="admin-notice">
        <LockKeyhole size={12} /> Área restrita a administradores. Use estes contactos apenas para avisar sobre a Academia;
        só envie campanhas a quem aceitou marketing.
      </p>

      {error ? <p className="form-error" role="alert">{error}</p> : null}

      {counts.length ? (
        <div className="academy-admin-counts">
          <button type="button" className={filter === '' ? 'is-active' : ''} onClick={() => setFilter('')}>
            Todos · {items.length}
          </button>
          {counts.map(([course, n]) => (
            <button key={course} type="button" className={filter === course ? 'is-active' : ''} onClick={() => setFilter(course)}>
              {labels[course] ?? course} · {n}
            </button>
          ))}
        </div>
      ) : null}

      {loading ? (
        <p className="admin-empty">A carregar…</p>
      ) : visible.length === 0 ? (
        <p className="admin-empty">Ainda não há ninguém na lista de espera.</p>
      ) : (
        <ul className="admin-list">
          {visible.map((i) => (
            <li key={i.id} className="admin-card">
              <div className="admin-card-head">
                <div className="admin-card-id">
                  <strong>{i.name}</strong>
                  <span>{i.email}</span>
                </div>
                <button type="button" className="button button-outline" onClick={() => void remove(i.id)} aria-label={`Eliminar ${i.name}`}>
                  <Trash2 size={14} />
                </button>
              </div>
              <p>
                <strong>{labels[i.course] ?? i.course}</strong> · {i.lang === 'en' ? 'EN' : 'PT'} · {formatDate(i.created)} ·{' '}
                {i.consentMarketing ? 'Aceitou marketing' : 'Sem marketing'}
              </p>
              {i.message ? <p>{i.message}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
