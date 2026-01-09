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
        <link rel="icon" type="image/png" sizes="32x32" href="/images/yurpass.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/yurpass.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/yurpass.png" />
        <link rel="shortcut icon" href="/images/yurpass.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
