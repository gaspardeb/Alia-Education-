import { useState } from 'react';

export default function PracticeZone({ lessonTitle, onLoadingChange }) {
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState([]);

    const simulateAIFeedback = (text) => {
        const feedbacks = [
            {
                score: 85,
                message: "Excellent prompt ! Vous avez bien défini le rôle et le contexte. Quelques améliorations possibles :",
                tips: [
                    "Ajoutez un format de sortie plus précis (bullet points, tableau, etc.)",
                    "Précisez le ton attendu (formel, conversationnel)",
                    "Considérez ajouter des contraintes de longueur"
                ]
            },
            {
                score: 72,
                message: "Bon début ! Votre prompt couvre l'essentiel mais pourrait être optimisé :",
                tips: [
                    "Ajoutez un rôle spécifique à l'IA (ex: 'Tu es un expert en...')",
                    "Fournissez un exemple de la sortie attendue (few-shot)",
                    "Structurez votre prompt avec des sections claires"
                ]
            },
            {
                score: 93,
                message: "Prompt remarquable ! Vous maîtrisez les techniques avancées :",
                tips: [
                    "Le chain-of-thought est bien utilisé",
                    "Le format de sortie est clair",
                    "Pour aller plus loin : ajoutez des edge cases à gérer"
                ]
            },
        ];
        return feedbacks[Math.floor(Math.random() * feedbacks.length)];
    };

    const handleSubmit = () => {
        if (!input.trim()) return;
        setLoading(true);
        onLoadingChange?.(true);
        setTimeout(() => {
            const result = simulateAIFeedback(input);
            setFeedback(result);
            setAttempts(prev => [...prev, { text: input, ...result }]);
            setLoading(false);
            onLoadingChange?.(false);
        }, 1500);
    };

    return (
        <div>
            <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
            }}>
                🎯 À ton tour !
            </h4>
            <p style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
                marginBottom: 16,
                lineHeight: 1.5,
            }}>
                Écris ton prompt ci-dessous et teste-le avec l'IA pour obtenir un feedback instantané.
            </p>

            {/* Input area */}
            <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                marginBottom: 16,
            }}>
                {/* Terminal header */}
                <div style={{
                    padding: '8px 16px',
                    background: 'rgba(13, 10, 26, 0.8)',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
                    <span style={{
                        marginLeft: 8,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-muted)',
                    }}>
                        prompt-editor
                    </span>
                </div>
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Écris ton prompt ici..."
                    rows={6}
                    style={{
                        width: '100%',
                        padding: 16,
                        background: 'rgba(13, 10, 26, 0.6)',
                        border: 'none',
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        resize: 'vertical',
                        outline: 'none',
                    }}
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
                className="btn btn-gamified"
                style={{ width: '100%', marginBottom: 20 }}
            >
                {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ animation: 'pulse-glow 1s infinite' }}>⏳</span>
                        Analyse en cours...
                    </span>
                ) : (
                    '🤖 Tester avec l\'IA'
                )}
            </button>

            {/* Feedback */}
            {feedback && (
                <div style={{
                    padding: 20,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(37, 27, 74, 0.4)',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                    animation: 'fadeInUp 0.5s ease-out',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: 16,
                    }}>
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: feedback.score >= 80
                                ? 'linear-gradient(135deg, #059669, #10B981)'
                                : 'linear-gradient(135deg, #B45309, #F59E0B)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                        }}>
                            {feedback.score}
                        </div>
                        <div>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                            }}>
                                Feedback IA
                            </div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--color-text-muted)',
                            }}>
                                Score de qualité
                            </div>
                        </div>
                    </div>
                    <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-text-secondary)',
                        marginBottom: 12,
                        lineHeight: 1.5,
                    }}>
                        {feedback.message}
                    </p>
                    <ul style={{
                        listStyle: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}>
                        {feedback.tips.map((tip, i) => (
                            <li key={i} style={{
                                fontSize: '0.8rem',
                                color: 'var(--color-text-muted)',
                                paddingLeft: 16,
                                position: 'relative',
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    left: 0,
                                    color: 'var(--color-accent)',
                                }}>→</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Attempts history */}
            {attempts.length > 1 && (
                <div style={{ marginTop: 20 }}>
                    <h5 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-muted)',
                        marginBottom: 8,
                    }}>
                        Historique ({attempts.length} tentatives)
                    </h5>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {attempts.map((a, i) => (
                            <div key={i} style={{
                                width: 32,
                                height: 32,
                                borderRadius: 'var(--radius-sm)',
                                background: a.score >= 80
                                    ? 'rgba(16,185,129,0.2)'
                                    : 'rgba(245,158,11,0.2)',
                                border: `1px solid ${a.score >= 80 ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                color: a.score >= 80 ? 'var(--color-success)' : 'var(--color-gold)',
                            }}>
                                {a.score}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
