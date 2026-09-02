import { NextResponse } from 'next/server';
import { searchKnowledge } from '../../lib/knowledge';

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `Tu es l'assistant intelligent de NovaFlow AI, une entreprise d'automatisation et d'IA basée à Abidjan (Côte d'Ivoire).
Tu réponds en français, de façon claire, chaleureuse et professionnelle.
Ton but : aider les visiteurs du site à comprendre les services, tarifs et démarches.

RÈGLES STRICTES :
- Réponds UNIQUEMENT à partir du CONTEXTE fourni ci-dessous.
- Si la question ne concerne pas NovaFlow AI ou si le contexte ne contient pas la réponse, dis poliment que tu peux seulement répondre sur les services/tarifs/démarches de NovaFlow AI.
- Cite les prix en FCFA (mise en place + maintenance mensuelle) quand c'est pertinent.
- Sois concis : 2 à 4 phrases maximum. Format clair, sans markdown excessif.
- N'ajoute JAMAIS de texte hors sujet ni de raisonnement visible.

CONTEXTE CONNAISSANCES NOVAFLOW AI :
{context}

CONVERSATION :
{history}

Assistant :`;

async function callOpenRouter(model: string, prompt: string, userMessage: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://novaflow-ai.com',
        'X-Title': 'NovaFlow AI Assistant',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 400,
        temperature: 0.3,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error('Empty response');

    // Clean reasoning leaks
    const cleaned = content
      .replace(/<thinking>[\s\S]*?<\/thinking>/g, '')
      .replace(/<reasoning>[\s\S]*?<\/reasoning>/g, '')
      .trim();

    // Detect English reasoning leaks
    const leakPatterns = [
      /^okay[,:]? the (user|question)/i,
      /^the user (is )?(asking|wants|needs)/i,
      /^let me (check|look|see|think)/i,
      /^i need to (check|look|find|answer)/i,
    ];
    if (leakPatterns.some((p) => p.test(cleaned)) || !cleaned) {
      throw new Error('Reasoning leak detected');
    }

    return cleaned;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages requis' }, { status: 400 });
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    const query = lastUserMessage?.content ?? '';
    const context = searchKnowledge(query);

    const history = messages
      .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Client' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const prompt = SYSTEM_PROMPT.replace('{context}', context).replace('{history}', history);

    // Try LLM models in order
    const models = [
      'minimax/minimax-m3:free',
      'google/gemma-4-31b-it:free',
    ];

    for (const model of models) {
      try {
        const content = await callOpenRouter(model, prompt, query);
        return NextResponse.json({ content, source: model });
      } catch (err) {
        console.error(`Model ${model} failed:`, err instanceof Error ? err.message : err);
      }
    }

    // Fallback: intelligent knowledge base
    return NextResponse.json({
      content: buildSmartAnswer(query, context),
      source: 'knowledge-base',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      content: "Bonjour ! Je suis l'assistant NovaFlow AI. Posez-moi vos questions sur nos services, tarifs ou démarches.",
      source: 'emergency-fallback',
    });
  }
}

function buildSmartAnswer(query: string, context: string): string {
  const q = query.toLowerCase();
  const ctx = context.toLowerCase();

  // === PACK STARTER détaillé ===
  if ((q.includes('starter') && (q.includes('quoi') || q.includes('droit') || q.includes('inclus') || q.includes('contient') || q.includes('fonctionnalit')))) {
    return "Avec le Pack Starter, vous avez droit à :\n\n" +
      "• Automatisation simple d'un processus unique\n" +
      "• Tri automatique des emails entrants\n" +
      "• Réponses générées par IA aux demandes courantes\n" +
      "• Mise en place et configuration initiale incluses\n" +
      "• Support par email (réponse sous 48h)\n\n" +
      "Tarif : 150 000 FCFA de setup + 15 000 FCFA/mois (engagement 12 mois).\n" +
      "Idéal pour les petites entreprises ou startups avec un seul processus à automatiser.";
  }

  // === PACK PRO détaillé ===
  if ((q.includes('pro') && (q.includes('quoi') || q.includes('droit') || q.includes('inclus') || q.includes('contient') || q.includes('fonctionnalit')))) {
    return "Avec le Pack Pro, vous avez droit à :\n\n" +
      "• Automatisation avancée des réponses email\n" +
      "• Génération automatique de devis\n" +
      "• Intégration CRM basique (suivi des échanges clients)\n" +
      "• Base de connaissances personnalisée (FAQ, tarifs, produits)\n" +
      "• Support email prioritaire (réponse sous 24h)\n\n" +
      "Tarif : 150 000 FCFA de setup + 75 000 FCFA/mois (engagement 12 mois).\n" +
      "Idéal pour les PME avec plusieurs processus à connecter.";
  }

  // === PACK BUSINESS détaillé ===
  if ((q.includes('business') && (q.includes('quoi') || q.includes('droit') || q.includes('inclus') || q.includes('contient') || q.includes('fonctionnalit')))) {
    return "Avec le Pack Business, vous avez droit à :\n\n" +
      "• Tout le contenu du Pack Pro inclus\n" +
      "• Automatisation multi-canal : WhatsApp, Slack, email\n" +
      "• Tableau de bord de suivi en temps réel\n" +
      "• Plusieurs agents IA connectés entre eux\n" +
      "• Support email dédié\n\n" +
      "Tarif : 700 000 FCFA de setup + 60 000 FCFA/mois (engagement 12 mois).\n" +
      "Idéal pour les entreprises avec plusieurs départements ou un volume important.";
  }

  // === Tous les packs ensemble ===
  if ((q.includes('pack') || q.includes('offre') || q.includes('formule')) && (q.includes('compar') || q.includes('différence') || q.includes('quel'))) {
    return "Nos 3 packs :\n\n" +
      "• Starter (150k + 15k/mois) : 1 processus unique, tri emails, réponses IA simples\n" +
      "• Pro (150k + 75k/mois) : + devis auto, CRM, base de connaissances, support prioritaire\n" +
      "• Business (700k + 60k/mois) : + multi-canal WhatsApp/Slack, dashboard temps réel, agents IA multiples\n\n" +
      "Le Pro est notre pack le plus populaire pour les PME.";
  }

  // === Tarifs ===
  if (q.includes('tarif') || q.includes('prix') || q.includes('coût') || q.includes('combien')) {
    return "Nos tarifs officiels (FCFA HT, TVA 18% en supplément) :\n\n" +
      "• Pack Starter : 150 000 FCFA (setup) + 15 000 FCFA/mois\n" +
      "• Pack Pro : 150 000 FCFA (setup) + 75 000 FCFA/mois\n" +
      "• Pack Business : 700 000 FCFA (setup) + 60 000 FCFA/mois\n\n" +
      "Le setup est réglé à 50% à la signature et 50% à la livraison. Engagement 12 mois sur la maintenance.";
  }

  // === Délais ===
  if (q.includes('délai') || q.includes('temps') || q.includes('semaine') || q.includes('rapide') || q.includes('mettre en place')) {
    return "Les délais de mise en place :\n\n" +
      "• Pack Starter : 1 à 2 semaines\n" +
      "• Pack Pro : 2 à 4 semaines\n" +
      "• Pack Business : 4 à 8 semaines\n\n" +
      "Ces délais démarrent à réception des informations de votre côté.";
  }

  // === Services ===
  if (q.includes('service') || q.includes('automatisation') || q.includes('faites') || q.includes('propos')) {
    return "NovaFlow AI automatise vos processus métier :\n\n" +
      "• Tri et réponses IA aux emails entrants\n" +
      "• Génération automatique de devis et factures\n" +
      "• Intégration CRM (suivi clients et prospects)\n" +
      "• Automatisation multi-canal : WhatsApp, Slack, Telegram\n" +
      "• Tableaux de bord et rapports automatisés\n" +
      "• Orchestration de plusieurs agents IA spécialisés.";
  }

  // === Contact ===
  if (q.includes('contact') || q.includes('appel') || q.includes('découverte') || q.includes('rdv') || q.includes('rendez') || q.includes('parler')) {
    return "Contactez-nous :\n\n" +
      "• Email : hello@novaflow-ai.com\n" +
      "• Téléphone : +225 07 07 07 07\n" +
      "• Formulaire sur le site (section Contact)\n" +
      "• Échange de découverte gratuit de 15 minutes\n\n" +
      "Nous répondons sous 48h ouvrées.";
  }

  // === Sécurité ===
  if (q.includes('sécurit') || q.includes('donnée') || q.includes('confidentiel') || q.includes('conform')) {
    return "Sécurité et conformité :\n\n" +
      "• Chiffrement bout en bout de toutes les données\n" +
      "• Audit trail complet de chaque action\n" +
      "• Hébergement souverain\n" +
      "• Aucune donnée partagée avec des tiers";
  }

  // === Salutation ===
  if (q.includes('bonjour') || q.includes('salut') || q.includes('hello') || q.includes('cava') || q.includes('comment')) {
    return "Bonjour ! 😊 Je suis l'assistant virtuel de NovaFlow AI. Je peux vous renseigner sur :\n\n" +
      "• Nos 3 packs (Starter, Pro, Business) et leurs tarifs\n" +
      "• Nos services d'automatisation IA\n" +
      "• Les délais de mise en place\n" +
      "• La marche à suivre pour démarrer\n\n" +
      "Que souhaitez-vous savoir ?";
  }

  // === Générique ===
  return "Merci pour votre question ! Voici ce que je peux vous dire :\n\n" +
    "• Nos 3 packs : Starter (15k/mois), Pro (75k/mois), Business (60k/mois)\n" +
    "• Services : automatisation emails, devis auto, CRM, multi-canal WhatsApp/Slack\n" +
    "• Contact : hello@novaflow-ai.com ou échange gratuit de 15 min\n\n" +
    "N'hésitez pas à préciser votre demande pour une réponse plus détaillée !";
}
