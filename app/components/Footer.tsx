export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <a href="/" className="text-white font-extrabold text-xl tracking-tight mb-4 inline-block">
            NovaFlow AI
          </a>
          <p className="text-sm leading-relaxed text-gray-400">
            Automatisez vos processus métier avec des agents IA intelligents. Zéro code, déploiement rapide, ROI mesurable.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#comment-ca-marche" className="hover:text-white transition-colors">Comment ça marche</a></li>
            <li><a href="#tarifs" className="hover:text-white transition-colors">Offres &amp; Tarifs</a></li>
            <li><a href="#a-propos" className="hover:text-white transition-colors">À propos</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Légal &amp; Sécurité</h4>
          <ul className="space-y-2.5 text-sm">
            <li><span className="text-gray-500 cursor-not-allowed">Mentions légales</span></li>
            <li><span className="text-gray-500 cursor-not-allowed">Politique de confidentialité</span></li>
            <li><span className="text-gray-500 cursor-not-allowed">Conformité RGPD</span></li>
            <li><span className="text-gray-500 cursor-not-allowed">Sécurité des données</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact direct</h4>
          <p className="text-sm text-gray-400 mb-2">Abidjan, Côte d'Ivoire</p>
          <p className="text-sm text-gray-400 mb-4">hello@novaflow-ai.com</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            Prendre rendez-vous
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} NovaFlow AI. Tous droits réservés. Bâti pour l'Afrique et le monde.</p>
      </div>
    </footer>
  );
}
