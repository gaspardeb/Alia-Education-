import { useUser } from '../context/UserContext';
import { MODULES } from '../data/modules';
import ModuleCard from '../components/ModuleCard';

export default function ModulesPage() {
    const { user } = useUser();

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

    return (
        <main style={{ padding: '32px 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36, animation: 'fadeInUp 0.5s ease-out' }}>
                    <img src="/assets/alia-mascotte.png" alt="ALIA" style={{ width: 80, height: 80, objectFit: 'contain' }} />
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: 4 }}>
                            Les 5 Modules
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            Progressez à votre rythme à travers les modules du programme ALIA.
                        </p>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: 20,
                }}>
                    {MODULES.map((mod, i) => (
                        <div key={mod.id} style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both` }}>
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
    );
}
