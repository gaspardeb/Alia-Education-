import { useState } from 'react';
import { Link } from 'react-router-dom';
import AIChat from '../components/AIChat';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function AskAIPage() {
    const { c } = useTheme();
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
                maxWidth: 1200,
                width: '100%',
                margin: '0 auto',
                padding: '32px 24px',
            }}>
                {/* ── Zone de chat principale ── */}
                <main className="glass" style={{ padding: 28, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)', maxHeight: 780 }}>
                    <div style={{ marginBottom: 20, flexShrink: 0 }}>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            marginBottom: 6,
                        }}>
                            Demande à l'IA
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
