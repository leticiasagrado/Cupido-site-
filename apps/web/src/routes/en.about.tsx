import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { imagery } from '@/data/brand';
import { seo } from '@/lib/seo';
import { EnPageIntro } from '@/components/en/page-intro';
import { EnConsultationCta } from '@/components/en/consultation-cta';
import type { Route } from './+types/en.about';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'About — The Cupid Bureau', description: 'Meet The Cupid Bureau: a private matchmaking boutique in Portugal, guided by human curation, intention and confidentiality.', image: imagery.venue, path: '/en/about' });
}

export default function EnAboutPage() {
  return (
    <main id="conteudo">
      <EnPageIntro eyebrow="THE BUREAU / OUR ESSENCE" title={<>About<br /><em>The Cupid Bureau.</em></>} description="Human curation for stories that deserve more than an algorithm." breadcrumb="About" />
      <figure className="panorama"><img src={imagery.venue} alt="An intimate boutique hotel space in Lisbon, designed for unhurried conversation" width="1536" height="672" loading="lazy" /><figcaption className="panorama-caption"><span>THE CUPID BUREAU / A PLACE FOR REAL CONNECTIONS</span><span>PORTUGAL</span></figcaption></figure>
      <section className="story-section">
        <h2>The human gaze.<br /><em>The detail that matters.</em></h2>
        <div>
          <p>The Cupid Bureau was born from a simple idea: human relationships should not depend exclusively on algorithms, swipes and public exposure.</p>
          <p>We are a private matchmaking and relationship agency. We combine the attention of a curation boutique with the care of a private concierge, so that meeting someone can be a calmer, more personal and more intentional experience.</p>
          <p>Our work rests on curation, human knowledge, compatibility, confidentiality and guidance. We know the person before we begin the search. Your time and your story deserve that care.</p>
        </div>
      </section>
      <section className="statement"><h2>The Cupid Bureau doesn't replace chance.<br /><em>It simply creates better opportunities<br />for it to happen.</em></h2></section>
      <section className="privacy-section section-rail">
        <div className="privacy-body">
          <div className="privacy-copy">
            <span className="eyebrow">DISCRETION / PART OF THE SERVICE</span>
            <h2>Privacy is not<br /><em>a legal footnote.</em></h2>
            <p>There are no public profiles and no member catalogue. Your information is internal and shared gradually, only with your consent.</p>
            <Link className="text-link" to="/en/trust-privacy">Read our commitment <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
      <section className="home-promise" id="promise">
        <div className="promise-inner">
          <span className="eyebrow">WHY WE EXIST</span>
          <h2>Looking for love<br /><em>shouldn't be exhausting.</em></h2>
          <p className="promise-lead">Between apps, conversations that lead nowhere and dates without compatibility, meeting someone has become a second job. The Cupid Bureau exists to change that — with discretion, human curation and guidance at every step.</p>
          <Link className="text-link" to="/en/how-it-works">How it works <ArrowUpRight size={16} /></Link>
        </div>
      </section>
      <EnConsultationCta />
    </main>
  );
}
