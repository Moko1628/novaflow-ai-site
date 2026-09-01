'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Comment ça marche', href: '#comment-ca-marche' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'À propos', href: '#a-propos' },
];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="/" className="font-extrabold text-lg tracking-tight text-gray-900">
          NovaFlow AI
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Parler à un expert
            <ArrowRight className="w-4 h-4" />
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
