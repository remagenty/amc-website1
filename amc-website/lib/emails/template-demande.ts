const SITE_URL = "https://www.amc-savoie.fr";
const LOGO_URL = `${SITE_URL}/images/LOGO-AMC-ORANGE-site-web.png`;

const TYPE_LABELS: Record<string, string> = {
  devis: "Demande de devis",
  sav: "Service après-vente (SAV)",
  information: "Demande d'information",
  pieces: "Pièces détachées",
  "pieces-detachees": "Pièces détachées",
  maintenance: "Contrat de maintenance",
  financement: "Financement",
  recherche: "Recherche de matériel",
  autre: "Autre demande",
};

export interface DemandeEmailData {
  type: string;
  firstName?: string;
  lastName?: string;
  nom?: string;
  company?: string;
  email: string;
  phone?: string;
  materiel?: string;
  message: string;
  commercial?: string;
  photoNames?: string[];
  receivedAt?: Date;
}

function field(label: string, value: string, isLink?: { href: string }) {
  const valueHtml = isLink
    ? `<a href="${isLink.href}" style="color:#1a6bbf;text-decoration:none;">${value}</a>`
    : `<span style="font-weight:700;color:#1a1a1a;">${value}</span>`;
  return `
    <td style="padding:0 6px 12px 0;vertical-align:top;width:50%;">
      <div style="background:#f5f5f0;border-radius:8px;padding:12px 14px;">
        <div style="font-size:11px;color:#888;margin-bottom:4px;font-family:Arial,sans-serif;">${label}</div>
        <div style="font-size:14px;font-family:Arial,sans-serif;">${valueHtml}</div>
      </div>
    </td>`;
}

function fieldFull(label: string, value: string) {
  return `
    <tr>
      <td colspan="2" style="padding:0 0 12px 0;">
        <div style="background:#f5f5f0;border-radius:8px;padding:12px 14px;">
          <div style="font-size:11px;color:#888;margin-bottom:4px;font-family:Arial,sans-serif;">${label}</div>
          <div style="font-size:14px;font-weight:700;color:#1a1a1a;font-family:Arial,sans-serif;">${value}</div>
        </div>
      </td>
    </tr>`;
}

function metaRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:8px 16px;font-size:12px;color:#888;font-family:Arial,sans-serif;white-space:nowrap;vertical-align:top;border-bottom:1px solid #e8e8e8;">${label}</td>
      <td style="padding:8px 16px;font-size:13px;font-weight:600;color:#1a1a1a;font-family:Arial,sans-serif;border-bottom:1px solid #e8e8e8;">${value}</td>
    </tr>`;
}

export function renderDemandeEmail(data: DemandeEmailData): string {
  const typeLabel = TYPE_LABELS[data.type] ?? data.type;
  const fullName = data.nom ?? `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const subject = `[${typeLabel}] ${fullName}${data.company ? ` — ${data.company}` : ""}`;

  const receivedAt = data.receivedAt ?? new Date();
  const dateStr = receivedAt.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) + " à " + receivedAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const commercialEmail = data.commercial
    ? `${data.commercial}@amc-savoie.fr`
    : "commercial@amc-savoie.fr";

  const photoSection =
    data.photoNames && data.photoNames.length > 0
      ? `
    <tr>
      <td colspan="2" style="padding:0 0 12px 0;">
        <div style="border:1.5px dashed #d0d0d0;border-radius:8px;padding:14px;">
          <div style="font-size:12px;color:#888;margin-bottom:10px;font-family:Arial,sans-serif;">
            &#128247; Photos jointes &mdash; ${data.photoNames.length} fichier${data.photoNames.length > 1 ? "s" : ""}
          </div>
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${data.photoNames
                .slice(0, 5)
                .map(
                  (name) => `
                <td style="padding:0 8px 0 0;vertical-align:top;">
                  <div style="width:72px;text-align:center;">
                    <div style="width:72px;height:56px;background:#f0f0f0;border:1px solid #e0e0e0;border-radius:6px;display:flex;align-items:center;justify-content:center;margin-bottom:4px;font-size:22px;line-height:56px;text-align:center;">&#128444;</div>
                    <div style="font-size:10px;color:#888;word-break:break-all;font-family:Arial,sans-serif;">${name}</div>
                  </div>
                </td>`
                )
                .join("")}
            </tr>
          </table>
        </div>
      </td>
    </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f0f0ec;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0ec;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.10);">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a1a1a;padding:20px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <img
                      src="${LOGO_URL}"
                      alt="AMC — Alpes Matériel Compact"
                      width="160"
                      height="30"
                      style="display:block;max-width:160px;height:auto;"
                    />
                    <div style="font-size:11px;color:#999;font-family:Arial,sans-serif;margin-top:4px;">notifications@amc-savoie.fr</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- METADATA -->
          <tr>
            <td style="background:#fafaf8;border-bottom:1px solid #e8e8e8;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${metaRow("Objet", subject)}
                ${metaRow("À", commercialEmail)}
                ${metaRow("Reçu", dateStr)}
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:24px 24px 8px;">

              <!-- Type badge -->
              <div style="display:inline-block;border:1.5px solid #e6c000;border-radius:20px;padding:5px 14px;margin-bottom:20px;">
                <span style="font-size:13px;font-weight:600;color:#b8960a;font-family:Arial,sans-serif;">&#128196; ${typeLabel}</span>
              </div>

              <!-- Fields grid -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  ${field("Prénom / Nom", fullName)}
                  ${field("Société", data.company || "—")}
                </tr>
                <tr>
                  ${field("Email", data.email, { href: `mailto:${data.email}` })}
                  ${field("Téléphone", data.phone || "—")}
                </tr>
                ${data.materiel ? fieldFull("Matériel concerné", data.materiel) : ""}
                ${fieldFull("Message", data.message.replace(/\n/g, "<br/>"))}
                ${photoSection}
              </table>

            </td>
          </tr>

          <!-- BUTTONS -->
          <tr>
            <td style="padding:8px 24px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:8px;width:55%;">
                    <a href="mailto:${data.email}?subject=RE: ${encodeURIComponent(subject)}"
                       style="display:block;background:#ffd500;color:#1a1a1a;text-align:center;padding:14px 16px;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;font-family:Arial,sans-serif;">
                      &#9993; Répondre au client
                    </a>
                  </td>
                  <td style="padding-left:8px;width:45%;">
                    <a href="tel:${data.phone ?? ""}"
                       style="display:block;background:#f0f0ec;color:#1a1a1a;text-align:center;padding:14px 16px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;border:1px solid #e0e0e0;">
                      &#128222; Appeler le client
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#fafaf8;border-top:1px solid #e8e8e8;padding:14px 24px;text-align:center;">
              <span style="font-size:11px;color:#aaa;font-family:Arial,sans-serif;">
                AMC &mdash; Alpes Mat&eacute;riel Compact &middot; ZAC D&rsquo;Orsan, 74540 Saint-F&eacute;lix &middot; <a href="${SITE_URL}" style="color:#aaa;text-decoration:none;">amc-savoie.fr</a>
              </span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getDemandeEmailSubject(data: DemandeEmailData): string {
  const typeLabel = TYPE_LABELS[data.type] ?? data.type;
  const fullName = data.nom ?? `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  return `[${typeLabel}] ${fullName}${data.company ? ` — ${data.company}` : ""}`;
}
