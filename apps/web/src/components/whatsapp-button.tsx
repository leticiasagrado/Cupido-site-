import { MessageCircle } from 'lucide-react';
import { whatsappHref } from '@/data/brand';
import { useHydrated } from '@/hooks/use-hydrated';

export function WhatsAppButton() {
  const hydrated = useHydrated();
  if (!hydrated) return null;
  return (
    <a
      className="whatsapp-float"
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar directamente com a The Cupid Bureau pelo WhatsApp"
    >
      <MessageCircle aria-hidden="true" size={20} />
      <span>WhatsApp</span>
    </a>
  );
}
