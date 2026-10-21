import type { Route } from './+types/admin-colaboracao-psicologas';
import { seo } from '@/lib/seo';
import { redirect } from 'react-router';
import pb from '@/lib/pocketbase-client';
import { PsychologistPanel } from '@/components/admin/psychologist-panel';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Colaboração Profissional — The Cupid Bureau',
    description: 'Área administrativa para eventual colaboração futura com psicólogas habilitadas. Rascunho não publicado.',
    path: '/admin/colaboracao-psicologas',
    noindex: true,
  });
}

export async function clientLoader() {
  const record = pb.authStore.record;
  if (!pb.authStore.isValid || !record) {
    throw redirect('/login?next=/admin/colaboracao-psicologas');
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
  return { isAuthorized: true };
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return <div className="admin-loading" />;
}

export default function AdminColaboracaoPsicologasPage() {
  return (
    <main id="conteudo" className="admin-main">
      <PsychologistPanel />
    </main>
  );
}
