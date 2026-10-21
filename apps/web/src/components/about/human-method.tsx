import { ArrowUpRight } from 'lucide-react';

export function HumanMethod() {
  return <section className="human section-rail"><div className="section-index"><span>02</span><span>O NOSSO MÉTODO</span></div><div className="human-body"><div className="section-heading"><h2>Matchmaking,<br /><em>mas humano.</em></h2><p>O cuidado de uma pessoa.<br />Não a decisão de um algoritmo.</p></div><div className="human-columns"><div><span className="method-number">I.</span><h3>Conhecemos</h3><p>Entrevistas privadas e acompanhamento pessoal. Começamos por ouvir a sua história.</p></div><div><span className="method-number">II.</span><h3>Procuramos</h3><p>Curadoria dentro e fora da nossa rede, dependendo do serviço escolhido. Com critério e atenção.</p></div><div><span className="method-number">III.</span><h3>Apresentamos <ArrowUpRight size={19} /></h3><p>Apenas quando identificamos compatibilidade e existe interesse mútuo. Sempre com consentimento.</p></div></div></div></section>;
}
