'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, LogIn } from 'lucide-react';

const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'Agents', href: '/agents' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Simulateur', href: '/simulateur' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'ROI', href: '/roi' },
  { label: 'Cas clients', href: '/cas-clients' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl shadow-sm"
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <a href="/" className="font-extrabold text-xl tracking-tight text-gray-950 flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></span>
          NovaFlow AI
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              {item.label}
            </a>
          ))}
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          <a
            href="/espace-client"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <LogIn className="w-4 h-4 text-blue-600" />
            Espace Client
          </a>
          <a
            href="/audit"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white hover:shadow-lg transition-all"
          >
            Audit gratuit
            <ArrowRight className="w-4 h-4" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-b border-gray-200 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-3 shadow-xl max-h-[80vh] overflow-y-auto"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="/espace-client"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <LogIn className="w-4 h-4 text-blue-600" />
                Espace Client
              </a>
              <a
                href="/audit"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white hover:shadow-lg transition-colors"
              >
                Audit gratuit
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
