"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionDecoration from "./SectionDecoration";
import { Mail, MapPin, Phone, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "konemoh203@gmail.com",
    href: "mailto:konemoh203@gmail.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+225 07 12 86 74 83",
    href: "tel:+2250712867483",
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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

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
            {submitted ? (
              <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                <h4 className="text-lg font-bold text-green-900">Message envoyé avec succès !</h4>
                <p className="text-green-700 text-sm">
                  Merci {formData.name}. Notre équipe technique vous contactera sous 24h à l'adresse {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ company: "", name: "", email: "", message: "" });
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">Entreprise</label>
                  <input
                    id="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900"
                    placeholder="Grafitec Industries"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900"
                      placeholder="Marie Kouassi"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email pro</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900"
                      placeholder="marie@grafitec.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Votre besoin</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none text-gray-900"
                    placeholder="Décrivez brièvement votre processus actuel et votre objectif d'automatisation..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 w-full md:w-auto justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? "Envoi en cours..." : "Lancer mon projet"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}
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
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 bg-gradient-to-br ${method.color}`}
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
              <a href="tel:+2250712867483" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors">
                Réserver un appel
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
