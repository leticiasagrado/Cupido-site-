import type { Route } from './+types/admin-pedidos-privacidade';
import { seo } from '@/lib/seo';
import { redirect } from 'react-router';
import pb from '@/lib/pocketbase-client';
import { PrivacyAdminPanel } from '@/components/admin/privacy-panel';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Pedidos de Privacidade — The Cupid Bureau',
    description: 'Área administrativa para gerir pedidos de privacidade e direitos dos titulares.',
    path: '/admin/pedidos-privacidade',
    noindex: true,
  });
}

export async function clientLoader() {
  const record = pb.authStore.record;
  if (!pb.authStore.isValid || !record) {
    throw redirect('/login?next=/admin/pedidos-privacidade');
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

export default function AdminPedidosPrivacidadePage() {
  return (
    <main id="conteudo" className="admin-main">
      <PrivacyAdminPanel />
    </main>
  );
}
