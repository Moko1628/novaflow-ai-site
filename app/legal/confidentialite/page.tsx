export default function ConfidentialitePage() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Politique de Confidentialité & RGPD</h1>
      <div className="prose text-gray-700 space-y-4 text-sm leading-relaxed">
        <p>Chez NovaFlow AI, la protection de vos données professionnelles et personnelles est notre priorité absolue.</p>
        <h2 className="text-xl font-bold text-gray-900 pt-4">1. Collecte des données</h2>
        <p>Nous collectons uniquement les informations nécessaires transmises via nos formulaires de contact, d'audit ou de devis (nom, email professionnel, nom d'entreprise et besoins d'automatisation).</p>
        <h2 className="text-xl font-bold text-gray-900 pt-4">2. Utilisation des données</h2>
        <p>Vos données sont strictement utilisées pour vous fournir les rapports d'audit demandés, configurer vos agents IA et assurer le suivi commercial et technique. Aucune revente de données à des tiers.</p>
        <h2 className="text-xl font-bold text-gray-900 pt-4">3. Sécurité</h2>
        <p>Toutes les transmissions de données sont chiffrées en HTTPS/SSL. Les bases de connaissances et documents connectés à nos agents bénéficient d'un cloisonnement et d'un chiffrement stricts.</p>
      </div>
    </div>
  );
}
