/// <reference path="../pb_data/types.d.ts" />

// The Cupid Academy waiting list: notify the bureau and confirm to the person.
onRecordAfterCreateSuccess((e) => {
  const esc = (v) =>
    String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const inbox = "cupidbureau@yahoo.com";
  const r = e.record;
  const courseLabels = {
    "confianca-para-amar": "Confiança para Amar",
    "arte-de-criar-conexoes": "A Arte de Criar Conexões",
    "first-date-confidence": "First Date Confidence",
    "recomecar-no-amor": "Recomeçar no Amor",
    "amar-depois-dos-40": "Amar Depois dos 40",
    "dating-with-intention": "Dating with Intention",
    "ebook-50-perguntas": "E-book: 50 perguntas para conhecer alguém melhor",
    "guia-primeiro-encontro": "Guia digital para o primeiro encontro",
    "workshop-comunicacao": "Workshop ao vivo de comunicação afectiva",
    "mini-curso-autoestima": "Mini-curso de autoestima e confiança",
    "workshop-grupo": "Workshop em grupo com especialista",
    "sessao-individual": "Sessão individual de orientação relacional",
    todos: "Todos os cursos",
  };

  const name = r.get("name") || "—";
  const email = r.get("email") || "—";
  const course = r.get("course") || "todos";
  const message = r.get("message") || "";
  const isEn = r.get("lang") === "en";
  const marketing = r.get("consentMarketing") === true;

  const rows = [
    ["Curso", courseLabels[course] || course],
    ["Nome", name],
    ["Email", email],
    ["Idioma", isEn ? "Inglês" : "Português"],
    ["Marketing", marketing ? "Aceitou receber novidades" : "Não aceitou"],
    ["Recebido em", r.get("created") || ""],
  ]
    .map(([l, v]) => `<tr><td style="color:#75665e;">${l}</td><td><strong>${esc(v)}</strong></td></tr>`)
    .join("");

  try {
    $app.newMailClient().send(
      new MailerMessage({
        from: { name: "The Cupid Bureau" },
        to: [{ address: inbox }],
        subject: `[The Cupid Academy] Lista de espera — ${courseLabels[course] || course}`,
        html: `<h2>Novo interesse na The Cupid Academy</h2><table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;color:#171515;">${rows}</table>${
          message ? `<h3 style="color:#6E1624;">Mensagem</h3><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;">${esc(message)}</p>` : ""
        }`,
      }),
    );
  } catch (err) {
    $app.logger().error("academy interest forward email failed", "err", String(err));
  }

  const subject = isEn ? "You're on The Cupid Academy waiting list" : "Está na lista de espera da The Cupid Academy";
  const body = isEn
    ? "We have received your interest in The Cupid Academy. We will let you know as soon as enrolment opens. There is no payment or commitment."
    : "Recebemos o seu interesse na The Cupid Academy. Avisamos assim que o curso abrir inscrições. Não há qualquer pagamento ou compromisso.";

  try {
    $app.newMailClient().send(
      new MailerMessage({
        from: { name: "The Cupid Bureau" },
        to: [{ address: email }],
        subject,
        html: `<div style="font-family:sans-serif;max-width:560px;margin:auto;color:#171515;"><h1 style="font-family:Georgia,serif;color:#6E1624;font-size:28px;">The Cupid Academy</h1><p style="font-size:14px;line-height:1.8;">${body}</p><hr style="margin:28px 0;border:none;border-top:1px solid #d8c9bb;" /><p style="font-family:Georgia,serif;font-style:italic;font-size:18px;color:#6E1624;">${isEn ? "Less chance. More intention." : "Menos acaso. Mais intenção."}</p></div>`,
      }),
    );
  } catch (err) {
    $app.logger().error("academy interest confirmation email failed", "err", String(err));
  }

  e.next();
}, "academy_interest");
