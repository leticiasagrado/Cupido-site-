/// <reference path="../pb_data/types.d.ts" />

// Forward every new partner enquiry to the bureau's contact inbox.
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
    imprensa: "Imprensa",
    parceiro: "Parceiro / Marca",
    espaco: "Espaço / Restaurante / Hotel",
  };

  const name = r.get("name") || "—";
  const email = r.get("email") || "—";
  const phone = r.get("phone") || "—";
  const organization = r.get("organization") || "—";
  const partnerType = r.get("partnerType") || "parceiro";
  const brand = r.get("brand") || "—";
  const city = r.get("city") || "—";
  const website = r.get("website") || "—";
  const message = r.get("message") || "—";
  const created = r.get("created") || "";

  const subject = `[The Cupid Bureau] ${typeLabels[partnerType] || partnerType} — ${name}`;

  const rows = [
    ["Tipo de contacto", typeLabels[partnerType] || partnerType],
    ["Organização", organization],
    ["Marca / Espaço", brand],
    ["Nome", name],
    ["Email", email],
    ["Telemóvel", phone],
    ["Cidade", city],
    ["Website", website],
    ["Recebido em", created],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="color:#75665e;">${label}</td><td><strong>${esc(value)}</strong></td></tr>`,
    )
    .join("");

  const html = `
    <h2>Nova candidatura de parceria</h2>
    <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;color:#171515;">
      ${rowsHtml}
    </table>
    <h3 style="margin-top:24px;color:#6E1624;">Mensagem</h3>
    <p style="font-family:sans-serif;font-size:14px;line-height:1.7;white-space:pre-wrap;">${esc(message)}</p>
    <hr style="margin-top:24px;border:none;border-top:1px solid #d8c9bb;" />
    <p style="font-family:sans-serif;font-size:11px;color:#75665e;">Este email foi gerado automaticamente pelo website The Cupid Bureau. Responda directamente ao remetente indicado acima.</p>
  `;

  const message2 = new MailerMessage({
    from: { name: "The Cupid Bureau" },
    to: [{ address: "cupidbureau@yahoo.com" }],
    subject,
    html,
  });

  try {
    $app.newMailClient().send(message2);
  } catch (err) {
    $app
      .logger()
      .error(
        "partner enquiry forward email failed",
        "to",
        "cupidbureau@yahoo.com",
        "err",
        String(err),
      );
  }

  e.next();
}, "partner_enquiries");
