import { imagery } from '@/data/brand';

/**
 * Full-bleed editorial image band with a short brand statement overlay.
 * Adds a moment of visual pause and impact between homepage sections,
 * without inventing scarcity, counters or unverified claims.
 */
export function StatementBand() {
  return (
    <section className="statement-band" aria-label="Manifesto The Cupid Bureau">
      <img
        className="statement-band-image"
        src={imagery.statementBand}
        srcSet={imagery.statementBandSrcset}
        sizes="100vw"
        alt="Mesa elegante com dois lugares, uma única vela acesa e um pequeno arranjo floral — atmosfera de jantar privado em Lisboa."
        loading="lazy"
      />
      <div className="statement-band-shade" aria-hidden="true" />
      <div className="statement-band-content">
        <span className="eyebrow statement-band-eyebrow">
          <span className="little-line" /> O QUE NOS MOVE
        </span>
        <p className="statement-band-quote">
          Conhecer alguém com intenção não é um luxo do acaso —
          <br />
          é o resultado de <em>escutar, curadoria e cuidado.</em>
        </p>
        <span className="statement-band-signature">The Cupid Bureau · Portugal</span>
      </div>
    </section>
  );
}
