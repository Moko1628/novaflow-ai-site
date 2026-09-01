import { NextResponse } from 'next/server';
import { searchKnowledge } from '../../lib/knowledge';

// Modèle free OpenRouter (cohérent avec le profil Hermes web-dev)
const MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages requis' }, { status: 400 });
    }

    // Récupère le contexte pertinent depuis la base de connaissances
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    const query = lastUserMessage?.content ?? '';
    const context = searchKnowledge(query);

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY manquante' }, { status: 500 });
    }

    const systemPrompt = `Tu es l'assistant intelligent de NovaFlow AI, une entreprise d'automatisation et d'IA basée à Abidjan (Côte d'Ivoire).
Tu réponds en français, de façon claire, chaleureuse et professionnelle.
Ton but : aider les visiteurs du site à comprendre les services, tarifs et démarches.

RÈGLES STRICTES :
- Réponds UNIQUEMENT à partir du CONTEXTE fourni ci-dessous.
- Si la question ne concerne pas NovaFlow AI ou si le contexte ne contient pas la réponse, dis poliment que tu peux seulement répondre sur les services/tarifs/démarches de NovaFlow AI.
- Cite les prix en FCFA (mise en place + maintenance mensuelle) quand c'est pertinent.
- Sois concis : 2 à 4 phrases maximum. Format clair, sans markdown excessif.

CONTEXTE CONNAISSANCES NOVAFLOW AI :
${context}

CONVERSATION :
${messages.map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Client' : 'Assistant'}: ${m.content}`).join('\n')}

Assistant :`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://novaflow-ai.com',
        'X-Title': 'NovaFlow AI Assistant',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.4,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter error:', data);
      return NextResponse.json(
        { error: 'Erreur du service d\'IA. Réessaie dans un instant.' },
        { status: 502 }
      );
    }

    const result = data.choices?.[0]?.message?.content?.trim();
    if (!result) {
      return NextResponse.json({ error: 'Réponse vide' }, { status: 502 });
    }

    return NextResponse.json({ content: result });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}