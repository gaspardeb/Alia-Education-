import { useUser } from '../context/UserContext';
import { BADGES, LEVELS } from '../data/modules';
import BadgeCard from '../components/BadgeCard';
import XPBar from '../components/XPBar';
export default function BadgesPage() {
    const { user, getLevel, isBadgeUnlocked } = useUser();
    const level = getLevel();

    return (
        <main style={{ padding: '32px 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36, animation: 'fadeInUp 0.5s ease-out' }}>
                    <img src="/assets/alia-mascotte.png" alt="ALIA" style={{ width: 80, height: 80, objectFit: 'contain' }} />
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: 4 }}>
                            Badges & Récompenses
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            {user.unlockedBadges.length} / {BADGES.length} badges débloqués
                        </p>
                    </div>
                </div>

                {/* Level progression */}
                <div className="glass" style={{ padding: 28, marginBottom: 32, animation: 'fadeInUp 0.5s ease-out 0.15s both' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 20 }}>
                        Progression des niveaux
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 16, overflowX: 'auto', paddingBottom: 8 }}>
                        {LEVELS.map((lvl, i) => {
                            const isReached = user.xp >= lvl.xpRequired;
                            const isCurrent = level.level === lvl.level;
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < LEVELS.length - 1 ? 1 : 'none' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                                        <div style={{
                                            width: isCurrent ? 48 : 36, height: isCurrent ? 48 : 36, borderRadius: '50%',
                                            border: `2px solid ${isReached ? 'var(--color-primary-light)' : 'var(--color-border)'}`,
                                            background: isReached ? (isCurrent ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' : 'rgba(124,58,237,0.2)') : 'transparent',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: isCurrent ? '1.2rem' : '0.9rem',
                                            boxShadow: isCurrent ? '0 0 20px rgba(168,85,247,0.4)' : 'none',
                                        }}>
                                            {lvl.icon}
                                        </div>
                                        <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: isCurrent ? 'var(--color-primary-light)' : 'var(--color-text-muted)', whiteSpace: 'nowrap', fontWeight: isCurrent ? 700 : 400 }}>
                                            {lvl.name}
                                        </span>
                                    </div>
                                    {i < LEVELS.length - 1 && (
                                        <div style={{ flex: 1, height: 2, background: isReached && user.xp >= (LEVELS[i + 1]?.xpRequired || 0) ? 'var(--color-primary-light)' : 'var(--color-border)', margin: '0 4px', marginBottom: 20 }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <XPBar current={user.xp} max={LEVELS[LEVELS.length - 1].xpRequired} level={level.level} levelName={level.name} />
                </div>

                {/* Badge grid */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 20 }}>Tous les badges</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                    {BADGES.map((badge, i) => (
                        <div key={badge.id} style={{ animation: `fadeInUp 0.4s ease-out ${0.2 + i * 0.03}s both` }}>
                            <BadgeCard badge={badge} unlocked={isBadgeUnlocked(badge.id)} />
                        </div>
                    ))}
                </div>
        </main>
    );
}
