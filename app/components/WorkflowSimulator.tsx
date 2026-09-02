'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, MessageSquare, FileText, Cpu, CheckCircle2, ArrowRight, 
  Play, RefreshCw, Bell, Sparkles, Clock, ShieldCheck, Send, 
  Zap, AlertCircle, Inbox, Bot, User, Check 
} from 'lucide-react';

// Email simulation scenarios
const emailScenarios = [
  {
    id: 'devis',
    title: 'Demande urgente de devis (50 postes)',
    sender: 'Mathieu B. (Directeur Achats, Grafitec SA)',
    email: 'mathieu.b@grafitec-ci.com',
    subject: 'Urgent : Devis équipement 50 postes bureautique',
    body: 'Bonjour, suite à notre expansion, nous avons besoin de 50 licences et équipements configurés pour nos nouveaux bureaux à Abidjan. Pouvez-vous nous envoyer un devis chiffré avant demain 18h ?',
    amountEst: '2 400 000 FCFA',
    urgency: 'HAUTE (Prioritaire)',
    extractedIntent: 'Demande commerciale B2B hautement qualifiée',
    crmStatus: 'Prospect Chaud - Assigné à l\'équipe Commerciale',
    draftReply: 'Bonjour M. B., Nous avons bien reçu votre demande pour 50 postes. Notre système a généré le devis estimatif #DV-2026-891 (2.4M FCFA). Un conseiller vous contacte en priorité ce matin.'
  },
  {
    id: 'support',
    title: 'Litige facture & Demande avoir',
    sender: 'Sarah L. (Comptabilité, Delta Logistique)',
    email: 'sarah.l@delta-log.com',
    subject: 'Question facture #FAC-2026-302 - Erreur TVA',
    body: 'Bonjour, nous constatons une anomalie sur le taux de TVA appliqué sur la facture 302 du mois dernier. Pourriez-vous rectifier et émettre l\'avoir correspondant rapidement ?',
    amountEst: '185 000 FCFA',
    urgency: 'MOYENNE',
    extractedIntent: 'Support client / Demande de rectification comptable',
    crmStatus: 'Ticket support #SUP-441 ouvert - Assigné au pôle Finance',
    draftReply: 'Bonjour Sarah, Nous avons analysé la facture #302. L\'erreur de TVA a été identifiée. L\'avoir de 185 000 FCFA a été généré et validé automatiquement par notre agent financier.'
  }
];

// Chatbot demo questions
const demoQuestions = [
  {
    q: "Quel est le délai moyen pour intégrer un agent IA ?",
    a: "L'intégration d'un agent IA sur mesure prend en moyenne entre 5 et 10 jours ouvrés, incluant l'audit des flux, la connexion aux outils (CRM, email, WhatsApp) et les tests de robustesse."
  },
  {
    q: "Combien coûte l'automatisation d'un processus ?",
    a: "Nos offres de mise en place démarrent à partir de 150 000 FCFA pour un pack Starter, avec une maintenance mensuelle adaptée à votre volume de données. Le ROI est généralement atteint en moins de 2 mois."
  },
  {
    q: "Puis-je connecter NovaFlow AI à notre ERP ou CRM existant ?",
    a: "Oui, absolument ! NovaFlow AI se connecte via API, webhooks ou connecteurs sécurisés à la quasi-totalité des outils du marché (Salesforce, HubSpot, SAP, Odoo, Google Sheets, WhatsApp Business, etc.)."
  },
  {
    q: "Comment sont sécurisées nos données d'entreprise ?",
    a: "Toutes les données sont chiffrées de bout en bout (SSL/TLS, hébergement sécurisé conforme RGPD et réglementations locales). Les modèles IA utilisés respectent la stricte confidentialité de vos documents internes."
  }
];

export default function WorkflowSimulator() {
  const [activeTab, setActiveTab] = useState<'email' | 'chatbot'>('email');

  // Email simulation states
  const [selectedScenario, setSelectedScenario] = useState(emailScenarios[0]);
  const [isSimulatingEmail, setIsSimulatingEmail] = useState(false);
  const [emailStep, setEmailStep] = useState(0);

  // Chatbot sandbox states
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string; meta?: string }>>([
    {
      sender: 'bot',
      text: 'Bonjour ! Je suis l\'assistant virtuel de NovaFlow AI. Posez-moi une question ou choisissez un sujet ci-dessous pour tester mes capacités en direct.',
      time: '10:00',
      meta: 'Base NovaFlow v2.4 — Prêt'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const runEmailSimulation = () => {
    if (isSimulatingEmail) return;
    setIsSimulatingEmail(true);
    setEmailStep(1); // Email received

    setTimeout(() => setEmailStep(2), 1200); // AI Extraction
    setTimeout(() => setEmailStep(3), 2500); // CRM & Draft reply
    setTimeout(() => {
      setEmailStep(4); // Alert / Final notification
      setIsSimulatingEmail(false);
    }, 3800);
  };

  const resetEmailSimulation = () => {
    setEmailStep(0);
    setIsSimulatingEmail(false);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim() || isTyping) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'user', text, time: userTime }]);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      // Find matching demo question or generate smart response
      const matched = demoQuestions.find(dq => dq.q.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(dq.q.split(' ')[0].toLowerCase()));
      const botReply = matched 
        ? matched.a 
        : `C'est une excellente question concernant "${text}". Nos agents IA analysent vos flux en temps réel pour y répondre avec une précision de 99.4%. Souhaitez-vous planifier un audit personnalisé avec notre équipe technique ?`;

      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: botReply, 
        time: botTime, 
        meta: 'Confiance: 99.4% • Source: KB NovaFlow AI' 
      }]);
      setIsTyping(false);
    }, 900);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  return (
    <section id="simulateur" className="py-24 md:py-32 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-50 text-purple-700 mb-4 shadow-sm">
            ✨ Démonstration interactive en direct
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Testez nos agents IA par vous-même
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simulez l'interception automatique d'un email client en temps réel ou discutez avec notre mini-assistant de test.
          </p>

          {/* Mode Tabs */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('email')}
              className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'email'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Inbox className="w-4 h-4" />
              1. Workflow Email & Alerte Temps Réel
            </button>
            <button
              onClick={() => setActiveTab('chatbot')}
              className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'chatbot'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Bot className="w-4 h-4" />
              2. Sandbox Chatbot Interactif
            </button>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {activeTab === 'email' ? (
            /* TAB 1: EMAIL & REAL-TIME ALERT WORKFLOW SIMULATION */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
                {/* Left: Scenario Selector */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                    Choisir un cas client entrant
                  </h3>
                  <div className="space-y-3">
                    {emailScenarios.map((scen) => {
                      const isSelected = selectedScenario.id === scen.id;
                      return (
                        <button
                          key={scen.id}
                          onClick={() => { setSelectedScenario(scen); resetEmailSimulation(); }}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                            isSelected ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{scen.title}</div>
                            <div className="text-xs text-gray-500 mt-0.5">De : {scen.sender}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Trigger Button */}
                  <div className="pt-4">
                    <button
                      onClick={runEmailSimulation}
                      disabled={isSimulatingEmail}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSimulatingEmail ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-white" />}
                      {isSimulatingEmail ? 'Traitement IA en cours...' : '📨 Simuler l\'arrivée et le traitement de l\'email'}
                    </button>
                  </div>
                </div>

                {/* Right: Real-time Email Preview & Content */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-4 shadow-inner border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block animate-pulse"></span>
                      <span className="text-xs font-mono text-slate-400">Flux entrant (Boîte connectée)</span>
                    </div>
                    <span className="text-xs font-mono bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full">
                      {selectedScenario.urgency}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Objet</div>
                    <div className="font-semibold text-sm text-white">{selectedScenario.subject}</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Message client</div>
                    <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 italic leading-relaxed">
                      "{selectedScenario.body}"
                    </p>
                  </div>

                  {/* Simulated Email Status Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400">Montant estimé</div>
                      <div className="text-sm font-bold text-cyan-400">{selectedScenario.amountEst}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400">Intention détectée</div>
                      <div className="text-xs font-medium text-purple-300 truncate">{selectedScenario.extractedIntent}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Console Output for Email Workflow Steps */}
              <div className="bg-slate-950 rounded-2xl p-6 text-white font-mono text-xs border border-slate-800">
                <div className="flex items-center justify-between mb-3 text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-2 text-cyan-400">
                    <Cpu className="w-4 h-4" />
                    Console Agent NovaFlow AI (Temps réel)
                  </span>
                  <span>{emailStep === 4 ? '✓ Succès complet (0.84s)' : emailStep > 0 ? 'En cours...' : 'En attente de déclenchement'}</span>
                </div>

                <div className="space-y-2 min-h-[90px]">
                  <div className="text-slate-600">// Cliquez sur "Simuler l'arrivée..." pour observer l'agent en action</div>
                  {emailStep >= 1 && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-blue-400">
                      → [0.00s] Webhook détecté : Nouvel email de <span className="text-white">{selectedScenario.sender}</span>
                    </motion.div>
                  )}
                  {emailStep >= 2 && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-purple-400">
                      → [0.24s] Analyse LLM & Extraction d'entités (Montant: {selectedScenario.amountEst}, Urgence: {selectedScenario.urgency})
                    </motion.div>
                  )}
                  {emailStep >= 3 && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-cyan-300">
                      → [0.51s] Synchronisation CRM : {selectedScenario.crmStatus}
                    </motion.div>
                  )}
                  {emailStep >= 4 && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-emerald-400 font-bold bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/50 mt-2">
                      ✓ [0.84s] ALERTE DÉCLENCHÉE : Notification Slack/WhatsApp envoyée à l'équipe commerciale + Brouillon de réponse validé !
                    </motion.div>
                  )}
                </div>

                {/* Draft Reply Preview when step >= 4 */}
                <AnimatePresence>
                  {emailStep >= 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 pt-4 border-t border-slate-800 text-slate-300"
                    >
                      <div className="text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Brouillon de réponse généré automatiquement par l'IA :
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl text-slate-200 italic border border-slate-800 text-xs">
                        "{selectedScenario.draftReply}"
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* TAB 2: SANDBOX CHATBOT INTERACTIF */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 md:p-8 overflow-hidden"
            >
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Assistant NovaFlow AI (Sandbox Démo)</h3>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      En ligne • Prêt à répondre
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setChatMessages([{ sender: 'bot', text: 'Conversation réinitialisée. Posez votre question !', time: '10:00', meta: 'Prêt' }])}
                  className="text-xs text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg bg-gray-100 transition"
                >
                  Réinitialiser
                </button>
              </div>

              {/* Quick Prompt Chips */}
              <div className="mb-6">
                <div className="text-xs font-medium text-gray-500 mb-2">Questions fréquentes suggérées :</div>
                <div className="flex flex-wrap gap-2">
                  {demoQuestions.map((dq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(dq.q)}
                      className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium px-3.5 py-2 rounded-xl transition-all border border-purple-200 flex items-center gap-1.5 text-left"
                    >
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-purple-600" />
                      {dq.q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Log Window */}
              <div className="bg-gray-50 rounded-2xl p-4 md:p-6 h-[320px] overflow-y-auto space-y-4 border border-gray-200 mb-4 shadow-inner">
                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 text-xs font-bold ${
                      msg.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-sm'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                    }`}>
                      <p className="leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center justify-between gap-4 mt-2 text-[10px] ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                        <span>{msg.time}</span>
                        {msg.meta && <span className="font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{msg.meta}</span>}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 text-sm text-gray-500 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      <span className="text-xs ml-1 font-medium text-gray-400">NovaFlow AI analyse la base...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Posez votre question sur l'automatisation ou les agents..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none text-sm text-gray-900"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isTyping}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  Envoyer
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
