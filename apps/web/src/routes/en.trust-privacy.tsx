import { seo } from '@/lib/seo';
import { EnPageIntro } from '@/components/en/page-intro';
import type { Route } from './+types/en.trust-privacy';

const pillars = [
  { number: '01', title: 'Confidentiality', summary: 'Your profile is internal. Always.', detail: 'There are no public profiles and no member catalogue. Information is shared gradually and only with your consent. Access is limited to authorised team members.' },
  { number: '02', title: 'Verification', summary: 'We know who we introduce.', detail: 'Every application is reviewed individually. We seek to understand each person before any introduction is considered.' },
  { number: '03', title: 'Mutual consent', summary: 'No introduction without a yes.', detail: 'No one is presented without consent. We confirm the interest of both parties before sharing any context or arranging a first contact.' },
  { number: '04', title: 'Data protection', summary: 'Your data, your rights.', detail: 'We process data under the GDPR. You may access, rectify or erase your data, and withdraw consent at any time, without affecting processing already carried out.' },
];

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Trust & Privacy — The Cupid Bureau', description: 'Confidentiality, verification, mutual consent and data protection: the four pillars that guide every relationship with The Cupid Bureau.', path: '/en/trust-privacy' });
}

export default function EnTrustPage() {
  return (
    <main id="conteudo">
      <EnPageIntro eyebrow="TRUST & PRIVACY / OUR COMMITMENT" title={<>Four pillars.<br /><em>One promise.</em></>} description="Privacy is not a legal footnote here — it is part of the service. These are the principles that guide every conversation, every introduction and every relationship with The Cupid Bureau." breadcrumb="Trust & Privacy" />
      <section className="trust-pillars">
        {pillars.map((pillar) => (
          <div key={pillar.number} className="trust-pillar">
            <div className="trust-pillar-head"><h3>{pillar.title}</h3><span className="trust-pillar-number">{pillar.number}</span></div>
            <p className="trust-pillar-summary">{pillar.summary}</p>
            <p className="trust-pillar-detail">{pillar.detail}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
