'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  Brain, 
  Workflow, 
  Shield, 
  BarChart3, 
  Users,
  ArrowRight 
} from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Automatisation intelligente',
    description: 'Transformez vos tâches répétitives en workflows autonomes. L\'IA apprend de vos processus et les optimise en continu.',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    icon: Brain,
    title: 'IA décisionnelle',
    description: 'Des agents qui analysent, décident et agissent. Plus de simples chatbots : des systèmes qui pilotent vraiment vos opérations.',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  {
    icon: Workflow,
    title: 'Orchestration multi-agents',
    description: 'Coordonnez plusieurs IA spécialisées qui collaborent sur vos processus complexes, comme une vraie équipe.',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
  },
  {
    icon: Shield,
    title: 'Sécurité & conformité',
    description: 'Données chiffrées, audit trail complet, hébergement souverain. Vos processus restent vôtres, toujours.',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
  },
  {
    icon: BarChart3,
    title: 'Analytics temps réel',
    description: 'Visualisez la performance de chaque workflow. Identifiez les goulots, mesurez le ROI, itérez vite.',
    gradient: 'from-indigo-500 to-blue-500',
    bgGradient: 'from-indigo-50 to-blue-50',
  },
  {
    icon: Users,
    title: 'Collaboration homme-IA',
    description: 'L\'IA propose, l\'humain valide. Interface unifiée pour superviser, corriger et améliorer vos automatisations.',
    gradient: 'from-teal-500 to-cyan-500',
    bgGradient: 'from-teal-50 to-cyan-50',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const }
  },
  hover: { 
    y: -8, 
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' as const }
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  },
};

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une suite complète pour faire passer vos opérations du manuel à l\'autonome,
            sans complexité technique.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={cardVariants}
                whileHover="hover"
                className={`group relative p-8 rounded-2xl border bg-gradient-to-br ${service.bgGradient} border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${service.gradient.split(' ')[0].replace('from-', '')}15, ${service.gradient.split(' ')[1].replace('to-', '')}15)` }}
                />
                
                <motion.div
                  className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `linear-gradient(135deg, ${service.gradient.split(' ')[0].replace('from-', '')}, ${service.gradient.split(' ')[1].replace('to-', '')})` }}
                  variants={iconVariants}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </motion.div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 relative z-10">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                  {service.description}
                </p>

                <motion.button
                  className="relative z-10 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: service.gradient.split(' ')[0].replace('from-', '') }}
                  whileHover={{ x: 4 }}
                >
                  En savoir plus
                  <ArrowRight size={16} />
                </motion.button>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}