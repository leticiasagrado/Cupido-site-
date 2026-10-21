import { seo } from '@/lib/seo';
import { EnPageIntro } from '@/components/en/page-intro';
import { EnPartnerForm } from '@/components/en/partner-form';
import type { Route } from './+types/en.partners';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Partners, Press and Venues — The Cupid Bureau', description: 'Restaurants, hotels, brands and press can become partners of our private events and concierge. Share your collaboration idea.', path: '/en/partners' });
}

export default function EnPartnersPage() {
  return (
    <main id="conteudo">
      <EnPageIntro eyebrow="PARTNERS / COLLABORATIONS WITH INTENTION" title={<>Good partnerships.<br /><em>Places with intention.</em></>} description="Restaurants, hotels, brands and press can become partners of our private events and our concierge. If you share our care for detail and discretion, we would like to meet you." breadcrumb="Partners" />
      <section className="enquiry-layout">
        <aside className="enquiry-aside">
          <h2>Collaborate<br /><em>with the Bureau.</em></h2>
          <p>We work with carefully chosen venues and brands that share our values of elegance, discretion and human care.</p>
          <p>If you are a journalist, a brand or a venue that would like to host our dates and experiences, share your idea through the form. The team will contact you.</p>
        </aside>
        <EnPartnerForm />
      </section>
    </main>
  );
}
