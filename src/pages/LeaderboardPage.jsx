import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { LEADERBOARD_DATA } from '../data/modules';
export default function LeaderboardPage() {
    const { user, getLevel } = useUser();
    const level = getLevel();
    const [filter, setFilter] = useState('all');

    const myRank = { rank: 23, name: `${user.firstName} ${user.lastName[0]}.`, level: level.level, levelName: level.name, xp: user.xp, badges: user.unlockedBadges.length, streak: user.streak, avatar: `${user.firstName[0]}${user.lastName[0]}`, isMe: true };

    const filters = [
        { key: 'all', label: 'Tous les temps' },
        { key: 'month', label: 'Ce mois' },
        { key: 'week', label: 'Cette semaine' },
        { key: 'company', label: 'Mon entreprise' },
    ];

    const podiumColors = ['#F59E0B', '#94A3B8', '#CD7F32'];
    const podiumSizes = [80, 70, 60];

    return (
        <main style={{ padding: '32px 40px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: 8, animation: 'fadeInUp 0.5s ease-out' }}>
                    🌍 Classement
                </h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 24, animation: 'fadeInUp 0.5s ease-out 0.1s both' }}>
                    Comparez-vous aux meilleurs apprenants.
                </p>

                {/* Filters */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 32, animation: 'fadeInUp 0.5s ease-out 0.15s both' }}>
                    {filters.map(f => (
                        <button key={f.key} onClick={() => setFilter(f.key)} style={{
                            padding: '8px 18px', borderRadius: 'var(--radius-full)', border: 'none',
                            fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                            background: filter === f.key ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' : 'rgba(26,19,50,0.6)',
                            color: filter === f.key ? 'white' : 'var(--color-text-muted)',
                            border: filter === f.key ? 'none' : '1px solid var(--color-border)',
                            transition: 'all 0.3s ease',
                        }}>
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Podium */}
                <div className="glass" style={{ padding: '40px 28px', marginBottom: 24, animation: 'fadeInUp 0.5s ease-out 0.2s both' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 20 }}>
                        {[1, 0, 2].map((idx) => {
                            const p = LEADERBOARD_DATA[idx];
                            const isFirst = idx === 0;
                            return (
                                <div key={idx} style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                                    animation: `fadeInUp 0.6s ease-out ${0.3 + idx * 0.15}s both`,
                                }}>
                                    <div style={{
                                        fontSize: isFirst ? '2rem' : '1.4rem',
                                        animation: isFirst ? 'glow-pulse 3s infinite' : 'none',
                                    }}>
                                        {idx === 0 ? '👑' : idx === 1 ? '🥈' : '🥉'}
                                    </div>
                                    <div style={{
                                        width: podiumSizes[idx], height: podiumSizes[idx], borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${podiumColors[idx]}40, ${podiumColors[idx]}20)`,
                                        border: `3px solid ${podiumColors[idx]}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: isFirst ? '1.2rem' : '0.9rem',
                                    }}>
                                        {p.avatar}
                                    </div>
                                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: isFirst ? '1rem' : '0.85rem' }}>
                                        {p.name}
                                    </span>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: podiumColors[idx] }}>
                                        {p.xp.toLocaleString()} XP
                                    </span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                        Niv. {p.level} — {p.levelName}
                                    </span>
                                    <div style={{
                                        height: isFirst ? 120 : idx === 1 ? 80 : 50,
                                        width: 100, borderRadius: '8px 8px 0 0',
                                        background: `linear-gradient(180deg, ${podiumColors[idx]}30, ${podiumColors[idx]}10)`,
                                        border: `1px solid ${podiumColors[idx]}30`,
                                        borderBottom: 'none', marginTop: 8,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.5rem',
                                        color: podiumColors[idx],
                                    }}>
                                        {p.rank}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Table */}
                <div className="glass" style={{ overflow: 'hidden', animation: 'fadeInUp 0.5s ease-out 0.3s both' }}>
                    {/* Header */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: '60px 48px 1fr 100px 100px 80px 80px',
                        padding: '12px 20px', fontSize: '0.7rem', color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                        borderBottom: '1px solid var(--color-border)',
                    }}>
                        <span>Rang</span><span></span><span>Nom</span><span>Niveau</span><span>XP</span><span>Badges</span><span>Streak</span>
                    </div>
                    {/* Rows */}
                    {LEADERBOARD_DATA.map((p) => (
                        <div key={p.rank} style={{
                            display: 'grid', gridTemplateColumns: '60px 48px 1fr 100px 100px 80px 80px',
                            padding: '14px 20px', alignItems: 'center',
                            borderBottom: '1px solid rgba(124,58,237,0.08)',
                            transition: 'background 0.2s ease',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.05)'}
                            onMouseLeave={e => e.currentTarget.style.background = ''}
                        >
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem',
                                color: p.rank <= 3 ? podiumColors[p.rank - 1] : 'var(--color-text-muted)',
                            }}>
                                #{p.rank}
                            </span>
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
                            }}>{p.avatar}</div>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                                Niv. {p.level}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-primary-light)' }}>
                                {p.xp.toLocaleString()}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-gold)' }}>
                                {p.badges}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                                🔥 {p.streak}
                            </span>
                        </div>
                    ))}

                    {/* My position (sticky) */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: '60px 48px 1fr 100px 100px 80px 80px',
                        padding: '14px 20px', alignItems: 'center',
                        background: 'rgba(124,58,237,0.1)', borderTop: '2px solid var(--color-primary)',
                        position: 'sticky', bottom: 0,
                    }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-primary-light)' }}>#{myRank.rank}</span>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-gold), #B45309)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
                        }}>{myRank.avatar}</div>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary-light)' }}>{myRank.name} (Toi)</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>Niv. {myRank.level}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-primary-light)' }}>{myRank.xp.toLocaleString()}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-gold)' }}>{myRank.badges}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>🔥 {myRank.streak}</span>
                    </div>
                </div>
        </main>
    );
}
