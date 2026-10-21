import { Link } from 'react-router';
import { ArrowUpRight, Check } from 'lucide-react';
import { networkHighlights } from '@/data/home';

export function PrivateNetwork() {
  return (
    <section className="section-rail home-network" id="rede-privada">
      <div className="section-index">
        <span>04</span>
        <span>REDE PRIVADA GRATUITA</span>
      </div>
      <div className="home-network-body">
        <div className="section-heading">
          <div>
            <span className="eyebrow">REDE PRIVADA GRATUITA</span>
            <h2>
              Talvez alguém
              <br />
              <em>esteja à sua procura.</em>
            </h2>
          </div>
          <p>
            A nossa Rede Privada Gratuita permite-lhe criar um perfil confidencial e ser considerado
            para potenciais apresentações, caso surja uma afinidade relevante e exista interesse
            mútuo.
          </p>
        </div>
        <ul className="home-network-highlights">
          {networkHighlights.map((item) => (
            <li key={item}>
              <Check size={14} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="home-network-note">
          A inscrição gratuita não inclui pesquisa activa dedicada e não garante apresentações ou
          encontros.
        </p>
        <Link className="button button-burgundy" to="/rede-privada" data-cta="network-signup">
          Criar o meu perfil gratuito <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
