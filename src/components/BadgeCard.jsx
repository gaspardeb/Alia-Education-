export default function BadgeCard({ badge, unlocked, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                padding: '24px 16px',
                borderRadius: 'var(--radius-lg)',
                background: unlocked
                    ? 'var(--color-surface-2)'
                    : 'var(--color-surface)',
                border: unlocked
                    ? '1px solid rgba(168, 85, 247, 0.3)'
                    : '1px solid rgba(124, 58, 237, 0.1)',
                cursor: unlocked ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
            }}
            onMouseEnter={e => {
                if (unlocked) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                }
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = unlocked
                    ? 'rgba(168, 85, 247, 0.3)'
                    : 'rgba(124, 58, 237, 0.1)';
            }}
        >
            <div style={{
                fontSize: '2.5rem',
                filter: unlocked ? 'none' : 'grayscale(100%) blur(1px)',
                opacity: unlocked ? 1 : 0.3,
                animation: unlocked ? 'glow-pulse 3s infinite' : 'none',
            }}>
                {badge.icon}
            </div>
            <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.85rem',
                color: unlocked ? 'var(--color-text)' : 'var(--color-text-muted)',
                textAlign: 'center',
                opacity: unlocked ? 1 : 0.5,
            }}>
                {badge.name}
            </span>
            <span style={{
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
                textAlign: 'center',
                opacity: unlocked ? 0.8 : 0.4,
            }}>
                {badge.condition}
            </span>
            {unlocked && (
                <div style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    fontSize: '0.6rem',
                    color: 'var(--color-success)',
                    fontFamily: 'var(--font-mono)',
                }}>
                    ✓
                </div>
            )}
            {!unlocked && (
                <div style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    fontSize: '0.75rem',
                }}>
                    🔒
                </div>
            )}
        </div>
    );
}
