"use client";

import { useState } from "react";
import { X, ShieldCheck, FileText } from "lucide-react";

export default function LegalModal() {
  const [modalType, setModalType] = useState<"mentions" | "privacy" | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
        <button
          onClick={() => setModalType("mentions")}
          className="hover:text-gray-900 transition-colors"
        >
          Mentions légales
        </button>
        <button
          onClick={() => setModalType("privacy")}
          className="hover:text-gray-900 transition-colors"
        >
          Politique de confidentialité
        </button>
      </div>

      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 shadow-2xl relative">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === "mentions" ? (
              <div className="space-y-6 text-left">
                <div className="flex items-center gap-3 text-blue-600">
                  <FileText className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-gray-900">Mentions Légales</h3>
                </div>
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>
                    <strong>Raison sociale :</strong> NovaFlow AI SARL<br />
                    <strong>Siège social :</strong> Abidjan, Côte d'Ivoire<br />
                    <strong>Contact :</strong> konemoh203@gmail.com | +225 07 12 86 74 83
                  </p>
                  <p>
                    <strong>Directeur de la publication :</strong> L'équipe de direction NovaFlow AI
                  </p>
                  <p>
                    <strong>Hébergement :</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
                  </p>
                  <p>
                    Tous les contenus présents sur ce site (textes, graphismes, logos, agents IA) sont protégés par le droit d'auteur. Toute reproduction non autorisée est interdite.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-left">
                <div className="flex items-center gap-3 text-blue-600">
                  <ShieldCheck className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-gray-900">Politique de Confidentialité</h3>
                </div>
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>
                    NovaFlow AI accorde une importance majeure à la protection de vos données personnelles et professionnelles.
                  </p>
                  <p>
                    <strong>Collecte des données :</strong> Les informations recueillies via nos formulaires de contact et notre assistant IA sont strictement confidentielles et utilisées uniquement dans le cadre de votre projet d'automatisation.
                  </p>
                  <p>
                    <strong>Sécurité :</strong> Vos données ne sont ni vendues, ni partagées à des tiers. Les interactions avec nos agents IA respectent les protocoles de chiffrement les plus stricts.
                  </p>
                  <p>
                    Vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant konemoh203@gmail.com.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
