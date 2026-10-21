import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { seo } from '@/lib/seo';
import { EnPageIntro } from '@/components/en/page-intro';
import { EnEnquiryForm } from '@/components/en/enquiry-form';
import { EnConsultationCta } from '@/components/en/consultation-cta';
import type { Route } from './+types/en.private-network';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Private Network — The Cupid Bureau', description: 'Join the private network of The Cupid Bureau. Not everyone in our network hires a matchmaking service; they are open to a possible introduction when we identify compatibility.', path: '/en/private-network' });
}

export default function EnPrivateNetworkPage() {
  return (
    <main id="conteudo">
      <EnPageIntro eyebrow="PRIVATE NETWORK / JOIN US" title={<>Good people.<br /><em>A possible possibility.</em></>} description="Not everyone in our network hires a matchmaking service. We also seek to know interesting people who are open to a possible introduction when we identify a real compatibility with a client." breadcrumb="Private network" />
      <section className="story-section">
        <h2>Join our private network.</h2>
        <div>
          <p>The Cupid Bureau carefully builds a portfolio of interesting people — not only clients who hire a service, but also people who are open to being introduced to a compatible client when we identify a real affinity.</p>
          <p>Joining the private network involves no hiring, payment or immediate introduction. It simply means we would like to know you and consider you when a possibility with intention arises.</p>
          <p>Confidentiality is total. Your profile is internal. There is no public catalogue or member list. Any introduction depends on your consent.</p>
        </div>
      </section>
      <section className="enquiry-layout">
        <aside className="enquiry-aside">
          <h2>A conversation.<br /><em>In full trust.</em></h2>
          <p>You can apply to the private network through the form. Choose the path "I want to join the private network".</p>
          <p>Your application will be reviewed individually. We will contact you if we identify a possible compatibility with a Bureau client.</p>
          <Link className="text-link" to="/en/trust-privacy">Read our commitment <ArrowUpRight size={16} /></Link>
        </aside>
        <EnEnquiryForm forcePath="rede-privada" />
      </section>
      <EnConsultationCta />
    </main>
  );
}
