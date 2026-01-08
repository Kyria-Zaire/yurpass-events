import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import { ApplicationForm } from "@/components/application-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/yurpass.png"
              alt="YURPASS"
              width={180}
              height={52}
              className="h-[42px] sm:h-[52px] w-auto"
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
            <span>by</span>
            <span className="font-semibold text-black">Yunicity</span>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/private.png"
            alt="YURPASS Private Event"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 sm:mb-8">
              <span className="text-xs sm:text-sm font-medium text-white">17 Janvier 2025 · Reims</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4 sm:mb-5">
              Vous êtes invité!
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl mb-6 sm:mb-8 leading-relaxed">
              YURPASS ouvre ses portes à Reims pour une expérience confidentielle. 
              15 places, une table, et l&apos;art de la rencontre. 
              Ne demandez pas une invitation, postulez pour une exception.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <a 
                href="#apply" 
                className="inline-flex items-center justify-center h-10 sm:h-11 px-5 sm:px-6 text-xs sm:text-sm bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Demander une invitation
              </a>
              <a 
                href="#event" 
                className="inline-flex items-center justify-center h-10 sm:h-11 px-5 sm:px-6 text-xs sm:text-sm bg-white/10 text-white font-semibold rounded-lg border border-white/30 backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                En savoir plus
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* Event Details Section */}
      <section id="event" className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
            L&apos;événement
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight mb-3 sm:mb-4">
            Raclette Party
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            Une soirée exclusive autour d&apos;une raclette gourmande. L&apos;occasion parfaite 
            de rencontrer des personnes inspirantes dans une ambiance chaleureuse et décontractée.
          </p>

          {/* Event Info Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200 text-left">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-black mb-1.5 sm:mb-2" />
              <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Date</p>
              <p className="text-xs sm:text-sm font-semibold text-black">17 Jan 2025</p>
            </div>
            <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200 text-left">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black mb-1.5 sm:mb-2" />
              <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Lieu</p>
              <p className="text-xs sm:text-sm font-semibold text-black">Reims</p>
            </div>
            <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200 text-left">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-black mb-1.5 sm:mb-2" />
              <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Places</p>
              <p className="text-xs sm:text-sm font-semibold text-black">15</p>
            </div>
          </div>
        </div>
      </section>

      {/* Raclette Image Section */}
      <section className="relative h-[40vh] sm:h-[50vh] min-h-[250px] sm:min-h-[400px]">
        <Image
          src="/images/raclette.jpg"
          alt="Raclette Party"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* Why YURPASS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
              Pourquoi YURPASS
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight">
              Des expériences pensées pour vous
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {/* Feature 1 */}
            <div className="p-3 sm:p-4 bg-black text-white rounded-lg">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm font-bold">01</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold mb-1 sm:mb-2">Événements Exclusifs</h3>
              <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">
                Des expériences soigneusement sélectionnées pour créer des moments inoubliables.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-3 sm:p-4 bg-black text-white rounded-lg">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm font-bold">02</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold mb-1 sm:mb-2">Communauté Select</h3>
              <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">
                Chaque participant est choisi pour créer une alchimie parfaite.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-3 sm:p-4 bg-black text-white rounded-lg">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm font-bold">03</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold mb-1 sm:mb-2">Ancré Localement</h3>
              <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">
                Reims est notre terrain de jeu. Nous révélons les meilleurs spots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Left: Content */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                Rejoignez-nous
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight mb-3 sm:mb-4">
                Demandez votre invitation
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Les places sont limitées et chaque candidature est étudiée avec attention. 
                Dites-nous qui vous êtes et pourquoi vous souhaitez nous rejoindre.
              </p>
              
              {/* Trust signals */}
              <div className="space-y-1.5 sm:space-y-2 hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black flex items-center justify-center">
                    <span className="text-white text-[8px] sm:text-[10px]">✓</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">Réponse sous 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black flex items-center justify-center">
                    <span className="text-white text-[8px] sm:text-[10px]">✓</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">Sélection basée sur la motivation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black flex items-center justify-center">
                    <span className="text-white text-[8px] sm:text-[10px]">✓</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">Lieu communiqué aux sélectionnés</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm">
              <ApplicationForm />
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/images/yurpass.png"
              alt="YURPASS"
              width={160}
              height={46}
              className="h-[38px] sm:h-[46px] w-auto"
            />
            <span className="text-xs sm:text-sm text-gray-400">by Yunicity</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            © 2026 Yunicity. Tous droits réservés.
          </p>
        </div>
      </footer>
      </main>
  );
}
