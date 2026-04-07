import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

/* Couleurs inline selon le thème — utilisées dans les composants
   pour les styles qui ne peuvent pas être gérés par CSS seul. */
const DARK = {
    bg:          '#0D0A1A',
    sidebar:     'rgba(26, 19, 50, 0.85)',
    header:      'rgba(13, 10, 26, 0.85)',
    surface:     'rgba(26, 19, 50, 0.6)',
    surface2:    'rgba(37, 27, 74, 0.4)',
    inputBg:     'rgba(13, 10, 26, 0.6)',
    authLeft:    'linear-gradient(135deg, #0D0A1A 0%, #1A1332 50%, #251B4A 100%)',
    navLink:     'var(--color-text-muted)',
    border:      'var(--color-border)',
};

const LIGHT = {
    bg:          '#F5F3FF',
    sidebar:     'rgba(255, 255, 255, 0.95)',
    header:      'rgba(255, 255, 255, 0.92)',
    surface:     'rgba(255, 255, 255, 0.85)',
    surface2:    'rgba(237, 233, 254, 0.55)',
    inputBg:     'rgba(255, 255, 255, 0.9)',
    authLeft:    'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 50%, #C4B5FD 100%)',
    navLink:     '#6B21A8',
    border:      'rgba(124, 58, 237, 0.2)',
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() =>
        localStorage.getItem('alia_theme') || 'dark'
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('alia_theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
    const isDark = theme === 'dark';
    const c = isDark ? DARK : LIGHT;

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme, c }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
