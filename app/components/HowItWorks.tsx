'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  Brain, 
  Workflow, 
  Shield, 
  BarChart3, 
  Users,
  ArrowRight,
  CheckCircle,
  Loader2,
  Sparkles,
  Rocket,
  Settings,
  Eye,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Sparkles,
    title: 'Découverte & Cadrage',
    description: 'Nous identifions vos processus les plus coûteux en temps et à forte valeur ajoutée. Audit gratuit, sans engagement.',
    details: [
      'Atelier 2h avec vos experts métier',
      'Cartographie des flux actuels',
      'Identification des quick wins',
      'Projet pilote défini (2-4 semaines)',
    ],
    visual: 'workflow-audit',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Entraînement des agents IA',
    description: 'Nos agents observent vos experts, apprennent vos règles métier, vos exceptions, votre langage. Aucune programmation requise.',
    details: [
      'Apprentissage par démonstration (shadowing)',
      'Modélisation des règles explicites & implicites',
      'Gestion des cas limites & exceptions',
      'Validation humaine continue (human-in-the-loop)',
    ],
    visual: 'ai-training',
  },
  {
    number: '03',
    icon: Workflow,
    title: 'Construction du workflow',
    description: 'Assemblage visuel du processus : déclencheurs, étapes, décisions, intégrations. Interface no-code, modifiable à chaud.',
    details: [
      'Canvas drag-and-drop intuitif',
      'Connecteurs natifs (ERP, CRM, Email, API)',
      'Logiques conditionnelles & boucles',
      'Tests unitaires & d\'intégration intégrés',
    ],
    visual: 'workflow-builder',
  },
  {
    number: '04',
    icon: Zap,
    title: 'Déploiement & Mise en production',
    description: 'Lancement progressif : ombre (parallèle), puis canari (5%), puis 100%. Rollback instantané si besoin.',
    details: [
      'Mode ombre : IA propose, humain valide',
      'Montée en charge progressive (canary)',
      'Monitoring temps réel & alertes',
      'Basculement production en 1 clic',
    ],
    visual: 'deployment',
  },
  {
    number: '05',
    icon: BarChart3,
    title: 'Pilotage & Amélioration continue',
    description: 'Dashboard unifié pour suivre les performances, détecter les anomalies, faire évoluer les agents. L\'IA s\'améliore seule.',
    details: [
      'KPIs temps réel : volume, temps, erreurs, coûts',
      'Détection d\'anomalies par IA',
      'Suggestions d\'optimisation automatiques',
      'Réentraînement continu (continual learning)',
    ],
    visual: 'monitoring',
  },
];

const benefits = [
  { icon: CheckCircle, title: 'Zéro code', desc: 'Interface visuelle, accessible aux métiers.' },
  { icon: Shield, title: 'Sécurisé by design', desc: 'Chiffrement, audit trail, RBAC, RGPD.' },
  { icon: Rocket, title: 'Time-to-value < 30 jours', desc: 'Premier workflow en production en 2-4 semaines.' },
  { icon: Settings, title: 'Évolutif à l\'infini', desc: 'De 1 à 1000+ workflows sans refonte.' },
  { icon: Users, title: 'Collaboratif', desc: 'Équipes métiers & IT travaillent ensemble.' },
  { icon: Eye, title: 'Observabilité totale', desc: 'Chaque décision tracée, explicable, auditable.' },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-24 md:py-32 bg-gray-50">
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
            Comment ça marche ?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              En 5 étapes, de l\'idée à l\'autonome
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pas de projet IT de 12 mois. Votre premier workflow automatisé est en production
            en moins de 30 jours. Suivez le guide.
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative max-w-4xl mx-auto mb-20">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative mb-20 ${isEven ? 'pr-20 md:pr-32 text-right' : 'pl-20 md:pl-32'}`}
                style={{ width: '50%', marginLeft: isEven ? 'auto' : '0' }}
              >
                {/* Circle on timeline */}
                <motion.div
                  className="absolute top-4 w-4 h-4 rounded-full border-4 border-white z-10 transition-all duration-300"
                  style={{ 
                    left: isEven ? 'calc(50% - 10px)' : 'calc(50% - 10px)',
                    background: `linear-gradient(135deg, #3b82f6, #a855f7)`,
                    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
                  }}
                  whileInView={{ scale: [1, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                >
                </motion.div>

                {/* Card */}
                <motion.div
                  className={`relative p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 ${
                    isEven ? 'mr-4' : 'ml-4'
                  }`}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-blue-600 mb-1">{step.number}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      <ul className="space-y-2 text-sm text-gray-700" role="list">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Les piliers de votre réussite
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
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

          {/* CTA */}
          <motion.div className="text-center">
            <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg">
              Lancer mon premier workflow
              <ArrowRight size={20} />
            </div>
            <p className="mt-4 text-gray-500 text-sm">
              Atelier découverte offert · Pas de carte bancaire · Annulable à tout moment
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}