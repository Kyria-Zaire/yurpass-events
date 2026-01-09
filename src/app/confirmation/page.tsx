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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Ruban noir diagonal */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute bg-black"
          style={{
            width: "200%",
            height: "120px",
            top: "15%",
            left: "-50%",
            transform: "rotate(-8deg)",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-6">
        <Link href="/" className="inline-block">
          <Image
            src="/images/yurpass.png"
            alt="YURPASS"
            width={100}
            height={30}
            className="h-6 w-auto"
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        {/* Titre massif */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-black mb-16">
          VOUS Y ÊTES.
        </h1>

        {/* Compte à rebours */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 mb-16">
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black tabular-nums">
              {mounted ? formatNumber(timeLeft.days) : "--"}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mt-2">
              Jours
            </span>
          </div>

          <span className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-300">
            :
          </span>

          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black tabular-nums">
              {mounted ? formatNumber(timeLeft.hours) : "--"}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mt-2">
              Heures
            </span>
          </div>

          <span className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-300">
            :
          </span>

          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black tabular-nums">
              {mounted ? formatNumber(timeLeft.minutes) : "--"}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mt-2">
              Minutes
            </span>
          </div>

          <span className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-300 hidden sm:block">
            :
          </span>

          <div className="flex-col items-center hidden sm:flex">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black tabular-nums">
              {mounted ? formatNumber(timeLeft.seconds) : "--"}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mt-2">
              Secondes
            </span>
          </div>
        </div>

        {/* Texte informatif */}
        <p className="text-gray-600 text-sm sm:text-base max-w-md mb-12 leading-relaxed">
          L&apos;adresse exacte et le code d&apos;entrée vous ont été envoyés
          par mail.
          <br />
          <span className="text-black font-medium">
            Gardez-les précieusement.
          </span>
        </p>

        {/* Bouton Calendrier */}
        <div className="relative">
          <button
            onClick={() => setShowCalendarMenu(!showCalendarMenu)}
            className="bg-black text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-gray-900 transition-colors"
          >
            Ajouter à mon calendrier
          </button>

          {/* Menu déroulant */}
          {showCalendarMenu && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden min-w-[200px]">
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.316 5.684H5.684v12.632h12.632V5.684z"
                    fill="#fff"
                  />
                  <path
                    d="M18.316 5.684L12 0v5.684h6.316z"
                    fill="#EA4335"
                  />
                  <path
                    d="M18.316 5.684H12v6.316h6.316V5.684z"
                    fill="#FBBC04"
                  />
                  <path d="M12 12H5.684v6.316H12V12z" fill="#34A853" />
                  <path d="M5.684 12V5.684H0L5.684 12z" fill="#188038" />
                  <path
                    d="M5.684 18.316V12L0 18.316h5.684z"
                    fill="#1967D2"
                  />
                  <path
                    d="M12 18.316V12l-6.316 6.316H12z"
                    fill="#4285F4"
                  />
                  <path
                    d="M18.316 12H12v6.316h6.316V12z"
                    fill="#EA4335"
                  />
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
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left w-full border-t border-gray-100"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-900">
                  Fichier .ics (Apple, Outlook)
                </span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 text-center">
        <p className="text-xs text-gray-400">
          © 2026 Yunicity. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}

