"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const EVENT_DATE = new Date("2026-01-17T13:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const difference = EVENT_DATE.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function generateGoogleCalendarUrl(): string {
  const startDate = "20260117T130000";
  const endDate = "20260117T180000";
  const title = encodeURIComponent("YURPASS - Raclette Party");
  const details = encodeURIComponent(
    "Soirée exclusive YURPASS à Reims. Dress code : Une touche de noir, un esprit libre."
  );
  const location = encodeURIComponent("Reims, France");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
}

function generateIcsFile(): void {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YURPASS//Event//FR
BEGIN:VEVENT
DTSTART:20260117T130000
DTEND:20260117T180000
SUMMARY:YURPASS - Raclette Party
DESCRIPTION:Soirée exclusive YURPASS à Reims. Dress code : Une touche de noir, un esprit libre.
LOCATION:Reims, France
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "yurpass-event.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ConfirmationPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Header */}
      <header className="relative z-10 py-8 px-8">
        <Link href="/" className="inline-block">
          <Image
            src="/images/yurpass.png"
            alt="YURPASS"
            width={120}
            height={36}
            className="h-7 w-auto"
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center py-12">
        {/* Badge de confirmation */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-medium uppercase tracking-widest">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Invitation confirmée
          </span>
        </div>

        {/* Titre massif */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-black mb-6">
          VOUS Y ÊTES.
        </h1>

        {/* Sous-titre */}
        <p className="text-gray-500 text-base sm:text-lg mb-16 max-w-md">
          Rendez-vous le 17 janvier 2026 à Reims
        </p>

        {/* Compte à rebours avec design épuré */}
        <div className="flex items-start justify-center gap-1 sm:gap-3 mb-16">
          <div className="flex flex-col items-center px-3 sm:px-6">
            <span className="text-5xl sm:text-6xl md:text-7xl font-extralight text-black tabular-nums tracking-tight">
              {mounted ? formatNumber(timeLeft.days) : "--"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 mt-3">
              Jours
            </span>
          </div>

          <span className="text-4xl sm:text-5xl font-extralight text-gray-200 mt-2">
            :
          </span>

          <div className="flex flex-col items-center px-3 sm:px-6">
            <span className="text-5xl sm:text-6xl md:text-7xl font-extralight text-black tabular-nums tracking-tight">
              {mounted ? formatNumber(timeLeft.hours) : "--"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 mt-3">
              Heures
            </span>
          </div>

          <span className="text-4xl sm:text-5xl font-extralight text-gray-200 mt-2">
            :
          </span>

          <div className="flex flex-col items-center px-3 sm:px-6">
            <span className="text-5xl sm:text-6xl md:text-7xl font-extralight text-black tabular-nums tracking-tight">
              {mounted ? formatNumber(timeLeft.minutes) : "--"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 mt-3">
              Minutes
            </span>
          </div>

          <span className="text-4xl sm:text-5xl font-extralight text-gray-200 mt-2 hidden sm:block">
            :
          </span>

          <div className="flex-col items-center px-3 sm:px-6 hidden sm:flex">
            <span className="text-5xl sm:text-6xl md:text-7xl font-extralight text-black tabular-nums tracking-tight">
              {mounted ? formatNumber(timeLeft.seconds) : "--"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 mt-3">
              Secondes
            </span>
          </div>
        </div>

        {/* Carte info */}
        <div className="bg-gray-50 border border-gray-100 px-8 py-6 mb-10 max-w-md w-full">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600 leading-relaxed">
                L&apos;adresse exacte et le code d&apos;entrée vous ont été envoyés par mail.
              </p>
              <p className="text-sm text-black font-semibold mt-1">
                Gardez-les précieusement.
              </p>
            </div>
          </div>
        </div>

        {/* Bouton Calendrier */}
        <div className="relative">
          <button
            onClick={() => setShowCalendarMenu(!showCalendarMenu)}
            className="group flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Ajouter à mon calendrier
            <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Menu déroulant */}
          {showCalendarMenu && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 shadow-xl overflow-hidden min-w-[240px] z-20">
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-900">
                  Google Calendar
                </span>
              </a>
              <button
                onClick={() => {
                  generateIcsFile();
                  setShowCalendarMenu(false);
                }}
                className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left w-full border-t border-gray-100"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-sm font-medium text-gray-900">
                  Télécharger .ics
                </span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Ruban noir fin en bas */}
      <div className="h-1 bg-black w-full" />

      {/* Footer */}
      <footer className="py-6 px-8 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          © 2026 Yunicity
        </p>
        <Link href="/" className="text-xs text-gray-400 hover:text-black transition-colors">
          yurpass-events.vercel.app
        </Link>
      </footer>
    </div>
  );
}

