import { Link, useLocation } from 'react-router';
import { Users, HeartHandshake, Stethoscope, ShieldCheck, Sparkles } from 'lucide-react';

const adminLinks = [
  { to: '/admin/rede-privada', label: 'Rede Privada', icon: Users },
  { to: '/admin/compatibilidade', label: 'Curadoria', icon: HeartHandshake },
  { to: '/admin/colaboracao-psicologas', label: 'Colaboração', icon: Stethoscope },
  { to: '/admin/pedidos-privacidade', label: 'Pedidos de Privacidade', icon: ShieldCheck },
  { to: '/admin/campanha', label: 'Campanha', icon: Sparkles },
];

export function AdminNav() {
  const { pathname } = useLocation();
  return (
    <nav className="admin-nav" aria-label="Áreas administrativas">
      {adminLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.to;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`admin-nav-link ${isActive ? 'is-active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={14} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
