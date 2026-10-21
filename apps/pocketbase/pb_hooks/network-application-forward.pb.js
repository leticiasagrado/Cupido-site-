/// <reference path="../pb_data/types.d.ts" />

// Network application lifecycle: default status, branded confirmation email
// (no photos or sensitive data) and internal forward to the bureau inbox.
onRecordCreateRequest((e) => {
  // Public submissions always start as pending, with no admin notes,
  // whatever the browser sent. Admins change these later in the panel.
  const isAdmin = e.auth && e.auth.get("role") === "admin";
  if (!isAdmin) {
    e.record.set("status", "pending");
    e.record.set("adminNotes", "");
  } else if (!e.record.get("status")) {
    e.record.set("status", "pending");
  }

  // The 18+ check in the form runs in the browser; repeat it here so it
  // cannot be bypassed.
  const raw = String(e.record.get("birthDate") || "").slice(0, 10);
  const parts = raw.split("-").map((n) => parseInt(n, 10));
  if (parts.length !== 3 || parts.some((n) => isNaN(n))) {
    throw new BadRequestError("Data de nascimento inválida.");
  }
  const now = new Date();
  let age = now.getUTCFullYear() - parts[0];
  const m = now.getUTCMonth() + 1 - parts[1];
  if (m < 0 || (m === 0 && now.getUTCDate() < parts[2])) age -= 1;
  if (age < 18) {
    throw new BadRequestError("A inscrição é exclusiva para maiores de 18 anos.");
  }

  e.next();
}, "network_applications");

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

  const intentionLabels = {
    "relacao-seria": "Uma relação séria e duradoura",
    "conhecer-intencao": "Conhecer alguém com intenção e tranquilidade",
    "a-definir": "Ainda estou a definir o que procuro",
  };

  const firstName = r.get("firstName") || "—";
  const lastName = r.get("lastName") || "—";
  const email = r.get("email") || "—";
  const cityCountry = r.get("cityCountry") || "—";
  const phone = r.get("phone") || "—";
  const intention = r.get("intention") || "";
  const aboutYou = r.get("aboutYou") || "";
  const consentSharePhotos = r.get("consentSharePhotos") === true;
  const consentMarketing = r.get("consentMarketing") === true;
  const created = r.get("created") || "";
  const photoCount = (r.get("photos") || []).length;

  const fullName = (firstName + " " + lastName).trim();

  // --- Internal forward to the bureau inbox ---
  const subject = `[The Cupid Bureau] Nova candidatura à rede privada — ${fullName}`;

  const rows = [
    ["Nome", fullName],
    ["Email", email],
    ["Telemóvel", phone],
    ["Cidade / País", cityCountry],
    intention ? ["Intenção", intentionLabels[intention] || intention] : null,
    aboutYou ? ["Sobre si", aboutYou] : null,
    ["Fotografias", String(photoCount) + " anexada(s)"],
    consentSharePhotos
      ? ["Partilha de fotos", "Autorizada"]
      : ["Partilha de fotos", "Não autorizada"],
    ["Marketing", consentMarketing ? "Aceitou receber novidades" : "Não aceitou"],
    ["Recebido em", created],
  ].filter(Boolean);

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="color:#75665e;">${label}</td><td><strong>${esc(value)}</strong></td></tr>`,
    )
    .join("");

  const internalHtml = `
    <h2>Nova candidatura à rede privada</h2>
    <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;color:#171515;">
      ${rowsHtml}
    </table>
    <p style="font-family:sans-serif;font-size:12px;color:#75665e;margin-top:18px;">Consulte as fotografias e os detalhes completos no painel administrativo. Não responda a este email com dados sensíveis.</p>
  `;

  const internalMessage = new MailerMessage({
    from: { name: "The Cupid Bureau" },
    to: [{ address: "cupidbureau@yahoo.com" }],
    subject,
    html: internalHtml,
  });

  try {
    $app.newMailClient().send(internalMessage);
  } catch (err) {
    $app
      .logger()
      .error(
        "network application forward email failed",
        "to",
        "cupidbureau@yahoo.com",
        "err",
        String(err),
      );
  }

  // --- Branded confirmation email to the applicant (no photos/sensitive data) ---
  const applicantHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:auto;color:#171515;">
      <h1 style="font-family:Georgia,serif;color:#6E1624;font-size:28px;line-height:1.2;">A sua candidatura foi recebida.</h1>
      <p style="font-size:14px;line-height:1.8;color:#75665e;">Obrigado por dar este primeiro passo com a The Cupid Bureau.</p>
      <p style="font-size:14px;line-height:1.8;color:#171515;">A nossa equipa poderá entrar em contacto caso sejam necessárias informações adicionais ou surja uma potencial compatibilidade. A sua candidatura foi guardada de forma privada.</p>
      <p style="font-size:14px;line-height:1.8;color:#171515;">A inscrição não garante admissão na rede, apresentações ou encontros. A confidencialidade faz parte do serviço.</p>
      <hr style="margin:28px 0;border:none;border-top:1px solid #d8c9bb;" />
      <p style="font-family:Georgia,serif;font-style:italic;font-size:18px;color:#6E1624;">Menos acaso. Mais intenção.</p>
      <p style="font-size:11px;color:#75665e;">The Cupid Bureau · Rede Privada<br/>Portugal</p>
    </div>
  `;

  const applicantMessage = new MailerMessage({
    from: { name: "The Cupid Bureau" },
    to: [{ address: email }],
    subject: "A sua candidatura foi recebida",
    html: applicantHtml,
  });

  try {
    $app.newMailClient().send(applicantMessage);
  } catch (err) {
    $app
      .logger()
      .error(
        "network application confirmation email failed",
        "to",
        email,
        "err",
        String(err),
      );
  }

  e.next();
}, "network_applications");
