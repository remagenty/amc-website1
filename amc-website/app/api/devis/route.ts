import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { renderDemandeEmail, getDemandeEmailSubject } from "@/lib/emails/template-demande";
import { renderConfirmationEmail, getConfirmationSubject } from "@/lib/emails/template-confirmation";

const FALLBACK_RECIPIENT = "commercial@amc-savoie.fr";
const CC_SECAMAT = "ychatel@secamat.com";

const COMMERCIAL_EMAILS: Record<string, string> = {
  "jean-pierre": "jean-pierre@amc-savoie.fr",
  valentin: "valentin@amc-savoie.fr",
};

const schema = z.object({
  type: z.string().trim().min(1),
  firstName: z.string().trim().min(1, "Prénom requis"),
  lastName: z.string().trim().min(1, "Nom requis"),
  company: z.string().trim().optional(),
  email: z.string().trim().email("Email invalide"),
  phone: z.string().trim().optional(),
  materiel: z.string().trim().optional(),
  message: z.string().trim().min(1, "Message requis"),
  commercial: z.string().trim().optional(),
  photoNames: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Données invalides";
    return NextResponse.json({ error: first }, { status: 422 });
  }

  const { type, firstName, lastName, company, email, phone, materiel, message, commercial, photoNames } = parsed.data;
  const fullName = `${firstName} ${lastName}`.trim();

  const recipient = commercial && COMMERCIAL_EMAILS[commercial]
    ? COMMERCIAL_EMAILS[commercial]
    : FALLBACK_RECIPIENT;

  const emailData = {
    type,
    firstName,
    lastName,
    company,
    email,
    phone,
    materiel,
    message,
    commercial,
    photoNames,
    receivedAt: new Date(),
  };

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: recipient,
        cc: CC_SECAMAT,
        subject: getDemandeEmailSubject(emailData),
        html: renderDemandeEmail(emailData),
        replyTo: email,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: getConfirmationSubject(),
        html: renderConfirmationEmail({ type, name: fullName, email }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/devis] Email send error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous appeler." },
      { status: 500 }
    );
  }
}
