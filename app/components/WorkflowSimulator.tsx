'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, FileText, Cpu, CheckCircle2, ArrowRight, Play, RefreshCw } from 'lucide-react';

const sources = [
  { id: 'email', name: 'Email Fournisseur (PDF/Facture)', icon: Mail, color: 'from-blue-500 to-cyan-500' },
  { id: 'whatsapp', name: 'WhatsApp Business (Commande client)', icon: MessageSquare, color: 'from-green-500 to-emerald-500' },
];

const actions = [
  { id: 'extract', name: 'Extraction & Structuration par IA', icon: Cpu },
  { id: 'crm', name: 'Mise à jour CRM & Stock', icon: FileText },
  { id: 'reply', name: 'Génération de réponse & Devis PDF', icon: CheckCircle2 },
];

export default function WorkflowSimulator() {
  const [selectedSource, setSelectedSource] = useState(sources[0]);
  const [selectedAction, setSelectedAction] = useState(actions[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setStep(1);

    setTimeout(() => setStep(2), 1200);
    setTimeout(() => setStep(3), 2400);
    setTimeout(() => {
      setStep(4);
      setIsRunning(false);
    }, 3600);
  };

  const resetSimulation = () => {
    setStep(0);
    setIsRunning(false);
  };

  return (
    <section id="simulateur" className="py-24 md:py-32 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-50 text-purple-700 mb-4">
            Démonstration interactive
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Testez un agent IA en action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sélectionnez une source de données et visualisez comment NovaFlow AI orchestre l'automatisation de bout en bout en quelques secondes.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Step 1: Source */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                Source de données
              </h3>
              <div className="space-y-3">
                {sources.map((s) => {
                  const Icon = s.icon;
                  const isSelected = selectedSource.id === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedSource(s); resetSimulation(); }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                        isSelected ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Action */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">2</span>
                Traitement IA
              </h3>
              <div className="space-y-3">
                {actions.map((a, idx) => {
                  const Icon = a.icon;
                  const isSelected = selectedAction.id === a.id;
                  return (
                    <button
                      key={a.id}
                      onClick={() => { setSelectedAction(a); resetSimulation(); }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                        isSelected ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-500/20 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">{a.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Run / Output preview */}
            <div className="space-y-4 flex flex-col justify-between bg-slate-900 rounded-2xl p-6 text-white">
              <div>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-cyan-400">
                  <Cpu className="w-5 h-5" />
                  Console Agent IA
                </h3>
                <p className="text-slate-400 text-xs mb-4">
                  Cliquez sur Lancer pour simuler l'exécution du workflow en temps réel.
                </p>

                <div className="space-y-2 text-xs font-mono bg-slate-950 p-4 rounded-xl min-h-[140px] border border-slate-800">
                  <div className="text-slate-500">// Prêt à exécuter</div>
                  {step >= 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-400">→ [1] Réception flux depuis {selectedSource.name}...</motion.div>}
                  {step >= 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-purple-400">→ [2] Analyse LLM & extraction des entités clés...</motion.div>}
                  {step >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400">→ [3] Exécution {selectedAction.name} réussie.</motion.div>}
                  {step >= 4 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-300 font-bold">✓ Workflow exécuté en 0.42s. Zéro erreur.</motion.div>}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
                  {isRunning ? 'Exécution...' : 'Lancer le test'}
                </button>
                {step > 0 && (
                  <button
                    onClick={resetSimulation}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
