export const MODULES = [
    {
        id: 1,
        title: "L'Éveil IA",
        icon: "🌱",
        level: "Débutant",
        badge: "Initiateur",
        badgeIcon: "🌟",
        totalXP: 500,
        color: "#10B981",
        description: "Découvrez les fondamentaux de l'IA et commencez à l'utiliser dans votre quotidien professionnel.",
        lessons: [
            { id: "1.1", title: "Qu'est-ce que l'IA ? (Démythifions ensemble)", xp: 50, duration: "15 min" },
            { id: "1.2", title: "Les outils IA du quotidien pro (ChatGPT, Copilot, Gemini...)", xp: 75, duration: "20 min" },
            { id: "1.3", title: "Comment fonctionne un LLM sans être ingénieur", xp: 75, duration: "20 min" },
            { id: "1.4", title: "Cas concret : Rédige ton premier email pro avec l'IA", xp: 100, duration: "25 min" },
            { id: "1.5", title: "Cas concret : Résume une réunion avec l'IA", xp: 100, duration: "25 min" },
            { id: "1.6", title: "Quiz de validation du module", xp: 100, duration: "15 min", isQuiz: true },
        ]
    },
    {
        id: 2,
        title: "Le Prompt Master",
        icon: "✍️",
        level: "Débutant → Intermédiaire",
        badge: "Architecte de Prompt",
        badgeIcon: "🏗️",
        totalXP: 750,
        color: "#7C3AED",
        description: "Maîtrisez l'art du prompting pour tirer le maximum des outils IA.",
        lessons: [
            { id: "2.1", title: "Les bases du prompting : rôle, contexte, format", xp: 75, duration: "15 min" },
            { id: "2.2", title: "Prompting avancé : few-shot, chain-of-thought", xp: 100, duration: "25 min" },
            { id: "2.3", title: "Éviter les hallucinations et erreurs communes", xp: 100, duration: "20 min" },
            { id: "2.4", title: "Cas concret : Crée un prompt pour générer un rapport hebdo", xp: 125, duration: "30 min" },
            { id: "2.5", title: "Cas concret : Automatise la création de fiches produit", xp: 125, duration: "30 min" },
            { id: "2.6", title: "Cas concret : Prompt pour analyser des données clients", xp: 125, duration: "30 min" },
            { id: "2.7", title: "Challenge Prompt Battle", xp: 100, duration: "20 min", isChallenge: true },
        ]
    },
    {
        id: 3,
        title: "L'IA au Cœur du Métier",
        icon: "💼",
        level: "Intermédiaire",
        badge: "Pro Augmenté",
        badgeIcon: "💎",
        totalXP: 1000,
        color: "#F59E0B",
        description: "Appliquez l'IA directement à vos fonctions métier : marketing, RH, finance, vente.",
        lessons: [
            { id: "3.1", title: "IA pour le marketing : contenu, SEO, campagnes", xp: 100, duration: "25 min" },
            { id: "3.2", title: "IA pour les RH : recrutement, onboarding, formation", xp: 100, duration: "25 min" },
            { id: "3.3", title: "IA pour la finance : analyse, reporting, prévisions", xp: 100, duration: "25 min" },
            { id: "3.4", title: "IA pour la vente : prospection, CRM, argumentaire", xp: 100, duration: "25 min" },
            { id: "3.5", title: "Cas concret : Génère une stratégie de contenu sur 30 jours", xp: 150, duration: "35 min" },
            { id: "3.6", title: "Cas concret : Crée un processus de recrutement assisté IA", xp: 150, duration: "35 min" },
            { id: "3.7", title: "Cas concret : Analyse de performance commerciale avec IA", xp: 150, duration: "35 min" },
            { id: "3.8", title: "Projet de module : Livrables réels à soumettre", xp: 150, duration: "45 min", isProject: true },
        ]
    },
    {
        id: 4,
        title: "Automatise & Optimise",
        icon: "⚡",
        level: "Intermédiaire → Avancé",
        badge: "Automatiseur Elite",
        badgeIcon: "⚙️",
        totalXP: 1250,
        color: "#EC4899",
        description: "Créez des workflows IA et automatisez vos processus métier.",
        lessons: [
            { id: "4.1", title: "Introduction aux workflows IA (n8n, Make, Zapier + IA)", xp: 125, duration: "25 min" },
            { id: "4.2", title: "Connecter l'IA à tes outils métier (Notion, Slack, Drive)", xp: 125, duration: "25 min" },
            { id: "4.3", title: "Créer un agent IA simple sans coder", xp: 150, duration: "30 min" },
            { id: "4.4", title: "Cas concret : Workflow de veille automatique", xp: 175, duration: "35 min" },
            { id: "4.5", title: "Cas concret : Pipeline de génération de contenu automatisé", xp: 175, duration: "35 min" },
            { id: "4.6", title: "Cas concret : Chatbot FAQ interne pour son équipe", xp: 175, duration: "35 min" },
            { id: "4.7", title: "Mini-projet : Automatisation d'un process réel", xp: 325, duration: "60 min", isProject: true },
        ]
    },
    {
        id: 5,
        title: "Stratège IA",
        icon: "🚀",
        level: "Avancé",
        badge: "Stratège ALIA",
        badgeIcon: "👑",
        totalXP: 1500,
        color: "#6366F1",
        description: "Devenez le leader IA de votre entreprise. Stratégie, éthique et certification finale.",
        lessons: [
            { id: "5.1", title: "Construire une stratégie IA d'entreprise", xp: 150, duration: "30 min" },
            { id: "5.2", title: "Éthique, risques et gouvernance IA", xp: 150, duration: "30 min" },
            { id: "5.3", title: "Mesurer le ROI de l'IA en entreprise", xp: 150, duration: "30 min" },
            { id: "5.4", title: "Former et embarquer son équipe sur l'IA", xp: 150, duration: "25 min" },
            { id: "5.5", title: "Cas concret : Audit IA de son entreprise", xp: 200, duration: "40 min" },
            { id: "5.6", title: "Cas concret : Pitch une feuille de route IA à sa direction", xp: 200, duration: "40 min" },
            { id: "5.7", title: "Cas concret : Construire un 'AI Playbook' complet", xp: 200, duration: "45 min" },
            { id: "5.8", title: "Examen final de certification ALIA", xp: 300, duration: "60 min", isFinal: true },
        ]
    }
];

export const LEVELS = [
    { level: 1, name: "Curieux", xpRequired: 0, icon: "🔍" },
    { level: 2, name: "Explorateur", xpRequired: 250, icon: "🧭" },
    { level: 3, name: "Prompteur", xpRequired: 500, icon: "✍️" },
    { level: 4, name: "Praticien", xpRequired: 1000, icon: "🛠️" },
    { level: 5, name: "Spécialiste", xpRequired: 2000, icon: "🎯" },
    { level: 6, name: "Expert", xpRequired: 3500, icon: "💡" },
    { level: 7, name: "Architecte IA", xpRequired: 5000, icon: "🏗️" },
    { level: 8, name: "Maître IA", xpRequired: 7500, icon: "🧙" },
    { level: 9, name: "Stratège", xpRequired: 10000, icon: "♟️" },
    { level: 10, name: "ALIA Legend", xpRequired: 15000, icon: "👑" },
];

export const BADGES = [
    { id: "initiateur", name: "Initiateur", icon: "🌟", condition: "Terminer le Module 1", moduleId: 1 },
    { id: "architecte-prompt", name: "Architecte de Prompt", icon: "🏗️", condition: "Terminer le Module 2", moduleId: 2 },
    { id: "pro-augmente", name: "Pro Augmenté", icon: "💎", condition: "Terminer le Module 3", moduleId: 3 },
    { id: "automatiseur-elite", name: "Automatiseur Elite", icon: "⚙️", condition: "Terminer le Module 4", moduleId: 4 },
    { id: "stratege", name: "Stratège ALIA", icon: "👑", condition: "Terminer le Module 5", moduleId: 5 },
    { id: "maitre", name: "Maître ALIA", icon: "🏆", condition: "Terminer tous les modules" },
    { id: "premier-pas", name: "Premier Pas", icon: "👣", condition: "Compléter ta première leçon" },
    { id: "quiz-master", name: "Quiz Master", icon: "🧠", condition: "Obtenir 100% à un quiz" },
    { id: "streak-3", name: "Flamme Naissante", icon: "🔥", condition: "3 jours de streak" },
    { id: "streak-7", name: "Flamme Ardente", icon: "🔥", condition: "7 jours de streak" },
    { id: "streak-14", name: "Inferno", icon: "🌋", condition: "14 jours de streak" },
    { id: "streak-30", name: "Phénix", icon: "🦅", condition: "30 jours de streak" },
    { id: "speed-demon", name: "Speed Demon", icon: "⚡", condition: "Terminer une leçon en moins de 5 min" },
    { id: "early-bird", name: "Early Bird", icon: "🐦", condition: "Se connecter avant 7h" },
    { id: "night-owl", name: "Night Owl", icon: "🦉", condition: "Se connecter après 22h" },
    { id: "social-star", name: "Social Star", icon: "⭐", condition: "Partager un badge sur LinkedIn" },
    { id: "xp-500", name: "Demi-Millier", icon: "💫", condition: "Atteindre 500 XP" },
    { id: "xp-1000", name: "Millionnaire XP", icon: "💰", condition: "Atteindre 1000 XP" },
    { id: "xp-5000", name: "Titan", icon: "🗿", condition: "Atteindre 5000 XP" },
    { id: "xp-10000", name: "Légende", icon: "🌟", condition: "Atteindre 10000 XP" },
    { id: "perfect-module", name: "Perfectionniste", icon: "💯", condition: "100% sur un module entier" },
    { id: "prompt-battle", name: "Champion de Prompt", icon: "🥊", condition: "Top 10 au Prompt Battle" },
    { id: "team-player", name: "Team Player", icon: "🤝", condition: "Inviter un collègue" },
    { id: "feedback-king", name: "Feedback King", icon: "📝", condition: "Donner 10 feedbacks" },
    { id: "explorer", name: "Explorateur Complet", icon: "🗺️", condition: "Visiter toutes les pages" },
    { id: "daily-5", name: "Assidu", icon: "📅", condition: "Compléter 5 daily challenges" },
    { id: "daily-20", name: "Machine", icon: "🤖", condition: "Compléter 20 daily challenges" },
    { id: "first-share", name: "Ambassadeur", icon: "📢", condition: "Premier partage" },
    { id: "top-10", name: "Top 10", icon: "🏅", condition: "Être dans le top 10 du classement" },
    { id: "top-3", name: "Podium", icon: "🥇", condition: "Être dans le top 3" },
];

export const TESTIMONIALS = [
    {
        name: "Marie Dupont",
        role: "Directrice Marketing",
        company: "TechCorp",
        avatar: "MD",
        stars: 5,
        quote: "ALIA a transformé la façon dont mon équipe utilise l'IA. En 3 semaines, nous avons automatisé 40% de nos tâches de contenu. L'approche gamifiée rend l'apprentissage addictif !"
    },
    {
        name: "Thomas Bernard",
        role: "Responsable RH",
        company: "InnoGroup",
        avatar: "TB",
        stars: 5,
        quote: "Le Module 3 sur l'IA en RH a été une révélation. J'ai divisé par 2 le temps de traitement des candidatures grâce aux techniques apprises. Et les badges motivent toute l'équipe !"
    },
    {
        name: "Sophie Martin",
        role: "CFO",
        company: "DataVision",
        avatar: "SM",
        stars: 5,
        quote: "Sceptique au départ, je suis devenue une Stratège ALIA en 6 semaines. Les cas pratiques sont directement applicables. C'est la meilleure formation IA que j'ai suivie."
    }
];

export const LEADERBOARD_DATA = [
    { rank: 1, name: "Alexandre R.", level: 9, levelName: "Stratège", xp: 12450, badges: 24, streak: 32, avatar: "AR" },
    { rank: 2, name: "Camille D.", level: 8, levelName: "Maître IA", xp: 9800, badges: 21, streak: 28, avatar: "CD" },
    { rank: 3, name: "Lucas M.", level: 8, levelName: "Maître IA", xp: 8900, badges: 19, streak: 15, avatar: "LM" },
    { rank: 4, name: "Emma B.", level: 7, levelName: "Architecte IA", xp: 7200, badges: 17, streak: 22, avatar: "EB" },
    { rank: 5, name: "Hugo P.", level: 7, levelName: "Architecte IA", xp: 6800, badges: 16, streak: 11, avatar: "HP" },
    { rank: 6, name: "Léa F.", level: 6, levelName: "Expert", xp: 5500, badges: 14, streak: 9, avatar: "LF" },
    { rank: 7, name: "Nathan G.", level: 6, levelName: "Expert", xp: 4900, badges: 13, streak: 18, avatar: "NG" },
    { rank: 8, name: "Chloé T.", level: 5, levelName: "Spécialiste", xp: 3800, badges: 11, streak: 7, avatar: "CT" },
    { rank: 9, name: "Maxime L.", level: 5, levelName: "Spécialiste", xp: 3200, badges: 10, streak: 5, avatar: "ML" },
    { rank: 10, name: "Julie V.", level: 4, levelName: "Praticien", xp: 2800, badges: 9, streak: 12, avatar: "JV" },
    { rank: 11, name: "Pierre K.", level: 4, levelName: "Praticien", xp: 2400, badges: 8, streak: 4, avatar: "PK" },
    { rank: 12, name: "Inès A.", level: 3, levelName: "Prompteur", xp: 1900, badges: 7, streak: 6, avatar: "IA" },
    { rank: 13, name: "Romain S.", level: 3, levelName: "Prompteur", xp: 1500, badges: 6, streak: 3, avatar: "RS" },
    { rank: 14, name: "Clara W.", level: 2, levelName: "Explorateur", xp: 800, badges: 4, streak: 2, avatar: "CW" },
    { rank: 15, name: "Antoine H.", level: 2, levelName: "Explorateur", xp: 450, badges: 3, streak: 1, avatar: "AH" },
];

export const QUIZ_QUESTIONS = {
    "1.6": [
        {
            question: "Qu'est-ce qu'un LLM (Large Language Model) ?",
            options: [
                "Un logiciel de comptabilité",
                "Un modèle d'IA entraîné sur de grandes quantités de texte",
                "Un langage de programmation",
                "Une base de données"
            ],
            correct: 1,
            explanation: "Un LLM est un modèle d'intelligence artificielle entraîné sur d'immenses volumes de texte pour comprendre et générer du langage naturel."
        },
        {
            question: "Quel outil n'est PAS un assistant IA généraliste ?",
            options: ["ChatGPT", "Google Gemini", "Microsoft Excel", "Claude"],
            correct: 2,
            explanation: "Excel est un tableur. ChatGPT, Gemini et Claude sont des assistants IA conversationnels."
        },
        {
            question: "Quelle est la meilleure approche pour utiliser l'IA en entreprise ?",
            options: [
                "Remplacer tous les employés",
                "Augmenter les capacités humaines avec l'IA",
                "Ignorer l'IA complètement",
                "Utiliser l'IA sans supervision"
            ],
            correct: 1,
            explanation: "L'IA est un outil d'augmentation qui renforce les capacités humaines, pas un remplacement."
        },
        {
            question: "Qu'est-ce qu'une hallucination dans le contexte de l'IA ?",
            options: [
                "Un bug informatique",
                "Quand l'IA génère des informations fausses présentées comme vraies",
                "Une erreur de syntaxe",
                "Un problème de connexion"
            ],
            correct: 1,
            explanation: "Les hallucinations sont des réponses de l'IA qui semblent plausibles mais contiennent des informations inventées ou incorrectes."
        }
    ],
    "2.7": [
        {
            question: "Qu'est-ce que le 'few-shot prompting' ?",
            options: [
                "Donner un seul exemple à l'IA",
                "Fournir plusieurs exemples dans le prompt pour guider l'IA",
                "Utiliser peu de mots dans le prompt",
                "Tester plusieurs modèles d'IA"
            ],
            correct: 1,
            explanation: "Le few-shot prompting consiste à fournir quelques exemples de la sortie attendue pour guider le modèle."
        },
        {
            question: "Quel élément est essentiel dans un bon prompt ?",
            options: [
                "Beaucoup d'emojis",
                "Le contexte et le rôle assigné à l'IA",
                "Des phrases très longues",
                "Un langage technique complexe"
            ],
            correct: 1,
            explanation: "Donner un rôle et un contexte clair à l'IA est la base d'un prompt efficace."
        },
        {
            question: "Comment réduire les hallucinations ?",
            options: [
                "Poser des questions plus vagues",
                "Demander à l'IA de sourcer ses réponses et ajouter des contraintes",
                "Utiliser un modèle plus ancien",
                "Écrire en majuscules"
            ],
            correct: 1,
            explanation: "Ajouter des contraintes, demander des sources et le chain-of-thought réduisent significativement les hallucinations."
        }
    ]
};

export const DAILY_MOTIVATIONS = [
    "L'IA ne remplace pas les humains, elle amplifie leurs capacités. À toi de jouer ! 💪",
    "Chaque leçon terminée est un pas vers la maîtrise. Continue ! 🚀",
    "Les meilleurs stratèges IA ont commencé comme toi. Keep going! 🌟",
    "72% des entreprises prévoient d'adopter l'IA d'ici 2027. Tu as de l'avance ! 📈",
    "Un bon prompt peut valoir des heures de travail. Apprends à les maîtriser ! ✍️",
    "Ta streak est impressionnante. Ne la lâche pas ! 🔥",
    "L'excellence n'est pas un acte, c'est une habitude. Bravo pour ta régularité ! ⭐",
];
