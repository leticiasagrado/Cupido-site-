import { seo } from '@/lib/seo';
import { Bento } from '@/components/home26/home-2026';
import { EnPageIntro } from '@/components/en/page-intro';
import { EnConsultationCta } from '@/components/en/consultation-cta';
import type { Route } from './+types/en.how-it-works';

const steps: [string, string][] = [
  ['Application', 'The first step is sharing a little about yourself and what you are looking for. Your application is private and reviewed individually.'],
  ['Private consultation', 'A confidential conversation to understand your expectations, clarify questions and see whether our service makes sense for you.'],
  ['Choosing the guidance', 'We define with you the level of search and guidance suited to your moment in life. No mandatory lock-in.'],
  ['In-depth interview', 'We learn your values, interests, lifestyle and expectations for a relationship. We listen before we search.'],
  ['Confidential profile', 'We organise the relevant information into an internal profile. There is no public page or member catalogue.'],
  ['Search', 'We search within our network and, depending on the service, through active national or international search.'],
  ['Compatibility', 'We analyse affinities, values and availability for a relationship, without reducing people to a list of criteria.'],
  ['Mutual interest', 'Information is shared gradually. Before any introduction, we confirm the interest and consent of both people.'],
  ['Introduction', 'We mediate the first contact with care, discretion and context, so you can get to know each other with ease.'],
  ['Feedback', 'After the date, we hear about your experience in private. Your feedback helps us understand the search better.'],
  ['Adjustment', 'We reassess the criteria and next steps. We keep searching or accompany the evolution of a new connection.'],
];

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'How private matchmaking works — The Cupid Bureau', description: 'From application to first date: discover our matchmaking process, with human search, mutual consent and private guidance.', path: '/en/how-it-works' });
}

export default function EnHowItWorksPage() {
  return (
    <main id="conteudo">
      <EnPageIntro eyebrow="HOW IT WORKS / STEP BY STEP" title={<>Your pace.<br /><em>Our care.</em></>} description="A private experience from the first contact. Each step has an intention: to know you better, to search with criteria and to create space for a real connection." breadcrumb="How it works" />
      <div className="h26"><Bento lang="en" showHeadLink={false} /></div>
      <section className="process-timeline">
        {steps.map(([title, body], index) => (
          <div key={title} className="timeline-step">
            <span className="timeline-number">{String(index + 1).padStart(2, '0')}</span>
            <div><h2>{title}</h2><p>{body}</p></div>
          </div>
        ))}
      </section>
      <EnConsultationCta />
    </main>
  );
}
