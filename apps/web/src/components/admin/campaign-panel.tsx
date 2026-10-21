import { useCallback, useEffect, useState } from 'react';
import { AdminNav } from '@/components/admin/admin-nav';
import { Save, Plus, Trash2, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import pb from '@/lib/pocketbase-client';
import { services } from '@/data/services';
import { parsePrice, formatEuro, promotionalPrice } from '@/lib/pricing';

type CampaignSettings = {
  id: string;
  status: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  maxAdhesions: number;
  notes: string;
};

type CampaignAdhesion = {
  id: string;
  clientName: string;
  clientEmail: string;
  plan: string;
  regularPrice: number;
  promotionalPrice: number;
  discountPercentage: number;
  adhesionDate: string;
  notes: string;
  created: string;
};

const planLabels: Record<string, string> = {
  'private-matchmaking': 'Private',
  signature: 'Signature',
  'elite-concierge': 'Elite Concierge',
  'bespoke-private-search': 'Bespoke Private Search',
};

const statusLabels: Record<string, string> = {
  rascunho: 'Rascunho',
  ativa: 'Ativa',
  encerrada: 'Encerrada',
};

const statusTone: Record<string, string> = {
  rascunho: 'admin-status-pending',
  ativa: 'admin-status-approved',
  encerrada: 'admin-status-rejected',
};

function formatDate(iso: string): string {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat('pt-PT', {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function CampaignPanel() {
  const [settings, setSettings] = useState<CampaignSettings | null>(null);
  const [adhesions, setAdhesions] = useState<CampaignAdhesion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [newAdhesion, setNewAdhesion] = useState({
    clientName: '',
    clientEmail: '',
    plan: 'signature',
    adhesionDate: '',
    notes: '',
  });
  const [addingAdhesion, setAddingAdhesion] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const settingsResult = await pb
        .collection('campaign_settings')
        .getList<CampaignSettings>(1, 1);
      if (settingsResult.items[0]) setSettings(settingsResult.items[0]);
      const adhesionsResult = await pb
        .collection('campaign_adhesions')
        .getList<CampaignAdhesion>(1, 50, { sort: '-adhesionDate' });
      setAdhesions(adhesionsResult.items);
    } catch {
      setError('Não foi possível carregar os dados da campanha.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const updated = await pb.collection('campaign_settings').update<CampaignSettings>(
        settings.id,
        {
          status: settings.status,
          discountPercentage: Number(settings.discountPercentage) || 0,
          startDate: settings.startDate || null,
          endDate: settings.endDate || null,
          maxAdhesions: settings.maxAdhesions ? Number(settings.maxAdhesions) : null,
          notes: settings.notes || null,
        },
      );
      setSettings(updated);
      setMessage('Definições da campanha guardadas.');
    } catch {
      setError('Não foi possível guardar as definições.');
    } finally {
      setSaving(false);
    }
  }

  async function handleAddAdhesion(e: React.FormEvent) {
    e.preventDefault();
    if (!settings || !newAdhesion.clientName || !newAdhesion.clientEmail || !newAdhesion.adhesionDate) {
      setError('Preencha o nome, email e data de adesão.');
      return;
    }
    setAddingAdhesion(true);
    setError('');
    setMessage('');
    const regular = parsePrice(services.find((s) => s.slug === newAdhesion.plan)?.price ?? '0');
    const discount = Number(settings.discountPercentage) || 15;
    const promo = promotionalPrice(regular, discount);
    try {
      const created = await pb.collection('campaign_adhesions').create<CampaignAdhesion>({
        clientName: newAdhesion.clientName,
        clientEmail: newAdhesion.clientEmail,
        plan: newAdhesion.plan,
        regularPrice: regular,
        promotionalPrice: promo,
        discountPercentage: discount,
        adhesionDate: newAdhesion.adhesionDate,
        notes: newAdhesion.notes || null,
      });
      setAdhesions((prev) => [created, ...prev]);
      setNewAdhesion({ clientName: '', clientEmail: '', plan: 'signature', adhesionDate: '', notes: '' });
      setMessage('Adesão registada.');
    } catch {
      setError('Não foi possível registar a adesão.');
    } finally {
      setAddingAdhesion(false);
    }
  }

  async function handleDeleteAdhesion(id: string) {
    try {
      await pb.collection('campaign_adhesions').delete(id);
      setAdhesions((prev) => prev.filter((a) => a.id !== id));
      setMessage('Adesão removida.');
    } catch {
      setError('Não foi possível remover a adesão.');
    }
  }

  if (loading) {
    return (
      <div className="admin-panel">
        <AdminNav />
        <div className="admin-loading" />
      </div>
    );
  }

  const discount = Number(settings?.discountPercentage) || 15;

  return (
    <div className="admin-panel">
      <AdminNav />
      <header className="admin-header">
        <div>
          <h1>Campanha Founding Members</h1>
          <p>Gestão da campanha de lançamento — desconto no primeiro mês dos planos privados.</p>
        </div>
        {settings ? (
          <span className={`admin-status ${statusTone[settings.status] ?? ''}`}>
            {statusLabels[settings.status] ?? settings.status}
          </span>
        ) : null}
      </header>

      <div className="admin-notice">
        <AlertCircle size={16} />
        <p>
          A campanha só é visível na homepage quando o estado é <strong>Ativa</strong>. Em modo de
          pré-visualização (este ambiente), o estado <strong>Rascunho</strong> também mostra a
          campanha para revisão. Em produção, <strong>Rascunho</strong> mantém a campanha oculta
          até activação expressa. Não activar pagamentos, cobranças ou subscrições a partir deste
          painel — a contratação é tratada fora do website.
        </p>
      </div>

      {error ? (
        <div className="form-error" style={{ marginBottom: 20 }}>{error}</div>
      ) : null}
      {message ? (
        <div className="admin-notice" style={{ background: '#d7ebe0', borderLeftColor: '#167b50', marginBottom: 20 }}>
          <CheckCircle2 size={16} color="#167b50" />
          <p>{message}</p>
        </div>
      ) : null}

      {settings ? (
        <form className="admin-card" onSubmit={handleSaveSettings} style={{ padding: 24, marginBottom: 30 }}>
          <div className="admin-card-head" style={{ padding: 0, marginBottom: 20 }}>
            <div className="admin-card-id">
              <h2>Definições da campanha</h2>
              <span className="admin-card-meta">Configuração do desconto de lançamento</span>
            </div>
          </div>
          <div className="admin-detail-grid">
            <div className="admin-field">
              <span>Estado</span>
              <select
                value={settings.status}
                onChange={(e) => setSettings({ ...settings, status: e.target.value })}
              >
                <option value="rascunho">Rascunho (não activa)</option>
                <option value="ativa">Ativa</option>
                <option value="encerrada">Encerrada</option>
              </select>
            </div>
            <div className="admin-field">
              <span>Desconto (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={settings.discountPercentage}
                onChange={(e) => setSettings({ ...settings, discountPercentage: Number(e.target.value) })}
              />
            </div>
            <div className="admin-field">
              <span>Data de início</span>
              <input
                type="date"
                value={settings.startDate ? settings.startDate.slice(0, 10) : ''}
                onChange={(e) => setSettings({ ...settings, startDate: e.target.value })}
              />
            </div>
            <div className="admin-field">
              <span>Data de fim</span>
              <input
                type="date"
                value={settings.endDate ? settings.endDate.slice(0, 10) : ''}
                onChange={(e) => setSettings({ ...settings, endDate: e.target.value })}
              />
            </div>
            <div className="admin-field">
              <span>N.º máximo de adesões (opcional)</span>
              <input
                type="number"
                min={0}
                value={settings.maxAdhesions || ''}
                onChange={(e) => setSettings({ ...settings, maxAdhesions: Number(e.target.value) })}
              />
            </div>
            <div className="admin-field admin-field-grow">
              <span>Notas internas</span>
              <textarea
                value={settings.notes || ''}
                onChange={(e) => setSettings({ ...settings, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="campaign-price-preview">
            <span className="eyebrow" style={{ color: 'var(--burgundy)', marginBottom: 14 }}>
              PRÉ-VISUALIZAÇÃO DE PREÇOS · {discount}% DE DESCONTO
            </span>
            <div className="campaign-price-grid">
              {services.map((service) => {
                const regular = parsePrice(service.price);
                const promo = promotionalPrice(regular, discount);
                return (
                  <div key={service.slug} className="campaign-price-row">
                    <span className="campaign-price-name">{service.name}</span>
                    <span className="campaign-price-strike">{formatEuro(regular)}</span>
                    <span className="campaign-price-promo">{formatEuro(promo)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="admin-controls" style={{ borderTop: 'none', paddingTop: 0, marginTop: 20 }}>
            <button type="submit" className="button button-burgundy" disabled={saving}>
              <Save size={15} /> {saving ? 'A guardar…' : 'Guardar definições'}
            </button>
          </div>
        </form>
      ) : (
        <div className="admin-empty">Não foi possível carregar as definições da campanha.</div>
      )}

      <section className="admin-card" style={{ padding: 24, marginBottom: 30 }}>
        <div className="admin-card-head" style={{ padding: 0, marginBottom: 20 }}>
          <div className="admin-card-id">
            <h2>Registo de adesões elegíveis</h2>
            <span className="admin-card-meta">
              {adhesions.length} {adhesions.length === 1 ? 'adesão registada' : 'adesões registadas'}
            </span>
          </div>
        </div>

        <form className="campaign-adhesion-form" onSubmit={handleAddAdhesion} style={{ marginBottom: 24 }}>
          <div className="admin-detail-grid">
            <div className="admin-field">
              <span>Nome do cliente</span>
              <input
                type="text"
                value={newAdhesion.clientName}
                onChange={(e) => setNewAdhesion({ ...newAdhesion, clientName: e.target.value })}
                placeholder="Nome"
              />
            </div>
            <div className="admin-field">
              <span>Email</span>
              <input
                type="email"
                value={newAdhesion.clientEmail}
                onChange={(e) => setNewAdhesion({ ...newAdhesion, clientEmail: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="admin-field">
              <span>Plano</span>
              <select
                value={newAdhesion.plan}
                onChange={(e) => setNewAdhesion({ ...newAdhesion, plan: e.target.value })}
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <span>Data de adesão</span>
              <input
                type="date"
                value={newAdhesion.adhesionDate}
                onChange={(e) => setNewAdhesion({ ...newAdhesion, adhesionDate: e.target.value })}
              />
            </div>
            <div className="admin-field admin-field-grow">
              <span>Notas</span>
              <input
                type="text"
                value={newAdhesion.notes}
                onChange={(e) => setNewAdhesion({ ...newAdhesion, notes: e.target.value })}
                placeholder="Opcional"
              />
            </div>
          </div>
          <button type="submit" className="button button-burgundy" disabled={addingAdhesion} style={{ marginTop: 16 }}>
            <Plus size={15} /> {addingAdhesion ? 'A registar…' : 'Registar adesão'}
          </button>
        </form>

        {adhesions.length === 0 ? (
          <div className="admin-empty">Ainda não há adesões registadas.</div>
        ) : (
          <ul className="admin-list">
            {adhesions.map((adhesion) => (
              <li key={adhesion.id} className="admin-card is-info">
                <div className="admin-card-head">
                  <div className="admin-card-id">
                    <span className="admin-status admin-status-info">
                      {planLabels[adhesion.plan] ?? adhesion.plan}
                    </span>
                    <h2>{adhesion.clientName}</h2>
                    <span className="admin-card-meta">{adhesion.clientEmail}</span>
                    <span className="admin-card-date">
                      Adesão: {formatDate(adhesion.adhesionDate)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="admin-delete"
                    onClick={() => handleDeleteAdhesion(adhesion.id)}
                  >
                    <Trash2 size={14} /> Remover
                  </button>
                </div>
                <div className="admin-card-body">
                  <div className="admin-detail-grid">
                    <div>
                      <span className="admin-detail-label">Preço habitual</span>
                      <p>{formatEuro(adhesion.regularPrice)} / mês</p>
                    </div>
                    <div>
                      <span className="admin-detail-label">1º mês (promocional)</span>
                      <p>{formatEuro(adhesion.promotionalPrice)}</p>
                    </div>
                    <div>
                      <span className="admin-detail-label">Desconto aplicado</span>
                      <p>{adhesion.discountPercentage}%</p>
                    </div>
                    <div>
                      <span className="admin-detail-label">Registado em</span>
                      <p>{formatDate(adhesion.created)}</p>
                    </div>
                  </div>
                  {adhesion.notes ? (
                    <div className="admin-detail-block">
                      <span className="admin-detail-label">Notas</span>
                      <p>{adhesion.notes}</p>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="admin-notice">
        <Sparkles size={16} />
        <p>
          Lembrete: o desconto aplica-se apenas ao primeiro mês. Em renovações, aplica-se o preço
          habitual previamente comunicado e aceite. Não inventar escassez, datas, contadores ou
          números de clientes sem dados reais. A data exacta de lançamento e o eventual limite de
          vagas devem ser definidos pela administradora antes da activação.
        </p>
      </div>
    </div>
  );
}
