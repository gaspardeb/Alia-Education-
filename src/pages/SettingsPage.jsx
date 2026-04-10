import { useState, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { LEADERBOARD_DATA } from '../data/modules';
import ThemeToggle from '../components/ThemeToggle';
import AliaCharacter from '../components/AliaCharacter';
import UserAvatar from '../components/UserAvatar';

export default function SettingsPage() {
    const { user, setUser } = useUser();
    const { isDark } = useTheme();

    const [fields, setFields] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
        role: user.role,
    });
    const [saved, setSaved] = useState(false);
    const [nameError, setNameError] = useState('');
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoError, setPhotoError] = useState('');
    const fileInputRef = useRef(null);

    const handleFieldChange = (key, value) => {
        setFields(prev => ({ ...prev, [key]: value }));
        if (key === 'firstName' || key === 'lastName') setNameError('');
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setPhotoError('Veuillez sélectionner une image.');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setPhotoError("L'image ne doit pas dépasser 2 Mo.");
            return;
        }
        setPhotoError('');
        const reader = new FileReader();
        reader.onload = (ev) => setPhotoPreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleRemovePhoto = () => {
        setPhotoPreview('__remove__');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSave = () => {
        const firstName = fields.firstName.trim();
        const lastName = fields.lastName.trim();

        if (!firstName || !lastName) {
            setNameError('Le prénom et le nom sont obligatoires.');
            return;
        }

        // Vérifier unicité du nom (format "Prénom N." dans le leaderboard)
        const newDisplayName = `${firstName} ${lastName[0]}.`.toLowerCase();
        const currentDisplayName = `${user.firstName} ${user.lastName[0]}.`.toLowerCase();
        if (newDisplayName !== currentDisplayName) {
            const conflict = LEADERBOARD_DATA.some(
                entry => entry.name.toLowerCase() === newDisplayName
            );
            if (conflict) {
                setNameError('Ce nom est déjà utilisé par un autre utilisateur.');
                return;
            }
        }

        setUser(prev => ({
            ...prev,
            firstName,
            lastName,
            email: fields.email.trim(),
            company: fields.company.trim(),
            role: fields.role.trim(),
            ...(photoPreview !== null && {
                profilePhotoUrl: photoPreview === '__remove__' ? null : photoPreview,
            }),
        }));
        setPhotoPreview(null);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const currentPhoto = photoPreview === '__remove__' ? null : (photoPreview || user.profilePhotoUrl);
    const previewInitials = `${fields.firstName?.[0] ?? ''}${fields.lastName?.[0] ?? ''}`;

    return (
        <main style={{ padding: '32px 40px', maxWidth: 800 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36, animation: 'fadeInUp 0.5s ease-out' }}>
                    <AliaCharacter state="idle" size={80} />
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: 4 }}>
                            Paramètres
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            Gérez votre profil et vos préférences
                        </p>
                    </div>
                </div>

                {/* Profile */}
                <section className="glass" style={{ padding: 28, marginBottom: 24, animation: 'fadeInUp 0.5s ease-out 0.1s both' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>
                        Profil
                    </h2>

                    {/* Photo de profil */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ position: 'relative' }}>
                            {currentPhoto ? (
                                <img
                                    src={currentPhoto}
                                    alt="Photo de profil"
                                    style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }}
                                />
                            ) : (
                                <div style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--font-mono)',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    color: 'white',
                                }}>
                                    {previewInitials}
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{
                                display: 'block',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                color: 'var(--color-text-muted)',
                                marginBottom: 8,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}>
                                Photo de profil
                            </label>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    style={{
                                        padding: '7px 14px',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        background: isDark ? 'rgba(124,58,237,0.1)' : 'rgba(124,58,237,0.06)',
                                        color: 'var(--color-primary-light)',
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 600,
                                        fontSize: '0.82rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Choisir une photo
                                </button>
                                {(currentPhoto) && (
                                    <button
                                        onClick={handleRemovePhoto}
                                        style={{
                                            padding: '7px 14px',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid rgba(239,68,68,0.3)',
                                            background: 'rgba(239,68,68,0.08)',
                                            color: '#EF4444',
                                            fontFamily: 'var(--font-display)',
                                            fontWeight: 600,
                                            fontSize: '0.82rem',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Supprimer
                                    </button>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handlePhotoChange}
                            />
                            {photoError && (
                                <p style={{ fontSize: '0.78rem', color: '#EF4444', marginTop: 6 }}>{photoError}</p>
                            )}
                            {photoPreview && photoPreview !== '__remove__' && (
                                <p style={{ fontSize: '0.78rem', color: 'var(--color-accent)', marginTop: 6 }}>
                                    Nouvelle photo prête — clique sur "Sauvegarder" pour confirmer.
                                </p>
                            )}
                            {photoPreview === '__remove__' && (
                                <p style={{ fontSize: '0.78rem', color: '#EF4444', marginTop: 6 }}>
                                    Photo supprimée — clique sur "Sauvegarder" pour confirmer.
                                </p>
                            )}
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 6 }}>
                                JPG, PNG ou GIF · Max 2 Mo
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {[
                            { label: 'Prénom', key: 'firstName' },
                            { label: 'Nom', key: 'lastName' },
                            { label: 'Email', key: 'email' },
                            { label: 'Entreprise', key: 'company' },
                            { label: 'Rôle', key: 'role' },
                        ].map(field => (
                            <div key={field.key}>
                                <label style={{
                                    display: 'block',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.72rem',
                                    color: nameError && (field.key === 'firstName' || field.key === 'lastName')
                                        ? '#EF4444'
                                        : 'var(--color-text-muted)',
                                    marginBottom: 6,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}>
                                    {field.label}
                                </label>
                                <input
                                    value={fields[field.key]}
                                    onChange={e => handleFieldChange(field.key, e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: 'var(--radius-md)',
                                        border: nameError && (field.key === 'firstName' || field.key === 'lastName')
                                            ? '1px solid #EF4444'
                                            : '1px solid var(--color-border)',
                                        background: isDark ? 'rgba(13,10,26,0.5)' : 'rgba(255,255,255,0.8)',
                                        color: 'var(--color-text)',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor = nameError && (field.key === 'firstName' || field.key === 'lastName') ? '#EF4444' : 'var(--color-primary-light)'}
                                    onBlur={e => e.target.style.borderColor = nameError && (field.key === 'firstName' || field.key === 'lastName') ? '#EF4444' : 'var(--color-border)'}
                                />
                            </div>
                        ))}
                    </div>
                    {nameError && (
                        <p style={{ fontSize: '0.82rem', color: '#EF4444', marginTop: 12 }}>
                            ⚠️ {nameError}
                        </p>
                    )}
                    <button
                        onClick={handleSave}
                        className="btn btn-primary"
                        style={{ marginTop: 20, minWidth: 140 }}
                    >
                        {saved ? '✅ Sauvegardé !' : 'Sauvegarder'}
                    </button>
                </section>

                {/* Appearance */}
                <section className="glass" style={{ padding: 28, marginBottom: 24, animation: 'fadeInUp 0.5s ease-out 0.2s both' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>
                        Apparence
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 500, marginBottom: 4 }}>
                                Thème
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                {isDark ? 'Mode sombre activé' : 'Mode clair activé'}
                            </div>
                        </div>
                        <ThemeToggle />
                    </div>
                </section>

                {/* Subscription */}
                <section className="glass" style={{ padding: 28, marginBottom: 24, animation: 'fadeInUp 0.5s ease-out 0.3s both' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>
                        Abonnement
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '4px 12px',
                                borderRadius: 'var(--radius-full)',
                                background: user.subscription === 'premium' ? 'rgba(245,158,11,0.15)' : 'rgba(124,58,237,0.1)',
                                border: `1px solid ${user.subscription === 'premium' ? 'rgba(245,158,11,0.4)' : 'rgba(124,58,237,0.2)'}`,
                                marginBottom: 8,
                            }}>
                                <span>{user.subscription === 'premium' ? '⭐' : '🆓'}</span>
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.75rem',
                                    color: user.subscription === 'premium' ? 'var(--color-gold)' : 'var(--color-primary-light)',
                                    fontWeight: 600,
                                }}>
                                    {user.subscription === 'premium' ? 'Premium' : 'Gratuit'}
                                </span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                {user.subscription === 'premium'
                                    ? 'Accès complet à toutes les fonctionnalités.'
                                    : 'Passez Premium pour un accès sans pub et des fonctionnalités avancées.'}
                            </p>
                        </div>
                        {user.subscription !== 'premium' && (
                            <a href="/pricing" style={{
                                padding: '10px 20px',
                                borderRadius: 'var(--radius-md)',
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                                color: 'white',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                            }}>
                                Passer Premium →
                            </a>
                        )}
                    </div>
                </section>

                {/* Notifications */}
                <section className="glass" style={{ padding: 28, animation: 'fadeInUp 0.5s ease-out 0.4s both' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>
                        Notifications
                    </h2>
                    {[
                        { label: 'Rappels de streak quotidien', desc: 'ALIA te rappelle de faire ta leçon du jour', defaultOn: true },
                        { label: 'Nouveau contenu disponible', desc: 'Sois informé quand de nouveaux modules sortent', defaultOn: true },
                        { label: 'Classement mis à jour', desc: 'Reçois un récap hebdomadaire du leaderboard', defaultOn: false },
                    ].map((notif, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '14px 0',
                            borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none',
                        }}>
                            <div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 500, marginBottom: 2 }}>
                                    {notif.label}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{notif.desc}</div>
                            </div>
                            <ToggleSwitch defaultOn={notif.defaultOn} />
                        </div>
                    ))}
                </section>
        </main>
    );
}

function ToggleSwitch({ defaultOn }) {
    const [on, setOn] = useState(defaultOn);
    return (
        <button
            onClick={() => setOn(v => !v)}
            style={{
                width: 44,
                height: 24,
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: on ? 'var(--color-primary)' : 'rgba(124,58,237,0.2)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease',
                flexShrink: 0,
            }}
        >
            <div style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: 3,
                left: on ? 23 : 3,
                transition: 'left 0.2s ease',
            }} />
        </button>
    );
}
