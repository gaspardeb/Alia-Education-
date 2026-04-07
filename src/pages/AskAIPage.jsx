import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AIChat from '../components/AIChat';
import AliaCharacter from '../components/AliaCharacter';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const SUGGESTED_TOPICS = [
    { icon: '✍️', label: 'Prompting', desc: 'Techniques de prompt engineering' },
    { icon: '🧠', label: 'IA générative', desc: 'LLMs, GPT, Claude, Gemini…' },
    { icon: '⚡', label: 'Automatisation', desc: 'Workflows et gains de productivité' },
    { icon: '📊', label: 'ROI & Stratégie', desc: 'Mesurer et piloter l\'IA en entreprise' },
    { icon: '⚖️', label: 'Éthique IA', desc: 'Biais, gouvernance, responsabilité' },
    { icon: '🔗', label: 'Chain-of-Thought', desc: 'Raisonnement guidé pas à pas' },
];

export default function AskAIPage() {
    const navigate = useNavigate();
    const { c, isDark } = useTheme();
    const [aliaState, setAliaState] = useState('idle');

    const handleLoading = (loading) => {
        setAliaState(loading ? 'thinking' : 'idle');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            {/* ─── Header ─── */}
            <header style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                padding: '14px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: c.header,
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--color-border)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Link to="/dashboard" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        color: 'var(--color-text-muted)',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-display)',
                        transition: 'color 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                    >
                        ← Dashboard
                    </Link>
                    <span style={{ color: 'var(--color-border)', fontSize: '1.2rem' }}>|</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img src="/assets/alia-mascotte.png" alt="ALIA" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                        <span style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1.05rem',
                        }}>
                            Ask <span style={{ color: 'var(--color-primary-light)' }}>ALIA</span>
                        </span>
                        <span style={{
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                            background: 'rgba(124, 58, 237, 0.15)',
                            fontSize: '0.65rem',
                            color: 'var(--color-accent)',
                            fontFamily: 'var(--font-mono)',
                            border: '1px solid rgba(124, 58, 237, 0.2)',
                        }}>
                            Assistant pédagogique
                        </span>
                    </div>
                </div>
                <ThemeToggle compact />
            </header>

            {/* ─── Body ─── */}
            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '280px 1fr',
                maxWidth: 1200,
                width: '100%',
                margin: '0 auto',
                padding: '32px 24px',
                gap: 28,
                alignItems: 'start',
            }}>

                {/* ── Panneau gauche : ALIA + sujets ── */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 90 }}>

                    {/* ALIA avec état dynamique */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <AliaCharacter
                            state={aliaState}
                            size={160}
                            message={aliaState === 'thinking' ? 'Je réfléchis à ta question... 🤔' : null}
                        />
                        <p style={{
                            fontSize: '0.78rem',
                            color: 'var(--color-text-muted)',
                            textAlign: 'center',
                            fontFamily: 'var(--font-display)',
                            lineHeight: 1.4,
                        }}>
                            {aliaState === 'thinking'
                                ? 'En train de formuler une réponse pédagogique...'
                                : 'Prête à t\'aider à comprendre !'
                            }
                        </p>
                    </div>

                    {/* Sujets suggérés */}
                    <div className="glass" style={{ padding: 16 }}>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--color-text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginBottom: 12,
                        }}>
                            Sujets clés
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {SUGGESTED_TOPICS.map((t, i) => (
                                <div key={i} style={{
                                    padding: '8px 10px',
                                    borderRadius: 'var(--radius-sm)',
                                    cursor: 'default',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    transition: 'background 0.2s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(124, 58, 237, 0.08)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <span style={{ fontSize: '1rem' }}>{t.icon}</span>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text)' }}>
                                            {t.label}
                                        </div>
                                        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: 1 }}>
                                            {t.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rappel pédagogique */}
                    <div style={{
                        padding: 12,
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(16, 185, 129, 0.07)',
                        border: '1px solid rgba(16, 185, 129, 0.15)',
                        fontSize: '0.72rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.5,
                    }}>
                        💡 <strong>Astuce :</strong> Plus ta question est précise, plus ALIA peut t'aider efficacement. Décris ce que tu as déjà compris et ce qui te bloque.
                    </div>
                </aside>

                {/* ── Zone de chat principale ── */}
                <main className="glass" style={{ padding: 28, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)', maxHeight: 780 }}>
                    <div style={{ marginBottom: 20, flexShrink: 0 }}>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            marginBottom: 6,
                        }}>
                            Demande à l'IA 🤖
                        </h1>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                            Pose n'importe quelle question sur les modules. ALIA t'explique, donne des exemples et te guide vers la compréhension — sans jamais te donner la réponse directe.
                        </p>
                    </div>

                    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <AIChat onLoading={handleLoading} />
                    </div>
                </main>
            </div>
        </div>
    );
}
