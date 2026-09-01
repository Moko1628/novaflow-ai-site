"use client";

import { motion } from "framer-motion";
import SectionDecoration from "./SectionDecoration";
import { Mail, MapPin, Phone, ArrowRight, ExternalLink } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@novaflow-ai.com",
    href: "mailto:hello@novaflow-ai.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+225 07 07 07 07",
    href: "tel:+22507070707",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Abidjan, Côte d'Ivoire",
    href: "https://maps.google.com",
    color: "from-green-500 to-emerald-500",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <SectionDecoration />
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Parlons de votre projet
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              on construit ensemble
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vous avez un processus lent, manuel ou répétitif ? Nos experts transforment votre vision en opération automatisée en quelques semaines.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
            <form className="space-y-5">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">Entreprise</label>
                <input id="company" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="Grafitec Industries" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet</label>
                  <input id="name" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="Marie Kouassi" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email pro</label>
                  <input id="email" type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" placeholder="marie@grafitec.com" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Votre besoin</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none" placeholder="Décrivez brièvement votre processus actuel et votre objectif d'automatisation..." />
              </div>
              <button type="button" className="inline-flex items-center gap-2 w-full md:w-auto justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                Lancer mon projet
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-xl font-bold text-gray-900">Nos coordonnées</h3>
            <div className="space-y-4">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a key={method.label} href={method.href} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 group">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ background: `linear-gradient(135deg, ${method.color.split(" ")[0].replace("from-", "")}, ${method.color.split(" ")[1].replace("to-", "")})` }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{method.label}</div>
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{method.value}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 p-6 rounded-3xl text-center text-white" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #db2777 100%)" }}>
              <h4 className="font-bold text-lg mb-2">Vous préférez un appel ?</h4>
              <p className="text-blue-100 text-sm mb-4">
                Réservez un créneau de 15 minutes avec l'un de nos experts pour un diagnostic rapide et gratuit.
              </p>
              <button type="button" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors">
                Réserver un appel
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
