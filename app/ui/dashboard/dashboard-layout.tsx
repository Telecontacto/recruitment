'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/app/translations';
import { montserrat } from '@/app/ui/fonts';

export default function DashboardLayout({
    children,
    className,
    userName,
    userLastName,
    userRole
}: {
    children: React.ReactNode;
    className?: string;
    userName?: string | null;
    userLastName?: string | null;
    userRole?: string | null;
}) {
    const { language } = useLanguage();

    return (
        <main className={montserrat.className}>
            <div className="flex justify-between items-center mb-4 grid grid-cols-2">
                <div className='relative'>
                    <h1 className="text-xl md:text-2xl">
                        {getTranslation('dashboard', language)}
                    </h1>
                </div>
                <div className='relative text-right'>
                    <h1 className="text-xl md:text-2xl">
                        {getTranslation('welcome', language)}, {userName || 'Guest'} {userLastName || ''}
                    </h1>
                </div>
            </div>
            <div className="bg-gray-200 p-4 rounded-md">
                {children}
            </div>
        </main>
    );
}
