'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, X, Mail, Lock, ArrowRight, BarChart3, Cpu, Workflow, Settings } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

function LoginModal({ open, onClose }: ModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Simulate auth
      if (email === 'demo@novaflow-ai.com') {
        setSuccess(true);
      } else {
        setError('Identifiants incorrects. Essayez demo@novaflow-ai.com');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition z-10"
              aria-label="Fermer"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <LogIn className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Espace Client NovaFlow</h2>
                <p className="text-gray-500 text-sm mt-2">Connectez-vous pour suivre vos automatisations.</p>
              </div>

              {!success ? (
                <div className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">{error}</div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="demo@novaflow-ai.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleLogin}
                    disabled={loading || !email}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Se connecter
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium text-center">
                    ✓ Connexion réussie ! Bienvenue dans votre espace.
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: BarChart3, title: 'Dashboard Analytics', desc: 'Performance de vos workflows' },
                      { icon: Cpu, title: 'Agents IA', desc: '3 agents actifs — 1 247 exécutions ce mois' },
                      { icon: Workflow, title: 'Workflows', desc: '12 automatisations actives' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4 hover:bg-gray-100 transition cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                            <div className="text-xs text-gray-500">{item.desc}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ClientPortal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 font-semibold text-sm border border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-200"
      >
        <LogIn className="w-4 h-4 text-blue-600" />
        Espace Client
      </button>

      <LoginModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
