'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';

const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Simulateur', href: '#simulateur' },
  { label: 'Cas clients', href: '#cas-clients' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="/" className="font-extrabold text-lg tracking-tight text-gray-950 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></span>
          NovaFlow AI
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors">
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            Parler à un expert
            <ArrowRight className="w-4 h-4" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
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
            className="md:hidden border-b border-gray-200 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-xl"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Parler à un expert
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
