'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/app/translations';

export default function DashboardLayout({
    children,
    className,
    userName,
    userRole
}: {
    children: React.ReactNode;
    className?: string;
    userName?: string | null;
    userRole?: string | null;
}) {
    const { language } = useLanguage();

    return (
        <main className={className}>
            <div className="flex justify-between items-center mb-4 grid grid-cols-2">
                <div className='relative'>
                    <h1 className="text-xl md:text-2xl">
                        {getTranslation('dashboard', language)}
                    </h1>
                </div>
                <div className='relative text-right'>
                    <h1 className="text-xl md:text-2xl">
                        {getTranslation('welcome', language)}, {userName || 'Guest'}
                    </h1>
                </div>
            </div>
            <div className="bg-gray-200 p-4 rounded-md">
                {children}
            </div>
        </main>
    );
}
