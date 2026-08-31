'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Heart, 
  Lightbulb, 
  Shield, 
  Globe,
  Award,
  BookOpen,
  Coffee,
  Code,
} from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'L\'humain d\'abord',
    description: 'L\'IA doit amplifier les gens, pas les remplacer. Chaque automatisation libère du temps pour ce qui compte : créativité, relation, stratégie.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Lightbulb,
    title: 'Simplicité radicale',
    description: 'La complexité technique reste invisible. Nos interfaces parlent le langage du métier, pas celui de l\'ingénieur. Zéro code, zéro friction.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Confiance par défaut',
    description: 'Sécurité, conformité, transparence ne sont pas des options. Chiffrement bout en bout, audit trail complet, hébergement souverain.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Impact local, vision globale',
    description: 'Nés en Côte d\'Ivoire, bâtis pour l\'Afrique et le monde. Nos solutions s\'adaptent aux réalités terrain : connexion faible, multilinguisme, réglementations locales.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Target,
    title: 'Résultats mesurables',
    description: 'Pas de vanity metrics. Temps gagné, erreurs évitées, ROI prouvé. Chaque workflow a son dashboard, chaque client son success manager.',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Award,
    title: 'Excellence continue',
    description: 'Nous itérons vite, apprenons de chaque déploiement, partageons les apprentissages. La version d\'aujourd\'hui est déjà dépassée demain.',
    color: 'from-indigo-500 to-blue-500',
  },
];

const team = [
  {
    name: 'Kouamé N\'Guessan',
    role: 'CEO & Co-fondateur',
    bio: 'Ex-ingénieur systèmes bancaires (Ecobank, BICICI). 12 ans d\'expérience en transformation digitale en Afrique de l\'Ouest. Passionné par l\'IA au service de l\'opérationnel.',
    avatar: 'KN',
    gradient: 'from-blue-500 to-cyan-500',
    linkedin: '#',
  },
  {
    name: 'Aïcha Konaté',
    role: 'CTO & Co-fondatrice',
    bio: 'PhD IA (INP-HB Yamoussoukro). Chercheuse en apprentissage par renforcement appliqué aux processus métier. Auteur de 3 papiers à NeurIPS/ICML.',
    avatar: 'AK',
    gradient: 'from-purple-500 to-pink-500',
    linkedin: '#',
  },
  {
    name: 'Yannick Kouadio',
    role: 'VP Engineering',
    bio: 'Ex-tech lead Jumia, Wave. Architecte systèmes distribués haute dispo. Contributeur open-source (Kubernetes, Rust). Expert déploiement edge/on-prem.',
    avatar: 'YK',
    gradient: 'from-green-500 to-emerald-500',
    linkedin: '#',
  },
  {
    name: 'Fatoumata Sanogo',
    role: 'Head of Customer Success',
    bio: 'Ex-directrice opérations CFAO, Bolloré. 15 ans terrain dans l\'industriel et la logistique. Spécialiste conduite du changement & adoption utilisateur.',
    avatar: 'FS',
    gradient: 'from-orange-500 to-red-500',
    linkedin: '#',
  },
];

const milestones = [
  { year: '2023', title: 'Naissance du projet', desc: 'Recherche R&D sur l\'automatisation cognitive à Abidjan. Premiers POCs avec 3 clients pilotes.' },
  { year: '2024', title: 'Lancement bêta', desc: 'Version fermée avec 12 entreprises. 50+ workflows en production. 94% satisfaction client.' },
  { year: '2025', title: 'Levée Seed & Scale', desc: '2.5M€ levés (Investisseurs Afriques + EU). Équipe 15 personnes. Bureaux Abidjan + Paris.' },
  { year: '2026', title: 'NovaFlow AI v1.0', desc: 'Lancement public. 100+ clients. Objectif : 1M workflows automatisés d\'ici 2027.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  hover: { y: -6, transition: { duration: 0.3 } },
};

export default function About() {
  return (
    <section id="a-propos" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            À propos de NovaFlow AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous sommes une équipe d\'ingénieurs, de chercheurs et d\'opérationnels convaincus que
            l\'automatisation intelligente doit être accessible à toutes les entreprises africaines
            et internationales, sans complexité technique.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          className="mb-20 rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #db2777 100%)' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Notre mission
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Rendre l\'automatisation intelligente<br />
            <span className="text-yellow-300">accessible, fiable, humaine</span>
          </h3>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Chaque entreprise mérite de se concentrer sur sa valeur unique, pas sur les tâches répétitives.
            NovaFlow AI donne le pouvoir de l\'IA aux métiers, sans barrière technique.
          </p>
          <motion.div className="flex flex-wrap items-center justify-center gap-8 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm">Workflows en prod</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">12</div>
              <div className="text-sm">Clients bêta</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">94%</div>
              <div className="text-sm">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">2.5M€</div>
              <div className="text-sm">Levés (Seed)</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Nos valeurs, notre boussole
          </h3>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.article
                  key={value.title}
                  variants={cardVariants}
                  whileHover="hover"
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                    style={{ background: `linear-gradient(135deg, ${value.color.split(' ')[0].replace('from-', '')}, ${value.color.split(' ')[2].replace('to-', '')})` }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            L\'équipe fondatrice
          </h3>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {team.map((member, index) => (
              <motion.article
                key={member.name}
                variants={cardVariants}
                whileHover="hover"
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                  style={{ background: `linear-gradient(135deg, ${member.gradient.split(' ')[0].replace('from-', '')}, ${member.gradient.split(' ')[2].replace('to-', '')})` }}
                >
                  {member.avatar}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-blue-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <a href={member.linkedin} className="text-blue-600 hover:underline text-sm font-medium">
                  LinkedIn →
                </a>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Notre parcours
          </h3>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-0 top-2 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-lg z-10"
                    style={{ background: `linear-gradient(135deg, #3b82f6, #a855f7)` }}
                  >
                    {milestone.year}
                  </div>
                  <div className="p-5 md:p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                    <h4 className="font-bold text-gray-900 mb-1">{milestone.title}</h4>
                    <p className="text-gray-600">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg">
            Rejoindre l\'aventure
            <Code className="w-5 h-5" />
          </div>
          <p className="mt-4 text-gray-500">
            Nous recrutons : ingénieurs IA, dev full-stack, customer success, sales.
            <a href="#contact" className="text-blue-600 hover:underline ml-2">Voir les postes →</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}