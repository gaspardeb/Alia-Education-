import { useState, useEffect, useRef } from 'react';

function generateParticles(count = 14) {
    const COLORS = ['#A855F7', '#F59E0B', '#10B981', '#00E5FF', '#C084FC', '#FBBF24'];
    const SHAPES = ['●', '★', '◆', '✦', '•'];
    return Array.from({ length: count }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        color: COLORS[i % COLORS.length],
        shape: SHAPES[i % SHAPES.length],
        tx: (Math.random() - 0.5) * 180,
        ty: (Math.random() - 0.5) * 180,
        duration: 0.7 + Math.random() * 0.6,
        delay: Math.random() * 0.3,
        size: 8 + Math.floor(Math.random() * 10),
    }));
}

/* ──────────────────────────────────────────────
   AliaCharacter
   Props:
   - state       : 'idle' | 'happy' | 'sad' | 'thinking' | 'levelup' | 'waving'
   - size        : number (px, default 120)
   - message     : string (shown in speech bubble, null hides it)
   - fixed       : boolean (position:fixed bottom-right)
   - positionStyle : extra CSS for the outer wrapper
   - onIdleClick : () => void — called on click
   - className   : string
────────────────────────────────────────────── */
export default function AliaCharacter({
    state = 'idle',
    size = 120,
    message = null,
    fixed = false,
    positionStyle = {},
    onIdleClick = null,
    className = '',
}) {
    const [particles, setParticles] = useState([]);
    const [bubbleVisible, setBubbleVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const bubbleTimer = useRef(null);
    const particleTimer = useRef(null);

    useEffect(() => {
        clearTimeout(bubbleTimer.current);
        if (message) {
            setBubbleVisible(true);
            bubbleTimer.current = setTimeout(() => setBubbleVisible(false), 3800);
        } else {
            setBubbleVisible(false);
        }
        return () => clearTimeout(bubbleTimer.current);
    }, [message]);

    useEffect(() => {
        clearTimeout(particleTimer.current);
        if (state === 'happy' || state === 'levelup') {
            setParticles(generateParticles(state === 'levelup' ? 20 : 14));
            particleTimer.current = setTimeout(() => setParticles([]), 1600);
        } else {
            setParticles([]);
        }
        return () => clearTimeout(particleTimer.current);
    }, [state]);

    // Body animation based on state — animates the image itself
    const bodyAnimation = (() => {
        switch (state) {
            case 'happy':    return 'alia-jump 0.5s ease-in-out 2, alia-happy-glow 0.9s ease-in-out infinite';
            case 'sad':      return 'alia-sad-sway 1.5s ease-in-out infinite';
            case 'thinking': return 'alia-think-tilt 2s ease-in-out infinite';
            case 'levelup':  return 'alia-spin-levelup 0.7s ease-out, alia-levelup-glow 1s ease-in-out 0.7s infinite';
            case 'waving':   return 'alia-float 2s ease-in-out infinite';
            default:         return 'alia-float 3s ease-in-out infinite, alia-glow 3s ease-in-out infinite';
        }
    })();

    // CSS filter to express emotion through the image itself — no overlays
    const imgFilter = (() => {
        switch (state) {
            case 'happy':    return 'brightness(1.15) saturate(1.2) drop-shadow(0 0 14px rgba(0,229,255,0.55))';
            case 'sad':      return 'brightness(0.8) saturate(0.6) drop-shadow(0 0 6px rgba(96,165,250,0.3))';
            case 'thinking': return 'drop-shadow(0 0 10px rgba(168,85,247,0.55))';
            case 'levelup':  return 'brightness(1.35) saturate(1.6) drop-shadow(0 0 20px rgba(245,158,11,0.75))';
            case 'waving':   return 'brightness(1.1) drop-shadow(0 0 12px rgba(0,229,255,0.4))';
            default:         return 'drop-shadow(0 0 6px rgba(124,58,237,0.25))';
        }
    })();

    const bubbleFontSize = size < 110 ? '0.68rem' : size < 160 ? '0.76rem' : '0.84rem';

    return (
        <div
            className={className}
            style={{
                position: fixed ? 'fixed' : 'relative',
                display: 'inline-block',
                width: size,
                cursor: onIdleClick ? 'pointer' : 'default',
                flexShrink: 0,
                ...(fixed ? { bottom: 24, right: 24, zIndex: 200 } : {}),
                transform: hovered && onIdleClick ? 'scale(1.1)' : undefined,
                transition: 'transform 0.2s ease',
                ...positionStyle,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onIdleClick || undefined}
        >
            {/* ── Particles ── */}
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        color: p.color,
                        fontSize: p.size,
                        lineHeight: 1,
                        pointerEvents: 'none',
                        zIndex: 10,
                        animation: `alia-particle ${p.duration}s ${p.delay}s ease-out forwards`,
                        '--tx': `${p.tx}px`,
                        '--ty': `${p.ty}px`,
                    }}
                >
                    {p.shape}
                </div>
            ))}

            {/* ── Body — the image itself animates, no overlays ── */}
            <div style={{ animation: bodyAnimation, position: 'relative', width: '100%' }}>
                <img
                    src="/assets/alia-mascotte.png"
                    alt="ALIA"
                    draggable={false}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        userSelect: 'none',
                        filter: imgFilter,
                        transition: 'filter 0.4s ease',
                    }}
                />
            </div>

            {/* ── Speech bubble ── */}
            {bubbleVisible && message && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '108%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(26, 19, 50, 0.97)',
                        border: '1px solid rgba(124, 58, 237, 0.55)',
                        borderRadius: 12,
                        padding: '9px 13px',
                        fontSize: bubbleFontSize,
                        color: 'white',
                        fontFamily: 'var(--font-display)',
                        animation: 'alia-bubble-in 0.3s ease-out',
                        zIndex: 300,
                        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.35)',
                        maxWidth: 200,
                        textAlign: 'center',
                        lineHeight: 1.45,
                        whiteSpace: 'normal',
                        pointerEvents: 'none',
                    }}
                >
                    {message}
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0, height: 0,
                        borderLeft: '7px solid transparent',
                        borderRight: '7px solid transparent',
                        borderTop: '8px solid rgba(124, 58, 237, 0.55)',
                    }} />
                </div>
            )}

            {/* ── Hover hint (only for clickable idle) ── */}
            {hovered && onIdleClick && !bubbleVisible && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '108%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(26, 19, 50, 0.9)',
                        border: '1px solid rgba(124, 58, 237, 0.4)',
                        borderRadius: 8,
                        padding: '6px 10px',
                        fontSize: '0.7rem',
                        color: 'var(--color-accent)',
                        fontFamily: 'var(--font-display)',
                        animation: 'alia-bubble-in 0.2s ease-out',
                        zIndex: 300,
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                    }}
                >
                    Besoin d'aide ? 💡
                </div>
            )}
        </div>
    );
}
