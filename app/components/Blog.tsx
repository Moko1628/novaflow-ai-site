'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, ArrowRight, User, X, Sparkles } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "Pourquoi les agents IA autonomes remplacent les simples chatbots en 2026",
    category: "Intelligence Artificielle",
    date: "28 Février 2026",
    readTime: "4 min de lecture",
    excerpt: "Contrairement aux chatbots traditionnels basés sur des arbres de décision rigides, les agents autonomes agissent, écrivent des emails, mettent à jour le CRM et prennent des décisions.",
    content: "L'ère des assistants qui se contentent de répondre 'Je n'ai pas compris' est révolue. En 2026, les entreprises recherchent de véritables collaborateurs virtuels capables de relier leurs outils entre eux. Un agent NovaFlow ne discute pas seulement : il analyse un PDF de facture, vérifie le stock dans l'ERP, génère l'écriture comptable et alerte le responsable si une anomalie est détectée. C'est tout le paradigme de l'automatisation qui bascule de la simple 'tâche programmée' à 'l'agent intelligent décisionnel'."
  },
  {
    id: 2,
    title: "Comment automatiser le traitement de vos factures fournisseurs sans erreur",
    category: "Productivité & Finance",
    date: "15 Février 2026",
    readTime: "5 min de lecture",
    excerpt: "La saisie manuelle des factures PDF reçues par email coûte des centaines d'heures aux départements comptables. Voici comment diviser ce temps par 10.",
    content: "Chaque mois, les comptables passent des heures à ouvrir des PDF, copier les numéros de TVA, les montants HT et TTC, et à les ressaisir dans le logiciel de gestion. En connectant un agent de vision et d'extraction IA sur vos boîtes mail entrantes, chaque facture est lue dès sa réception, validée par rapport au bon de commande, et prête à être payée. Résultat : zéro erreur de ressaisie et un gain de temps de 85%."
  },
  {
    id: 3,
    title: "WhatsApp Business et IA : La nouvelle norme du service client en Afrique",
    category: "Relation Client",
    date: "02 Février 2026",
    readTime: "3 min de lecture",
    excerpt: "En Afrique francophone, WhatsApp est le canal numéro un de communication professionnelle. L'automatiser intelligemment change la donne pour le e-commerce et les services.",
    content: "Pour une PME recevant des dizaines ou des centaines de messages WhatsApp par jour pour des commandes ou des questions de suivi, répondre à la main crée des goulets d'étranglement majeurs le soir et les weekends. En couplant WhatsApp Business à une base de connaissances vectorielle, vos clients obtiennent des réponses instantanées et précises 24h/24, tandis que les demandes complexes sont automatiquement escaladées vers vos équipes avec un résumé complet."
  }
];

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  return (
    <section id="blog" className="py-24 md:py-32 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-4 shadow-sm">
            📰 Actualités & Insights IA
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Le Mag NovaFlow AI
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tendances, retours d'expérience et guides pratiques pour comprendre l'impact des agents IA sur l'entreprise moderne.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((art, idx) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              onClick={() => setSelectedArticle(art)}
              className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                    {art.category}
                  </span>
                  <span className="text-xs text-gray-400">{art.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {art.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {art.date}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Lire l'article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedArticle(null)} />
            <motion.div
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition z-10"
                aria-label="Fermer"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="p-8 overflow-y-auto space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-gray-400">{selectedArticle.date} • {selectedArticle.readTime}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {selectedArticle.title}
                </h2>

                <div className="prose text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
                  <p className="font-medium text-gray-900 text-base">{selectedArticle.excerpt}</p>
                  <p>{selectedArticle.content}</p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Partagé par l'équipe NovaFlow AI</span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
