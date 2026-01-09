"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendNewCandidateNotification } from "@/lib/email";

const applySchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Entrez une adresse email valide"),
});

export type ApplyState = {
  success: boolean;
  error?: string;
  message?: string;
};

export async function applyAction(
  prevState: ApplyState | null,
  formData: FormData
): Promise<ApplyState> {
  // Extraire les données du formulaire
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  };

  // Valider avec Zod
  const validationResult = applySchema.safeParse(rawData);

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    const firstError = Object.values(errors)[0]?.[0] || "Données invalides";
    return {
      success: false,
      error: firstError,
    };
  }

  const { name, email } = validationResult.data;

  try {
    // Vérifier si l'email existe déjà
    const existingCandidate = await prisma.candidate.findUnique({
      where: { email },
    });

    if (existingCandidate) {
      return {
        success: false,
        error: "Vous avez déjà postulé pour cet événement.",
      };
    }

    // Créer le candidat
    await prisma.candidate.create({
      data: {
        name,
        email,
        status: "PENDING",
      },
    });

    // Envoyer une notification à l'admin
    await sendNewCandidateNotification(name, email).catch((err) => {
      console.error("Failed to send admin notification:", err);
      // On ne bloque pas le processus si l'email échoue
    });

    return {
      success: true,
      message: "Demande reçue. L'exception se prépare.",
    };
  } catch (error) {
    console.error("Erreur lors de la candidature:", error);
    return {
      success: false,
      error: "Une erreur est survenue. Veuillez réessayer.",
    };
  }
}

