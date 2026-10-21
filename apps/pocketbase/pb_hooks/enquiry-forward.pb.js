/// <reference path="../pb_data/types.d.ts" />

// Forward every new bureau enquiry to the bureau's contact inbox.
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

  const kindLabels = {
    candidatura: "Candidatura ao Bureau",
    consulta: "Consulta privada",
    contacto: "Falar com a equipa",
    eventos: "Interesse em eventos privados",
  };
  const serviceLabels = {
    "por-definir": "Prefiro conversar primeiro",
    "private-matchmaking": "Private Matchmaking",
    signature: "Signature",
    "elite-concierge": "Elite Concierge",
    "bespoke-private-search": "Bespoke Private Search",
  };
  const pathLabels = {
    contratar: "Quero contratar a The Cupid Bureau",
    "rede-privada": "Quero integrar a rede privada",
  };
  const ageRangeLabels = {
    "18-29": "18 – 29 anos",
    "30-39": "30 – 39 anos",
    "40-49": "40 – 49 anos",
    "50-59": "50 – 59 anos",
    "60-mais": "60 anos ou mais",
  };
  const situationLabels = {
    solteiro: "Solteiro/a",
    divorciado: "Divorciado/a",
    viuvo: "Viúvo/a",
  };
  const scopeLabels = {
    cidade: "Na minha cidade",
    portugal: "Em Portugal",
    internacional: "Internacionalmente",
  };

  const kind = r.get("kind") || "candidatura";
  const service = r.get("service") || "por-definir";
  const path = r.get("path") || "";
  const isRedePrivada = path === "rede-privada";
  const ageRange = r.get("ageRange") || "";
  const situation = r.get("situation") || "";
  const scope = r.get("scope") || "";
  const motivation = r.get("motivation") || "";
  const name = r.get("name") || "—";
  const email = r.get("email") || "—";
  const phone = r.get("phone") || "—";
  const city = r.get("city") || "—";
  const availability = r.get("availability") || "—";
  const message = r.get("message") || "—";
  const consentMarketing = r.get("consentMarketing") === true;
  const created = r.get("created") || "";

  const subject = `[The Cupid Bureau] ${kindLabels[kind] || kind} — ${name}`;

  const rows = [
    ["Tipo de pedido", kindLabels[kind] || kind],
    path ? ["Percurso", pathLabels[path] || path] : null,
    service && service !== "por-definir" ? ["Acompanhamento", serviceLabels[service] || service] : null,
    ["Nome", name],
    ["Email", email],
    ["Telemóvel", phone],
    ["Cidade / País", city],
    ageRange ? ["Faixa etária", ageRangeLabels[ageRange] || ageRange] : null,
    situation ? ["Situação actual", situationLabels[situation] || situation] : null,
    scope ? ["Pretende conhecer", scopeLabels[scope] || scope] : null,
    motivation ? ["Principal motivo", motivation] : null,
    availability && availability !== "—" ? ["Disponibilidade", availability] : null,
    ["Marketing", consentMarketing ? "Aceitou receber novidades" : "Não aceitou"],
    ["Recebido em", created],
  ].filter(Boolean);

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="color:#75665e;">${label}</td><td><strong>${esc(value)}</strong></td></tr>`,
    )
    .join("");

  const html = `
    <h2>Nova submissão no website</h2>
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
        "bureau enquiry forward email failed",
        "to",
        "cupidbureau@yahoo.com",
        "err",
        String(err),
      );
  }

  // Branded confirmation email to the applicant.
  const applicantIntro =
    kind === "consulta"
      ? "Recebemos o seu pedido de consulta privada. A equipa irá entrar em contacto para combinar a disponibilidade e o formato da conversa. Ainda não existe uma marcação confirmada."
      : isRedePrivada
        ? "Recebemos a sua candidatura à rede privada. Integrar a rede não implica contratação, pagamento ou qualquer apresentação imediata. Entraremos em contacto se identificarmos uma compatibilidade possível."
        : kind === "eventos"
          ? "Recebemos a sua manifestação de interesse nos eventos privados. Entraremos em contacto quando existir um evento adequado ao seu perfil."
          : "Recebemos a sua candidatura. A equipa irá analisá-la com atenção e entrar em contacto através dos dados que indicou.";

  const applicantHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:auto;color:#171515;">
      <h1 style="font-family:Georgia,serif;color:#6E1624;font-size:28px;line-height:1.2;">Cupid recebeu a sua candidatura.</h1>
      <p style="font-size:14px;line-height:1.8;color:#75665e;">O próximo passo é nosso.</p>
      <p style="font-size:14px;line-height:1.8;color:#171515;">${applicantIntro}</p>
      <p style="font-size:14px;line-height:1.8;color:#171515;">O seu pedido foi guardado de forma privada. Não existe qualquer obrigação de contratação. A confidencialidade faz parte do serviço.</p>
      <hr style="margin:28px 0;border:none;border-top:1px solid #d8c9bb;" />
      <p style="font-family:Georgia,serif;font-style:italic;font-size:18px;color:#6E1624;">Menos acaso. Mais intenção.</p>
      <p style="font-size:11px;color:#75665e;">The Cupid Bureau · Private Matchmaking &amp; Relationship Concierge<br/>Portugal · Pesquisa nacional e internacional</p>
    </div>
  `;

  const applicantMessage = new MailerMessage({
    from: { name: "The Cupid Bureau" },
    to: [{ address: email }],
    subject: "Cupid recebeu a sua candidatura",
    html: applicantHtml,
  });

  try {
    $app.newMailClient().send(applicantMessage);
  } catch (err) {
    $app
      .logger()
      .error(
        "applicant confirmation email failed",
        "to",
        email,
        "err",
        String(err),
      );
  }

  e.next();
}, "bureau_enquiries");
