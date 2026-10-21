import { processSteps } from '@/data/brand';
import { Cupid } from '@/components/cupid';

export function ProcessTimeline() {
  return <><section className="process-timeline" aria-label="As doze etapas do acompanhamento">{processSteps.map(([title, description], index) => <article className="timeline-step" key={title}><span className="timeline-number">{String(index + 1).padStart(2, '0')}</span><div><h2>{title}</h2><p>{description}</p></div></article>)}</section><section className="process-assurance"><p>Nenhuma pessoa é apresentada sem consentimento.<br /><em>Nenhum cliente possui acesso público à nossa base.</em></p><Cupid /></section></>;
}
