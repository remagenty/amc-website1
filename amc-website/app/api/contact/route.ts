import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { renderDemandeEmail, getDemandeEmailSubject } from "@/lib/emails/template-demande";
import { renderConfirmationEmail, getConfirmationSubject } from "@/lib/emails/template-confirmation";

const RECIPIENT = "admin@amc-savoie.fr";
const CC_SECAMAT = "ychatel@secamat.com";

const schema = z.object({
  firstName: z.string().trim().min(1, "Prénom requis"),
  lastName: z.string().trim().min(1, "Nom requis"),
  email: z.string().trim().email("Email invalide"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1, "Message requis"),
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

  const { firstName, lastName, email, phone, message, photoNames } = parsed.data;
  const fullName = `${firstName} ${lastName}`.trim();

  const emailData = {
    type: "information",
    firstName,
    lastName,
    email,
    phone,
    message,
    photoNames,
    receivedAt: new Date(),
  };

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: RECIPIENT,
        cc: CC_SECAMAT,
        subject: getDemandeEmailSubject(emailData),
        html: renderDemandeEmail(emailData),
        replyTo: email,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: getConfirmationSubject(),
        html: renderConfirmationEmail({ type: "information", name: fullName, email }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/contact] Email send error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous appeler." },
      { status: 500 }
    );
  }
}
