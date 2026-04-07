export default function XPBar({ current, max, level, levelName, showLabel = true, height = 8 }) {
    const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;

    return (
        <div style={{ width: '100%' }}>
            {showLabel && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 6,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                }}>
                    <span style={{ color: 'var(--color-accent)' }}>
                        Niv. {level} — {levelName}
                    </span>
                    <span style={{ color: 'var(--color-text-muted)' }}>
                        {current.toLocaleString()} / {max.toLocaleString()} XP
                    </span>
                </div>
            )}
            <div className="progress-bar" style={{ height }}>
                <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
