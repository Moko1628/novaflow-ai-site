import { NextResponse } from 'next/server';
import { searchKnowledge } from '../../lib/knowledge';

const REQUEST_TIMEOUT_MS = 12000;

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

    const apiKey = process.env.MISTRAL_API_KEY;

    if (apiKey) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'mistral-medium-latest',
            messages: [
              {
                role: 'system',
                content: `Tu es l'assistant intelligent de NovaFlow AI, une entreprise d'automatisation et d'IA basée à Abidjan (Côte d'Ivoire).\nTu réponds en français, de façon claire, chaleureuse et professionnelle.\n\nCONTEXTE CONNAISSANCES NOVAFLOW AI :\n${context}\n\nRègles :\n- Réponds précisément en te basant sur le contexte.\n- Sois concis (2 à 4 phrases max).\n- Cite les prix en FCFA si demandé.`,
              },
              { role: 'user', content: query },
            ],
            max_tokens: 400,
            temperature: 0.3,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content?.trim();
          if (content) {
            return NextResponse.json({ content, source: 'mistral' });
          }
        }
      } catch (err) {
        clearTimeout(timeoutId);
        console.error('Mistral API error (falling back to KB):', err);
      }
    }

    // Fallback instantané depuis la base de connaissances (zéro erreur, 100% fiable)
    const fallbackAnswer = buildKnowledgeAnswer(query);
    return NextResponse.json({
      content: fallbackAnswer,
      source: 'knowledge-base',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      content: "Voici les informations sur NovaFlow AI : nos packs vont du Starter (150k setup + 15k/mois) au Business (700k setup + 60k/mois). Contactez-nous sur hello@novaflow-ai.com pour en savoir plus !",
      source: 'emergency-fallback'
    });
  }
}

function buildKnowledgeAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('tarif') || q.includes('prix') || q.includes('coût') || q.includes('pack') || q.includes('pro') || q.includes('starter') || q.includes('business')) {
    return "Voici nos tarifs officiels (FCFA HT, TVA 18% en supplément) :\n\n" +
      "• Pack Starter : 150 000 FCFA (setup) + 15 000 FCFA/mois (1-2 semaines)\n" +
      "• Pack Pro : 150 000 FCFA (setup) + 75 000 FCFA/mois (2-4 semaines)\n" +
      "• Pack Business : 700 000 FCFA (setup) + 60 000 FCFA/mois (4-8 semaines)\n\n" +
      "Tous les packs ont un engagement de 12 mois. Le setup est réglé à la signature (50%) et à la livraison (50%).";
  }

  if (q.includes('délai') || q.includes('temps') || q.includes('semaine') || q.includes('mettre en place')) {
    return "Les délais de mise en place dépendent du pack choisi :\n\n" +
      "• Pack Starter : 1 à 2 semaines\n" +
      "• Pack Pro : 2 à 4 semaines\n" +
      "• Pack Business : 4 à 8 semaines\n\n" +
      "Ces délais débutent dès réception des informations nécessaires (accès aux comptes, contenus, tarifs).";
  }

  if (q.includes('service') || q.includes('automatisation') || q.includes('ia') || q.includes('email') || q.includes('devis') || q.includes('crm')) {
    return "NovaFlow AI propose l'automatisation intelligente de vos processus : tri des emails, réponses IA aux demandes courantes, génération de devis, intégration CRM, et automatisation multi-canal (WhatsApp, Slack, email) avec tableaux de bord en temps réel.";
  }

  if (q.includes('contact') || q.includes('email') || q.includes('téléphone') || q.includes('appel') || q.includes('rdv')) {
    return "Vous pouvez nous joindre par email à hello@novaflow-ai.com, par téléphone au +225 07 07 07 07, ou via notre formulaire de contact sur le site. Un échange de découverte gratuit de 15 minutes est proposé pour diagnostiquer votre besoin.";
  }

  if (q.includes('bonjour') || q.includes('salut') || q.includes('hello') || q.includes('cava')) {
    return "Bonjour ! 😊 Je suis l'assistant virtuel de NovaFlow AI. Je peux vous renseigner sur nos services d'automatisation, nos tarifs en FCFA (Starter, Pro, Business) ou nos délais de mise en place. Que puis-je faire pour vous ?";
  }

  return "NovaFlow AI simplifie vos opérations grâce à l'automatisation intelligente. Nos offres vont du Pack Starter (150k setup + 15k/mois) au Pack Business (700k setup + 60k/mois). Souhaitez-vous en savoir plus sur un pack en particulier ou planifier un appel découverte gratuit ?";
}
