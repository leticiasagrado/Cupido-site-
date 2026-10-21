/**
 * Cupid, the mascot. The artwork lives in `public/images` so the site no longer
 * depends on the Horizons CDN for it.
 */
const artwork = {
  mascot: { src: '/images/cupid-bow.webp', width: 900, height: 1067, alt: 'Cupid, o mascote da The Cupid Bureau, a apontar o arco' },
  mark: { src: '/images/cupid-monogram-red.webp', width: 900, height: 900, alt: 'Cupid abraçado ao monograma CB' },
  embrace: { src: '/images/cupid-hug.webp', width: 900, height: 935, alt: 'Cupid de braços abertos' },
  search: { src: '/images/cupid-search.webp', width: 850, height: 640, alt: 'Cupid a procurar com uma lupa' },
  lisbon: { src: '/images/cupid-lisbon.webp', width: 628, height: 1005, alt: 'Cupid a passear em Lisboa com um pastel de nata' },
};

export type CupidVariant = keyof typeof artwork;

export function Cupid({ className = '', variant = 'mascot', decorative = false }: { className?: string; variant?: CupidVariant; decorative?: boolean }) {
  const art = artwork[variant];
  return (
    <img
      className={`cupid-art is-${variant} ${className}`}
      src={art.src}
      alt={decorative ? '' : art.alt}
      width={art.width}
      height={art.height}
      loading={variant === 'mascot' ? undefined : 'lazy'}
      decoding="async"
    />
  );
}
