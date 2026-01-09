"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendInvitationAcceptedEmail } from "@/lib/email";

export async function getCandidates() {
  const candidates = await prisma.candidate.findMany({
    orderBy: { createdAt: "desc" },
  });
  return candidates;
}

export async function getAcceptedCount() {
  const count = await prisma.candidate.count({
    where: { status: "ACCEPTED" },
  });
  return count;
}

export async function updateCandidateStatus(
  id: string,
  status: "ACCEPTED" | "REJECTED"
) {
  // Vérifier le nombre d'acceptés si on accepte
  if (status === "ACCEPTED") {
    const acceptedCount = await prisma.candidate.count({
      where: { status: "ACCEPTED" },
    });
    if (acceptedCount >= 15) {
      return { success: false, error: "Maximum de 15 places atteint" };
    }
  }

  // Récupérer les infos du candidat avant la mise à jour
  const candidate = await prisma.candidate.findUnique({
    where: { id },
  });

  if (!candidate) {
    return { success: false, error: "Candidat non trouvé" };
  }

  // Mettre à jour le statut
  await prisma.candidate.update({
    where: { id },
    data: { status },
  });

  // Envoyer l'email de confirmation si accepté
  if (status === "ACCEPTED") {
    const emailResult = await sendInvitationAcceptedEmail(
      candidate.email,
      candidate.name
    );
    
    if (!emailResult.success) {
      console.error("Failed to send acceptance email:", emailResult.error);
      // On ne bloque pas le processus si l'email échoue
    }
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteCandidate(id: string) {
  await prisma.candidate.delete({
    where: { id },
  });

  revalidatePath("/admin");
  return { success: true };
}

