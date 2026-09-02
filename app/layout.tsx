import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaFlow AI — Automatisation Intelligente & Agents IA",
  description:
    "NovaFlow AI automatise vos processus métier avec des agents IA sur mesure. Gagnez en productivité, réduisez vos coûts et accélérez votre croissance.",
  keywords: ["NovaFlow AI", "Intelligence Artificielle", "Automatisation", "Agents IA", "Workflow", "Productivité B2B", "Afrique"],
  authors: [{ name: "NovaFlow AI" }],
  openGraph: {
    title: "NovaFlow AI — Automatisation Intelligente & Agents IA",
    description: "Automatisez vos processus métier avec des agents IA sur mesure. Zéro complexité, ROI garanti.",
    url: "https://novaflow-ai.com",
    siteName: "NovaFlow AI",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaFlow AI — Automatisation Intelligente",
    description: "Automatisez vos processus métier avec des agents IA sur mesure.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <div className="pt-16 flex-1">{children}</div>
      </body>
    </html>
  );
}
