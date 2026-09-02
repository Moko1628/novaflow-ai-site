'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckCircle2, Building2, ArrowRight } from 'lucide-react';

const cases = [
  {
    company: "Transports & Logistique Sahel",
    sector: "Logistique & Fret",
    challenge: "Traitement manuel de 250+ emails et bordereaux PDF par jour entraînant des retards de facturation.",
    solution: "Déploiement d'un agent NovaFlow AI couplé aux boîtes mail pour extraire, vérifier et enregistrer les bons de transport en 0.4s.",
    results: [
      { label: "Temps de traitement", value: "-80%" },
      { label: "Heures gagnées / sem.", value: "22h" },
      { label: "Erreurs de saisie", value: "0%" }
    ],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    company: "Clinique Médicale Horizon",
    sector: "Santé & Services",
    challenge: "Surcharge d'appels téléphoniques et de messages WhatsApp pour la confirmation et le report de rendez-vous.",
    solution: "Mise en place d'un assistant virtuel WhatsApp intelligent connecté à l'agenda de la clinique.",
    results: [
      { label: "Taux de 'No-Show'", value: "Divisé par 3" },
      { label: "Réactivité patient", value: "Instantanée" },
      { label: "Satisfaction", value: "4.9/5" }
    ],
    gradient: "from-purple-600 to-pink-500",
  },
  {
    company: "Grafitec Distribution B2B",
    sector: "Commerce & Négoce",
    challenge: "Établissement des devis complexes prenant jusqu'à 4 heures par commercial, ralentissant la conversion.",
    solution: "Intégration d'un agent de génération de devis automatisé avec base de prix connectée au catalogue.",
    results: [
      { label: "Délai d'émission devis", value: "2 minutes" },
      { label: "Chiffre d'affaires", value: "+28%" },
      { label: "ROI atteint en", value: "45 jours" }
    ],
    gradient: "from-emerald-600 to-teal-500",
  },
];

export default function CaseStudies() {
  return (
    <section id="cas-clients" className="py-24 md:py-32 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-50 text-purple-700 mb-4 shadow-sm">
            🏆 Résultats prouvés
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comment nos clients transforment
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              leurs opérations avec l'IA
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez des exemples concrets d'entreprises qui ont automatisé leurs processus répétitifs et accéléré leur croissance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cases.map((item, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-gray-700 border border-gray-200 shadow-sm">
                    {item.sector}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center shadow-md`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.company}</h3>
                
                <div className="space-y-3 mb-6 text-sm text-gray-600">
                  <div>
                    <strong className="text-gray-900">Défi :</strong> {item.challenge}
                  </div>
                  <div>
                    <strong className="text-gray-900">Solution NovaFlow :</strong> {item.solution}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-4 grid grid-cols-3 gap-2 text-center">
                {item.results.map((res, i) => (
                  <div key={i} className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="text-lg font-black text-blue-600">{res.value}</div>
                    <div className="text-[10px] text-gray-500 font-medium mt-0.5">{res.label}</div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
