import type { Route } from './+types/admin-compatibilidade';
import { seo } from '@/lib/seo';
import { redirect } from 'react-router';
import pb from '@/lib/pocketbase-client';
import { CompatibilityPanel } from '@/components/admin/compatibility-panel';
import { QuestionnairePreview } from '@/components/admin/questionnaire-preview';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Curadoria de Compatibilidade — The Cupid Bureau',
    description: 'Área administrativa do método: fichas, notas profissionais e sugestões de compatibilidade.',
    path: '/admin/compatibilidade',
    noindex: true,
  });
}

export async function clientLoader() {
  const record = pb.authStore.record;
  if (!pb.authStore.isValid || !record) {
    throw redirect('/login?next=/admin/compatibilidade');
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
  if (role !== 'admin' && role !== 'staff') {
    throw redirect('/');
  }
  return { isAuthorized: true };
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return <div className="admin-loading" />;
}

export default function AdminCompatibilidadePage() {
  return (
    <main id="conteudo" className="admin-main">
      <CompatibilityPanel />
      <div className="admin-panel">
        <QuestionnairePreview />
      </div>
    </main>
  );
}
