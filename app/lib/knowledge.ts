export interface KnowledgeChunk {
  id: string;
  title: string;
  content: string;
  category: 'pricing' | 'services' | 'faq' | 'about' | 'process';
}

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: 'intro',
    title: 'Présentation NovaFlow AI',
    content: "NovaFlow AI est une entreprise d'automatisation et d'intelligence artificielle basée à Abidjan (Côte d'Ivoire), fondée pour l'Afrique et le monde. Notre mission : rendre l'automatisation intelligente accessible, fiable et humaine, sans complexité technique pour les entreprises.",
    category: 'about'
  },
  {
    id: 'pricing-starter',
    title: 'Pack Starter - Tarifs et Détails',
    content: "Pack Starter : Idéal pour les petites entreprises ou startups avec un seul processus à automatiser. Mise en place (setup HT) : 150 000 FCFA. Maintenance mensuelle (HT) : 15 000 FCFA / mois. Délai de mise en place : 1 à 2 semaines. Engagement : 12 mois. Inclus : automatisation simple d'un processus unique, tri automatique des emails entrants, réponses générées par IA aux demandes courantes, support par email (48h).",
    category: 'pricing'
  },
  {
    id: 'pricing-pro',
    title: 'Pack Pro - Tarifs et Détails',
    content: "Pack Pro : Pour les PME avec plusieurs processus à connecter et un volume de demandes régulier. Mise en place (setup HT) : 150 000 FCFA. Maintenance mensuelle (HT) : 75 000 FCFA / mois. Délai de mise en place : 2 à 4 semaines. Engagement : 12 mois. Inclus : automatisation avancée des réponses email, génération automatique de devis, intégration CRM basique (suivi clients), base de connaissances personnalisée (FAQ, tarifs, produits), support email prioritaire (24h).",
    category: 'pricing'
  },
  {
    id: 'pricing-business',
    title: 'Pack Business - Tarifs et Détails',
    content: "Pack Business : Pour les entreprises avec plusieurs départements ou un volume de demandes important. Mise en place (setup HT) : 700 000 FCFA. Maintenance mensuelle (HT) : 60 000 FCFA / mois. Délai de mise en place : 4 à 8 semaines. Engagement : 12 mois. Inclus : automatisation multi-outils et multi-départements, automatisation multi-canal (WhatsApp, Slack, email), tableau de bord de suivi en temps réel, plusieurs agents IA connectés entre eux, support email dédié.",
    category: 'pricing'
  },
  {
    id: 'pricing-terms',
    title: 'Conditions Tarifaires et TVA',
    content: "Tous les prix sont exprimés en FCFA hors taxes (HT). La TVA en vigueur en Côte d'Ivoire (18%) s'applique en supplément sur chaque devis émis. 50% du montant du setup est réglé à la signature, 50% à la livraison. La maintenance mensuelle est facturée en début de mois avec un engagement minimum de 12 mois.",
    category: 'pricing'
  },
  {
    id: 'services-overview',
    title: 'Nos Services d’Automatisation IA',
    content: "NovaFlow AI propose : 1) Automatisation intelligente (tâches répétitives en workflows autonomes), 2) IA décisionnelle (agents qui analysent, décident et agissent), 3) Orchestration multi-agents (IA spécialisées qui collaborent), 4) Sécurité & conformité (données chiffrées, audit trail, hébergement souverain), 5) Analytics temps réel (mesure du ROI, performance), 6) Collaboration homme-IA (l'IA propose, l'humain valide).",
    category: 'services'
  },
  {
    id: 'case-study-grafitec',
    title: 'Étude de cas Grafitec Industries',
    content: "Grafitec Industries, leader de l'imprimerie industrielle en Côte d'Ivoire (50 000+ factures/an), a automatisé 87% de sa comptabilité fournisseurs avec NovaFlow AI. Résultats : 3 jours de traitement réduits à 4 heures, 12h économisées par semaine, ROI 3.2x à 6 mois, onboarding en 2 semaines sans friction.",
    category: 'about'
  },
  {
    id: 'faq-technical',
    title: 'FAQ - Compétences techniques requises',
    content: "Aucune compétence technique n'est requise pour le client. NovaFlow AI s'occupe de toute la configuration technique. La solution fonctionne de manière autonome et vous recevez les résultats dans votre messagerie habituelle.",
    category: 'faq'
  },
  {
    id: 'faq-replacement',
    title: 'FAQ - L’IA remplace-t-elle l’équipe ?',
    content: "Non, l'IA est conçue pour vous faire gagner du temps sur les tâches répétitives (tri, réponses courantes, devis simples). Les demandes complexes ou sensibles sont toujours redirigées vers une personne de votre équipe.",
    category: 'faq'
  },
  {
    id: 'process-steps',
    title: 'Procédure de démarrage',
    content: "1) Contact via le site ou email (hello@novaflow-ai.com), 2) Échange de découverte gratuit de 15 minutes, 3) Proposition d'un devis adapté, 4) Validation et démarrage (délai de 1 à 8 semaines selon le pack), 5) Livraison, formation et support continu.",
    category: 'process'
  }
];

export function searchKnowledge(query: string): string {
  const q = query.toLowerCase();
  const matched = knowledgeBase.filter(chunk => 
    chunk.title.toLowerCase().includes(q) || 
    chunk.content.toLowerCase().includes(q) ||
    chunk.category.toLowerCase().includes(q)
  );

  if (matched.length === 0) {
    // Return general fallback or all summary if no specific keyword match
    return knowledgeBase.map(c => c.content).join('\n\n');
  }

  return matched.map(c => `[${c.title}]: ${c.content}`).join('\n\n');
}
