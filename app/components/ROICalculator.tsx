'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Clock, TrendingUp, Zap, ArrowRight } from 'lucide-react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (val: number) => void;
}

function Slider({ label, value, min, max, step, unit, onChange }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-lg font-bold text-blue-400">{value.toLocaleString('fr-FR')} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #3b82f6 ${percent}%, rgba(255,255,255,0.1) ${percent}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min.toLocaleString('fr-FR')} {unit}</span>
        <span>{max.toLocaleString('fr-FR')} {unit}</span>
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [employees, setEmployees] = useState(5);
  const [avgSalary, setAvgSalary] = useState(500000); // FCFA/mois
  const [pack, setPack] = useState<'starter' | 'pro' | 'business'>('pro');

  const packs = {
    starter: { name: 'Starter', setup: 150000, monthly: 15000 },
    pro: { name: 'Pro', setup: 150000, monthly: 75000 },
    business: { name: 'Business', setup: 700000, monthly: 60000 },
  };

  const selectedPack = packs[pack];
  const weeklyHoursSaved = hoursPerWeek * employees * 0.7; // 70% d'automatisation réaliste
  const monthlyHoursSaved = weeklyHoursSaved * 4.33;
  const monthlyMoneySaved = monthlyHoursSaved * (avgSalary / 160); // ~160h/mois travaillées
  const annualMoneySaved = monthlyMoneySaved * 12;
  const annualCost = selectedPack.setup + selectedPack.monthly * 12;
  const netGain = annualMoneySaved - annualCost;
  const roi = annualCost > 0 ? Math.round((annualMoneySaved / annualCost) * 100) : 0;
  const paybackMonths = monthlyMoneySaved > 0 ? Math.ceil(selectedPack.setup / monthlyMoneySaved) : 99;

  return (
    <section id="roi" className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-blue-300 mb-6">
            <Calculator className="w-4 h-4" />
            Simulateur de gain
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Combien pouvez-vous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              économiser ?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Estimez votre retour sur investissement en ajustant les curseurs selon votre situation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Curseurs */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Votre situation</h3>

            <Slider
              label="Heures perdues en tâches répétitives par semaine"
              value={hoursPerWeek}
              min={2}
              max={40}
              step={1}
              unit="h/semaine"
              onChange={setHoursPerWeek}
            />

            <Slider
              label="Nombre d'employés concernés"
              value={employees}
              min={1}
              max={50}
              step={1}
              unit=""
              onChange={setEmployees}
            />

            <Slider
              label="Salaire moyen mensuel brut (FCFA)"
              value={avgSalary}
              min={100000}
              max={3000000}
              step={50000}
              unit="FCFA"
              onChange={setAvgSalary}
            />

            <div className="mt-6">
              <label className="text-sm font-medium text-gray-300 mb-3 block">Pack NovaFlow AI</label>
              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(packs) as Array<'starter' | 'pro' | 'business'>).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPack(p)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      pack === p
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {packs[p].name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Résultats */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* ROI principal */}
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl p-8 border border-blue-500/20 text-center">
              <div className="text-sm text-blue-300 mb-2">Retour sur investissement annuel</div>
              <motion.div
                key={roi}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
              >
                {roi}%
              </motion.div>
              <div className="text-sm text-gray-400 mt-2">
                Gain net : {netGain > 0 ? '+' : ''}{netGain.toLocaleString('fr-FR')} FCFA/an
              </div>
            </div>

            {/* Stats en grille */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <Clock className="w-5 h-5 text-cyan-400 mb-2" />
                <div className="text-xs text-gray-400 mb-1">Heures économisées / mois</div>
                <div className="text-2xl font-bold text-white">{Math.round(monthlyHoursSaved).toLocaleString('fr-FR')}h</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
                <div className="text-xs text-gray-400 mb-1">Économie mensuelle</div>
                <div className="text-2xl font-bold text-white">{Math.round(monthlyMoneySaved).toLocaleString('fr-FR')} <span className="text-sm">FCFA</span></div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <Zap className="w-5 h-5 text-yellow-400 mb-2" />
                <div className="text-xs text-gray-400 mb-1">Investissement annuel</div>
                <div className="text-2xl font-bold text-white">{annualCost.toLocaleString('fr-FR')} <span className="text-sm">FCFA</span></div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <Calculator className="w-5 h-5 text-purple-400 mb-2" />
                <div className="text-xs text-gray-400 mb-1">Temps de retour</div>
                <div className="text-2xl font-bold text-white">{paybackMonths <= 1 ? '< 1' : paybackMonths} <span className="text-sm">mois</span></div>
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Demander un devis personnalisé
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
