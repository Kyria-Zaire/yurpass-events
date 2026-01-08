"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Loader2 } from "lucide-react";
import { applyAction, type ApplyState } from "@/app/actions/apply";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-11 text-sm font-semibold bg-black hover:bg-gray-900 text-white rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Vérification...
        </>
      ) : (
        "Demander une invitation"
      )}
    </button>
  );
}

export function ApplicationForm() {
  const [state, formAction] = useActionState<ApplyState | null, FormData>(
    applyAction,
    null
  );

  // Affichage du succès
  if (state?.success) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 mb-4">
          <Check className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
        <h3 className="text-lg font-bold text-black mb-2">
          Demande reçue
        </h3>
        <p className="text-sm text-gray-600">
          L&apos;exception se prépare.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Erreur globale */}
      {state?.error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{state.error}</p>
        </div>
      )}

      {/* Champ Nom */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm text-black font-medium">
          Nom complet
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Prénom Nom"
          className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:border-black focus:ring-1 focus:ring-black/5 transition-colors outline-none"
        />
      </div>

      {/* Champ Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm text-black font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="vous@exemple.com"
          className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:border-black focus:ring-1 focus:ring-black/5 transition-colors outline-none"
        />
      </div>

      {/* Bouton Submit */}
      <SubmitButton />

      <p className="text-center text-xs text-gray-500">
        Places limitées à <span className="font-semibold text-black">15 personnes</span>
      </p>
    </form>
  );
}
