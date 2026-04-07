import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { MODULES, QUIZ_QUESTIONS } from '../data/modules';
import QuizCard from '../components/QuizCard';
import PracticeZone from '../components/PracticeZone';
import AliaCharacter from '../components/AliaCharacter';
import confetti from 'canvas-confetti';
import AdBanner from '../components/AdBanner';

const STEP_MESSAGES = [
    "Lis bien, ce sera utile ! 📚",
    "Regarde cet exemple, c'est clé ! 💡",
    "À toi de jouer ! Je crois en toi 💪",
    "Concentre-toi ! Tu peux le faire 🎯",
    null,
];

const CORRECT_MESSAGES = [
    "PARFAIT ! Tu maîtrises ça ! 🎉",
    "Incroyable ! Tu es une machine ! 🤖⚡",
    "EXACTEMENT ! Tu assures ! 🏆",
    "Bravo ! Tu m'impressionnes vraiment ! ⭐",
];

const WRONG_MESSAGES = [
    "Pas de souci ! Chaque erreur fait progresser 💡",
    "Presque ! Relis l'explication et réessaie 🔄",
    "Même moi j'ai mis du temps à comprendre ça ! 😅",
    "Ensemble on va y arriver ! 💪",
];

const SAMPLE_CONTENT = {
    "1.1": {
        context: {
            title: "Qu'est-ce que l'IA ?",
            content: "L'intelligence artificielle (IA) est un domaine de l'informatique qui vise à créer des systèmes capables de réaliser des tâches qui nécessitent normalement l'intelligence humaine : comprendre le langage, reconnaître des images, prendre des décisions, et bien plus.\n\nContrairement aux idées reçues, l'IA n'est pas un robot conscient. C'est un ensemble d'algorithmes entraînés sur des données pour accomplir des tâches spécifiques.",
            duration: "15 min",
            keyPoints: [
                "L'IA est un outil, pas une entité consciente",
                "Elle excelle dans les tâches répétitives et l'analyse de grandes quantités de données",
                "L'IA générative (comme ChatGPT) peut créer du contenu : texte, images, code",
                "En entreprise, l'IA augmente les capacités humaines"
            ]
        },
        example: {
            title: "IA dans le quotidien professionnel",
            before: "Recherche manuelle dans 200 emails pour retrouver une information → 45 minutes",
            after: "Prompt à l'IA : 'Résume les décisions prises dans les emails de cette semaine concernant le projet Alpha' → 30 secondes",
        }
    },
    "2.5": {
        context: {
            title: "Automatise la création de fiches produit",
            content: "La création de fiches produit est l'une des tâches les plus chronophages en marketing et e-commerce. Avec l'IA, vous pouvez générer des fiches produit complètes et optimisées SEO en quelques secondes.\n\nDans cette leçon, vous allez apprendre à construire un prompt qui génère des fiches produit professionnelles à partir de données brutes.",
            duration: "30 min",
            keyPoints: [
                "Structurez votre prompt avec : rôle, contexte, données d'entrée, format de sortie",
                "Utilisez le few-shot prompting pour montrer un exemple de fiche attendue",
                "Incluez les contraintes SEO dans votre prompt",
                "Itérez sur votre prompt pour améliorer la qualité"
            ]
        },
        example: {
            title: "Prompt basique vs Prompt optimisé",
            before: "\"Écris une fiche produit pour des écouteurs bluetooth.\"",
            after: "\"Tu es un rédacteur e-commerce expert en SEO. Crée une fiche produit pour des écouteurs Bluetooth avec :\n- Titre accrocheur (max 60 caractères)\n- Description courte (150 mots) avec 3 mots-clés SEO naturellement intégrés\n- 5 bullet points de caractéristiques techniques\n- Un paragraphe d'appel à l'action\nTon : professionnel mais accessible. Cible : professionnels en télétravail.\""
        }
    },
};

export default function LessonPage() {
    const { moduleId, lessonIndex } = useParams();
    const navigate = useNavigate();
    const { user, addXP, completeLesson, unlockBadge, addNotification } = useUser();
    const [currentStep, setCurrentStep] = useState(0);
    const [lessonCompleted, setLessonCompleted] = useState(false);

    // Alia state
    const [aliaState, setAliaState] = useState('idle');
    const [aliaMessage, setAliaMessage] = useState(STEP_MESSAGES[0]);
    const aliaReturnTimer = useRef(null);

    const triggerAlia = useCallback((newState, message, duration = null) => {
        clearTimeout(aliaReturnTimer.current);
        setAliaState(newState);
        setAliaMessage(message);
        if (duration) {
            aliaReturnTimer.current = setTimeout(() => {
                setAliaState('idle');
                setAliaMessage(null);
            }, duration);
        }
    }, []);

    // Update Alia message when step changes
    useEffect(() => {
        setAliaState('idle');
        setAliaMessage(STEP_MESSAGES[currentStep] || null);
    }, [currentStep]);

    useEffect(() => () => clearTimeout(aliaReturnTimer.current), []);

    const mod = MODULES.find(m => m.id === parseInt(moduleId));
    const lessonIdx = parseInt(lessonIndex) - 1;
    const lesson = mod?.lessons[lessonIdx];

    if (!mod || !lesson) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Leçon introuvable</h2>
                    <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ marginTop: 20 }}>
                        Retour au dashboard
                    </button>
                </div>
            </div>
        );
    }

    const content = SAMPLE_CONTENT[lesson.id] || SAMPLE_CONTENT["1.1"];
    const quizQuestions = QUIZ_QUESTIONS[lesson.id] || QUIZ_QUESTIONS["1.6"];
    const isCompleted = user.completedLessons.includes(lesson.id);

    const steps = ['Contexte', 'Exemple', 'Pratique', 'Quiz', 'Récap'];

    const handleCompleteLesson = () => {
        if (!isCompleted) {
            addXP(lesson.xp);
            completeLesson(lesson.id);

            if (user.completedLessons.length === 0) {
                unlockBadge('premier-pas');
            }

            const allModuleLessons = mod.lessons.every(
                l => user.completedLessons.includes(l.id) || l.id === lesson.id
            );
            if (allModuleLessons) {
                const badgeMap = { 1: 'initiateur', 2: 'architecte-prompt', 3: 'pro-augmente', 4: 'automatiseur-elite', 5: 'stratege' };
                unlockBadge(badgeMap[mod.id]);
                triggerAlia('happy', `MODULE TERMINÉ ! Tu es incroyable ! 🚀🏆`, 3000);
            } else {
                triggerAlia('happy', `Leçon terminée ! +${lesson.xp} XP ! 🎉`, 2500);
            }

            confetti({
                particleCount: 80,
                spread: 60,
                colors: ['#7C3AED', '#A855F7', '#C084FC', '#F59E0B'],
                origin: { y: 0.7 },
            });
        }
        setLessonCompleted(true);
    };

    const handleQuizAnswer = (isCorrect) => {
        if (isCorrect) {
            const msg = CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
            triggerAlia('happy', msg, 2500);
        } else {
            const msg = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
            triggerAlia('sad', msg, 3000);
        }
    };

    const handleQuizComplete = (score) => {
        if (score >= 80) {
            unlockBadge('quiz-master');
        }
    };

    const handlePracticeLoading = (isLoading) => {
        if (isLoading) {
            triggerAlia('thinking', null);
        } else {
            setAliaState('idle');
            setAliaMessage(STEP_MESSAGES[2]);
        }
    };

    const goToNextLesson = () => {
        if (lessonIdx < mod.lessons.length - 1) {
            navigate(`/lesson/${mod.id}/${lessonIdx + 2}`);
            setCurrentStep(0);
            setLessonCompleted(false);
        } else {
            navigate('/dashboard');
        }
    };

    const goToPrevLesson = () => {
        if (lessonIdx > 0) {
            navigate(`/lesson/${mod.id}/${lessonIdx}`);
            setCurrentStep(0);
            setLessonCompleted(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', maxWidth: 900, margin: '0 auto', padding: '32px 24px', paddingBottom: 140 }}>
            {/* Breadcrumb */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                animation: 'fadeInUp 0.4s ease-out',
            }}>
                <Link to="/dashboard" style={{ color: 'var(--color-accent)' }}>Dashboard</Link>
                <span>›</span>
                <Link to="/dashboard" style={{ color: 'var(--color-accent)' }}>Module {mod.id}</Link>
                <span>›</span>
                <span style={{ color: 'white' }}>Leçon {lesson.id}</span>
            </div>

            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 24,
                animation: 'fadeInUp 0.4s ease-out 0.1s both',
            }}>
                <div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 8,
                    }}>
                        <span style={{ fontSize: '1.3rem' }}>{mod.icon}</span>
                        <span style={{
                            padding: '3px 10px',
                            borderRadius: 'var(--radius-full)',
                            background: `${mod.color}15`,
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            color: mod.color,
                        }}>
                            {mod.level}
                        </span>
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: 4,
                    }}>
                        {lesson.title}
                    </h1>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        fontSize: '0.8rem',
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-mono)',
                    }}>
                        <span>⏱ {lesson.duration || content.context.duration}</span>
                        <span style={{ color: 'var(--color-gold)' }}>💎 {lesson.xp} XP</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={goToPrevLesson}
                        disabled={lessonIdx === 0}
                        className="btn btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                    >
                        ← Précédent
                    </button>
                    <button
                        onClick={goToNextLesson}
                        className="btn btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                    >
                        Suivant →
                    </button>
                </div>
            </div>

            {/* Step progress */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                marginBottom: 40,
                animation: 'fadeInUp 0.4s ease-out 0.2s both',
            }}>
                {steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
                        <button
                            onClick={() => setCurrentStep(i)}
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                border: `2px solid ${i < currentStep ? 'var(--color-success)'
                                        : i === currentStep ? 'var(--color-primary-light)'
                                            : 'var(--color-border)'
                                    }`,
                                background: i < currentStep ? 'var(--color-success)'
                                    : i === currentStep ? 'var(--color-primary)'
                                        : 'transparent',
                                color: i <= currentStep ? 'white' : 'var(--color-text-muted)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                flexShrink: 0,
                            }}
                        >
                            {i < currentStep ? '✓' : i + 1}
                        </button>
                        {i < steps.length - 1 && (
                            <div style={{
                                flex: 1,
                                height: 2,
                                background: i < currentStep ? 'var(--color-success)' : 'var(--color-border)',
                                transition: 'background 0.3s ease',
                                margin: '0 4px',
                            }} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step labels */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: -30,
                marginBottom: 32,
                fontSize: '0.65rem',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-display)',
            }}>
                {steps.map((step, i) => (
                    <span key={i} style={{
                        width: 80,
                        textAlign: 'center',
                        color: i === currentStep ? 'var(--color-primary-light)' : undefined,
                        fontWeight: i === currentStep ? 600 : 400,
                    }}>
                        {step}
                    </span>
                ))}
            </div>

            {/* Step content */}
            <div className="glass" style={{
                padding: 32,
                animation: 'fadeInUp 0.4s ease-out',
                minHeight: 400,
            }}
                key={currentStep}
            >
                {/* STEP 1: Context */}
                {currentStep === 0 && (
                    <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.2rem',
                            marginBottom: 16,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}>
                            📖 Contexte
                        </h3>
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.95rem',
                            lineHeight: 1.8,
                            marginBottom: 24,
                            whiteSpace: 'pre-line',
                        }}>
                            {content.context.content}
                        </p>
                        <div style={{
                            padding: 20,
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(124, 58, 237, 0.08)',
                            border: '1px solid rgba(124, 58, 237, 0.15)',
                        }}>
                            <h4 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.95rem',
                                marginBottom: 12,
                                color: 'var(--color-accent)',
                            }}>
                                Points clés à retenir
                            </h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {content.context.keyPoints.map((point, i) => (
                                    <li key={i} style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--color-text-secondary)',
                                        paddingLeft: 16,
                                        position: 'relative',
                                    }}>
                                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary-light)' }}>▸</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => setCurrentStep(1)}
                            className="btn btn-primary"
                            style={{ marginTop: 24, width: '100%' }}
                        >
                            Continuer → Exemple concret
                        </button>
                    </div>
                )}

                {/* STEP 2: Example */}
                {currentStep === 1 && (
                    <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.2rem',
                            marginBottom: 16,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}>
                            💡 Exemple concret
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{
                                padding: 20,
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(239, 68, 68, 0.08)',
                                border: '1px solid rgba(239, 68, 68, 0.15)',
                            }}>
                                <div style={{
                                    fontSize: '0.7rem',
                                    fontFamily: 'var(--font-mono)',
                                    color: '#EF4444',
                                    marginBottom: 8,
                                    textTransform: 'uppercase',
                                }}>
                                    ❌ Avant (Sans IA)
                                </div>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-secondary)',
                                    fontFamily: 'var(--font-mono)',
                                    lineHeight: 1.6,
                                }}>
                                    {content.example.before}
                                </p>
                            </div>
                            <div style={{
                                padding: 20,
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(16, 185, 129, 0.08)',
                                border: '1px solid rgba(16, 185, 129, 0.15)',
                            }}>
                                <div style={{
                                    fontSize: '0.7rem',
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--color-success)',
                                    marginBottom: 8,
                                    textTransform: 'uppercase',
                                }}>
                                    ✅ Après (Avec IA)
                                </div>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-secondary)',
                                    fontFamily: 'var(--font-mono)',
                                    lineHeight: 1.6,
                                    whiteSpace: 'pre-line',
                                }}>
                                    {content.example.after}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setCurrentStep(2)}
                            className="btn btn-primary"
                            style={{ marginTop: 24, width: '100%' }}
                        >
                            Continuer → À ton tour !
                        </button>
                    </div>
                )}

                {/* Ad between example and practice (free users) */}
                {currentStep === 2 && (
                    <div style={{ marginBottom: 20 }}>
                        <AdBanner variant="horizontal" index={1} />
                    </div>
                )}

                {/* STEP 3: Practice */}
                {currentStep === 2 && (
                    <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
                        <PracticeZone lessonTitle={lesson.title} onLoadingChange={handlePracticeLoading} />
                        <button
                            onClick={() => setCurrentStep(3)}
                            className="btn btn-primary"
                            style={{ marginTop: 24, width: '100%' }}
                        >
                            Continuer → Quiz de validation
                        </button>
                    </div>
                )}

                {/* STEP 4: Quiz */}
                {currentStep === 3 && (
                    <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.2rem',
                            marginBottom: 20,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}>
                            📝 Quiz de validation
                        </h3>
                        <QuizCard questions={quizQuestions} onComplete={handleQuizComplete} onAnswer={handleQuizAnswer} moduleLabel={`Module ${mod.id} — ${mod.title}`} />
                        <button
                            onClick={() => {
                                setCurrentStep(4);
                                handleCompleteLesson();
                            }}
                            className="btn btn-primary"
                            style={{ marginTop: 24, width: '100%' }}
                        >
                            Continuer → Récap & Récompenses
                        </button>
                    </div>
                )}

                {/* STEP 5: Recap */}
                {currentStep === 4 && (
                    <div style={{ animation: 'fadeInUp 0.4s ease-out', textAlign: 'center' }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: 16,
                            animation: lessonCompleted ? 'badgeUnlock 0.8s ease-out' : 'none',
                        }}>
                            🎉
                        </div>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.5rem',
                            marginBottom: 8,
                        }}>
                            Leçon terminée !
                        </h3>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: 'var(--color-gold)',
                            marginBottom: 16,
                            animation: 'countUp 0.8s ease-out',
                        }}>
                            +{lesson.xp} XP
                        </div>

                        <div style={{
                            padding: 20,
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(124, 58, 237, 0.08)',
                            border: '1px solid rgba(124, 58, 237, 0.15)',
                            marginBottom: 24,
                            textAlign: 'left',
                        }}>
                            <h4 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.95rem',
                                marginBottom: 12,
                                color: 'var(--color-accent)',
                            }}>
                                📌 Ce que tu as appris
                            </h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {content.context.keyPoints.map((point, i) => (
                                    <li key={i} style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--color-text-secondary)',
                                        paddingLeft: 16,
                                        position: 'relative',
                                    }}>
                                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-success)' }}>✓</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={goToNextLesson}
                            className="btn btn-gamified"
                            style={{ padding: '14px 36px', fontSize: '1rem' }}
                        >
                            {lessonIdx < mod.lessons.length - 1 ? "Continuer l'aventure →" : "Retour au dashboard 🏠"}
                        </button>
                    </div>
                )}
            </div>

            {/* ═══ ALIA — Floating companion ═══ */}
            <AliaCharacter
                state={aliaState}
                size={90}
                message={aliaMessage}
                fixed
            />
        </div>
    );
}
