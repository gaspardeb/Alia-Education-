import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const PLANS = [
    {
        id: 'free',
        name: 'Gratuit',
        price: '0€',
        period: '',
        badge: null,
        color: 'var(--color-text-muted)',
        accent: 'rgba(124,58,237,0.15)',
        border: 'var(--color-border)',
        features: [
            { text: '2 modules accessibles', ok: true },
            { text: 'Quiz & badges', ok: true },
            { text: 'Aide IA (3 utilisations/question)', ok: true },
            { text: 'Classement & streak', ok: true },
            { text: 'Publicités affichées', ok: false },
            { text: 'Tous les modules (5)', ok: false },
            { text: 'Aide IA illimitée', ok: false },
            { text: 'Certificats de complétion', ok: false },
            { text: 'Support prioritaire', ok: false },
        ],
        cta: 'Plan actuel',
        ctaDisabled: true,
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '9,99€',
        period: '/ mois',
        badge: '⭐ Recommandé',
        color: 'var(--color-primary-light)',
        accent: 'rgba(124,58,237,0.12)',
        border: 'rgba(168,85,247,0.5)',
        glow: 'rgba(168,85,247,0.15)',
        features: [
            { text: 'Tous les modules (5)', ok: true },
            { text: 'Quiz & badges', ok: true },
            { text: 'Aide IA illimitée', ok: true },
            { text: 'Classement & streak', ok: true },
            { text: 'Sans publicités', ok: true },
            { text: 'Certificats de complétion', ok: true },
            { text: 'Support par e-mail', ok: true },
            { text: 'Accès anticipé aux nouveaux modules', ok: true },
            { text: 'Tableau de bord avancé', ok: true },
        ],
        cta: 'Passer Premium',
        ctaDisabled: false,
    },
    {
        id: 'enterprise',
        name: 'École / Entreprise',
        price: 'Sur devis',
        period: '',
        badge: '🏢',
        color: 'var(--color-gold)',
        accent: 'rgba(245,158,11,0.08)',
        border: 'rgba(245,158,11,0.35)',
        features: [
            { text: 'Tout le plan Premium', ok: true },
            { text: 'Licences multi-utilisateurs', ok: true },
            { text: 'Tableau de bord administrateur', ok: true },
            { text: 'Modules personnalisés', ok: true },
            { text: 'Rapports de progression collective', ok: true },
            { text: 'Intégration LMS (Moodle, etc.)', ok: true },
            { text: 'Formation des formateurs', ok: true },
            { text: 'Support dédié & onboarding', ok: true },
            { text: 'Facturation annuelle simplifiée', ok: true },
        ],
        cta: 'Nous contacter',
        ctaDisabled: false,
    },
];

export default function PricingPage() {
    const { user, isPremium, upgradeSubscription } = useUser();
    const { c, isDark } = useTheme();
    const navigate = useNavigate();
    const [upgrading, setUpgrading] = useState(false);
    const [upgraded, setUpgraded] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    const handleCTA = (plan) => {
        if (plan.id === 'free') return;
        if (plan.id === 'enterprise') {
            setContactOpen(true);
            return;
        }
        if (plan.id === 'premium') {
            setUpgrading(true);
            setTimeout(() => {
                upgradeSubscription('premium');
                setUpgrading(false);
                setUpgraded(true);
                setTimeout(() => navigate('/dashboard'), 2000);
            }, 1200);
        }
    };

    const currentPlan = isPremium() ? 'premium' : 'free';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            {/* Header */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 50,
                padding: '14px 32px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: c.header,
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--color-border)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Link to="/dashboard" style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        color: 'var(--color-text-muted)', fontSize: '0.85rem',
                        fontFamily: 'var(--font-display)', transition: 'color 0.2s',
                        textDecoration: 'none',
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                    >
                        ← Dashboard
                    </Link>
                    <span style={{ color: 'var(--color-border)', fontSize: '1.2rem' }}>|</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img src="/assets/alia-mascotte.png" alt="ALIA" style={{ width: 26, height: 26, objectFit: 'contain' }} />
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>
                            <span style={{ color: 'var(--color-primary-light)' }}>ALIA</span> Premium
                        </span>
                    </div>
                </div>
                <ThemeToggle compact />
            </header>

            {/* Hero */}
            <div style={{
                textAlign: 'center', padding: '56px 24px 40px',
                animation: 'fadeInUp 0.5s ease-out',
            }}>
                <div style={{
                    display: 'inline-block',
                    padding: '4px 14px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(124,58,237,0.12)',
                    border: '1px solid rgba(124,58,237,0.25)',
                    fontSize: '0.75rem',
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: 20,
                }}>
                    ✨ Choisissez votre formule
                </div>
                <h1 style={{
                    fontFamily: 'var(--font-display)', fontSize: '2.2rem',
                    fontWeight: 700, marginBottom: 12,
                }}>
                    Apprenez à votre rythme,{' '}
                    <span style={{ color: 'var(--color-primary-light)' }}>sans limites</span>
                </h1>
                <p style={{
                    color: 'var(--color-text-muted)', fontSize: '1rem',
                    maxWidth: 520, margin: '0 auto',
                    lineHeight: 1.6,
                }}>
                    De la découverte à la maîtrise de l'IA, choisissez la formule qui correspond à vos besoins — ou à ceux de toute votre équipe.
                </p>
            </div>

            {/* Plans */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 24,
                maxWidth: 1060,
                width: '100%',
                margin: '0 auto',
                padding: '0 24px 64px',
            }}>
                {PLANS.map((plan, i) => {
                    const isCurrent = currentPlan === plan.id;
                    const isPopular = plan.id === 'premium';

                    return (
                        <div
                            key={plan.id}
                            className="glass"
                            style={{
                                padding: 28,
                                position: 'relative',
                                border: `1px solid ${isCurrent ? plan.border : isPopular ? plan.border : 'var(--color-border)'}`,
                                boxShadow: isPopular ? `0 0 40px ${plan.glow}` : undefined,
                                animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div style={{
                                    position: 'absolute',
                                    top: -13,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    padding: '3px 14px',
                                    borderRadius: 'var(--radius-full)',
                                    background: isPopular
                                        ? 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))'
                                        : 'rgba(245,158,11,0.15)',
                                    border: isPopular ? 'none' : '1px solid rgba(245,158,11,0.3)',
                                    fontSize: '0.68rem',
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-display)',
                                    color: isPopular ? 'white' : 'var(--color-gold)',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {plan.badge}
                                </div>
                            )}

                            {/* Plan name */}
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700, fontSize: '1.1rem',
                                color: plan.color,
                                marginBottom: 16,
                            }}>
                                {plan.name}
                            </div>

                            {/* Price */}
                            <div style={{ marginBottom: 24 }}>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: plan.id === 'enterprise' ? '1.4rem' : '2.2rem',
                                    fontWeight: 700,
                                    color: 'var(--color-text)',
                                }}>
                                    {plan.price}
                                </span>
                                {plan.period && (
                                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginLeft: 4 }}>
                                        {plan.period}
                                    </span>
                                )}
                            </div>

                            {/* Features */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 28 }}>
                                {plan.features.map((f, j) => (
                                    <div key={j} style={{
                                        display: 'flex', alignItems: 'flex-start', gap: 10,
                                        fontSize: '0.82rem',
                                        color: f.ok ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                                        opacity: f.ok ? 1 : 0.5,
                                    }}>
                                        <span style={{
                                            fontSize: '0.7rem', marginTop: 1, flexShrink: 0,
                                            color: f.ok ? 'var(--color-success)' : 'var(--color-error)',
                                        }}>
                                            {f.ok ? '✓' : '✕'}
                                        </span>
                                        {f.text}
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => handleCTA(plan)}
                                disabled={isCurrent || (plan.id === 'premium' && isPremium())}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: 'var(--radius-md)',
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    cursor: (isCurrent || (plan.id === 'premium' && isPremium())) ? 'default' : 'pointer',
                                    border: isPopular ? 'none' : `1px solid ${plan.border}`,
                                    background: isPopular
                                        ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))'
                                        : plan.id === 'enterprise'
                                            ? 'rgba(245,158,11,0.1)'
                                            : 'transparent',
                                    color: isPopular ? 'white' : plan.id === 'enterprise' ? 'var(--color-gold)' : 'var(--color-text-muted)',
                                    opacity: isCurrent ? 0.5 : 1,
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {upgrading && plan.id === 'premium' ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                        <span style={{
                                            width: 14, height: 14, borderRadius: '50%',
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            borderTop: '2px solid white',
                                            display: 'inline-block',
                                            animation: 'spin 0.8s linear infinite',
                                        }} />
                                        Activation...
                                    </span>
                                ) : upgraded && plan.id === 'premium' ? (
                                    '✓ Activé ! Redirection...'
                                ) : isCurrent ? (
                                    '✓ Plan actuel'
                                ) : (
                                    plan.cta
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* ══ CONTACT SECTION ══ */}
            <div
                id="contact"
                style={{
                    maxWidth: 700,
                    width: '100%',
                    margin: '0 auto',
                    padding: '0 24px 80px',
                    animation: 'fadeInUp 0.5s ease-out 0.35s both',
                }}
            >
                <div className="glass" style={{ padding: 36, textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 12 }}>🏢</div>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.4rem', fontWeight: 700, marginBottom: 8,
                    }}>
                        Vous êtes une école ou une entreprise ?
                    </h2>
                    <p style={{
                        color: 'var(--color-text-muted)', fontSize: '0.9rem',
                        lineHeight: 1.6, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px',
                    }}>
                        Déployez ALIA pour toute votre équipe. Tarifs sur devis selon le nombre d'utilisateurs, formations personnalisées et support dédié.
                    </p>

                    <div style={{
                        display: 'flex', flexDirection: 'column', gap: 16,
                        alignItems: 'center',
                    }}>
                        {/* Email */}
                        <a
                            href="mailto:contact@alia-education.com"
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '14px 24px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(124,58,237,0.25)',
                                background: 'rgba(124,58,237,0.08)',
                                color: 'var(--color-text)',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                width: '100%', maxWidth: 360,
                                justifyContent: 'center',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)';
                                e.currentTarget.style.background = 'rgba(124,58,237,0.14)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)';
                                e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>✉️</span>
                            contact@alia-education.com
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/alia.educ"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '14px 24px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(225,48,108,0.25)',
                                background: 'rgba(225,48,108,0.06)',
                                color: 'var(--color-text)',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                width: '100%', maxWidth: 360,
                                justifyContent: 'center',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(225,48,108,0.5)';
                                e.currentTarget.style.background = 'rgba(225,48,108,0.12)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(225,48,108,0.25)';
                                e.currentTarget.style.background = 'rgba(225,48,108,0.06)';
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig)" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="4" stroke="url(#ig)" strokeWidth="2"/>
                                <circle cx="17.5" cy="6.5" r="1" fill="#E1306C"/>
                                <defs>
                                    <linearGradient id="ig" x1="2" y1="2" x2="22" y2="22">
                                        <stop offset="0%" stopColor="#F58529"/>
                                        <stop offset="50%" stopColor="#E1306C"/>
                                        <stop offset="100%" stopColor="#833AB4"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            @alia.educ
                        </a>
                    </div>

                    <p style={{
                        marginTop: 24,
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.5,
                    }}>
                        Réponse sous 48h · Démo gratuite disponible · Facturation adaptée au secteur public
                    </p>
                </div>
            </div>

            {/* Contact modal (from enterprise CTA) */}
            {contactOpen && (
                <div
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 200,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 24,
                    }}
                    onClick={() => setContactOpen(false)}
                >
                    <div
                        className="glass"
                        style={{ maxWidth: 460, width: '100%', padding: 36, animation: 'fadeInUp 0.3s ease-out' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 style={{
                            fontFamily: 'var(--font-display)', fontSize: '1.3rem',
                            fontWeight: 700, marginBottom: 8,
                        }}>
                            Contactez-nous 🏢
                        </h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: 24, lineHeight: 1.5 }}>
                            Parlez-nous de votre besoin et nous vous préparerons une offre personnalisée.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                            <a href="mailto:contact@alia-education.com" style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '12px 16px', borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(124,58,237,0.25)',
                                background: 'rgba(124,58,237,0.08)',
                                color: 'var(--color-text)', textDecoration: 'none',
                                fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 600,
                            }}>
                                <span>✉️</span> contact@alia-education.com
                            </a>
                            <a href="https://www.instagram.com/alia.educ" target="_blank" rel="noopener noreferrer" style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '12px 16px', borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(225,48,108,0.25)',
                                background: 'rgba(225,48,108,0.06)',
                                color: 'var(--color-text)', textDecoration: 'none',
                                fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 600,
                            }}>
                                <span>📸</span> Instagram : @alia.educ
                            </a>
                        </div>

                        <button
                            onClick={() => setContactOpen(false)}
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
