"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

  await prisma.candidate.update({
    where: { id },
    data: { status },
  });

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

