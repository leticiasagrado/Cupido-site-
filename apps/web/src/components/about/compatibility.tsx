import { imagery } from '@/data/brand';

export function Compatibility() {
  return <section className="compatibility"><img src={imagery.venue} alt="Um restaurante boutique em Lisboa com mesas intimistas e luz de fim de tarde" width="1536" height="672" loading="lazy" /><div className="compatibility-shade" /><div className="compatibility-content"><span className="eyebrow">05 / A NOSSA CONVICÇÃO</span><p className="compatibility-lead">Não trabalhamos por quantidade.</p><h2>Trabalhamos por<br /><em>compatibilidade.</em></h2><p>Não prometemos um determinado número de encontros por mês.<br />Uma apresentação só acontece quando acreditamos que existe razão para duas pessoas se conhecerem.</p></div></section>;
}
