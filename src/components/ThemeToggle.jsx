import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ compact = false }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: compact ? 0 : 8,
                padding: compact ? '8px' : '8px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                background: isDark ? 'rgba(124, 58, 237, 0.1)' : 'rgba(124, 58, 237, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(124, 58, 237, 0.2)';
                e.currentTarget.style.borderColor = 'var(--color-border-hover)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = isDark ? 'rgba(124, 58, 237, 0.1)' : 'rgba(124, 58, 237, 0.08)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
        >
            {/* Icône soleil / lune animée */}
            <span style={{
                fontSize: '1rem',
                display: 'inline-block',
                transition: 'transform 0.4s ease',
                transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
            }}>
                {isDark ? '☀️' : '🌙'}
            </span>
            {!compact && (
                <span style={{ color: 'var(--color-text-muted)' }}>
                    {isDark ? 'Mode clair' : 'Mode sombre'}
                </span>
            )}
        </button>
    );
}
