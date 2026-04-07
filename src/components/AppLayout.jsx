import { Link, useLocation, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import UserAvatar from './UserAvatar';
import XPBar from './XPBar';

const NAV_LINKS = [
    { label: 'Accueil',     path: '/dashboard' },
    { label: 'Modules',     path: '/modules' },
    { label: 'Badges',      path: '/badges' },
    { label: 'Progression', path: '/progression' },
    { label: 'Classement',  path: '/leaderboard' },
    { label: 'Ask AI',      path: '/ask-ai', highlight: true },
    { label: 'Paramètres',  path: '/settings' },
    { label: 'Premium',     path: '/pricing', isPricing: true },
];

export default function AppLayout() {
    const location = useLocation();
    const { user, getLevel, getNextLevel, isPremium } = useUser();
    const { c } = useTheme();
    const level = getLevel();
    const nextLevel = getNextLevel();

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* ═══ SIDEBAR ═══ */}
            <aside style={{
                width: 260,
                background: c.sidebar,
                backdropFilter: 'blur(20px)',
                borderRight: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                padding: '24px 0',
                position: 'fixed',
                top: 0, left: 0, bottom: 0,
                zIndex: 50,
            }}>
                {/* Logo */}
                <Link to="/" style={{
                    padding: '0 24px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: 32,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    textDecoration: 'none',
                }}>
                    <img src="/assets/alia-mascotte.png" alt="ALIA" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                    <span style={{ color: 'var(--color-primary-light)' }}>ALIA</span>
                </Link>

                {/* Theme toggle */}
                <div style={{ padding: '0 20px', marginBottom: 16 }}>
                    <ThemeToggle />
                </div>

                {/* User card */}
                <div style={{ padding: '0 20px', marginBottom: 28 }}>
                    <div style={{
                        padding: 16,
                        borderRadius: 'var(--radius-md)',
                        background: c.surface2,
                        border: '1px solid var(--color-border)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <UserAvatar size={42} fontSize="0.8rem" />
                            <div>
                                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem' }}>
                                    {user.firstName}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                                    Niv. {level.level} — {level.name}
                                </div>
                            </div>
                        </div>
                        <XPBar
                            current={user.xp - level.xpRequired}
                            max={nextLevel ? nextLevel.xpRequired - level.xpRequired : 1}
                            level={level.level}
                            levelName={level.name}
                            showLabel={false}
                            height={6}
                        />
                        <div style={{
                            fontSize: '0.65rem',
                            color: 'var(--color-text-muted)',
                            marginTop: 4,
                            fontFamily: 'var(--font-mono)',
                            textAlign: 'center',
                        }}>
                            {nextLevel ? `${nextLevel.xpRequired - user.xp} XP avant niveau ${nextLevel.level}` : 'Niveau max !'}
                        </div>
                    </div>
                </div>

                {/* Nav links */}
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {NAV_LINKS.map((link, i) => {
                        if (link.isPricing && isPremium()) return null;
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={i}
                                to={link.path}
                                style={{
                                    padding: '10px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    fontSize: '0.9rem',
                                    fontFamily: 'var(--font-display)',
                                    color: isActive ? 'white'
                                        : link.highlight ? 'var(--color-accent)'
                                        : link.isPricing ? 'var(--color-gold)'
                                        : 'var(--color-text-muted)',
                                    background: isActive ? 'rgba(124,58,237,0.15)'
                                        : link.highlight ? 'rgba(124,58,237,0.06)'
                                        : link.isPricing ? 'rgba(245,158,11,0.04)'
                                        : 'transparent',
                                    borderRight: isActive ? '3px solid var(--color-primary-light)' : '3px solid transparent',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {link.label}
                                {link.highlight && !isActive && (
                                    <span style={{
                                        marginLeft: 'auto',
                                        fontSize: '0.6rem',
                                        padding: '1px 6px',
                                        borderRadius: 'var(--radius-full)',
                                        background: 'rgba(124,58,237,0.2)',
                                        color: 'var(--color-accent)',
                                        fontFamily: 'var(--font-mono)',
                                    }}>NEW</span>
                                )}
                                {link.isPricing && (
                                    <span style={{
                                        marginLeft: 'auto',
                                        fontSize: '0.6rem',
                                        padding: '1px 6px',
                                        borderRadius: 'var(--radius-full)',
                                        background: 'rgba(245,158,11,0.15)',
                                        color: 'var(--color-gold)',
                                        fontFamily: 'var(--font-mono)',
                                    }}>UPGRADE</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Upgrade CTA (free users only) */}
                {!isPremium() && (
                    <Link
                        to="/pricing"
                        style={{
                            margin: '12px 16px 8px',
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-md)',
                            background: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(168,85,247,0.12))',
                            border: '1px solid rgba(168,85,247,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.28), rgba(168,85,247,0.2))'}
                        onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(168,85,247,0.12))'}
                    >
                        <div>
                            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--color-primary-light)' }}>
                                Passer Premium
                            </div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                                9,99€/mois · Sans pub
                            </div>
                        </div>
                    </Link>
                )}
            </aside>

            {/* ═══ PAGE CONTENT ═══ */}
            <div style={{ flex: 1, marginLeft: 260 }}>
                <Outlet />
            </div>
        </div>
    );
}
