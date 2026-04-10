import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MODULES, TESTIMONIALS } from '../data/modules';
import AliaCharacter from '../components/AliaCharacter';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const HERO_PHRASES = [
    'Dépassez vos limites.',
    'Boostez votre carrière.',
    'Prenez de l\'avance.',
    'Devenez expert IA.',
    'Changez de dimension.',
];

const FEATURES = [
    { icon: '🎮', title: 'Gamification complète', desc: 'XP, niveaux, badges, classement — chaque action te fait progresser.' },
    { icon: '🏢', title: "Cas d'usage réels", desc: 'Exercices directement applicables en entreprise dès demain.' },
    { icon: '🧠', title: 'Modules progressifs', desc: "Du débutant à l'expert en 5 étapes structurées." },
    { icon: '⚡', title: 'Apprentissage adaptatif', desc: "La plateforme s'adapte à ton rythme et ton niveau." },
    { icon: '🏆', title: 'Certifications', desc: 'Valide tes compétences avec des badges reconnus.' },
    { icon: '👥', title: 'Communauté', desc: 'Apprenez ensemble, progressez plus vite.' },
];

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.3 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [visible, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
    const navigate = useNavigate();
    const { c } = useTheme();
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setPhraseIndex(i => (i + 1) % HERO_PHRASES.length);
                setVisible(true);
            }, 400);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* ═══ HEADER ═══ */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '16px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: c.header,
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--color-border)',
            }}>
                <Link to="/" style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <img src="/assets/alia-mascotte.png" alt="ALIA" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                    <span><span style={{ color: 'var(--color-primary-light)' }}>ALIA</span></span>
                </Link>

                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 32,
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-display)',
                }}>
                    <a href="#features" style={{ color: 'var(--color-text-muted)', transition: 'color 0.3s' }}
                        onMouseEnter={e => e.target.style.color = 'white'}
                        onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                        Fonctionnalités
                    </a>
                    <a href="#modules" style={{ color: 'var(--color-text-muted)', transition: 'color 0.3s' }}
                        onMouseEnter={e => e.target.style.color = 'white'}
                        onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                        Modules
                    </a>
                    <a href="#testimonials" style={{ color: 'var(--color-text-muted)', transition: 'color 0.3s' }}
                        onMouseEnter={e => e.target.style.color = 'white'}
                        onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}>
                        Témoignages
                    </a>
                    <ThemeToggle compact />
                    <button onClick={() => navigate('/login')} className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                        Se connecter
                    </button>
                    <button onClick={() => navigate('/login?tab=register')} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                        Commencer
                    </button>
                </nav>
            </header>

            {/* ═══ HERO ═══ */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '120px 60px 80px',
                position: 'relative',
            }}>
                {/* Gradient orbs */}
                <div style={{
                    position: 'absolute',
                    top: '15%',
                    left: '5%',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
                    animation: 'float 6s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '5%',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
                    animation: 'float 8s ease-in-out infinite',
                    animationDelay: '1s',
                }} />

                {/* 2-column layout: text left, Alia right */}
                <div style={{
                    position: 'relative',
                    maxWidth: 1200,
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: 60,
                }}>
                    {/* Left: text content */}
                    <div>
                        <div style={{
                            display: 'inline-block',
                            padding: '6px 16px',
                            borderRadius: 'var(--radius-full)',
                            background: 'rgba(124, 58, 237, 0.15)',
                            border: '1px solid rgba(124, 58, 237, 0.3)',
                            fontSize: '0.8rem',
                            color: 'var(--color-accent)',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: 24,
                            animation: 'fadeInUp 0.6s ease-out',
                        }}>
                            ✨ La plateforme qui change tout
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            fontWeight: 700,
                            marginBottom: 20,
                            lineHeight: 1.05,
                            animation: 'fadeInUp 0.6s ease-out 0.1s both',
                        }}>
                            Maîtrisez l'IA.<br />
                            <span style={{ display: 'block', height: '1.05em', overflow: 'hidden' }}>
                                <span
                                    className="text-gradient"
                                    style={{
                                        display: 'block',
                                        whiteSpace: 'nowrap',
                                        opacity: visible ? 1 : 0,
                                        transform: visible ? 'translateY(0)' : 'translateY(10px)',
                                        transition: 'opacity 0.4s ease, transform 0.4s ease',
                                    }}
                                >
                                    {HERO_PHRASES[phraseIndex]}
                                </span>
                            </span>
                        </h1>

                        <p style={{
                            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                            color: 'var(--color-text-secondary)',
                            maxWidth: 560,
                            marginBottom: 40,
                            lineHeight: 1.6,
                            animation: 'fadeInUp 0.6s ease-out 0.2s both',
                        }}>
                            La première plateforme gamifiée pour apprendre à utiliser l'intelligence
                            artificielle en entreprise. Progressez. Débloquez. Excellez.
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: 16,
                            flexWrap: 'wrap',
                            animation: 'fadeInUp 0.6s ease-out 0.3s both',
                        }}>
                            <button onClick={() => navigate('/login?tab=register')} className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                                🚀 Démarrer l'aventure
                            </button>
                            <button className="btn btn-secondary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                                ▶ Voir la démo
                            </button>
                        </div>

                        {/* Stats counters */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: 16,
                            marginTop: 60,
                            animation: 'fadeInUp 0.6s ease-out 0.5s both',
                        }}>
                            {[
                                { value: 12000, suffix: '+', label: 'Apprenants' },
                                { value: 5, suffix: '', label: 'Modules' },
                                { value: 47, suffix: '', label: 'Leçons' },
                                { value: 98, suffix: '%', label: 'Satisfaction' },
                            ].map((s, i) => (
                                <div key={i} className="glass-light" style={{ padding: '16px 10px', textAlign: 'center' }}>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        color: 'var(--color-primary-light)',
                                        marginBottom: 4,
                                    }}>
                                        <AnimatedCounter end={s.value} suffix={s.suffix} />
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: ALIA mascot */}
                    <div style={{
                        animation: 'fadeInUp 0.8s ease-out 0.4s both',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 0,
                    }}>
                        <AliaCharacter
                            state="waving"
                            size={310}
                        />
                    </div>
                </div>
            </section>

            {/* ═══ FEATURES ═══ */}
            <section id="features" style={{
                padding: '100px 40px',
                maxWidth: 1200,
                margin: '0 auto',
            }}>
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                        marginBottom: 16,
                    }}>
                        Une expérience d'apprentissage<br />
                        <span className="text-gradient">hors du commun</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: 500, margin: '0 auto' }}>
                        Tout est conçu pour vous rendre accro à l'apprentissage de l'IA.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 20,
                }}>
                    {FEATURES.map((f, i) => (
                        <div
                            key={i}
                            className="glass"
                            style={{
                                padding: 28,
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div style={{
                                width: 50,
                                height: 50,
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(124, 58, 237, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                marginBottom: 16,
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.05rem',
                                fontWeight: 600,
                                marginBottom: 8,
                            }}>
                                {f.title}
                            </h3>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '0.85rem',
                                lineHeight: 1.6,
                            }}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ MODULES ═══ */}
            <section id="modules" style={{
                padding: '100px 40px',
                maxWidth: 1200,
                margin: '0 auto',
            }}>
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: 16 }}>
                        5 Modules pour devenir un<br />
                        <span className="text-gradient">Stratège IA</span>
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {MODULES.map((m, i) => (
                        <div
                            key={m.id}
                            className="glass"
                            style={{
                                padding: '20px 28px',
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr auto auto',
                                alignItems: 'center',
                                gap: 24,
                                transition: 'all 0.3s ease',
                                animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate('/login')}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateX(6px)';
                                e.currentTarget.style.borderColor = `${m.color}50`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.borderColor = '';
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                width: 48,
                                height: 48,
                                borderRadius: 'var(--radius-md)',
                                background: `${m.color}15`,
                                border: `1px solid ${m.color}30`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.4rem',
                                flexShrink: 0,
                            }}>
                                {m.icon}
                            </div>

                            {/* Title + description */}
                            <div style={{ minWidth: 0 }}>
                                <h3 style={{
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-display)',
                                    marginBottom: 3,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    Module {m.id} — {m.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.78rem',
                                    color: 'var(--color-text-muted)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {m.description}
                                </p>
                            </div>

                            {/* Leçons */}
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                color: 'var(--color-text-muted)',
                                whiteSpace: 'nowrap',
                            }}>
                                {m.lessons.length} leçons
                            </div>

                            {/* Level pill */}
                            <div style={{
                                padding: '4px 12px',
                                borderRadius: 'var(--radius-full)',
                                background: `${m.color}15`,
                                border: `1px solid ${m.color}30`,
                                fontSize: '0.7rem',
                                fontFamily: 'var(--font-mono)',
                                color: m.color,
                                whiteSpace: 'nowrap',
                            }}>
                                {m.level}
                            </div>

                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ TESTIMONIALS ═══ */}
            <section id="testimonials" style={{
                padding: '100px 40px',
                maxWidth: 1200,
                margin: '0 auto',
            }}>
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: 16 }}>
                        Ils ont <span className="text-gradient">déjà décollé</span>
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 20,
                }}>
                    {TESTIMONIALS.map((t, i) => (
                        <div
                            key={i}
                            className="glass"
                            style={{
                                padding: 28,
                                transition: 'all 0.3s ease',
                                animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div style={{ color: '#F59E0B', marginBottom: 12, fontSize: '0.9rem' }}>
                                {'★'.repeat(t.stars)}
                            </div>
                            <p style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: '0.9rem',
                                lineHeight: 1.6,
                                marginBottom: 20,
                                fontStyle: 'italic',
                            }}>
                                "{t.quote}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--font-mono)',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div style={{
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                    }}>{t.name}</div>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--color-text-muted)',
                                    }}>{t.role} — {t.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ CTA SECTION ═══ */}
            <section style={{
                padding: '100px 40px',
                textAlign: 'center',
            }}>
                <div className="glass" style={{
                    maxWidth: 700,
                    margin: '0 auto',
                    padding: '60px 40px',
                    borderImage: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.1)) 1',
                }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: 16 }}>
                        Prêt à <span className="text-gradient">décoller</span> ?
                    </h2>
                    <p style={{
                        color: 'var(--color-text-muted)',
                        marginBottom: 32,
                        maxWidth: 450,
                        margin: '0 auto 32px',
                    }}>
                        Rejoins +12 000 professionnels qui maîtrisent déjà l'IA grâce à ALIA.
                    </p>
                    <button onClick={() => navigate('/login?tab=register')} className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.05rem' }}>
                        🚀 Commencer gratuitement
                    </button>
                </div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer style={{
                padding: '40px',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 20,
            }}>
                <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                }}>
                    <img src="/assets/alia-mascotte.png" alt="ALIA" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                    <span style={{ color: 'var(--color-primary-light)' }}>ALIA</span>
                </div>
                <div style={{
                    display: 'flex',
                    gap: 24,
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                }}>
                    <span>Mentions légales</span>
                    <span>CGU</span>
                    <span>Politique de confidentialité</span>
                    <span>Contact</span>
                </div>
                <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                }}>
                    © 2026 ALIA. Tous droits réservés.
                </div>
            </footer>
        </div>
    );
}
