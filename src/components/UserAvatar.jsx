import { useUser } from '../context/UserContext';

export default function UserAvatar({ size = 42, fontSize = '0.8rem' }) {
    const { user } = useUser();

    const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`;

    if (user.profilePhotoUrl) {
        return (
            <img
                src={user.profilePhotoUrl}
                alt="Photo de profil"
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0,
                }}
            />
        );
    }

    return (
        <div style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize,
            color: 'white',
            flexShrink: 0,
        }}>
            {initials}
        </div>
    );
}
