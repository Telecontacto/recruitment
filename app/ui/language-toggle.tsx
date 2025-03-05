'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'es' : 'en';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    return (
        <button
            className="flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
            onClick={toggleLanguage}
        >
            {language.toUpperCase()}
        </button>
    );
}
