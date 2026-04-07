/**
 * ALIA AI Service — Assistant pédagogique
 *
 * Simule un LLM pédagogique qui ne donne JAMAIS la réponse directe.
 * Structure de chaque réponse :
 *   1. Reformulation de la question
 *   2. Exemple(s) concret(s) / analogie
 *   3. Principe sous-jacent
 *   4. Question ouverte / indice final
 *
 * Pour brancher l'API Claude, remplacer `simulateStream` par un vrai appel :
 *   POST https://api.anthropic.com/v1/messages
 *   avec le SYSTEM_PROMPT ci-dessous.
 */

export const SYSTEM_PROMPT = `Tu es ALIA, un assistant pédagogique intégré à la plateforme d'apprentissage IA "ALIA Education".

TON RÔLE : Aider les apprenants à COMPRENDRE par eux-mêmes. Tu ne donnes JAMAIS directement la réponse à une question de quiz ou d'exercice.

STRUCTURE DE CHAQUE RÉPONSE (respecte toujours cet ordre) :
1. 🔄 Reformulation — Montre que tu as compris la question en la reformulant avec tes propres mots (1-2 phrases).
2. 💡 Exemple(s) — Donne 1-2 exemples concrets ou analogies vivantes pour illustrer le concept (SANS révéler la solution).
3. 🧠 Principe — Explique le raisonnement ou la logique derrière le concept en termes simples.
4. 🎯 Relance — Termine par un indice précis ou une question ouverte qui guide l'apprenant vers la réponse.

TON : Bienveillant, encourageant, légèrement enthousiaste. Utilise "tu". Réponses entre 100 et 220 mots.

Si l'apprenant insiste pour avoir la réponse directe : redirige-le avec une nouvelle piste différente, jamais la réponse.`;

// ─────────────────────────────────────────
// Base de réponses pédagogiques par thème
// ─────────────────────────────────────────

const RESPONSES = {
    prompt: [
        `🔄 Tu te demandes comment bien formuler une instruction à une IA — c'est exactement la question clé du prompting !

💡 Imagine que tu demandes à un nouveau stagiaire de rédiger un email. Si tu dis juste "écris un email", le résultat sera générique. Mais si tu précises le destinataire, le ton, la longueur et l'objectif… le résultat sera bien plus précis. L'IA fonctionne exactement pareil.

🧠 Un bon prompt contient généralement un **rôle** ("Tu es un expert en…"), un **contexte** (la situation), une **tâche** claire, et un **format de sortie** attendu. Plus tu es précis, plus l'IA peut s'adapter.

🎯 Essaie de réécrire ta question en ajoutant ces 4 éléments. Qu'est-ce qui change dans la réponse obtenue ?`,

        `🔄 Tu explores les techniques pour obtenir de meilleures réponses d'une IA — c'est au cœur du prompt engineering !

💡 Pense à la différence entre "résume ce texte" et "résume ce texte en 5 bullet points pour un public non-technique, en mettant l'accent sur les actions concrètes". Le deuxième prompt contraint l'IA de façon utile.

🧠 Le principe s'appelle la **spécificité dirigée** : chaque contrainte que tu ajoutes réduit l'espace des réponses possibles et l'oriente vers ce dont tu as vraiment besoin.

🎯 Parmi les éléments rôle / contexte / tâche / format / exemples, lequel te semble le plus important à inclure pour ton cas d'usage ?`,
    ],

    chainofthought: [
        `🔄 Tu te demandes ce qu'est le raisonnement en chaîne (chain-of-thought) — une technique puissante pour les tâches complexes !

💡 Imagine que tu demandes à quelqu'un de calculer 17 × 24. S'il répond instantanément sans montrer son travail, tu ne peux pas vérifier. Mais s'il écrit "17 × 20 = 340, puis 17 × 4 = 68, total = 408", tu vois son raisonnement et peux l'évaluer. L'IA fait pareil quand on lui demande de "penser étape par étape".

🧠 Le chain-of-thought force le modèle à **externaliser son raisonnement intermédiaire**, ce qui améliore la précision sur les problèmes logiques, mathématiques ou multi-étapes.

🎯 D'après toi, pourquoi cette technique améliore-t-elle les résultats plutôt que de simplement demander la réponse finale ?`,
    ],

    fewshot: [
        `🔄 Tu t'interroges sur le few-shot prompting — une façon élégante d'enseigner par l'exemple à l'IA !

💡 C'est comme apprendre le style d'écriture d'un auteur : au lieu de décrire ce style en mots, tu lui montres 2-3 exemples. "Voici comment je veux que tu reformules : [exemple 1] → [résultat 1]. [exemple 2] → [résultat 2]. Maintenant fais de même avec : [ma phrase]."

🧠 Le modèle **infère le pattern** à partir des exemples et l'applique. C'est particulièrement efficace quand le format ou le style attendu est difficile à décrire verbalement.

🎯 Quand utiliserais-tu du few-shot plutôt que du zero-shot (sans exemple) ? Pense à un cas concret dans ton métier.`,
    ],

    automation: [
        `🔄 Tu te penches sur l'automatisation avec l'IA — un des leviers de productivité les plus concrets !

💡 Imaginons un service client qui reçoit 200 emails par jour. Sans IA, chaque email est lu et catégorisé manuellement (2 min/email = 6h40 de travail). Avec un workflow automatisé, l'IA lit, catégorise, priorise et prépare une réponse type en quelques secondes.

🧠 La clé d'une bonne automatisation est d'identifier les **tâches répétitives à faible valeur ajoutée** où la variabilité est limitée — ce sont ces tâches que l'IA gère le mieux, laissant les humains se concentrer sur la valeur.

🎯 Dans ton flux de travail actuel, quelle tâche répétitive prend le plus de temps et pourrait bénéficier de ce type d'automatisation ?`,
    ],

    roi: [
        `🔄 Tu cherches à comprendre comment mesurer la valeur réelle de l'IA en entreprise — une question cruciale pour convaincre !

💡 Prenons un exemple concret : une équipe marketing rédige 20 fiches produit/semaine. Avant IA : 45 min/fiche = 15h. Après IA : 10 min/fiche = 3h20. Gain : ~12h/semaine, soit 50h/mois. Si le coût horaire est 50€, c'est 2500€ économisés/mois contre peut-être 100€ d'abonnement IA.

🧠 Le ROI de l'IA se mesure sur 3 axes : **temps gagné** (productivité), **qualité améliorée** (moins d'erreurs, meilleur output), et **nouvelles capacités** (ce qu'on ne pouvait pas faire avant). Souvent le 3e axe est le plus transformateur mais le plus difficile à quantifier.

🎯 Pour ton équipe, sur lequel de ces 3 axes l'impact serait-il le plus immédiat et mesurable ?`,
    ],

    ethique: [
        `🔄 Tu explores les enjeux éthiques de l'IA — un sujet essentiel pour tout professionnel qui déploie ces technologies !

💡 Pense à un système de tri de CV alimenté par une IA entraînée sur des données historiques d'embauche. Si ces données reflètent des biais passés (sous-représentation de certains profils), l'IA reproduit et amplifie ces biais à grande échelle — de façon invisible et difficile à contester.

🧠 Le concept clé est celui de **biais algorithmique** : les modèles apprennent à partir de données humaines, qui contiennent des biais humains. Ajoute l'opacité des modèles complexes et tu obtiens un risque systémique qui nécessite une gouvernance active.

🎯 Si tu déployais une IA dans un processus RH de ton entreprise, quelles mesures de contrôle mettrais-tu en place pour détecter et corriger les biais ?`,
    ],

    intelligence_artificielle: [
        `🔄 Tu te poses une question fondamentale sur ce qu'est l'IA — repartons de la base pour construire une compréhension solide !

💡 Imagine un enfant qui apprend à reconnaître des chats. Après avoir vu des milliers de photos, il peut identifier un chat même dans une pose inédite. Il n'a pas mémorisé de règles — il a **appris des patterns**. Un modèle d'IA fait exactement cela, mais avec des millions d'exemples et des calculs mathématiques (réseaux de neurones).

🧠 La distinction essentielle : l'IA classique suit des règles écrites par des humains, le Machine Learning apprend ses propres règles à partir des données. Les LLMs (comme ChatGPT) sont une forme avancée qui a "lu" une grande partie d'internet pour apprendre les patterns du langage.

🎯 D'après toi, quelle est la principale limite de cette approche "apprentissage par patterns" pour des décisions importantes ?`,

        `🔄 Tu veux mieux comprendre les capacités réelles de l'IA — excellente question pour éviter à la fois la surestimation et la sous-estimation !

💡 Compare l'IA à un très bon assistant qui a lu tous les livres du monde mais n'a jamais vécu d'expériences réelles. Il peut t'expliquer comment nager en détail, citer des techniques olympiques, mais n'a jamais touché l'eau. Puissant pour la connaissance et le langage, limité pour l'action dans le monde réel.

🧠 Les LLMs excellent dans : synthèse, reformulation, génération de contenu, analyse de texte, codage. Ils ont des limites sur : raisonnement causal complexe, données post-entraînement, et la "vraie compréhension" (ils produisent du texte statistiquement cohérent, pas nécessairement "vrai").

🎯 Pour un usage que tu envisages, comment vérifierais-tu les outputs de l'IA pour t'assurer de leur fiabilité ?`,
    ],

    strategie: [
        `🔄 Tu réfléchis à comment intégrer l'IA dans une stratégie d'entreprise — passons du "pourquoi" au "comment" !

💡 Compare deux approches : Entreprise A achète des outils IA pour chaque département séparément, sans cohérence. Entreprise B identifie ses 3 processus à plus forte valeur ajoutée, forme ses équipes sur ces cas précis, et mesure l'impact avant d'étendre. B obtient un ROI 5x supérieur avec la même dépense.

🧠 Une stratégie IA efficace repose sur 3 piliers : **priorisation** (où l'IA crée le plus de valeur), **compétences** (les équipes savent utiliser les outils), et **gouvernance** (règles claires sur l'usage, les données, et les risques).

🎯 Dans ton organisation, quel serait le premier processus à transformer avec l'IA, et pourquoi celui-là plutôt qu'un autre ?`,
    ],

    generic: [
        `🔄 Intéressant ! Je perçois que tu cherches à approfondir ta compréhension sur ce sujet — creusons ensemble !

💡 Pour illustrer, prenons une analogie simple : apprendre à utiliser l'IA, c'est comme apprendre à conduire. Au début tu penses à chaque geste (débrayage, regard dans les rétros…). Avec la pratique, ces gestes deviennent automatiques et tu peux te concentrer sur la destination. La maîtrise vient de l'expérimentation régulière.

🧠 Le principe fondamental à retenir : l'IA est un outil qui amplifie tes capacités, mais c'est ta capacité à bien lui poser les questions (et à évaluer ses réponses) qui fait la différence entre un usage moyen et un usage expert.

🎯 Si tu devais reformuler ta question avec plus de contexte sur ce que tu veux accomplir concrètement, comment la formulerais-tu ?`,

        `🔄 Bonne question ! Tu soulèves un aspect important que beaucoup négligent au début de leur apprentissage.

💡 Pense à la différence entre quelqu'un qui utilise Google en tapant juste des mots-clés, et quelqu'un qui maîtrise les opérateurs de recherche avancés ("site:", guillemets, exclusions…). La même logique s'applique à l'IA : la profondeur d'usage vient avec la compréhension des mécanismes sous-jacents.

🧠 Ce que tu cherches à comprendre est directement lié à un concept fondamental : l'IA ne "sait" pas — elle **prédit** ce qui est le plus probable selon ses données d'entraînement. Garder ça en tête change radicalement comment on l'utilise et comment on vérifie ses outputs.

🎯 En quoi cette perspective "l'IA prédit plutôt que comprend" changerait-elle ta façon d'utiliser les outils IA dans ton travail quotidien ?`,

        `🔄 Tu poses une question qui touche à un aspect essentiel de la maîtrise de l'IA — allons explorer ça ensemble !

💡 Voici une analogie utile : imagine un chef cuisinier débutant vs expérimenté face à la même recette. Le débutant suit chaque étape à la lettre. L'expérimenté comprend *pourquoi* chaque étape existe et peut improviser quand un ingrédient manque. Avec l'IA, c'est pareil : comprendre les principes permet d'adapter et d'innover.

🧠 La notion clé ici est celle de **transfert de compétences** : une fois que tu comprends les fondamentaux (comment l'IA traite le langage, pourquoi le contexte compte, comment calibrer son ton), tu peux appliquer ces principes à n'importe quel outil IA, même ceux qui n'existent pas encore.

🎯 Parmi les concepts abordés dans cette leçon, lequel te semble le plus contre-intuitif ou surprenant ? C'est souvent là qu'est la vraie clé de compréhension.`,
    ],
};

// ─────────────────────────────────────────
// Détection de thème + sélection de réponse
// ─────────────────────────────────────────

function detectTopic(text) {
    const t = text.toLowerCase();
    if (/chain.of.thought|cot|raisonnement.chain|étape.par.étape/.test(t)) return 'chainofthought';
    if (/few.shot|zero.shot|exemple.dans.le.prompt|in.context/.test(t)) return 'fewshot';
    if (/automati|workflow|pipeline|process/.test(t)) return 'automation';
    if (/roi|retour.sur|valeur|mesur|impact|coût/.test(t)) return 'roi';
    if (/éthique|biais|risque|gouvernance|responsab/.test(t)) return 'ethique';
    if (/stratég|plan|feuille.de.route|roadmap|vision/.test(t)) return 'strategie';
    if (/prompt|instruction|formul|rédiger.un.prompt|demande.à.l.ia/.test(t)) return 'prompt';
    if (/intelligence.artificielle|qu.est.ce.que.l.ia|machine.learning|llm|modèle|gpt|claude/.test(t)) return 'intelligence_artificielle';
    return 'generic';
}

const topicUsageCount = {};

function pickResponse(topic) {
    const pool = RESPONSES[topic] || RESPONSES.generic;
    const key = topic;
    topicUsageCount[key] = (topicUsageCount[key] || 0);
    const idx = topicUsageCount[key] % pool.length;
    topicUsageCount[key]++;
    return pool[idx];
}

// ─────────────────────────────────────────
// Génération de réponse contextuelle (quiz)
// ─────────────────────────────────────────

function buildContextualResponse(userMessage, context) {
    if (!context) return null;

    const topic = detectTopic(context.question + ' ' + userMessage);
    const base = pickResponse(topic);

    // Ajoute un préambule contextuel si on est dans un quiz
    const contextIntro = `Je vois que tu travailles sur la question : *"${context.question}"*\n\nPas de panique, je ne vais pas te donner la réponse — mais je vais t'aider à y arriver ! 😊\n\n`;
    return contextIntro + base;
}

// ─────────────────────────────────────────
// Streaming simulé (typewriter effect)
// Remplacer par un vrai stream SSE/fetch pour l'API Claude
// ─────────────────────────────────────────

export async function streamResponse({ userMessage, context = null, history = [], onChunk, onDone }) {
    // Sélection de la réponse
    let fullText;
    if (context && userMessage.trim().length < 20) {
        // Message court = demande d'aide générale sur la question du quiz
        fullText = buildContextualResponse('explique moi', context);
    } else {
        const topic = detectTopic(userMessage + (context ? ' ' + context.question : ''));
        fullText = context
            ? buildContextualResponse(userMessage, context)
            : pickResponse(topic);
    }

    // Délai initial (simulation du "temps de réflexion")
    const thinkDelay = 600 + Math.random() * 600;
    await new Promise(r => setTimeout(r, thinkDelay));

    // Streaming caractère par caractère avec vitesse variable
    let i = 0;
    const CHUNK_SIZE = 3;  // caractères par tick
    const BASE_SPEED = 18; // ms par tick (environ 167 chars/s)

    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (i >= fullText.length) {
                clearInterval(interval);
                onDone?.(fullText);
                resolve(fullText);
                return;
            }

            // Ralentir légèrement aux ponctuations pour un effet naturel
            const char = fullText[i];
            const isPunctuation = /[.!?…\n]/.test(char);
            const chunk = fullText.slice(i, i + CHUNK_SIZE);

            onChunk?.(chunk);
            i += CHUNK_SIZE;

            if (isPunctuation) {
                clearInterval(interval);
                setTimeout(() => {
                    const newInterval = setInterval(() => {
                        if (i >= fullText.length) {
                            clearInterval(newInterval);
                            onDone?.(fullText);
                            resolve(fullText);
                            return;
                        }
                        onChunk?.(fullText.slice(i, i + CHUNK_SIZE));
                        i += CHUNK_SIZE;
                    }, BASE_SPEED);
                }, isPunctuation ? 120 : 0);
            }
        }, BASE_SPEED);
    });
}
