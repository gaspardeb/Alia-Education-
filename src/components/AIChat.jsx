import { useState, useRef, useEffect, useCallback } from 'react';
import { streamResponse } from '../services/aiService';
import { useTheme } from '../context/ThemeContext';

/* ─────────────────────────────────────────────
   AIChat — composant de chat pédagogique réutilisable
   Props :
   - context      : { question, module } | null  (widget quiz)
   - compact      : bool  (mode widget — hauteur réduite)
   - placeholder  : string override
   - onLoading    : (bool) => void  (pour ALIA état thinking)
───────────────────────────────────────────── */
export default function AIChat({ context = null, compact = false, placeholder, onLoading }) {
    const { isDark, c } = useTheme();
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            role: 'assistant',
            content: context
                ? `Bonjour ! Je suis ALIA 🤖\n\nJe vois que tu travailles sur :\n*"${context.question}"*\n\nDis-moi ce qui te bloque, ou clique sur **"Explique-moi ce concept"** pour que je t'aide à comprendre — sans te donner la réponse directe 😊`
                : `Bonjour ! Je suis **ALIA**, ton assistant pédagogique 🤖✨\n\nPose-moi n'importe quelle question sur l'IA, le prompting ou les concepts de la plateforme. Je suis là pour t'aider à *comprendre*, pas juste à mémoriser !`,
            timestamp: Date.now(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingContent, setStreamingContent] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const abortRef = useRef(false);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingContent]);

    const sendMessage = useCallback(async (text) => {
        const userText = (text || input).trim();
        if (!userText || isStreaming) return;

        setInput('');
        abortRef.current = false;

        // Ajout du message utilisateur
        const userMsg = { id: Date.now(), role: 'user', content: userText, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);

        // Démarrage du streaming
        setIsStreaming(true);
        setStreamingContent('');
        onLoading?.(true);

        let accumulated = '';

        try {
            await streamResponse({
                userMessage: userText,
                context,
                history: messages,
                onChunk: (chunk) => {
                    if (abortRef.current) return;
                    accumulated += chunk;
                    setStreamingContent(accumulated);
                },
                onDone: (full) => {
                    if (abortRef.current) return;
                    setStreamingContent('');
                    setMessages(prev => [...prev, {
                        id: Date.now() + 1,
                        role: 'assistant',
                        content: full,
                        timestamp: Date.now(),
                    }]);
                    setIsStreaming(false);
                    onLoading?.(false);
                    setTimeout(() => inputRef.current?.focus(), 100);
                },
            });
        } catch {
            setIsStreaming(false);
            onLoading?.(false);
        }
    }, [input, isStreaming, context, messages, onLoading]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Formatte le markdown simplifié (*bold*, _italic_, *"quote"*)
    const renderContent = (text) => {
        const lines = text.split('\n');
        return lines.map((line, li) => {
            // Gras **text**
            const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, pi) => {
                if (part.startsWith('**') && part.endsWith('**'))
                    return <strong key={pi}>{part.slice(2, -2)}</strong>;
                if (part.startsWith('*') && part.endsWith('*'))
                    return <em key={pi}>{part.slice(1, -1)}</em>;
                return part;
            });
            return <span key={li}>{parts}{li < lines.length - 1 && <br />}</span>;
        });
    };

    const bubbleSurface = isDark ? 'rgba(37, 27, 74, 0.7)' : 'rgba(237, 233, 254, 0.8)';
    const userBubble = 'linear-gradient(135deg, #7C3AED, #A855F7)';

    const QUICK_ACTIONS = context ? [
        { label: 'Explique-moi ce concept', text: 'Explique-moi le concept derrière cette question' },
        { label: 'Une analogie ?', text: 'Donne-moi une analogie simple pour comprendre' },
        { label: 'Quel est le piège ?', text: 'Quels sont les pièges à éviter sur ce sujet ?' },
    ] : [
        { label: "C'est quoi un bon prompt ?", text: "C'est quoi les caractéristiques d'un bon prompt ?" },
        { label: 'Différence IA vs ML ?', text: "Quelle est la différence entre IA, Machine Learning et Deep Learning ?" },
        { label: "Par où commencer ?", text: "Par où commencer pour intégrer l'IA dans mon travail ?" },
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: compact ? 420 : '100%',
            minHeight: compact ? 420 : 500,
        }}>

            {/* Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                paddingRight: 4,
                marginBottom: 12,
            }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        display: 'flex',
                        flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                        alignItems: 'flex-end',
                        gap: 8,
                        animation: 'fadeInUp 0.3s ease-out',
                    }}>
                        {/* Avatar ALIA */}
                        {msg.role === 'assistant' && (
                            <img
                                src="/assets/alia-mascotte.png"
                                alt="ALIA"
                                style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0, marginBottom: 4 }}
                            />
                        )}

                        <div style={{
                            maxWidth: '78%',
                            padding: '10px 14px',
                            borderRadius: msg.role === 'user'
                                ? '18px 18px 4px 18px'
                                : '18px 18px 18px 4px',
                            background: msg.role === 'user' ? userBubble : bubbleSurface,
                            color: 'var(--color-text)',
                            fontSize: compact ? '0.82rem' : '0.88rem',
                            lineHeight: 1.55,
                            fontFamily: 'var(--font-body)',
                            border: msg.role === 'assistant' ? '1px solid var(--color-border)' : 'none',
                            boxShadow: msg.role === 'user'
                                ? '0 2px 12px rgba(124, 58, 237, 0.3)'
                                : '0 1px 6px rgba(0,0,0,0.1)',
                        }}>
                            {renderContent(msg.content)}
                        </div>
                    </div>
                ))}

                {/* Message en cours de streaming */}
                {isStreaming && (
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, animation: 'fadeInUp 0.3s ease-out' }}>
                        <img src="/assets/alia-mascotte.png" alt="ALIA" style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }} />
                        <div style={{
                            maxWidth: '78%',
                            padding: '10px 14px',
                            borderRadius: '18px 18px 18px 4px',
                            background: bubbleSurface,
                            color: 'var(--color-text)',
                            fontSize: compact ? '0.82rem' : '0.88rem',
                            lineHeight: 1.55,
                            fontFamily: 'var(--font-body)',
                            border: '1px solid var(--color-border)',
                        }}>
                            {streamingContent ? (
                                <>
                                    {renderContent(streamingContent)}
                                    <span style={{
                                        display: 'inline-block',
                                        width: 2,
                                        height: '1em',
                                        background: 'var(--color-primary-light)',
                                        marginLeft: 2,
                                        animation: 'alia-dots 0.8s ease-in-out infinite',
                                        verticalAlign: 'text-bottom',
                                    }} />
                                </>
                            ) : (
                                /* Indicateur de réflexion initial */
                                <span style={{ display: 'flex', gap: 5, alignItems: 'center', color: 'var(--color-text-muted)' }}>
                                    <span style={{ fontSize: '0.75rem' }}>ALIA réfléchit</span>
                                    {[0, 0.2, 0.4].map((d, i) => (
                                        <span key={i} style={{
                                            width: 6, height: 6, borderRadius: '50%',
                                            background: 'var(--color-primary-light)',
                                            animation: `alia-dots 1.2s ${d}s ease-in-out infinite`,
                                            display: 'inline-block',
                                        }} />
                                    ))}
                                </span>
                            )}
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Actions rapides (si pas encore de vraies questions) */}
            {messages.length <= 1 && !isStreaming && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginBottom: 10,
                    flexShrink: 0,
                }}>
                    {QUICK_ACTIONS.map((a, i) => (
                        <button
                            key={i}
                            onClick={() => sendMessage(a.text)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--color-border)',
                                background: 'rgba(124, 58, 237, 0.07)',
                                color: 'var(--color-text-muted)',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-display)',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(124, 58, 237, 0.15)';
                                e.currentTarget.style.color = 'var(--color-text)';
                                e.currentTarget.style.borderColor = 'var(--color-border-hover)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(124, 58, 237, 0.07)';
                                e.currentTarget.style.color = 'var(--color-text-muted)';
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                            }}
                        >
                            {a.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div style={{
                display: 'flex',
                gap: 8,
                flexShrink: 0,
                background: c.surface,
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '6px 6px 6px 14px',
                transition: 'border-color 0.2s',
            }}
                onFocus={() => {}}
            >
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder || (context ? 'Pose ta question sur ce concept...' : "Pose ta question à ALIA...")}
                    rows={1}
                    disabled={isStreaming}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.88rem',
                        resize: 'none',
                        lineHeight: 1.5,
                        padding: '6px 0',
                        maxHeight: 80,
                        overflowY: 'auto',
                    }}
                />
                <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isStreaming}
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: (!input.trim() || isStreaming)
                            ? 'rgba(124, 58, 237, 0.2)'
                            : 'linear-gradient(135deg, #7C3AED, #A855F7)',
                        color: 'white',
                        cursor: (!input.trim() || isStreaming) ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        flexShrink: 0,
                        alignSelf: 'flex-end',
                        marginBottom: 2,
                        transition: 'all 0.2s',
                    }}
                >
                    {isStreaming ? '⏳' : '➤'}
                </button>
            </div>

            <div style={{
                fontSize: '0.65rem',
                color: 'var(--color-text-muted)',
                textAlign: 'center',
                marginTop: 6,
                opacity: 0.6,
            }}>
                Entrée pour envoyer · Shift+Entrée pour aller à la ligne
            </div>
        </div>
    );
}
