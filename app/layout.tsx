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
  title: "NovaFlow AI — Travailler malin",
  description:
    "NovaFlow AI automatise vos processus métier avec des agents IA intelligents. Zéro code, déploiement en 30 jours, ROI prouvé.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
