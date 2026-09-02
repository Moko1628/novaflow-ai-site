"use client";

import { motion } from "framer-motion";
import { Check, HelpCircle, Zap, Shield, Crown } from "lucide-react";

const plans = [
  {
    name: "Starter",
    tagline: "Idéal pour automatiser un premier processus clé et tester l'impact.",
    setup: "150 000",
    monthly: "25 000",
    period: "FCFA / mois",
    features: [
      "1 Agent IA spécialisé (ex: Tri emails ou FAQ)",
      "Connexion 1 source (Email ou WhatsApp)",
      "Génération automatique de réponses standard",
      "Support par email (réponse sous 48h)",
      "Tableau de bord de suivi basique",
      "Sans engagement (résiliable à tout moment)",
    ],
    ideal: "Indépendants, TPE et startups souhaitant automatiser une tâche répétitive.",
    cta: "Choisir Starter",
    ctaVariant: "outline",
    popular: false,
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-white to-blue-50/30",
  },
  {
    name: "Pro",
    tagline: "Pour les PME en forte croissance cherchant à connecter leurs outils.",
    setup: "350 000",
    monthly: "75 000",
    period: "FCFA / mois",
    features: [
      "Jusqu'à 3 Agents IA interconnectés",
      "Connexion multi-sources (Email, WhatsApp, CRM/Excel)",
      "Génération automatique de devis et factures PDF",
      "Base de connaissances personnalisée (RAG)",
      "Support prioritaire (24h) + Point mensuel",
      "Alertes instantanées Slack / WhatsApp",
    ],
    ideal: "PME et cabinets avec un volume important de demandes clients et de facturation.",
    cta: "Lancer le Pack Pro",
    ctaVariant: "primary",
    popular: true,
    icon: Shield,
    gradient: "from-blue-600 to-purple-600",
    bgGradient: "from-blue-50/50 to-purple-50/50",
  },
  {
    name: "Business & Sur Mesure",
    tagline: "Solution complète pour entreprises multi-départements et ERP complexes.",
    setup: "850 000+",
    monthly: "150 000",
    period: "FCFA / mois",
    features: [
      "Agents IA illimités et multi-départements",
      "Connexion ERP, SAP, HubSpot, Salesforce sur mesure",
      "Dashboard de monitoring avancé en temps réel",
      "SLA garanti & Support dédié (réponse < 4h)",
      "Accompagnement et formation continue des équipes",
      "Sécurité renforcée et hébergement dédié optionnel",
    ],
    ideal: "Grandes entreprises et structures gérant des flux massifs de données et de clients.",
    cta: "Contacter l'équipe experte",
    ctaVariant: "outline",
    popular: false,
    icon: Crown,
    gradient: "from-purple-600 to-pink-600",
    bgGradient: "from-white to-purple-50/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  hover: { y: -8, transition: { duration: 0.3 } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" as const } },
};

export default function Pricing() {
  return (
    <section id="tarifs" className="py-24 md:py-32 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-4 shadow-sm">
            💎 Tarifs transparents & rentables
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Des offres claires,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              conçues pour être rentabilisées en 60 jours
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pas de frais cachés. Un investissement initial de mise en place, puis une maintenance mensuelle pour garantir la performance continue de vos agents.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <motion.article
                key={plan.name}
                variants={cardVariants}
                whileHover="hover"
                className={`relative rounded-3xl p-8 bg-white border transition-all duration-300 ${plan.bgGradient} ${
                  plan.popular 
                    ? "border-2 border-blue-600 shadow-2xl ring-4 ring-blue-500/10 scale-105 md:-translate-y-2" 
                    : "border-gray-200 hover:border-gray-300 shadow-lg"
                }`}
              >
                {plan.popular && (
                  <motion.div
                    variants={badgeVariants}
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${plan.gradient} shadow-md`}
                  >
                    ★ Le plus choisi par les PME
                  </motion.div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 min-h-[40px]">{plan.tagline}</p>

                <div className="mb-6 p-4 rounded-2xl bg-white/80 border border-gray-100 shadow-sm space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Mise en place initiale</div>
                    <div className="text-3xl font-extrabold text-gray-900 mt-0.5">
                      {plan.setup} <span className="text-sm font-normal text-gray-500">FCFA</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Maintenance & Support</div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-bold text-blue-600">{plan.monthly}</span>
                      <span className="text-gray-500 text-xs">{plan.period}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 text-xs text-gray-500 italic bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                  <span className="font-semibold text-gray-700">Idéal pour :</span> {plan.ideal}
                </div>

                <ul className="space-y-3 mb-8" role="list">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check className="w-5 h-5 flex-shrink-0 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    plan.ctaVariant === "primary"
                      ? `bg-gradient-to-r text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${plan.gradient}`
                      : "border-2 border-gray-200 bg-white text-gray-900 hover:border-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.article>
            );
          })}
        </motion.div>

        {/* FAQ or reassurance footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-200"
        >
          <h4 className="font-bold text-gray-900 text-lg mb-2">Besoin d'un audit personnalisé gratuit ?</h4>
          <p className="text-gray-600 text-sm mb-6">
            Chaque entreprise a des processus uniques. Nos ingénieurs analysent gratuitement vos flux pour vous proposer l'architecture agentique la plus rentable.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
          >
            Réserver mon audit gratuit
          </a>
          <p className="text-xs text-gray-400 mt-4">
            Tous les prix s'entendent hors taxes (HT). Paiement sécurisé par virement bancaire, mobile money ou carte bancaire.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
