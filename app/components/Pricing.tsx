"use client";

import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "[Prix à définir]",
    period: "FCFA/mois",
    description: "L'essentiel pour automatiser vos premiers processus et valider le concept.",
    features: [
      "3 workflows actifs",
      "1 000 exécutions/mois",
      "1 agent IA spécialisé",
      "Connecteurs essentiels (Email, Google, API)",
      "Logs & monitoring basique",
      "Support email (réponse sous 48h)",
      "Hébergement NovaFlow Cloud",
    ],
    cta: "Choisir Starter",
    ctaVariant: "outline",
    popular: false,
    gradient: "from-gray-500 to-gray-600",
    bgGradient: "from-gray-50 to-gray-100",
  },
  {
    name: "Pro",
    price: "[Prix à définir]",
    period: "FCFA/mois",
    description: "Pour les équipes qui automatisent leurs processus critiques.",
    features: [
      "Workflows illimités",
      "10 000 exécutions/mois",
      "5 agents IA spécialisés",
      "Analytics avancées & alertes",
      "Intégrations premium incluses",
      "Support email prioritaire (24h)",
      "Rôles & permissions équipe",
      "API & webhooks",
    ],
    cta: "Lancer mon essai Pro",
    ctaVariant: "primary",
    popular: true,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    name: "Business",
    price: "Sur devis",
    period: "",
    description: "Pour les organisations aux exigences de sécurité et d'échelle élevées.",
    features: [
      "Tout le plan Pro",
      "Exécutions illimitées",
      "Agents IA illimités & personnalisés",
      "Déploiement on-premise / cloud privé",
      "SLA 99.9% avec pénalités",
      "Support 24/7 avec téléphone",
      "Account manager dédié",
      "SSO (SAML/OIDC) & audit complet",
      "Formation & onboarding sur site",
      "Contrats & facturation adaptés",
    ],
    cta: "Contacter le commercial",
    ctaVariant: "outline",
    popular: false,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
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
    <section id="tarifs" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Des packs simples,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              adaptés à votre croissance
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des offres pensées pour chaque étape de votre croissance.
            Sans engagement, résiliable à tout moment.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              variants={cardVariants}
              whileHover="hover"
              className={`relative rounded-2xl p-8 bg-white border transition-all duration-300 ${
                plan.popular
                  ? "border-2 shadow-xl ring-4 ring-blue-500/20"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
              } ${plan.bgGradient}`}
            >
              {plan.popular && (
                <motion.div
                  variants={badgeVariants}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${plan.gradient.split(" ")[0].replace("from-", "")}, ${plan.gradient.split(" ")[1].replace("to-", "")})` }}
                >
                  Le plus choisi
                </motion.div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-6" role="list">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 flex-shrink-0 text-green-500 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.ctaVariant === "primary"
                    ? "bg-gradient-to-r text-white hover:shadow-lg hover:-translate-y-0.5"
                    : "border-2 bg-white hover:bg-gray-50"
                }`}
                style={{
                  background: plan.ctaVariant === "primary"
                    ? `linear-gradient(135deg, ${plan.gradient.split(" ")[0].replace("from-", "")}, ${plan.gradient.split(" ")[1].replace("to-", "")})`
                    : undefined,
                  borderColor: plan.ctaVariant === "outline"
                    ? plan.gradient.split(" ")[0].replace("from-", "")
                    : undefined,
                  color: plan.ctaVariant === "outline"
                    ? plan.gradient.split(" ")[0].replace("from-", "")
                    : undefined,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
              </motion.button>

              {plan.popular && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-4 text-center text-xs text-gray-500"
                >
                  <HelpCircle className="w-3.5 h-3.5 inline-block align-middle mr-1" />
                  Facturation annuelle disponible avec 20% de réduction
                </motion.p>
              )}
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Besoin d'un accompagnement sur mesure ?{' '}
            <a href="#contact" className="text-blue-600 hover:underline font-medium">
              Discutons de votre projet
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Chaque offre inclut 14 jours d'essai gratuit · Sans carte bancaire · RGPD by design
          </p>
        </motion.div>
      </div>
    </section>
  );
}