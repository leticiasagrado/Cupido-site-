/**
 * Homepage 2026 (PT and EN): a short page that points to the inner pages.
 * Campaign elements (−15%) appear only when the Founding Members campaign is
 * active, exactly as the previous homepage did. All copy lives in `copy` below.
 */
import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, LockKeyhole, Users } from 'lucide-react';
import { Cupid } from '@/components/cupid';
import { services } from '@/data/services';
import { enServices } from '@/data/en-content';
import { whatsappHref } from '@/data/brand';
import { parsePrice, formatEuro, promotionalPrice } from '@/lib/pricing';

export type CampaignInfo = { discount: number } | null;
export type Lang = 'pt' | 'en';

const copy = {
  pt: {
    barText: (d: number) => `Founding Members: ${d}% de desconto no primeiro mês dos planos privados`,
    barLink: 'Ver planos →',
    badgeCampaign: 'Campanha de lançamento Founding Members',
    badgeDefault: 'Private matchmaking & relationship concierge',
    h1a: 'O amor merece mais',
    h1b: 'do que o acaso.',
    lead: 'Matchmaking privado em Portugal. Curadoria humana, discrição total e nenhum catálogo público.',
    ctaConsult: 'Pedir consulta privada',
    ctaNetwork: 'Entrar na rede gratuita',
    trust: ['Sem fidelização', 'Perfis nunca públicos', 'Pesquisa nacional e internacional'],
    ring: 'MENOS ACASO · MAIS INTENÇÃO · MENOS ACASO · MAIS INTENÇÃO ·',
    floatCampaign: 'No 1.º mês',
    floatDefault: 'Plano Private',
    floatFrom: 'Private desde',
    confidential: '100% confidencial',
    values: ['Discrição', 'Curadoria humana', 'Intenção', 'Elegância', 'Confiança', 'Autenticidade'],
    bentoA: 'Não somos mais uma',
    bentoB: 'aplicação de encontros.',
    howItWorks: 'Como funciona',
    photoAlt: 'Rua de Lisboa com eléctrico amarelo; o Cupid lança setas de coração entre pessoas que se cruzam',
    methodEyebrow: 'O método',
    methodTitle: 'Conhecemos antes de apresentar.',
    methodText: 'Entrevista, curadoria e apresentação apenas com interesse mútuo.',
    discretion: ['Discrição', 'Nenhum perfil num catálogo público.'],
    curation: ['Curadoria humana', 'Pessoas, não algoritmos, a escolher cada apresentação.'],
    lockIn: ['Fidelizações', 'Todos os planos funcionam mês a mês.'],
    trustEyebrow: 'Confiança',
    trustCard: ['Cada participante é verificado', 'Veja como protegemos os seus dados.'],
    plansChip: (d: number) => `Founding Members · −${d}% no 1.º mês`,
    plansA: 'Escolha o seu',
    plansB: 'nível de acompanhamento.',
    togglePromo: (d: number) => `Com desconto −${d}%`,
    toggleRegular: 'Preço habitual',
    toggleLabel: 'Mostrar preços',
    featuredLabel: '02 · Mais escolhido',
    perMonth: '/ mês',
    firstMonth: 'no 1.º mês',
    monthly: 'por mês',
    viewPlan: 'Ver plano →',
    from: 'desde',
    finePromo: 'Desconto válido apenas no primeiro mês, durante o período de lançamento. Depois aplica-se o preço habitual. Sem fidelização.',
    fineDefault: 'Todos os planos funcionam mês a mês, sem fidelização obrigatória.',
    netEyebrow: 'Rede privada gratuita',
    netA: 'Talvez alguém',
    netB: 'esteja à sua procura.',
    netText: 'Inscrição gratuita, perfil privado, sem mensalidade e sem obrigação de contratar.',
    netCta: 'Criar perfil gratuito',
    finalA: 'A sua próxima história pode começar',
    finalB: 'com uma decisão.',
    finalCampaign: (d: number) => `Founding Members — ${d}% de desconto no primeiro mês dos planos privados.`,
    finalDefault: 'Descubra uma forma mais privada, intencional e humana de conhecer alguém.',
    whatsapp: 'Falar no WhatsApp',
    promoTitle: (d: number) => `${d}% de desconto no primeiro mês.`,
    promoText: 'Campanha de lançamento Founding Members, válida nos quatro planos privados. Sem fidelização.',
    promoDefaultTitle: 'Quatro níveis de acompanhamento.',
    promoDefaultText: 'Do Private ao Bespoke Private Search, todos mês a mês e sem fidelização.',
    promoCta: 'Ver planos e preços',
    links: {
      consult: '/candidatura?tipo=consulta',
      network: '/rede-privada',
      how: '/como-funciona',
      method: '/o-nosso-metodo',
      trust: '/confianca-privacidade',
      service: (slug: string) => `/servicos/${slug}`,
      plans: '/servicos#planos',
    },
  },
  en: {
    barText: (d: number) => `Founding Members: ${d}% off the first month of our private plans`,
    barLink: 'See plans →',
    badgeCampaign: 'Founding Members launch offer',
    badgeDefault: 'Private matchmaking & relationship concierge',
    h1a: 'Love deserves more',
    h1b: 'than chance.',
    lead: 'Private matchmaking in Portugal. Human curation, complete discretion and no public catalogue.',
    ctaConsult: 'Request a private consultation',
    ctaNetwork: 'Join the free network',
    trust: ['No lock-in', 'Profiles never public', 'National and international search'],
    ring: 'LESS CHANCE · MORE INTENTION · LESS CHANCE · MORE INTENTION ·',
    floatCampaign: 'First month',
    floatDefault: 'Private plan',
    floatFrom: 'Private from',
    confidential: '100% confidential',
    values: ['Discretion', 'Human curation', 'Intention', 'Elegance', 'Trust', 'Authenticity'],
    bentoA: 'We are not another',
    bentoB: 'dating app.',
    howItWorks: 'How it works',
    photoAlt: 'A Lisbon street with a yellow tram; Cupid sends heart-tipped arrows between passers-by',
    methodEyebrow: 'The method',
    methodTitle: 'We get to know you before any introduction.',
    methodText: 'Interview, curation and introductions only with mutual interest.',
    discretion: ['Discretion', 'No profile ever goes into a public catalogue.'],
    curation: ['Human curation', 'People, not algorithms, choose every introduction.'],
    lockIn: ['Lock-in contracts', 'Every plan runs month to month.'],
    trustEyebrow: 'Trust',
    trustCard: ['Every participant is verified', 'See how we protect your data.'],
    plansChip: (d: number) => `Founding Members · −${d}% first month`,
    plansA: 'Choose your',
    plansB: 'level of guidance.',
    togglePromo: (d: number) => `With −${d}% off`,
    toggleRegular: 'Regular price',
    toggleLabel: 'Show prices',
    featuredLabel: '02 · Most chosen',
    perMonth: '/ month',
    firstMonth: 'first month',
    monthly: 'per month',
    viewPlan: 'View plan →',
    from: 'from',
    finePromo: 'Discount applies to the first month only, during the launch period. The regular price applies afterwards. No lock-in.',
    fineDefault: 'Every plan runs month to month, with no mandatory lock-in.',
    netEyebrow: 'Free private network',
    netA: 'Perhaps someone',
    netB: 'is looking for you.',
    netText: 'Free to join, private profile, no monthly fee and no obligation to hire.',
    netCta: 'Create a free profile',
    finalA: 'Your next story can begin',
    finalB: 'with a decision.',
    finalCampaign: (d: number) => `Founding Members — ${d}% off the first month of our private plans.`,
    finalDefault: 'Discover a more private, intentional and human way to meet someone.',
    whatsapp: 'Chat on WhatsApp',
    promoTitle: (d: number) => `${d}% off your first month.`,
    promoText: 'Founding Members launch offer, valid on all four private plans. No lock-in.',
    promoDefaultTitle: 'Four levels of guidance.',
    promoDefaultText: 'From Private to Bespoke Private Search, all month to month with no lock-in.',
    promoCta: 'See plans and prices',
    links: {
      consult: '/en/apply?tipo=consulta',
      network: '/en/private-network',
      how: '/en/how-it-works',
      method: '/en/how-it-works',
      trust: '/en/trust-privacy',
      service: (slug: string) => `/en/services/${slug}`,
      plans: '/en/services#planos',
    },
  },
} as const;

/** "297,50 €" in PT, "€297.50" in EN. */
function money(value: number, lang: Lang): string {
  if (lang === 'pt') return formatEuro(value);
  const hasFraction = value % 1 !== 0;
  const [whole, fraction] = value.toFixed(hasFraction ? 2 : 0).split('.');
  return `€${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${fraction ? `.${fraction}` : ''}`;
}

export function CampaignBar({ campaign, lang }: { campaign: CampaignInfo; lang: Lang }) {
  if (!campaign) return null;
  const t = copy[lang];
  return (
    <Link className="h26-campaign-bar" to={t.links.plans}>
      <span className="h26-discount-chip">−{campaign.discount}%</span>
      <span>{t.barText(campaign.discount)}</span>
      <span className="h26-campaign-bar-link">{t.barLink}</span>
    </Link>
  );
}

export function Hero2026({ campaign, lang }: { campaign: CampaignInfo; lang: Lang }) {
  const t = copy[lang];
  const entryRegular = parsePrice(services[0].price);
  const entryPrice = campaign ? promotionalPrice(entryRegular, campaign.discount) : entryRegular;
  return (
    <section className="h26-hero" aria-labelledby="hero-title">
      <div className="h26-hero-copy">
        {campaign ? (
          <Link className="h26-badge h26-in" to={t.links.plans}>
            <span className="h26-discount-chip">−{campaign.discount}%</span>
            {t.badgeCampaign} <ArrowRight size={14} />
          </Link>
        ) : (
          <span className="h26-badge h26-in">{t.badgeDefault}</span>
        )}
        <h1 id="hero-title" className="h26-in h26-d1">
          {t.h1a} <em>{t.h1b}</em>
        </h1>
        <p className="h26-lead h26-in h26-d2">{t.lead}</p>
        <div className="h26-actions h26-in h26-d3">
          <Link className="h26-pill h26-pill-dark" to={t.links.consult} data-cta="hero-consulta">
            {t.ctaConsult} <span className="h26-pill-arrow"><ArrowRight size={16} /></span>
          </Link>
          <Link className="h26-pill h26-pill-light" to={t.links.network} data-cta="hero-network">
            {t.ctaNetwork} <span className="h26-pill-arrow"><ArrowRight size={16} /></span>
          </Link>
        </div>
        <ul className="h26-trust h26-in h26-d4">
          {t.trust.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>

      <div className="h26-hero-art">
        <div className="h26-blob" aria-hidden="true" />
        <svg className="h26-ring" aria-hidden="true" viewBox="0 0 200 200">
          <defs>
            <path id="h26-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text>
            <textPath href="#h26-circle">{t.ring}</textPath>
          </text>
        </svg>
        <Cupid variant="mascot" className="h26-hero-cupid" />
        <div className="h26-float-card h26-float-card-light">
          <span className="h26-float-badge">{campaign ? `−${campaign.discount}%` : '01'}</span>
          <span>
            <strong>{campaign ? t.floatCampaign : t.floatDefault}</strong>
            <small>{t.floatFrom} {money(entryPrice, lang)}</small>
          </span>
        </div>
        <div className="h26-float-card h26-float-card-dark">
          <LockKeyhole size={16} aria-hidden="true" /> {t.confidential}
        </div>
      </div>
    </section>
  );
}

export function ValuesMarquee({ lang }: { lang: Lang }) {
  const values = copy[lang].values;
  const items = [...values, ...values];
  return (
    <div className="h26-marquee" aria-hidden="true">
      <div className="h26-marquee-track">
        {items.map((value, index) => (
          <span key={`${value}-${index}`}>
            <em>{value}</em>
            <span className="h26-heart">♡</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Bento({ lang, showHeadLink = true }: { lang: Lang; showHeadLink?: boolean }) {
  const t = copy[lang];
  return (
    <section className="h26-section" aria-labelledby="h26-bento-title">
      <div className="h26-section-head">
        <h2 id="h26-bento-title" className="h26-reveal">
          {t.bentoA} <em>{t.bentoB}</em>
        </h2>
        {showHeadLink ? (
          <Link className="h26-pill h26-pill-light h26-reveal" to={t.links.how}>
            {t.howItWorks} <span className="h26-pill-arrow"><ArrowRight size={16} /></span>
          </Link>
        ) : null}
      </div>
      <div className="h26-bento">
        <Link className="h26-card h26-card-photo h26-reveal" to={t.links.method}>
          <img src="/images/lisbon-street.webp" alt={t.photoAlt} width="1536" height="1024" loading="lazy" />
          <span className="h26-card-photo-shade" aria-hidden="true" />
          <span className="h26-card-photo-copy">
            <span className="h26-eyebrow">{t.methodEyebrow}</span>
            <strong>{t.methodTitle}</strong>
            <span>{t.methodText}</span>
          </span>
          <span className="h26-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
        </Link>
        <div className="h26-card h26-card-burgundy h26-reveal">
          <LockKeyhole size={28} aria-hidden="true" />
          <span>
            <strong>{t.discretion[0]}</strong>
            <span>{t.discretion[1]}</span>
          </span>
        </div>
        <div className="h26-card h26-card-white h26-reveal">
          <Users size={28} aria-hidden="true" />
          <span>
            <strong>{t.curation[0]}</strong>
            <span>{t.curation[1]}</span>
          </span>
        </div>
        <div className="h26-card h26-card-blush h26-reveal">
          <span className="h26-big-number">0</span>
          <span>
            <strong>{t.lockIn[0]}</strong>
            <span>{t.lockIn[1]}</span>
          </span>
        </div>
        <Link className="h26-card h26-card-ink h26-reveal" to={t.links.trust}>
          <span className="h26-eyebrow">{t.trustEyebrow}</span>
          <span>
            <strong>{t.trustCard[0]}</strong>
            <span>{t.trustCard[1]}</span>
          </span>
          <span className="h26-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
        </Link>
      </div>
    </section>
  );
}

export function Plans2026({ campaign, lang }: { campaign: CampaignInfo; lang: Lang }) {
  const t = copy[lang];
  const [showPromo, setShowPromo] = useState(true);
  const promoOn = Boolean(campaign) && showPromo;
  const list = lang === 'pt' ? services : enServices;
  return (
    <section className="h26-section h26-plans" id="planos" aria-labelledby="h26-plans-title">
      <div className="h26-plans-head">
        {campaign ? (
          <span className="h26-discount-chip h26-discount-chip-lg h26-reveal">{t.plansChip(campaign.discount)}</span>
        ) : null}
        <h2 id="h26-plans-title" className="h26-reveal">
          {t.plansA} <em>{t.plansB}</em>
        </h2>
        {campaign ? (
          <div className="h26-toggle h26-reveal" role="group" aria-label={t.toggleLabel}>
            <button type="button" aria-pressed={showPromo} onClick={() => setShowPromo(true)}>
              {t.togglePromo(campaign.discount)}
            </button>
            <button type="button" aria-pressed={!showPromo} onClick={() => setShowPromo(false)}>
              {t.toggleRegular}
            </button>
          </div>
        ) : null}
      </div>
      <div className="h26-plans-grid">
        {list.map((service, index) => {
          const regular = parsePrice(service.price);
          const price = promoOn && campaign ? promotionalPrice(regular, campaign.discount) : regular;
          const prefix = service.prefix ? `${t.from} ` : '';
          return (
            <Link
              key={service.slug}
              to={t.links.service(service.slug)}
              className={`h26-plan h26-reveal ${service.featured ? 'is-featured' : ''}`}
            >
              <span className="h26-plan-top">
                <span className="h26-eyebrow">{service.featured ? t.featuredLabel : `0${index + 1}`}</span>
                {promoOn && campaign ? <span className="h26-discount-chip">−{campaign.discount}%</span> : null}
              </span>
              <strong className="h26-plan-name">{service.name}</strong>
              <span className="h26-plan-tagline">{service.tagline}</span>
              <span className="h26-plan-price">
                {promoOn ? (
                  <s>
                    {prefix}
                    {money(regular, lang)} {t.perMonth}
                  </s>
                ) : null}
                <span className="h26-plan-amount">
                  {prefix}
                  {money(price, lang)}
                </span>
                <span className="h26-plan-note">{promoOn ? t.firstMonth : t.monthly}</span>
              </span>
              <span className="h26-plan-cta">{t.viewPlan}</span>
            </Link>
          );
        })}
      </div>
      <p className="h26-fineprint h26-reveal">{campaign ? t.finePromo : t.fineDefault}</p>
    </section>
  );
}

export function NetworkBanner({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <section className="h26-section">
      <div className="h26-banner h26-reveal">
        <div className="h26-blob h26-blob-soft" aria-hidden="true" />
        <div className="h26-banner-copy">
          <span className="h26-eyebrow">{t.netEyebrow}</span>
          <h2>
            {t.netA} <em>{t.netB}</em>
          </h2>
          <p>{t.netText}</p>
          <Link className="h26-pill h26-pill-light" to={t.links.network} data-cta="banner-network">
            {t.netCta} <span className="h26-pill-arrow"><ArrowRight size={16} /></span>
          </Link>
        </div>
        <Cupid variant="search" className="h26-banner-cupid h26-float" />
      </div>
    </section>
  );
}

export function FinalInvite2026({ campaign, lang }: { campaign: CampaignInfo; lang: Lang }) {
  const t = copy[lang];
  return (
    <section className="h26-final">
      <div className="h26-final-inner">
        <Cupid variant="embrace" className="h26-final-cupid h26-float" decorative />
        <div className="h26-final-copy">
          <h2 className="h26-reveal">
            {t.finalA} <em>{t.finalB}</em>
          </h2>
          <p className="h26-reveal">{campaign ? t.finalCampaign(campaign.discount) : t.finalDefault}</p>
          <div className="h26-actions h26-reveal">
            <Link className="h26-pill h26-pill-red" to={t.links.consult} data-cta="final-consulta">
              {t.ctaConsult} <span className="h26-pill-arrow"><ArrowRight size={16} /></span>
            </Link>
            <a className="h26-pill h26-pill-outline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              {t.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PromoStrip({ campaign, lang }: { campaign: CampaignInfo; lang: Lang }) {
  const t = copy[lang];
  return (
    <section className="h26-section h26-promo-section">
      <Link className="h26-promo h26-reveal" to={t.links.plans} data-cta="promo-plans">
        <Cupid variant="mark" className="h26-promo-cupid" decorative />
        <span className="h26-promo-copy">
          {campaign ? (
            <span className="h26-discount-chip h26-discount-chip-lg">Founding Members · −{campaign.discount}%</span>
          ) : null}
          <strong>{campaign ? t.promoTitle(campaign.discount) : t.promoDefaultTitle}</strong>
          <span>{campaign ? t.promoText : t.promoDefaultText}</span>
        </span>
        <span className="h26-pill h26-pill-dark h26-promo-cta">
          {t.promoCta} <span className="h26-pill-arrow"><ArrowRight size={16} /></span>
        </span>
      </Link>
    </section>
  );
}
