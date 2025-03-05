'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize state with a function to avoid executing in server-side
        if (typeof window !== 'undefined') {
            const theme = localStorage.getItem('theme');
            return theme === 'dark';
        }
        return false;
    });

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            setIsDarkMode(theme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
            localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
        }
    }, []);

    // Update localStorage and document class when theme changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};