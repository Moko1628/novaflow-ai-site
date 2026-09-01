import { NextResponse } from 'next/server';
import { searchKnowledge } from '../../lib/knowledge';

// Files de modèles gratuits OpenRouter — testés rapides en français quand dispo
// Le premier qui répond dans le timeout est utilisé (fallback automatique)
const MODELS_FREE = [
  'minimax/minimax-m3:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
];

const REQUEST_TIMEOUT_MS = 20000; // 20s max par modèle
const MAX_MODELS_TRIED = 2; // max 2 tentatives (40s worst case)

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

async function callModel(model: string, prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://novaflow-ai.com',
        'X-Title': 'NovaFlow AI Assistant',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 400,
        temperature: 0.4,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Model ${model} HTTP error:`, response.status);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error('Empty response');
    return content;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      console.error(`Model ${model} timed out after ${REQUEST_TIMEOUT_MS}ms`);
      throw new Error('Timeout');
    }
    throw err;
  }
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages requis' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY manquante' }, { status: 500 });
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    const query = lastUserMessage?.content ?? '';
    const context = searchKnowledge(query);

    const history = messages
      .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Client' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const prompt = SYSTEM_PROMPT.replace('{context}', context).replace('{history}', history);

    // Try models in order until one answers in time
    let lastError = '';
    const toTry = MODELS_FREE.slice(0, MAX_MODELS_TRIED);

    for (const model of toTry) {
      try {
        const content = await callModel(model, prompt);
        return NextResponse.json({ content });
      } catch (err) {
        lastError = err instanceof Error ? err.message : 'Erreur inconnue';
        console.error(`Model ${model} failed:`, lastError);
      }
    }

    // Fallback: if all models failed, answer from knowledge base directly (no LLM)
    // This guarantees the user NEVER sees an error
    const fallbackAnswer = buildFallbackAnswer(query, context);
    return NextResponse.json({
      content: fallbackAnswer,
      source: 'knowledge-base',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}

function buildFallbackAnswer(query: string, context: string): string {
  const q = query.toLowerCase();

  if (q.includes('tarif') || q.includes('prix') || q.includes('coût') || q.includes('cou') || q.includes('pack')) {
    return "Voici nos tarifs (FCFA HT, TVA 18% en supplément) :\n\n" +
      "• Pack Starter : 150 000 FCFA de mise en place + 15 000 FCFA/mois\n" +
      "• Pack Pro : 150 000 FCFA de mise en place + 75 000 FCFA/mois\n" +
      "• Pack Business : 700 000 FCFA de mise en place + 60 000 FCFA/mois\n\n" +
      "La mise en place est facturée une seule fois. La maintenance mensuelle couvre le suivi technique et le support, avec un engagement de 12 mois.";
  }

  if (q.includes('délai') || q.includes('combien de temps') || q.includes('semaine')) {
    return "Les délais de mise en place sont :\n\n" +
      "• Pack Starter : 1 à 2 semaines\n" +
      "• Pack Pro : 2 à 4 semaines\n" +
      "• Pack Business : 4 à 8 semaines\n\n" +
      "Les délais démarrent à réception des informations nécessaires de votre côté.";
  }

  if (q.includes('automatisation') || q.includes('email') || q.includes('service')) {
    return "NovaFlow AI automatise vos processus métier : tri des emails entrants, réponses IA aux demandes courantes, génération automatique de devis, intégration CRM, automatisation multi-canal (WhatsApp, Slack, email) et tableaux de bord temps réel.";
  }

  if (q.includes('contact') || q.includes('appel') || q.includes('découverte') || q.includes('demo')) {
    return "Vous pouvez nous contacter via le formulaire du site (#contact) ou par email à hello@novaflow-ai.com. Un échange de découverte gratuit de 15 minutes est proposé pour évaluer votre besoin avant tout engagement.";
  }

  // Generic fallback with key info
  return "Voici ce que je peux vous dire sur NovaFlow AI :\n\n" +
    "Nous sommes spécialisés dans l'automatisation intelligente des processus (emails, factures, devis, CRM, multi-canal WhatsApp/Slack). " +
    "Nos packs : Starter (150 000 FCFA setup + 15 000 FCFA/mois), Pro (150 000 FCFA setup + 75 000 FCFA/mois), " +
    "Business (700 000 FCFA setup + 60 000 FCFA/mois). " +
    "Un échange de découverte gratuit de 15 minutes est possible pour évaluer votre besoin.";
}