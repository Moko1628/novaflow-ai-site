import Link from "next/link";

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
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Pages & Solutions</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/agents" className="hover:text-white transition-colors">Catalogue Agents</a></li>
            <li><a href="/solutions" className="hover:text-white transition-colors">Solutions par Secteur</a></li>
            <li><a href="/simulateur" className="hover:text-white transition-colors">Simulateur &amp; Sandbox</a></li>
            <li><a href="/tarifs" className="hover:text-white transition-colors">Offres &amp; Tarifs</a></li>
            <li><a href="/roi" className="hover:text-white transition-colors">Calculateur de ROI</a></li>
            <li><a href="/cas-clients" className="hover:text-white transition-colors">Cas Clients</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">Le Mag / Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Entreprise &amp; Légal</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/a-propos" className="hover:text-white transition-colors">À propos</a></li>
            <li><a href="/audit" className="hover:text-white transition-colors">Audit Gratuit</a></li>
            <li><a href="/espace-client" className="hover:text-white transition-colors">Espace Client</a></li>
            <li><a href="/faq" className="hover:text-white transition-colors">FAQ &amp; Support</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="/legal/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</a></li>
            <li><a href="/legal/confidentialite" className="hover:text-white transition-colors">Confidentialité &amp; RGPD</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact direct</h4>
          <p className="text-sm text-gray-400 mb-2">Abidjan, Côte d'Ivoire</p>
          <p className="text-sm text-gray-400 mb-4">konemoh203@gmail.com</p>
          <a
            href="/contact"
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
