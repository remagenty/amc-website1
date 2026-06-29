import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { renderDemandeEmail, getDemandeEmailSubject } from "@/lib/emails/template-demande";
import { renderConfirmationEmail, getConfirmationSubject } from "@/lib/emails/template-confirmation";

const CC_ADDRESS = "admin@amc-savoie.fr";
const CC_SECAMAT = "ychatel@secamat.com";

const schema = z.object({
  nom: z.string().trim().min(1, "Nom requis"),
  email: z.string().trim().email("Email invalide"),
  telephone: z.string().trim().optional(),
  societe: z.string().trim().optional(),
  objet: z.string().trim().min(1),
  message: z.string().trim().min(1, "Message requis"),
  memberName: z.string().trim().min(1),
  memberRole: z.string().trim().optional(),
  memberEmail: z.string().trim().email().optional(),
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

  const { nom, email, telephone, societe, objet, message, memberName, memberEmail, photoNames } = parsed.data;

  const emailData = {
    type: objet,
    nom,
    company: societe,
    email,
    phone: telephone,
    message: `[Contact pour ${memberName}]\n\n${message}`,
    photoNames,
    receivedAt: new Date(),
  };

  const subject = getDemandeEmailSubject(emailData);
  const html = renderDemandeEmail(emailData);

  const toAddresses: string[] = [];
  if (memberEmail) toAddresses.push(memberEmail);
  if (!toAddresses.includes(CC_ADDRESS)) toAddresses.push(CC_ADDRESS);

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: toAddresses,
        cc: CC_SECAMAT,
        subject,
        html,
        replyTo: email,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: getConfirmationSubject(),
        html: renderConfirmationEmail({ type: objet, name: nom, email }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/team-contact] Email send error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous appeler." },
      { status: 500 }
    );
  }
}
