import { Link } from 'react-router';
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { contactPhone, contactPhoneHref, whatsappHref } from '@/data/brand';
import { seo } from '@/lib/seo';
import { EnPageIntro } from '@/components/en/page-intro';
import { EnEnquiryForm } from '@/components/en/enquiry-form';
import type { Route } from './+types/en.contact';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, { title: 'Contact and private consultations — The Cupid Bureau', description: 'Speak with the The Cupid Bureau team. Send a message, clarify questions or request a private consultation to learn about our guidance.', path: '/en/contact' });
}

export default function EnContactPage() {
  return (
    <main id="conteudo">
      <EnPageIntro eyebrow="CONTACT / WE ARE LISTENING" title={<>A question.<br /><em>A possibility.</em></>} description="A human conversation, from the first contact. Tell us how we can help." breadcrumb="Contact" />
      <section className="contact-ways">
        <div>
          <h2>A private consultation.</h2>
          <p>Get to know the service, clarify expectations and decide the next step. The date and format are arranged individually.</p>
          <Link className="text-link" to="/en/apply?tipo=consulta">Request a consultation <ArrowUpRight size={16} /></Link>
        </div>
        <div className="contact-direct">
          <h2>Speak with us directly.</h2>
          <p>We are available to answer your questions with full discretion.</p>
          <a className="contact-whatsapp button button-burgundy" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Chat on WhatsApp <ArrowUpRight size={16} /></a>
          <a className="text-link" href={contactPhoneHref}><Phone size={16} /> {contactPhone}</a>
          <a className="text-link" href="mailto:cupidbureau@yahoo.com"><Mail size={16} /> cupidbureau@yahoo.com</a>
          <Link className="text-link" to="/en/faq">See frequently asked questions <ArrowUpRight size={16} /></Link>
        </div>
      </section>
      <section className="enquiry-layout">
        <aside className="enquiry-aside">
          <h2>A conversation.<br /><em>In full trust.</em></h2>
          <p>We know each person individually. The first contact is an opportunity to see, together, whether our way of working makes sense for you.</p>
          <p>Applying does not guarantee admission or an introduction. There is no obligation to hire a service.</p>
        </aside>
        <EnEnquiryForm contact />
      </section>
    </main>
  );
}
