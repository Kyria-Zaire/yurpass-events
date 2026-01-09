import { Resend } from "resend";
import { InvitationAcceptedEmail } from "@/emails/invitation-accepted";
import { NewCandidateNotificationEmail } from "@/emails/new-candidate-notification";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "yu.entreprise@gmail.com";

export async function sendInvitationAcceptedEmail(
  to: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: "YURPASS <onboarding@resend.dev>", // Change to your domain once verified
      to: [to],
      subject: "Bienvenue dans l'exceptionnel - YURPASS",
      react: InvitationAcceptedEmail({ name }),
    });

    if (error) {
      console.error("Email error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function sendNewCandidateNotification(
  candidateName: string,
  candidateEmail: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const createdAt = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    const { error } = await resend.emails.send({
      from: "YURPASS <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `🚀 Nouvelle candidature YURPASS : ${candidateName}`,
      react: NewCandidateNotificationEmail({
        name: candidateName,
        email: candidateEmail,
        createdAt,
      }),
    });

    if (error) {
      console.error("Admin notification error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Admin notification send error:", error);
    return { success: false, error: "Failed to send notification" };
  }
}

