/// <reference path="../pb_data/types.d.ts" />

// Public requests always start as "novo", unverified and without admin notes,
// whatever the browser sent. Only an admin may set these fields.
onRecordCreateRequest((e) => {
  const isAdmin = e.auth && e.auth.get("role") === "admin";
  if (!isAdmin) {
    e.record.set("status", "novo");
    e.record.set("adminNotes", "");
    e.record.set("identityVerified", false);
  }
  e.next();
}, "privacy_requests");

// Forward every new privacy/data-subject request to the bureau inbox.
onRecordAfterCreateSuccess((e) => {
  // Escape visitor-supplied text before placing it in the email HTML.
  const esc = (v) =>
    String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  const r = e.record;

  const typeLabels = {
    acesso: "Acesso aos dados",
    rectificacao: "Rectificação",
    apagamento: "Apagamento",
    limitacao: "Limitação do tratamento",
    portabilidade: "Portabilidade",
    oposicao: "Oposição",
    "retirada-consentimento": "Retirada de consentimento",
  };

  const name = r.get("name") || "—";
  const email = r.get("email") || "—";
  const requestType = r.get("requestType") || "acesso";
  const details = r.get("details") || "";
  const created = r.get("created") || "";

  const subject = `[The Cupid Bureau] Pedido de privacidade — ${typeLabels[requestType] || requestType} — ${name}`;

  const rows = [
    ["Tipo de pedido", typeLabels[requestType] || requestType],
    ["Nome", name],
    ["Email", email],
    ["Recebido em", created],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="color:#75665e;">${label}</td><td><strong>${esc(value)}</strong></td></tr>`,
    )
    .join("");

  const detailsHtml = details
    ? `<h3 style="margin-top:24px;color:#6E1624;">Detalhes</h3><p style="font-family:sans-serif;font-size:14px;line-height:1.7;white-space:pre-wrap;">${esc(details)}</p>`
    : "";

  const html = `
    <h2>Novo pedido de privacidade</h2>
    <p style="font-family:sans-serif;font-size:12px;color:#75665e;">Verifique a identidade do requerente antes de divulgar ou alterar dados. Registe o tratamento no painel administrativo.</p>
    <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;color:#171515;">
      ${rowsHtml}
    </table>
    ${detailsHtml}
    <hr style="margin-top:24px;border:none;border-top:1px solid #d8c9bb;" />
    <p style="font-family:sans-serif;font-size:11px;color:#75665e;">Pedido confidencial. Apenas a equipa autorizada deve consultar este pedido.</p>
  `;

  const message = new MailerMessage({
    from: { name: "The Cupid Bureau" },
    to: [{ address: "cupidbureau@yahoo.com" }],
    subject,
    html,
  });

  try {
    $app.newMailClient().send(message);
  } catch (err) {
    $app
      .logger()
      .error(
        "privacy request forward email failed",
        "to",
        "cupidbureau@yahoo.com",
        "err",
        String(err),
      );
  }

  e.next();
}, "privacy_requests");
