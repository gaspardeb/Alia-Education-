import { useState, useRef, useEffect } from 'react';
import AIChat from './AIChat';
import { useTheme } from '../context/ThemeContext';

const MAX_USES = 3;

/* ─────────────────────────────────────────────
   QuizAIWidget
   Props:
   - question  : string  (texte de la question en cours)
   - module    : string  (ex. "Module 2 — Prompt Master")
   - onLoading : (bool) => void
───────────────────────────────────────────── */
export default function QuizAIWidget({ question, module: moduleName, onLoading }) {
    const { c, isDark } = useTheme();
    const [open, setOpen] = useState(false);
    const [usesLeft, setUsesLeft] = useState(MAX_USES);
    const [usedOnce, setUsedOnce] = useState(false);
    const panelRef = useRef(null);

    // Reset si la question change (nouvelle question du quiz)
    useEffect(() => {
        setOpen(false);
        setUsesLeft(MAX_USES);
        setUsedOnce(false);
    }, [question]);

    // Hauteur animée du panneau
    useEffect(() => {
        if (!panelRef.current) return;
        panelRef.current.style.maxHeight = open ? '520px' : '0px';
        panelRef.current.style.opacity = open ? '1' : '0';
    }, [open]);

    const handleOpen = () => {
        if (usesLeft <= 0) return;
        if (!open) {
            setUsesLeft(u => u - 1);
            setUsedOnce(true);
        }
        setOpen(o => !o);
    };

    const handleLoading = (loading) => {
        onLoading?.(loading);
    };

    const context = { question, module: moduleName };

    const usesColor = usesLeft === 0 ? 'var(--color-error)'
        : usesLeft === 1 ? 'var(--color-gold)'
            : 'var(--color-success)';

    return (
        <div style={{ marginTop: 20 }}>
            {/* ── Bouton toggle ── */}
            <button
                onClick={handleOpen}
                disabled={usesLeft <= 0 && !open}
                style={{
                    width: '100%',
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${usesLeft === 0 ? 'rgba(239,68,68,0.2)' : 'rgba(124, 58, 237, 0.2)'}`,
                    background: open
                        ? 'rgba(124, 58, 237, 0.12)'
                        : usesLeft === 0
                            ? 'rgba(239, 68, 68, 0.06)'
                            : 'rgba(124, 58, 237, 0.06)',
                    cursor: usesLeft <= 0 && !open ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    opacity: usesLeft <= 0 && !open ? 0.6 : 1,
                }}
                onMouseEnter={e => {
                    if (usesLeft > 0 || open) {
                        e.currentTarget.style.background = 'rgba(124, 58, 237, 0.12)';
                        e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.35)';
                    }
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = open
                        ? 'rgba(124, 58, 237, 0.12)'
                        : 'rgba(124, 58, 237, 0.06)';
                    e.currentTarget.style.borderColor = usesLeft === 0 ? 'rgba(239,68,68,0.2)' : 'rgba(124, 58, 237, 0.2)';
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img
                        src="/assets/alia-mascotte.png"
                        alt="ALIA"
                        style={{ width: 24, height: 24, objectFit: 'contain' }}
                    />
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: usesLeft === 0 && !open ? 'var(--color-error)' : 'var(--color-text)',
                    }}>
                        {usesLeft === 0 && !open
                            ? '❌ Plus d\'aide disponible pour cette question'
                            : open
                                ? '✕ Fermer l\'aide'
                                : '💡 Besoin d\'aide ? Demande à ALIA'
                        }
                    </span>
                </div>

                {/* Compteur d'utilisations */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: usesColor,
                }}>
                    {[...Array(MAX_USES)].map((_, i) => (
                        <div key={i} style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: i < usesLeft ? usesColor : 'rgba(124, 58, 237, 0.15)',
                            transition: 'all 0.3s',
                        }} />
                    ))}
                    <span style={{ marginLeft: 4, opacity: 0.8 }}>
                        {usesLeft}/{MAX_USES}
                    </span>
                </div>
            </button>

            {/* ── Panneau collapsible ── */}
            <div
                ref={panelRef}
                style={{
                    maxHeight: 0,
                    opacity: 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease',
                }}
            >
                <div style={{
                    marginTop: 8,
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    background: c.surface2,
                    border: '1px solid var(--color-border)',
                }}>
                    {/* Contexte affiché */}
                    <div style={{
                        marginBottom: 12,
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(124, 58, 237, 0.08)',
                        border: '1px solid rgba(124, 58, 237, 0.12)',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.4,
                    }}>
                        <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                            📌 {moduleName}
                        </span>
                        <br />
                        <span style={{ fontStyle: 'italic', marginTop: 2, display: 'block' }}>"{question}"</span>
                    </div>

                    <AIChat
                        context={context}
                        compact
                        placeholder="Qu'est-ce que tu ne comprends pas ?"
                        onLoading={handleLoading}
                    />
                </div>
            </div>
        </div>
    );
}
