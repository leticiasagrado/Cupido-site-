import type { Route } from './+types/admin-academia';
import { seo } from '@/lib/seo';
import { redirect } from 'react-router';
import pb from '@/lib/pocketbase-client';
import { AcademyAdminPanel } from '@/components/admin/academy-panel';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Academia — The Cupid Bureau',
    description: 'Área administrativa da lista de espera da The Cupid Academy.',
    path: '/admin/academia',
    noindex: true,
  });
}

export async function clientLoader() {
  const record = pb.authStore.record;
  if (!pb.authStore.isValid || !record) {
    throw redirect('/login?next=/admin/academia');
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

export default function AdminAcademiaPage() {
  return (
    <main id="conteudo" className="admin-main">
      <AcademyAdminPanel />
    </main>
  );
}
