import { NextResponse } from 'next/server';
import { searchKnowledge } from '../../lib/knowledge';

const MISTRAL_MODEL = 'mistral-medium-latest';
const MISTRAL_ENDPOINT = 'https://api.mistral.ai/v1/chat/completions';

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

async function callMistral(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 18000);

  try {
    const response = await fetch(MISTRAL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 400,
        temperature: 0.4,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Mistral API error:', response.status, errBody);
      throw new Error(`Mistral HTTP ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error('Empty Mistral response');
    return content;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('Timeout');
    }
    throw err;
  }
}

function cleanResponse(content: string): string | null {
  if (!content) return null;
  let cleaned = content
    .replace(/<thinking>[\s\S]*?<\/thinking>/g, '')
    .replace(/<reasoning>[\s\S]*?<\/reasoning>/g, '')
    .trim();
  if (!cleaned) return null;
  return cleaned;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages requis' }, { status: 400 });
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'MISTRAL_API_KEY manquante' }, { status: 500 });
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    const query = lastUserMessage?.content ?? '';
    const context = searchKnowledge(query);

    const history = messages
      .map((m: { role: string; content: string }) =>
        `${m.role === 'user' ? 'Client' : 'Assistant'}: ${m.content}`
      )
      .join('\n');

    const prompt = SYSTEM_PROMPT
      .replace('{context}', context)
      .replace('{history}', history);

    try {
      const content = await callMistral(prompt);
      const cleaned = cleanResponse(content);
      if (cleaned) {
        return NextResponse.json({ content: cleaned });
      }
      // Si le nettoyage a tout vidé, on tombe dans le fallback
    } catch (err) {
      console.error('Mistral call failed:', err instanceof Error ? err.message : err);
    }

    // Fallback base de connaissances (réponse instantanée, garantie, jamais d'erreur)
    return NextResponse.json({
      content: buildFallbackAnswer(query),
      source: 'knowledge-base',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
  }
}

function buildFallbackAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('tarif') || q.includes('prix') || q.includes('coût') || q.includes('pack') || q.includes('combien')) {
    return "Voici nos tarifs (FCFA HT, TVA 18% en supplément) :\n\n• Pack Starter : 150 000 FCFA de mise en place + 15 000 FCFA/mois\n• Pack Pro : 150 000 FCFA de mise en place + 75 000 FCFA/mois\n• Pack Business : 700 000 FCFA de mise en place + 60 000 FCFA/mois\n\nLa mise en place est facturée une seule fois. La maintenance mensuelle couvre le suivi technique et le support, avec un engagement de 12 mois.";
  }

  if (q.includes('délai') || q.includes('combien de temps') || q.includes('semaine') || q.includes('temps')) {
    return "Les délais de mise en place sont :\n\n• Pack Starter : 1 à 2 semaines\n• Pack Pro : 2 à 4 semaines\n• Pack Business : 4 à 8 semaines\n\nLes délais démarrent à réception des informations nécessaires de votre côté.";
  }

  if (q.includes('automatisation') || q.includes('email') || q.includes('service') || q.includes('solution')) {
    return "NovaFlow AI automatise vos processus métier : tri des emails entrants, réponses IA aux demandes courantes, génération automatique de devis, intégration CRM, automatisation multi-canal (WhatsApp, Slack, email) et tableaux de bord temps réel.";
  }

  if (q.includes('contact') || q.includes('appel') || q.includes('découverte') || q.includes('demo') || q.includes('rdv') || q.includes('rendez')) {
    return "Vous pouvez nous contacter via le formulaire du site ou par email à hello@novaflow-ai.com. Un échange de découverte gratuit de 15 minutes est proposé pour évaluer votre besoin avant tout engagement.";
  }

  if (q.includes('qui') || q.includes('novaflow') || q.includes('présenter') || q.includes('entreprise')) {
    return "NovaFlow AI est une entreprise d'automatisation intelligente basée à Abidjan, Côte d'Ivoire. Notre mission : rendre l'IA accessible aux entreprises africaines et internationales, sans complexité technique, avec des résultats mesurables.";
  }

  return "Merci pour votre question ! Je peux vous renseigner sur nos tarifs (Starter/Pro/Business en FCFA), nos services d'automatisation IA, nos délais de mise en place ou la marche à suivre pour démarrer. N'hésitez pas à préciser votre demande !";
}
