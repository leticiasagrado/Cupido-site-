import type { Route } from './+types/admin-rede-privada';
import { seo } from '@/lib/seo';
import { redirect } from 'react-router';
import pb from '@/lib/pocketbase-client';
import { NetworkAdminPanel } from '@/components/admin/network-panel';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Painel da Rede Privada — The Cupid Bureau',
    description: 'Área administrativa da rede privada.',
    path: '/admin/rede-privada',
    noindex: true,
  });
}

export async function clientLoader() {
  const record = pb.authStore.record;
  if (!pb.authStore.isValid || !record) {
    throw redirect('/login?next=/admin/rede-privada');
  }
  // Only app admins may enter. Reload the auth record so role is current.
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

export default function AdminRedePrivadaPage() {
  return (
    <main id="conteudo" className="admin-main">
      <NetworkAdminPanel />
    </main>
  );
}
