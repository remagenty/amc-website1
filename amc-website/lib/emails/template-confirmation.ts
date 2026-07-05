const SITE_URL = "https://www.amc-savoie.fr";
const LOGO_URL = `${SITE_URL}/images/LOGO-AMC-ORANGE-site-web.png`;

export interface ConfirmationEmailData {
  type: string;
  name: string;
  email: string;
}

export function renderConfirmationEmail(data: ConfirmationEmailData): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Votre demande a bien été reçue — AMC</title>
</head>
<body style="margin:0;padding:0;background:#f0f0ec;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0ec;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.10);">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a1a1a;padding:20px 24px;">
              <img src="${LOGO_URL}" alt="AMC — Alpes Matériel Compact" width="160" height="30" style="display:block;max-width:160px;height:auto;" />
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:32px 24px 24px;">
              <div style="font-size:22px;font-weight:700;color:#1a1a1a;font-family:Arial,sans-serif;margin-bottom:12px;">
                Votre demande a bien été reçue ✓
              </div>
              <p style="font-size:15px;color:#444;font-family:Arial,sans-serif;line-height:1.6;margin:0 0 16px;">
                Bonjour ${data.name},
              </p>
              <p style="font-size:15px;color:#444;font-family:Arial,sans-serif;line-height:1.6;margin:0 0 16px;">
                Nous avons bien reçu votre demande et nous vous répondrons dans les meilleurs délais.
              </p>
              <p style="font-size:15px;color:#444;font-family:Arial,sans-serif;line-height:1.6;margin:0 0 24px;">
                En cas d'urgence, vous pouvez nous contacter directement par téléphone.
              </p>
              <a href="${SITE_URL}" style="display:inline-block;background:#ffd500;color:#1a1a1a;padding:14px 24px;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;font-family:Arial,sans-serif;">
                Retour sur le site
              </a>
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

export function getConfirmationSubject(): string {
  return "Votre demande a bien été reçue — AMC Alpes Matériel Compact";
}
