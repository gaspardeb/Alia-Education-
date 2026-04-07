import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const AD_CONTENT = [
    {
        logo: '🚀',
        brand: 'Automatisez vos processus RH',
        tagline: 'Découvrez comment l\'IA transforme le recrutement et l\'onboarding en entreprise.',
        cta: 'En savoir plus',
        accent: '#6366F1',
    },
    {
        logo: '📊',
        brand: 'Formation IA pour vos équipes',
        tagline: 'Montez en compétences collectivement — programmes sur-mesure pour les entreprises.',
        cta: 'Demander un devis',
        accent: '#059669',
    },
];

export default function AdBanner({ variant = 'horizontal', index = 0 }) {
    const { isPremium } = useUser();
    const { c, isDark } = useTheme();
    const [dismissed, setDismissed] = useState(false);

    if (isPremium() || dismissed) return null;

    const ad = AD_CONTENT[index % AD_CONTENT.length];

    if (variant === 'horizontal') {
        return (
            <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                overflow: 'hidden',
            }}>
                {/* Publicité label */}
                <span style={{
                    position: 'absolute',
                    top: 5,
                    left: 8,
                    fontSize: '0.55rem',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    opacity: 0.5,
                }}>
                    Publicité
                </span>

                {/* Accent strip */}
                <div style={{
                    position: 'absolute',
                    left: 0, top: 0, bottom: 0,
                    width: 3,
                    background: ad.accent,
                    borderRadius: '4px 0 0 4px',
                }} />

                <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-sm)',
                    background: `${ad.accent}18`,
                    border: `1px solid ${ad.accent}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    flexShrink: 0,
                    marginTop: 6,
                }}>
                    {ad.logo}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        color: 'var(--color-text)',
                        marginBottom: 2,
                    }}>
                        {ad.brand}
                    </div>
                    <div style={{
                        fontSize: '0.72rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.4,
                    }}>
                        {ad.tagline}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <button style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: `1px solid ${ad.accent}50`,
                        background: `${ad.accent}12`,
                        color: ad.accent,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                    }}>
                        {ad.cta}
                    </button>

                    <Link
                        to="/pricing"
                        style={{
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid rgba(168,85,247,0.3)',
                            background: 'rgba(124,58,237,0.08)',
                            color: 'var(--color-accent)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            whiteSpace: 'nowrap',
                            textDecoration: 'none',
                        }}
                    >
                        ✨ Passer Premium
                    </Link>

                    <button
                        onClick={() => setDismissed(true)}
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            border: '1px solid var(--color-border)',
                            background: 'transparent',
                            color: 'var(--color-text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                        title="Fermer"
                    >
                        ✕
                    </button>
                </div>
            </div>
        );
    }

    // Square variant
    return (
        <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            padding: 16,
            overflow: 'hidden',
        }}>
            <span style={{
                fontSize: '0.55rem',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                opacity: 0.5,
                display: 'block',
                marginBottom: 10,
            }}>
                Publicité
            </span>

            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 3,
                background: ad.accent,
            }} />

            <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{ad.logo}</div>
            <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.8rem',
                marginBottom: 6,
                color: 'var(--color-text)',
            }}>
                {ad.brand}
            </div>
            <div style={{
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
                marginBottom: 12,
            }}>
                {ad.tagline}
            </div>
            <button style={{
                width: '100%',
                padding: '7px 10px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${ad.accent}50`,
                background: `${ad.accent}12`,
                color: ad.accent,
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.72rem',
                cursor: 'pointer',
                marginBottom: 8,
            }}>
                {ad.cta}
            </button>
            <Link
                to="/pricing"
                style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '0.68rem',
                    color: 'var(--color-accent)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)',
                }}
            >
                ✨ Supprimer les pubs — Premium
            </Link>

            <button
                onClick={() => setDismissed(true)}
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    background: 'transparent',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                title="Fermer"
            >
                ✕
            </button>
        </div>
    );
}
