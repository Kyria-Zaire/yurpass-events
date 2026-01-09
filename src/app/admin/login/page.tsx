"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Mot de passe incorrect");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <Image
            src="/images/yurpass.png"
            alt="YURPASS"
            width={140}
            height={40}
            className="h-[40px] w-auto mx-auto mb-4"
          />
          <h1 className="text-xl font-light text-black">Administration</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
              className="w-full h-12 px-4 text-center text-sm bg-white border border-gray-200 focus:border-black focus:outline-none transition-colors tracking-widest"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-xs uppercase tracking-widest font-medium bg-black text-white hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {loading ? "..." : "Accéder"}
          </button>
        </form>
      </div>
    </main>
  );
}

