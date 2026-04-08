import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { MODULES, DAILY_MOTIVATIONS } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import AliaCharacter from '../components/AliaCharacter';
import AdBanner from '../components/AdBanner';
import { useTheme } from '../context/ThemeContext';

const MOTIVATIONAL_MESSAGES = [
    "Psst... une leçon t'attend ! 👀",
    "Hey ! +50 XP t'attendent dans le prochain module !",
    "N'oublie pas ton streak ! 🔥 Encore une leçon aujourd'hui ?",
    "Tu es à deux doigts du prochain niveau ! 💪",
    "Chaque leçon te rapproche de l'expert IA que tu veux devenir ! 🚀",
];

export default function Dashboard() {
    const { user, getLevel, getNextLevel, getLevelProgress } = useUser();
    const { c, isDark } = useTheme();
    const navigate = useNavigate();
    const level = getLevel();
    const nextLevel = getNextLevel();
    const progress = getLevelProgress();

    // Alia state management
    const [aliaState, setAliaState] = useState('idle');
    const [aliaMessage, setAliaMessage] = useState(null);
    const inactivityTimer = useRef(null);

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer.current);
        if (aliaState !== 'idle') return;
        inactivityTimer.current = setTimeout(() => {
            const msg = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
            setAliaState('waving');
            setAliaMessage(msg);
            setTimeout(() => { setAliaState('idle'); setAliaMessage(null); }, 4000);
        }, 120000); // 2 minutes
    };

    useEffect(() => {
        resetInactivityTimer();
        window.addEventListener('mousemove', resetInactivityTimer);
        window.addEventListener('keydown', resetInactivityTimer);
        return () => {
            clearTimeout(inactivityTimer.current);
            window.removeEventListener('mousemove', resetInactivityTimer);
            window.removeEventListener('keydown', resetInactivityTimer);
        };
    }, []);

    const handleAliaClick = () => {
        const msg = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
        setAliaMessage(msg);
        setTimeout(() => setAliaMessage(null), 4000);
    };

    const motivation = DAILY_MOTIVATIONS[Math.floor(Math.random() * DAILY_MOTIVATIONS.length)];
    const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

    const getModuleStatus = (mod) => {
        const completed = mod.lessons.filter(l => user.completedLessons.includes(l.id)).length;
        if (completed === mod.lessons.length) return 'completed';
        if (completed > 0) return 'in-progress';
        if (mod.id === 1) return 'available';
        const prevMod = MODULES.find(m => m.id === mod.id - 1);
        if (prevMod) {
            const prevCompleted = prevMod.lessons.filter(l => user.completedLessons.includes(l.id)).length;
            if (prevCompleted === prevMod.lessons.length) return 'available';
        }
        return 'locked';
    };

    const getModuleProgress = (mod) => {
        const completed = mod.lessons.filter(l => user.completedLessons.includes(l.id)).length;
        return Math.round((completed / mod.lessons.length) * 100);
    };

    const getCompletedCount = (mod) => {
        return mod.lessons.filter(l => user.completedLessons.includes(l.id)).length;
    };

    const currentModule = MODULES.find(m => m.id === user.currentModule) || MODULES[0];
    const currentLesson = currentModule.lessons.find(l => l.id === user.currentLesson) || currentModule.lessons[0];
    const currentModuleProgress = getModuleProgress(currentModule);

    return (
        <>
            <main style={{ padding: '32px 40px' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 32,
                    animation: 'fadeInUp 0.5s ease-out',
                }}>
                    <div>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.8rem',
                            fontWeight: 700,
                            marginBottom: 4,
                        }}>
                            Bonjour {user.firstName}
                        </h1>
                        <p style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '0.9rem',
                            textTransform: 'capitalize',
                        }}>{today}</p>
                        <p style={{
                            color: 'var(--color-accent)',
                            fontSize: '0.8rem',
                            fontStyle: 'italic',
                            marginTop: 4,
                        }}>{motivation}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{
                            width: 40,
                            height: 40,
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            background: c.surface,
                            color: 'var(--color-text)',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                        }}>🔔</button>
                        <button style={{
                            width: 40,
                            height: 40,
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            background: c.surface,
                            color: 'var(--color-text)',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                        }}>⚙️</button>
                    </div>
                </div>

                {/* Stats cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 16,
                    marginBottom: 32,
                }}>
                    {[
                        {
                            icon: '💎',
                            label: 'XP Total',
                            value: user.xp.toLocaleString() + ' XP',
                            sub: `+${user.xpToday} aujourd'hui`,
                            color: 'var(--color-primary-light)',
                            glow: 'rgba(168,85,247,0.15)',
                        },
                        {
                            icon: level.icon,
                            label: 'Niveau',
                            value: `Niveau ${level.level}`,
                            sub: level.name,
                            color: 'var(--color-accent)',
                            glow: 'rgba(192,132,252,0.15)',
                        },
                        {
                            icon: '🏆',
                            label: 'Badges',
                            value: `${user.unlockedBadges.length}/30`,
                            sub: 'débloquez !',
                            color: 'var(--color-gold)',
                            glow: 'rgba(245,158,11,0.15)',
                        },
                        {
                            icon: '🔥',
                            label: 'Streak',
                            value: `${user.streak} jours`,
                            sub: `record : ${user.streakRecord}`,
                            color: '#EF4444',
                            glow: 'rgba(239,68,68,0.15)',
                        },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="glass"
                            style={{
                                padding: 20,
                                transition: 'all 0.3s ease',
                                animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both`,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 0 25px ${stat.glow}`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                <span style={{ fontSize: '1.3rem' }}>{stat.icon}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
                                    {stat.label}
                                </span>
                            </div>
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: stat.color,
                                marginBottom: 4,
                            }}>
                                {stat.value}
                            </div>
                            <div style={{
                                fontSize: '0.7rem',
                                color: 'var(--color-text-muted)',
                                fontFamily: 'var(--font-mono)',
                            }}>
                                {stat.sub}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ad banner (free users) */}
                <div style={{ marginBottom: 24, animation: 'fadeInUp 0.5s ease-out 0.25s both' }}>
                    <AdBanner variant="horizontal" index={0} />
                </div>

                {/* Resume section */}
                <div
                    className="glass"
                    style={{
                        padding: 24,
                        marginBottom: 32,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 24,
                        animation: 'fadeInUp 0.5s ease-out 0.3s both',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/lesson/${currentModule.id}/${currentLesson.id.split('.')[1]}`)}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '';
                        e.currentTarget.style.boxShadow = '';
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--color-accent)',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: 4,
                        }}>
                            Reprendre l'aventure
                        </div>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            marginBottom: 4,
                        }}>
                            Module {currentModule.id} — Leçon {currentLesson.id}: {currentLesson.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                            <div className="progress-bar" style={{ flex: 1, height: 6 }}>
                                <div className="progress-bar-fill" style={{ width: `${currentModuleProgress}%` }} />
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                color: 'var(--color-accent)',
                            }}>
                                {currentModuleProgress}%
                            </span>
                        </div>
                    </div>
                    <button className="btn btn-gamified" style={{ flexShrink: 0 }}>
                        ▶ Continuer
                    </button>
                </div>

                {/* Modules grid */}
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: 20,
                    animation: 'fadeInUp 0.5s ease-out 0.4s both',
                }}>
                    Les 5 Modules
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: 20,
                }}>
                    {MODULES.map((mod, i) => (
                        <div key={mod.id} style={{ animation: `fadeInUp 0.5s ease-out ${0.4 + i * 0.08}s both` }}>
                            <ModuleCard
                                module={mod}
                                progress={getModuleProgress(mod)}
                                completedCount={getCompletedCount(mod)}
                                status={getModuleStatus(mod)}
                            />
                        </div>
                    ))}
                </div>
            </main>

            {/* ═══ ALIA — Fixed companion (bottom-right) ═══ */}
            <AliaCharacter
                state={aliaState}
                size={100}
                message={aliaMessage}
                fixed
                onIdleClick={handleAliaClick}
            />
        </>
    );
}
