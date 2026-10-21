import { audiences } from '@/data/brand';

export function Audience() {
  return <section className="audience section-rail"><div className="section-index"><span>04</span><span>PARA QUEM FAZ SENTIDO</span></div><div className="audience-body"><div className="section-heading"><h2>Para quem é<br /><em>a The Cupid Bureau?</em></h2><p>Para pessoas independentes, exigentes e com uma vida estabelecida que poderiam conhecer alguém sozinhas, mas preferem confiar parte desse processo a profissionais que valorizam o seu tempo, privacidade e critérios.</p></div><div className="audience-tags">{audiences.map(audience => <span key={audience}>{audience}</span>)}</div><p className="audience-note">O luxo está no cuidado. Não no estatuto.</p></div></section>;
}
