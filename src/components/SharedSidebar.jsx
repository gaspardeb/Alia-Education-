import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

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

export default function SharedSidebar() {
    const location = useLocation();
    const { isPremium } = useUser();
    const { c } = useTheme();

    return (
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

            {/* Nav */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {NAV_LINKS.map((link, i) => {
                    if (link.isPricing && isPremium?.()) return null;
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
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
