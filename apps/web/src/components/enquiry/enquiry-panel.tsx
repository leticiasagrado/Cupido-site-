import { useSearchParams } from 'react-router';
import { LockKeyhole } from 'lucide-react';
import { imagery } from '@/data/brand';
import { EnquiryForm } from '@/components/enquiry/enquiry-form';

export function EnquiryPanel({ contact = false }: { contact?: boolean }) {
  const [params] = useSearchParams();
  return <section className="enquiry-layout"><aside className="enquiry-aside"><img src={imagery.letter} alt="Correspondência privada, num envelope de papel texturado com selo bordô" width="1024" height="768" loading="lazy" /><h2>Uma conversa.<br /><em>Em total confiança.</em></h2><p>Conhecemos cada pessoa individualmente. O primeiro contacto é uma oportunidade para percebermos, em conjunto, se a nossa forma de trabalhar faz sentido para si.</p><p>A candidatura não garante a admissão ou uma apresentação. Não existe qualquer obrigação de contratar um serviço.</p><p>Pode contratar um serviço de matchmaking privado ou integrar a nossa rede privada, aberto a uma eventual apresentação a um cliente compatível.</p><span className="eyebrow"><LockKeyhole size={12} /> PRIVADO DESDE O PRIMEIRO PASSO</span></aside><EnquiryForm key={`${contact}-${params.toString()}`} contact={contact} /></section>;
}
