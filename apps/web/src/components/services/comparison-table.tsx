import { Check, Minus } from 'lucide-react';
import { Link } from 'react-router';

type ComparisonService = {
  slug: string;
  name: string;
  price: string;
  prefix?: string;
  positioning: string;
  featured?: boolean;
  aspirational?: boolean;
};

type ComparisonRow = {
  label: string;
  values: (boolean | string)[];
};

type ComparisonTableProps = {
  services: ComparisonService[];
  rows: ComparisonRow[];
  labels: {
    monthly: string;
    recommended: string;
    aspirational: string;
    optional: (value: string) => string;
    cta: string;
    pathPrefix: string;
  };
};

function CellValue({ value, optional }: { value: boolean | string; optional: (v: string) => string }) {
  if (value === true) return <Check size={15} className="comparison-yes" />;
  if (value === false) return <Minus size={15} className="comparison-no" />;
  return <span className="comparison-text">{optional(value)}</span>;
}

export function ComparisonTable({ services, rows, labels }: ComparisonTableProps) {
  return (
    <section className="comparison-section">
      <div className="comparison-head">
        <span className="eyebrow">{labels.monthly}</span>
        <h2>Private selecciona.<br /><em>Signature procura.</em></h2>
        <p>
          {services[0].positioning} · {services[1].positioning} · {services[2].positioning} · {services[3].positioning}
        </p>
      </div>
      <div className="comparison-scroll">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="comparison-corner" scope="col" />
              {services.map((service) => (
                <th
                  key={service.slug}
                  scope="col"
                  className={`comparison-col ${service.featured ? 'is-featured' : ''} ${service.aspirational ? 'is-aspirational' : ''}`}
                >
                  <span className="comparison-col-name">{service.name}</span>
                  <span className="comparison-col-price">
                    {service.prefix ? <span className="price-prefix">{service.prefix} </span> : null}
                    {service.price}€
                    <small>/mês</small>
                  </span>
                  {service.featured ? <span className="comparison-badge">{labels.recommended}</span> : null}
                  {service.aspirational ? <span className="comparison-badge is-aspirational">{labels.aspirational}</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="comparison-row-label">{row.label}</th>
                {row.values.map((value, index) => (
                  <td
                    key={index}
                    className={services[index].featured ? 'is-featured' : ''}
                  >
                    <CellValue value={value} optional={labels.optional} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="comparison-foot">
        {services.map((service) => (
          <Link
            key={service.slug}
            to={`${labels.pathPrefix}/${service.slug}`}
            className={`comparison-foot-link ${service.featured ? 'is-featured' : ''} ${service.aspirational ? 'is-aspirational' : ''}`}
          >
            <span className="comparison-foot-name">{service.name}</span>
            <span className="comparison-foot-positioning">{service.positioning}</span>
            <span className="comparison-foot-cta">{labels.cta}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
