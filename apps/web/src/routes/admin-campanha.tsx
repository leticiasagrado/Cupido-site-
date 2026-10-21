import type { Route } from './+types/admin-campanha';
import { seo } from '@/lib/seo';
import { redirect } from 'react-router';
import pb from '@/lib/pocketbase-client';
import { CampaignPanel } from '@/components/admin/campaign-panel';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Painel da Campanha — The Cupid Bureau',
    description: 'Área administrativa da campanha Founding Members.',
    path: '/admin/campanha',
    noindex: true,
  });
}

export async function clientLoader() {
  const record = pb.authStore.record;
  if (!pb.authStore.isValid || !record) {
    throw redirect('/login?next=/admin/campanha');
  }
  let role = record?.role;
  if (!role) {
    try {
      const fresh = await pb.collection('users').getOne(record.id);
      role = fresh.role;
    } catch {
      role = '';
    }
  }
  if (role !== 'admin') {
    throw redirect('/');
  }
  return { isAdmin: true };
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return <div className="admin-loading" />;
}

export default function AdminCampanhaPage() {
  return (
    <main id="conteudo" className="admin-main">
      <CampaignPanel />
    </main>
  );
}
