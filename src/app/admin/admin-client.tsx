"use client";

import { useTransition } from "react";
import { updateCandidateStatus, deleteCandidate } from "@/app/actions/admin";

type Candidate = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    PENDING: "bg-gray-100 text-gray-600",
    ACCEPTED: "bg-black text-white",
    REJECTED: "bg-gray-50 text-gray-400 line-through",
  };

  const labels = {
    PENDING: "En attente",
    ACCEPTED: "Accepté",
    REJECTED: "Refusé",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs tracking-wide ${
        styles[status as keyof typeof styles] || styles.PENDING
      }`}
    >
      {labels[status as keyof typeof labels] || status}
    </span>
  );
}

function CandidateRow({
  candidate,
  maxReached,
}: {
  candidate: Candidate;
  maxReached: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleAccept = () => {
    startTransition(async () => {
      await updateCandidateStatus(candidate.id, "ACCEPTED");
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      await updateCandidateStatus(candidate.id, "REJECTED");
    });
  };

  const handleDelete = () => {
    if (confirm("Supprimer cette candidature ?")) {
      startTransition(async () => {
        await deleteCandidate(candidate.id);
      });
    }
  };

  return (
    <div
      className={`border-b border-gray-50 py-6 ${
        isPending ? "opacity-50" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Info candidat */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-base font-medium text-black truncate">
              {candidate.name}
            </h3>
            <StatusBadge status={candidate.status} />
          </div>
          <p className="text-sm text-gray-400 truncate">{candidate.email}</p>
          <p className="text-xs text-gray-300 mt-1">
            {formatDate(candidate.createdAt)}
          </p>
        </div>

        {/* Actions */}
        {candidate.status === "PENDING" && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              disabled={isPending || maxReached}
              className="px-4 py-2 text-xs font-medium bg-black text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Accepter
            </button>
            <button
              onClick={handleReject}
              disabled={isPending}
              className="px-4 py-2 text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 transition-colors"
            >
              Refuser
            </button>
          </div>
        )}

        {candidate.status !== "PENDING" && (
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-xs text-gray-300 hover:text-red-500 transition-colors"
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
}

export function AdminClient({
  candidates,
  maxReached,
}: {
  candidates: Candidate[];
  maxReached: boolean;
}) {
  // Trier : PENDING en premier, puis ACCEPTED, puis REJECTED
  const sortedCandidates = [...candidates].sort((a, b) => {
    const order = { PENDING: 0, ACCEPTED: 1, REJECTED: 2 };
    return (
      (order[a.status as keyof typeof order] || 3) -
      (order[b.status as keyof typeof order] || 3)
    );
  });

  return (
    <div>
      {sortedCandidates.map((candidate) => (
        <CandidateRow
          key={candidate.id}
          candidate={candidate}
          maxReached={maxReached}
        />
      ))}
    </div>
  );
}

