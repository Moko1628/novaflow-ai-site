'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign, 
  Shield,
  Zap,
  ArrowRight,
  Star,
  MessageSquare,
} from 'lucide-react';

const stats = [
  { icon: TrendingUp, value: '87%', label: 'Réduction temps traitement', color: 'text-green-600', bgColor: 'bg-green-50' },
  { icon: Clock, value: '12h', label: 'Économisées / semaine', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { icon: DollarSign, value: '3.2x', label: 'ROI à 6 mois', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { icon: Shield, value: '0', label: 'Erreurs critiques', color: 'text-orange-600', bgColor: 'bg-orange-50' },
];

const testimonials = [
  {
    quote: '"NovaFlow AI a transformé notre gestion de factures fournisseurs. Ce qui prenait 3 jours se fait maintenant en 4 heures, sans erreur. L\'équipe a récupéré du temps pour de la vraie valeur ajoutée."',
    author: 'Marie Kouassi',
    role: 'Directrice Financière',
    company: 'Grafitec Industries',
    avatar: 'MK',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    quote: '"L\'onboarding a pris 2 semaines, pas 6 mois. Les agents IA ont appris nos règles métier en observant nos experts. C\'est la première fois qu\'une solution s\'adapte à nous, pas l\'inverse."',
    author: 'Jean-Marc Diallo',
    role: 'Responsable Opérations',
    company: 'Grafitec Industries',
    avatar: 'JD',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    quote: '"La visibilité temps réel sur nos flux nous a permis de détecter 3 goulets d\'étranglement invisibles avant. On pilote maintenant au lieu de subir."',
    author: 'Fatou Traoré',
    role: 'CEO',
    company: 'Grafitec Industries',
    avatar: 'FT',
    gradient: 'from-green-500 to-emerald-500',
  },
];

const benefits = [
  { icon: Zap, title: 'Déploiement express', desc: 'Production en 2 semaines vs 6-12 mois pour les solutions traditionnelles.' },
  { icon: Users, title: 'Adoption naturelle', desc: 'Interface familière, pas de formation lourde. Les équipes sont autonomes dès le jour 1.' },
  { icon: MessageSquare, title: 'Itération continue', desc: 'Les agents s\'améliorent en production. Vos retours = leurs mises à jour automatiques.' },
  { icon: ArrowRight, title: 'Évolutif sans limite', desc: 'De 10 à 100 000 exécutions/mois sans changer d\'architecture ni d\'équipe.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  hover: { y: -4, transition: { duration: 0.2 } },
};

export default function SocialProof() {
  return (
    <section id="preuve-sociale" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-4">
            Cas client : Grafitec Industries
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comment Grafitec a automatisé<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              87% de sa comptabilité fournisseurs
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leader de l\'imprimerie industrielle en Côte d\'Ivoire, Grafitec traite 50 000+ factures/an.
            Voici comment NovaFlow AI a changé la donne.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className={`p-6 rounded-2xl border ${stat.bgColor} border-gray-100`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.color} bg-white/50`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Ce qu\'en disent leurs équipes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.author}
                variants={cardVariants}
                whileHover="hover"
                className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${testimonial.gradient.split(' ')[0].replace('from-', '')}, ${testimonial.gradient.split(' ')[2].replace('to-', '')})` }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.author}</div>
                    <div className="text-xs text-gray-500">{testimonial.role} · {testimonial.company}</div>
                  </div>
                </div>
                <blockquote className="text-gray-700 leading-relaxed italic">
                  {testimonial.quote}
                </blockquote>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Pourquoi NovaFlow AI fait la différence
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={cardVariants}
                  whileHover="hover"
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
            Voir l'étude de cas complète
            <ArrowRight size={18} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}