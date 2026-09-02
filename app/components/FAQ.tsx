"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Qu'est-ce que NovaFlow AI et comment ça fonctionne ?",
    answer:
      "NovaFlow AI déploie des agents IA sur mesure connectés à vos outils professionnels (CRM, ERP, messageries, bases de données) pour automatiser vos tâches répétitives, traiter vos documents et répondre à vos clients 24h/24 sans modifier vos logiciels existants.",
  },
  {
    question: "Combien de temps prend le déploiement d'une solution ?",
    answer:
      "Grâce à notre approche modulaire, nos agents IA sont configurés, testés et déployés en moyenne en 15 à 30 jours, de l'audit initial à la mise en production sécurisée.",
  },
  {
    question: "Mes données d'entreprise sont-elles sécurisées et confidentielles ?",
    answer:
      "Absolument. Nous respectons les plus hauts standards de sécurité (chiffrement de bout en bout, hébergement souverain ou cloud privé sécurisé). Vos données ne sont jamais utilisées pour réentraîner des modèles publics.",
  },
  {
    question: "Quels types d'entreprises peuvent utiliser NovaFlow AI ?",
    answer:
      "Nous accompagnons les PME, les cabinets, les institutions et les grandes entreprises dans tous les secteurs (finance, logistique, e-commerce, services, santé) souhaitant automatiser leurs opérations.",
  },
  {
    question: "Quel est le modèle d'engagement et de tarification ?",
    answer:
      "Nos offres reposent sur un engagement de 12 mois avec des frais de mise en place (setup) initiaux suivis d'une maintenance mensuelle incluant le support technique, les mises à jour et l'optimisation continue des agents.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Questions Fréquentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Tout ce que vous devez savoir sur NovaFlow AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des réponses claires sur notre technologie, notre sécurité et notre accompagnement.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-blue-300 shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
