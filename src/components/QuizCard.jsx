import { useState, useEffect, useRef } from 'react';
import AliaCharacter from './AliaCharacter';
import QuizAIWidget from './QuizAIWidget';

export default function QuizCard({ questions, onComplete, onAnswer, moduleLabel }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [aliaState, setAliaState] = useState('thinking');
    const aliaTimer = useRef(null);
    const scoreRef = useRef(0);

    const q = questions[current];

    // When question changes, reset Alia to "asking" mode
    useEffect(() => {
        clearTimeout(aliaTimer.current);
        setAliaState('thinking');
    }, [current]);

    const handleAnswer = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        const isCorrect = idx === q.correct;
        if (isCorrect) {
            scoreRef.current += 1;
            setScore(prev => prev + 1);
            setAliaState('happy');
        } else {
            setAliaState('sad');
        }
        onAnswer?.(isCorrect);
    };

    const handleNext = () => {
        clearTimeout(aliaTimer.current);
        if (current < questions.length - 1) {
            setCurrent(prev => prev + 1);
            setSelected(null);
            setAnswered(false);
        } else {
            setFinished(true);
            const pct = Math.round((scoreRef.current / questions.length) * 100);
            if (pct >= 80) {
                setAliaState('levelup');
            } else if (pct >= 50) {
                setAliaState('happy');
            } else {
                setAliaState('sad');
            }
            onComplete?.(pct);
        }
    };

    if (finished) {
        const pct = Math.round((scoreRef.current / questions.length) * 100);
        return (
            <div style={{
                textAlign: 'center',
                padding: 40,
                animation: 'fadeInUp 0.6s ease-out',
            }}>
                {/* Alia reacts to results */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <AliaCharacter
                        state={aliaState}
                        size={110}
                    />
                </div>
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    marginBottom: 8,
                }}>
                    {pct >= 80 ? 'Excellent !' : pct >= 50 ? 'Bien joué !' : 'Continue à apprendre !'}
                </h3>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    color: pct >= 80 ? 'var(--color-success)' : pct >= 50 ? 'var(--color-gold)' : 'var(--color-error)',
                    marginBottom: 8,
                }}>
                    {scoreRef.current}/{questions.length}
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Score : {pct}%
                </p>
            </div>
        );
    }

    return (
        <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            {/* ── Alia asks the question ── */}
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
                marginBottom: 24,
                padding: 16,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.15)',
            }}>
                <div style={{ flexShrink: 0 }}>
                    <AliaCharacter
                        state={aliaState}
                        size={80}
                    />
                </div>
                <div style={{ flex: 1, paddingTop: 4 }}>
                    {/* Progress dots */}
                    <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                        {questions.map((_, i) => (
                            <div key={i} style={{
                                flex: 1,
                                height: 4,
                                borderRadius: 2,
                                background: i < current ? 'var(--color-success)'
                                    : i === current ? 'var(--color-primary-light)'
                                        : 'rgba(124,58,237,0.2)',
                                transition: 'background 0.3s ease',
                            }} />
                        ))}
                    </div>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-accent)',
                        marginBottom: 6,
                    }}>
                        Question {current + 1}/{questions.length}
                    </div>
                    <h4 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        lineHeight: 1.4,
                        margin: 0,
                    }}>
                        {q.question}
                    </h4>
                </div>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {q.options.map((opt, i) => {
                    const isCorrect = answered && i === q.correct;
                    const isWrong = answered && i === selected && i !== q.correct;

                    return (
                        <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            style={{
                                padding: '14px 18px',
                                borderRadius: 'var(--radius-md)',
                                border: `1px solid ${isCorrect ? 'var(--color-success)'
                                        : isWrong ? 'var(--color-error)'
                                            : selected === i ? 'var(--color-primary-light)'
                                                : 'var(--color-border)'
                                    }`,
                                background: isCorrect ? 'rgba(16,185,129,0.15)'
                                    : isWrong ? 'rgba(239,68,68,0.15)'
                                        : selected === i ? 'rgba(124,58,237,0.1)'
                                            : 'var(--color-surface)',
                                color: 'var(--color-text)',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.9rem',
                                textAlign: 'left',
                                cursor: answered ? 'default' : 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                            }}
                            onMouseEnter={e => {
                                if (!answered) {
                                    e.currentTarget.style.borderColor = 'var(--color-primary-light)';
                                    e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!answered && selected !== i) {
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                    e.currentTarget.style.background = 'var(--color-surface)';
                                }
                            }}
                        >
                            <span style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                fontFamily: 'var(--font-mono)',
                                background: isCorrect ? 'var(--color-success)'
                                    : isWrong ? 'var(--color-error)'
                                        : 'rgba(124,58,237,0.2)',
                                color: 'white',
                                flexShrink: 0,
                            }}>
                                {isCorrect ? '✓' : isWrong ? '✗' : String.fromCharCode(65 + i)}
                            </span>
                            {opt}
                        </button>
                    );
                })}
            </div>

            {/* AI Widget — before answering */}
            {!answered && (
                <QuizAIWidget
                    question={q.question}
                    module={moduleLabel || 'Quiz'}
                />
            )}

            {/* Alia's explanation after answer */}
            {answered && (
                <div style={{
                    marginTop: 16,
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    background: selected === q.correct ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    border: `1px solid ${selected === q.correct ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                    animation: 'fadeInUp 0.3s ease-out',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                }}>
                    <img
                        src="/assets/alia-mascotte.png"
                        alt="ALIA"
                        style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0, marginTop: 2 }}
                    />
                    <div>
                        <strong>{selected === q.correct ? '✅ Correct !' : '❌ Incorrect.'}</strong>{' '}
                        {q.explanation}
                    </div>
                </div>
            )}

            {/* Next button */}
            {answered && (
                <button
                    onClick={handleNext}
                    className="btn btn-primary"
                    style={{
                        marginTop: 20,
                        width: '100%',
                        animation: 'fadeInUp 0.3s ease-out',
                    }}
                >
                    {current < questions.length - 1 ? 'Question suivante →' : 'Voir les résultats'}
                </button>
            )}
        </div>
    );
}
