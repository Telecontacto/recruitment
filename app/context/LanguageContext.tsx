'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
};

// Add a default value to avoid undefined context
const defaultContextValue: LanguageContextType = {
    language: 'en',
    setLanguage: () => console.warn('LanguageProvider not initialized')
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        try {
            /* console.group('LanguageProvider Mount');
            console.log('Mounting LanguageProvider...'); */
            setMounted(true);
            const storedLanguage = localStorage.getItem('language');
            if (storedLanguage) {
                //console.log('Found stored language:', storedLanguage);
                setLanguage(storedLanguage);
            }
            console.groupEnd();
        } catch (error) {
            console.error('Error in LanguageProvider mount:', error);
        }
    }, []);

    // Debug render cycle
    useEffect(() => {
        //console.log('LanguageProvider state updated:', { mounted, language });
    }, [mounted, language]);

    if (!mounted) {
        //console.log('LanguageProvider not mounted, using default value');
        return <>{children}</>;
    }

    const contextValue = { language, setLanguage };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    try {
        const context = useContext(LanguageContext);
        //console.group('useLanguage Hook');
        //console.log('Context value:', context);

        // Check if we're in a component tree
        if (typeof window !== 'undefined') {
            /* console.log('Component environment:', {
                hasDocument: !!document,
                hasWindow: !!window,
                mountPoint: document.getElementById('__next') ? 'Found Next.js root' : 'No Next.js root'
            }); */
        }

        //console.groupEnd();
        return context;
    } catch (error) {
        console.error('Error in useLanguage hook:', error);
        throw error;
    }
}
