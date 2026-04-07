export default function NotificationToast({ notifications }) {
    return (
        <div style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
        }}>
            {notifications.map(n => (
                <div
                    key={n.id}
                    style={{
                        padding: '14px 20px',
                        borderRadius: 'var(--radius-md)',
                        animation: 'slide-in-toast 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        boxShadow: n.type === 'xp'
                            ? '0 0 20px rgba(168, 85, 247, 0.4)'
                            : n.type === 'badge'
                                ? '0 0 20px rgba(245, 158, 11, 0.4)'
                                : '0 0 20px rgba(16, 185, 129, 0.4)',
                        background: n.type === 'xp'
                            ? 'linear-gradient(135deg, #7C3AED, #A855F7)'
                            : n.type === 'badge'
                                ? 'linear-gradient(135deg, #B45309, #F59E0B)'
                                : n.type === 'levelup'
                                    ? 'linear-gradient(135deg, #059669, #10B981)'
                                    : 'linear-gradient(135deg, #1A1332, #251B4A)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.15)',
                        minWidth: 260,
                    }}
                >
                    <span style={{ fontSize: '1.2rem' }}>
                        {n.type === 'xp' ? '💎' : n.type === 'badge' ? '🏆' : n.type === 'levelup' ? '🎉' : '🔔'}
                    </span>
                    {n.message}
                </div>
            ))}
        </div>
    );
}
