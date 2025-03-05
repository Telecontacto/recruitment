'use client';
import { useTheme } from '@/app/context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function ThemeButton() {
    const { isDarkMode, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10"></div>; // Placeholder while mounting
    }

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded ${isDarkMode ? 'gunmetal text-white' : 'bg-gray-200 text-black'}`}
        >
            {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-white-500" />
            ) : (
                <MoonIcon className="h-6 w-6 text-gray-800" />
            )}
        </button>
    );
}
