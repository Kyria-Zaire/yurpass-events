import { z } from "zod";

export const applicationSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom est trop long"),
  email: z
    .string()
    .email("Entrez une adresse email valide"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

