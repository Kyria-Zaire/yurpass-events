import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCandidates, getAcceptedCount } from "@/app/actions/admin";
import { AdminClient } from "./admin-client";

export default async function AdminPage() {
  const cookieStore = await cookies();
  
  // Vérification du mot de passe
  const adminPassword = process.env.ADMIN_PASSWORD;
  const cookiePassword = cookieStore.get("admin_auth")?.value;

  // Si pas de mot de passe configuré ou non authentifié, rediriger vers login
  if (!adminPassword || cookiePassword !== adminPassword) {
    redirect("/admin/login");
  }

  // Récupérer les données
  const [candidates, acceptedCount] = await Promise.all([
    getCandidates(),
    getAcceptedCount(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
            Administration
          </p>
          <h1 className="text-2xl font-light text-black tracking-tight">
            Gestion des Invités
          </h1>
        </div>
      </header>

      {/* Compteur VIP */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-extralight text-black tabular-nums">
              {acceptedCount}
            </span>
            <span className="text-2xl font-extralight text-gray-300">/</span>
            <span className="text-2xl font-extralight text-gray-400">15</span>
            <span className="text-sm text-gray-400 ml-4">places confirmées</span>
          </div>
          {acceptedCount >= 15 && (
            <p className="text-sm text-amber-600 mt-4">
              Complet — Toutes les places ont été attribuées
            </p>
          )}
        </div>
      </section>

      {/* Liste des candidats */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">
          {candidates.length} candidature{candidates.length > 1 ? "s" : ""}
        </p>

        {candidates.length === 0 ? (
          <p className="text-gray-400 text-center py-16">
            Aucune candidature pour le moment
          </p>
        ) : (
          <AdminClient 
            candidates={candidates} 
            maxReached={acceptedCount >= 15} 
          />
        )}
      </section>
    </main>
  );
}

