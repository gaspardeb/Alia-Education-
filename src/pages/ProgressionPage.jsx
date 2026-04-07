import { useUser } from '../context/UserContext';
import { MODULES, LEVELS } from '../data/modules';
import XPBar from '../components/XPBar';

export default function ProgressionPage() {
    const { user, getLevel, getNextLevel, getLevelProgress } = useUser();
    const level = getLevel();
    const nextLevel = getNextLevel();
    const progress = getLevelProgress();

    const completedLessonsCount = user.completedLessons.length;
    const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons.length, 0);

    const getModuleProgress = (mod) => {
        const completed = mod.lessons.filter(l => user.completedLessons.includes(l.id)).length;
        return { completed, total: mod.lessons.length, pct: Math.round((completed / mod.lessons.length) * 100) };
    };

    return (
        <main style={{ padding: '32px 40px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36, animation: 'fadeInUp 0.5s ease-out' }}>
                    <img src="/assets/alia-mascotte.png" alt="ALIA" style={{ width: 80, height: 80, objectFit: 'contain' }} />
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: 4 }}>
                            Ma Progression
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            {completedLessonsCount}/{totalLessons} leçons complétées
                        </p>
                    </div>
                </div>

                {/* Stats grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 16,
                    marginBottom: 36,
                    animation: 'fadeInUp 0.5s ease-out 0.1s both',
                }}>
                    {[
                        { icon: '💎', label: 'XP Total', value: user.xp.toLocaleString() + ' XP', color: 'var(--color-primary-light)' },
                        { icon: level.icon, label: 'Niveau actuel', value: `Niv. ${level.level} — ${level.name}`, color: 'var(--color-accent)' },
                        { icon: '🔥', label: 'Streak', value: `${user.streak} jours`, color: '#EF4444' },
                        { icon: '🏆', label: 'Badges', value: `${user.unlockedBadges.length}/30`, color: 'var(--color-gold)' },
                    ].map((stat, i) => (
                        <div key={i} className="glass" style={{ padding: 20, animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                <span style={{ fontSize: '1.3rem' }}>{stat.icon}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>{stat.label}</span>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color: stat.color }}>
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Level progress */}
                <div className="glass" style={{ padding: 28, marginBottom: 32, animation: 'fadeInUp 0.5s ease-out 0.2s both' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>
                        Progression de niveau
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>{level.icon}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)', marginTop: 4 }}>
                                Niv. {level.level}
                            </div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                {level.name}
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <XPBar
                                current={user.xp - level.xpRequired}
                                max={nextLevel ? nextLevel.xpRequired - level.xpRequired : 1}
                                level={level.level}
                                levelName={level.name}
                                height={12}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                    {user.xp - level.xpRequired} XP
                                </span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                                    {nextLevel ? `${nextLevel.xpRequired - user.xp} XP avant le niveau ${nextLevel.level}` : 'Niveau maximum atteint !'}
                                </span>
                            </div>
                        </div>
                        {nextLevel && (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem' }}>{nextLevel.icon}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
                                    Niv. {nextLevel.level}
                                </div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                    {nextLevel.name}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* All levels */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {LEVELS.map(l => {
                            const isDone = user.xp >= l.xpRequired;
                            const isCurrent = l.level === level.level;
                            return (
                                <div key={l.level} style={{
                                    padding: '6px 12px',
                                    borderRadius: 'var(--radius-full)',
                                    border: `1px solid ${isCurrent ? 'var(--color-primary-light)' : isDone ? 'rgba(16,185,129,0.4)' : 'var(--color-border)'}`,
                                    background: isCurrent ? 'rgba(168,85,247,0.15)' : isDone ? 'rgba(16,185,129,0.08)' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                }}>
                                    <span style={{ fontSize: '0.9rem' }}>{l.icon}</span>
                                    <span style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.7rem',
                                        color: isCurrent ? 'var(--color-primary-light)' : isDone ? 'var(--color-success)' : 'var(--color-text-muted)',
                                    }}>
                                        {l.name}
                                    </span>
                                    {isCurrent && (
                                        <span style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>← toi</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Module progress */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, animation: 'fadeInUp 0.5s ease-out 0.3s both' }}>
                    Progression par module
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fadeInUp 0.5s ease-out 0.35s both' }}>
                    {MODULES.map(mod => {
                        const { completed, total, pct } = getModuleProgress(mod);
                        return (
                            <div key={mod.id} className="glass" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 'var(--radius-md)',
                                    background: `${mod.color}18`,
                                    border: `1px solid ${mod.color}30`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.4rem',
                                    flexShrink: 0,
                                }}>
                                    {mod.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600 }}>
                                            {mod.title}
                                        </span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                                            {completed}/{total} leçons
                                        </span>
                                    </div>
                                    <div className="progress-bar" style={{ height: 6 }}>
                                        <div
                                            className="progress-bar-fill"
                                            style={{
                                                width: `${pct}%`,
                                                background: pct === 100 ? 'var(--color-success)' : mod.color,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    color: pct === 100 ? 'var(--color-success)' : 'var(--color-text-muted)',
                                    minWidth: 38,
                                    textAlign: 'right',
                                }}>
                                    {pct}%
                                </div>
                            </div>
                        );
                    })}
                </div>
        </main>
    );
}
