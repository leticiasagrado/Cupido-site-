import { useSearchParams } from 'react-router';
import { seo } from '@/lib/seo';
import { EnPageIntro } from '@/components/en/page-intro';
import { EnEnquiryForm } from '@/components/en/enquiry-form';
import type { Route } from './+types/en.apply';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Application and private consultation — The Cupid Bureau', description: 'Take the first step toward private guidance. Send your application or request a confidential consultation with the The Cupid Bureau team.', path: '/en/apply' });
}

export default function EnApplyPage() {
  const [params] = useSearchParams();
  const consultation = params.get('tipo') === 'consulta';
  const events = params.get('tipo') === 'eventos';
  return (
    <main id="conteudo">
      <EnPageIntro
        eyebrow={consultation ? 'PRIVATE CONSULTATION / THE FIRST CONTACT' : events ? 'PRIVATE EVENTS / EXPRESSION OF INTEREST' : 'APPLICATION / A NEW CHAPTER'}
        title={consultation ? <>It all begins<br /><em>with a conversation.</em></> : events ? <>Good conversations.<br /><em>New possibilities.</em></> : <>Your story.<br /><em>With more intention.</em></>}
        description={consultation || events ? 'Share a little about yourself. Our team will review your request carefully and contact you privately.' : 'Two paths, one intention: meeting people with real compatibility. You can hire a private matchmaking service or join our private network, open to a possible introduction.'}
        breadcrumb={consultation ? 'Private consultation' : 'Application'}
      />
      <section className="enquiry-layout">
        <aside className="enquiry-aside">
          <h2>A conversation.<br /><em>In full trust.</em></h2>
          <p>We know each person individually. The first contact is an opportunity to see, together, whether our way of working makes sense for you.</p>
          <p>Applying does not guarantee admission or an introduction. There is no obligation to hire a service.</p>
          <p>You can hire a private matchmaking service or join our private network, open to a possible introduction to a compatible client.</p>
        </aside>
        <EnEnquiryForm key={params.toString()} />
      </section>
    </main>
  );
}
