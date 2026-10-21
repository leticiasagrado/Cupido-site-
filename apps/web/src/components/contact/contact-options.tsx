import { Link } from 'react-router';
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { contactPhone, contactPhoneHref, whatsappHref } from '@/data/brand';

export function ContactOptions() {
  return (
    <section className="contact-ways">
      <div>
        <h2>Uma consulta privada.</h2>
        <p>Conhecer o serviço, esclarecer expectativas e decidir o próximo passo. A data e o formato são combinados individualmente.</p>
        <Link className="text-link" to="/candidatura?tipo=consulta">
          Solicitar consulta <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="contact-direct">
        <h2>Fale connosco directamente.</h2>
        <p>Estamos disponíveis para responder às suas perguntas com toda a discrição.</p>
        <a className="contact-whatsapp button button-burgundy" href={whatsappHref} target="_blank" rel="noreferrer">
          <MessageCircle size={19} /> Falar pelo WhatsApp <ArrowUpRight size={16} />
        </a>
        <a className="text-link" href={contactPhoneHref}>
          <Phone size={16} /> {contactPhone}
        </a>
        <a className="text-link" href="mailto:cupidbureau@yahoo.com">
          <Mail size={16} /> cupidbureau@yahoo.com
        </a>
        <Link className="text-link" to="/perguntas-frequentes">
          Consultar as perguntas frequentes <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
