import { Resend } from "resend";
import { InvitationAcceptedEmail } from "@/emails/invitation-accepted";

const resend = new Resend(process.env.RESEND_API_KEY);

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

