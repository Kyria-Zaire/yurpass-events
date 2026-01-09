import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "YURPASS | L'événementiel local redéfini",
  description: "Rejoignez YURPASS, le club d'événements exclusifs de Yunicity. Découvrez des expériences uniques et rencontrez des personnes exceptionnelles à Reims.",
  keywords: ["YURPASS", "Yunicity", "événements", "Reims", "networking", "expériences exclusives"],
  icons: {
    icon: [
      { url: "/images/yurpass.png", type: "image/png" },
    ],
    shortcut: "/images/yurpass.png",
    apple: "/images/yurpass.png",
  },
  openGraph: {
    title: "YURPASS | L'événementiel local redéfini",
    description: "Rejoignez YURPASS, le club d'événements exclusifs de Yunicity.",
    type: "website",
    images: ["/images/yurpass.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/yurpass.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/yurpass.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
