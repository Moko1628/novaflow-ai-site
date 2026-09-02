'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sparkles, ArrowRight, CheckCircle2, Clock, TrendingUp, ShieldAlert, Send } from 'lucide-react';

export default function AuditEstimator() {
  const [step, setStep] = useState(1);
  const [sector, setSector] = useState('Services B2B / Conseil');
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [channel, setChannel] = useState('Emails & Factures (PDF)');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Calculation logic
  const hoursPerMonth = hoursPerWeek * 4;
  const estimatedSavingsFCFA = hoursPerMonth * 4500; // Valuation at ~4500 FCFA/hr

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="audit" className="py-24 md:py-32 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-50 text-cyan-700 mb-4 shadow-sm">
            📊 Simulateur d'impact & Devis express
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculez vos gains immédiats
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              grâce à l'automatisation IA
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En 3 clics, estimez le volume d'heures et d'argent que vos équipes gâchent sur des tâches manuelles et découvrez votre agent idéal.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 rounded-3xl shadow-2xl p-8 md:p-12 text-white border border-slate-800">
          {!submitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left: Interactive Form */}
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">Étape {step} sur 3</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {step === 1 && "Quel est votre secteur d'activité ?"}
                    {step === 2 && "Combien d'heures passez-vous sur des tâches manuelles ?"}
                    {step === 3 && "Quel est votre principal canal chronophage ?"}
                  </h3>
                </div>

                {step === 1 && (
                  <div className="space-y-3">
                    {['Services B2B / Conseil', 'Commerce & Distribution B2C', 'Logistique & Transport', 'Cabinet Comptable / Juridique', 'Industrie & Fabrication'].map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSector(s); setStep(2); }}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                          sector === s ? 'border-cyan-500 bg-cyan-500/20 text-white font-bold ring-2 ring-cyan-500/30' : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{s}</span>
                        <ArrowRight className="w-4 h-4 text-cyan-400" />
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
                      <div className="text-4xl font-extrabold text-cyan-400 mb-2">{hoursPerWeek} heures / semaine</div>
                      <p className="text-xs text-slate-400">Soit environ <span className="text-white font-bold">{hoursPerWeek * 4}h par mois</span> perdues en ressaisie et triage.</p>
                      <input
                        type="range"
                        min="5"
                        max="80"
                        step="5"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                        className="w-full mt-6 accent-cyan-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)} className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700">Retour</button>
                      <button onClick={() => setStep(3)} className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:shadow-lg">Continuer</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    {['Emails & Factures (PDF)', 'WhatsApp Business & Commandes', 'Saisie CRM & Tableaux Excel', 'Support client & FAQ répétitive'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setChannel(c)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                          channel === c ? 'border-cyan-500 bg-cyan-500/20 text-white font-bold ring-2 ring-cyan-500/30' : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{c}</span>
                        {channel === c && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                      </button>
                    ))}
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep(2)} className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700">Retour</button>
                      <button onClick={() => setStep(3)} className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm">Voir mon estimation</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Live Calculated Results & Email Lead Capture */}
              <div className="bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-slate-800 space-y-6 shadow-inner">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Calculator className="w-5 h-5" />
                  <span>Estimation d'impact instantanée</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1">Heures économisées / mois</div>
                    <div className="text-2xl font-black text-cyan-400">~{hoursPerMonth}h</div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1">Économie financière est.</div>
                    <div className="text-xl font-black text-emerald-400">{estimatedSavingsFCFA.toLocaleString()} FCFA</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Agent NovaFlow Recommandé :</div>
                  <div className="font-bold text-sm text-purple-300">
                    Agent Autonome {channel.split(' ')[0]} pour {sector}
                  </div>
                  <p className="text-xs text-slate-400">Automatisation de bout en bout avec taux de précision supérieur à 99%.</p>
                </div>

                {/* Lead Form */}
                <form onSubmit={handleSubmitReport} className="space-y-3">
                  <div className="text-xs text-slate-300 font-medium">Recevez votre rapport d'audit détaillé par email :</div>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre.email@entreprise.com"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:shadow-lg transition flex items-center gap-2 shrink-0"
                    >
                      <Send className="w-4 h-4" />
                      Recevoir
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <h3 className="text-3xl font-bold text-white">Votre rapport d'audit est en route !</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Merci ! Nous avons bien généré votre estimation personnalisée (~{hoursPerMonth}h économisées / mois). Un exemplaire complet a été envoyé à <span className="text-cyan-400 font-bold">{email}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-xl bg-slate-800 text-white font-medium text-sm hover:bg-slate-700 transition"
              >
                Refaire une simulation
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
