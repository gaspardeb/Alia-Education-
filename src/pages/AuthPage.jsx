import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import AliaCharacter from '../components/AliaCharacter';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function AuthPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [tab, setTab] = useState(searchParams.get('tab') === 'register' ? 'register' : 'login');
    const [loading, setLoading] = useState(false);
    const { c, isDark } = useTheme();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 800);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                colors: ['#7C3AED', '#A855F7', '#C084FC', '#F59E0B'],
                origin: { y: 0.6 },
            });
            setTimeout(() => navigate('/dashboard'), 1200);
        }, 800);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
        }}>
            {/* ═══ LEFT PANEL — Visual ═══ */}
            <div style={{
                background: c.authLeft,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 60,
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Gradient orbs */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '20%',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent)',
                    animation: 'float 5s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '30%',
                    right: '15%',
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168,85,247,0.15), transparent)',
                    animation: 'float 7s ease-in-out infinite',
                }} />

                <div style={{
                    position: 'relative',
                    textAlign: 'center',
                    animation: 'fadeInUp 0.6s ease-out',
                }}>
                    {/* Alia mascot */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                        <AliaCharacter
                            state="waving"
                            size={180}
                        />
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: 12,
                    }}>
                        <span style={{ color: 'var(--color-primary-light)' }}>ALIA</span>
                    </h2>
                    <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.95rem',
                        marginBottom: 40,
                    }}>
                        Maîtrisez l'IA. Dépassez vos limites.
                    </p>

                    {/* Animated stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { icon: '💎', label: 'XP distribués', value: '2.4M+', color: 'var(--color-primary-light)' },
                            { icon: '🏆', label: 'Badges débloqués', value: '45,000+', color: 'var(--color-gold)' },
                            { icon: '🔥', label: 'Streak record', value: '127 jours', color: '#EF4444' },
                            { icon: '📊', label: 'Classement actif', value: '8,400 joueurs', color: 'var(--color-success)' },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="glass-light"
                                style={{
                                    padding: '12px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    animation: `slideInLeft 0.5s ease-out ${(i + 1) * 0.15}s both`,
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                                <span style={{ flex: 1, fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'left' }}>
                                    {s.label}
                                </span>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    color: s.color,
                                }}>
                                    {s.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ RIGHT PANEL — Form ═══ */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 40,
                background: 'var(--color-bg)',
                position: 'relative',
            }}>
                {/* Toggle thème en haut à droite */}
                <div style={{ position: 'absolute', top: 20, right: 20 }}>
                    <ThemeToggle compact />
                </div>
                <div style={{
                    width: '100%',
                    maxWidth: 420,
                    animation: 'fadeInUp 0.5s ease-out',
                }}>
                    {/* Tab toggle */}
                    <div style={{
                        display: 'flex',
                        gap: 4,
                        marginBottom: 36,
                        padding: 4,
                        borderRadius: 'var(--radius-lg)',
                        background: c.surface,
                        border: '1px solid var(--color-border)',
                    }}>
                        {['login', 'register'].map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                style={{
                                    flex: 1,
                                    padding: '10px 0',
                                    borderRadius: 'var(--radius-md)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s ease',
                                    background: tab === t
                                        ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))'
                                        : 'transparent',
                                    color: tab === t ? 'white' : 'var(--color-text-muted)',
                                }}
                            >
                                {t === 'login' ? 'Se connecter' : "S'inscrire"}
                            </button>
                        ))}
                    </div>

                    {tab === 'login' ? (
                        <form onSubmit={handleLogin}>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.5rem',
                                marginBottom: 8,
                            }}>
                                Content de te revoir !
                            </h2>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '0.9rem',
                                marginBottom: 28,
                            }}>
                                Connecte-toi pour reprendre l'aventure.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>Email</label>
                                    <input type="email" className="input-field" placeholder="ton@email.com" defaultValue="gaspard@alia.education" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>Mot de passe</label>
                                    <input type="password" className="input-field" placeholder="••••••••" defaultValue="password" />
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <a style={{ fontSize: '0.8rem', color: 'var(--color-accent)', cursor: 'pointer' }}>
                                        Mot de passe oublié ?
                                    </a>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={loading}>
                                    {loading ? 'Connexion...' : 'Se connecter'}
                                </button>
                            </div>

                            {/* Separator */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                margin: '24px 0',
                            }}>
                                <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>ou</span>
                                <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
                            </div>

                            {/* SSO */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <button type="button" className="btn btn-secondary" style={{
                                    width: '100%',
                                    padding: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 10,
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                    Continuer avec Google
                                </button>
                                <button type="button" className="btn btn-secondary" style={{
                                    width: '100%',
                                    padding: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 10,
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#00A4EF"><path d="M1 1h10.5v10.5H1V1zm12.5 0H24v10.5H13.5V1zM1 13.5h10.5V24H1V13.5zm12.5 0H24V24H13.5V13.5z" /></svg>
                                    Continuer avec Microsoft
                                </button>
                            </div>

                            <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                Pas encore de compte ?{' '}
                                <span onClick={() => setTab('register')} style={{ color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 600 }}>
                                    Rejoindre ALIA
                                </span>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister}>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.5rem',
                                marginBottom: 8,
                            }}>
                                Bienvenue à bord !
                            </h2>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '0.9rem',
                                marginBottom: 28,
                            }}>
                                Crée ton compte et commence l'aventure.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>Prénom</label>
                                        <input className="input-field" placeholder="Jean" />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>Nom</label>
                                        <input className="input-field" placeholder="Dupont" />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>Email</label>
                                    <input type="email" className="input-field" placeholder="jean@entreprise.com" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>Mot de passe</label>
                                    <input type="password" className="input-field" placeholder="Minimum 8 caractères" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>Entreprise <span style={{ opacity: 0.5 }}>(optionnel)</span></label>
                                    <input className="input-field" placeholder="Mon entreprise" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>Poste <span style={{ opacity: 0.5 }}>(optionnel)</span></label>
                                    <input className="input-field" placeholder="Product Manager" />
                                </div>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 10,
                                    fontSize: '0.8rem',
                                    color: 'var(--color-text-muted)',
                                    cursor: 'pointer',
                                }}>
                                    <input type="checkbox" style={{ marginTop: 3, accentColor: 'var(--color-primary)' }} />
                                    J'accepte les conditions générales d'utilisation et la politique de confidentialité.
                                </label>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: 8 }} disabled={loading}>
                                    {loading ? 'Création...' : 'Créer mon compte'}
                                </button>
                            </div>

                            <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                Déjà un compte ?{' '}
                                <span onClick={() => setTab('login')} style={{ color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 600 }}>
                                    Se connecter
                                </span>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
