import { useNavigate } from 'react-router-dom';

export default function ModuleCard({ module, progress, completedCount, status }) {
    const navigate = useNavigate();
    const totalLessons = module.lessons.length;

    const statusConfig = {
        completed: { label: 'Complété ✓', color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
        'in-progress': { label: 'En cours', color: '#A855F7', bg: 'rgba(168,85,247,0.1)' },
        locked: { label: 'Verrouillé 🔒', color: '#666', bg: 'rgba(100,100,100,0.1)' },
        available: { label: 'Disponible', color: '#C084FC', bg: 'rgba(192,132,252,0.1)' },
    };

    const s = statusConfig[status] || statusConfig.available;
    const isLocked = status === 'locked';

    return (
        <div
            onClick={() => !isLocked && navigate(`/lesson/${module.id}/1`)}
            className="glass"
            style={{
                padding: 24,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.5 : 1,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
            }}
            onMouseEnter={e => {
                if (!isLocked) {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 12px 40px rgba(124, 58, 237, 0.2)`;
                }
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
            }}
        >
            {/* Module number badge */}
            <div style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${module.color}40, ${module.color}20)`,
                border: `1px solid ${module.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: module.color,
            }}>
                {module.id}
            </div>

            {/* Icon & Title */}
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{module.icon}</div>
            <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: 4,
                color: 'var(--color-text)',
            }}>
                Module {module.id} — {module.title}
            </h3>
            <p style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                marginBottom: 16,
                lineHeight: 1.5,
            }}>
                {module.description}
            </p>

            {/* Level tag */}
            <div style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: `${module.color}15`,
                border: `1px solid ${module.color}30`,
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: module.color,
                marginBottom: 16,
            }}>
                {module.level}
            </div>

            {/* Progress */}
            <div style={{ marginBottom: 12 }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    marginBottom: 6,
                    fontFamily: 'var(--font-mono)',
                }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{completedCount}/{totalLessons} leçons</span>
                    <span style={{ color: 'var(--color-accent)' }}>{progress}%</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* Badge preview */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                marginBottom: 16,
            }}>
                <span style={{
                    filter: status === 'completed' ? 'none' : 'grayscale(100%) blur(1px)',
                    fontSize: '1.1rem',
                }}>
                    {module.badgeIcon}
                </span>
                Badge : {module.badge}
            </div>

            {/* Status & Action */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <span style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: s.bg,
                    color: s.color,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-display)',
                }}>
                    {s.label}
                </span>
                {!isLocked && (
                    <span style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-primary-light)',
                        fontWeight: 600,
                        fontFamily: 'var(--font-display)',
                    }}>
                        {status === 'completed' ? 'Revoir →' : status === 'in-progress' ? 'Continuer →' : 'Commencer →'}
                    </span>
                )}
            </div>

            {/* XP badge */}
            <div style={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-gold)',
            }}>
                {module.totalXP} XP
            </div>
        </div>
    );
}
