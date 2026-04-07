import { createContext, useContext, useState, useEffect } from 'react';
import { LEVELS, BADGES, MODULES } from '../data/modules';

const UserContext = createContext(null);

const DEFAULT_USER = {
    firstName: "Gaspard",
    lastName: "De Buigne",
    email: "gaspard@alia.education",
    company: "Alia Education",
    role: "Product Manager",
    xp: 4250,
    streak: 8,
    streakRecord: 14,
    lastLogin: new Date().toISOString(),
    completedLessons: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "2.1", "2.2", "2.3", "2.4"],
    currentLesson: "2.5",
    currentModule: 2,
    unlockedBadges: ["initiateur", "premier-pas", "streak-3", "streak-7", "xp-500", "xp-1000", "quiz-master", "speed-demon", "early-bird", "explorer", "daily-5", "feedback-king"],
    quizScores: { "1.6": 100, "2.7": null },
    notifications: [],
    xpToday: 150,
    subscription: 'free', // 'free' | 'premium'
    profilePhotoUrl: null,
};

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('alia_user');
        return saved ? JSON.parse(saved) : DEFAULT_USER;
    });

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        localStorage.setItem('alia_user', JSON.stringify(user));
    }, [user]);

    const getLevel = () => {
        let currentLevel = LEVELS[0];
        for (const level of LEVELS) {
            if (user.xp >= level.xpRequired) {
                currentLevel = level;
            } else break;
        }
        return currentLevel;
    };

    const getNextLevel = () => {
        const current = getLevel();
        return LEVELS.find(l => l.level === current.level + 1) || null;
    };

    const getLevelProgress = () => {
        const current = getLevel();
        const next = getNextLevel();
        if (!next) return 100;
        const progressXP = user.xp - current.xpRequired;
        const totalNeeded = next.xpRequired - current.xpRequired;
        return Math.round((progressXP / totalNeeded) * 100);
    };

    const addXP = (amount) => {
        const oldLevel = getLevel().level;
        setUser(prev => {
            const newXP = prev.xp + amount;
            const newUser = { ...prev, xp: newXP, xpToday: prev.xpToday + amount };
            return newUser;
        });

        addNotification(`+${amount} XP gagnés !`, 'xp');

        setTimeout(() => {
            const newLevel = getLevel().level;
            if (newLevel > oldLevel) {
                addNotification(`🎉 Niveau ${newLevel} atteint !`, 'levelup');
            }
        }, 100);
    };

    const completeLesson = (lessonId) => {
        setUser(prev => ({
            ...prev,
            completedLessons: [...new Set([...prev.completedLessons, lessonId])],
        }));
    };

    const unlockBadge = (badgeId) => {
        if (user.unlockedBadges.includes(badgeId)) return;
        setUser(prev => ({
            ...prev,
            unlockedBadges: [...prev.unlockedBadges, badgeId],
        }));
        const badge = BADGES.find(b => b.id === badgeId);
        if (badge) {
            addNotification(`🏆 Badge "${badge.name}" débloqué !`, 'badge');
        }
    };

    const addNotification = (message, type = 'info') => {
        const id = Date.now() + Math.random();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 4000);
    };

    const getModuleProgress = (moduleId) => {
        const mod = MODULES.find(m => m.id === moduleId);
        if (!mod) return 0;
        const completed = mod.lessons.filter(l => user.completedLessons.includes(l.id)).length;
        return Math.round((completed / mod.lessons.length) * 100);
    };

    const isLessonCompleted = (lessonId) => user.completedLessons.includes(lessonId);
    const isBadgeUnlocked = (badgeId) => user.unlockedBadges.includes(badgeId);
    const isPremium = () => user.subscription === 'premium';

    const upgradeSubscription = (plan) => {
        setUser(prev => ({ ...prev, subscription: plan }));
        addNotification('🎉 Bienvenue en Premium ! Profite de toutes les fonctionnalités.', 'levelup');
    };

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            getLevel,
            getNextLevel,
            getLevelProgress,
            addXP,
            completeLesson,
            unlockBadge,
            addNotification,
            notifications,
            isLessonCompleted,
            isBadgeUnlocked,
            isPremium,
            upgradeSubscription,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
}
