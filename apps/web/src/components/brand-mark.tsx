const marks = {
  light: '/images/logo-cb-cream.png',
  seal: '/images/icon-512.png',
};

export function BrandMark({ monogram = false, tone = 'seal', className = '' }: { monogram?: boolean; tone?: 'light' | 'seal'; className?: string }) {
  if (monogram) {
    return <img className={`brand-monogram ${tone === 'light' ? 'is-light' : 'is-seal'} ${className}`} src={marks[tone]} alt="" width="512" height="512" />;
  }
  return <span className={`brand-wordmark ${className}`}><span className="brand-the">THE</span><span className="brand-name">CUPID BUREAU</span><span className="brand-descriptor">PRIVATE MATCHMAKING & RELATIONSHIP CONCIERGE</span></span>;
}
