'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/app/translations';
import CardWrapper from '@/app/ui/dashboard/cards';
import { montserrat } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';

export default function DashboardContent() {
    const { language } = useLanguage();

    return (
        <main className={`${montserrat.className}`}>
            <h1 className="mb-4 text-xl md:text-2xl">
                {getTranslation('dashboard', language)}
            </h1>
            <div className="bg-gray-200 p-4 rounded-md">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper date="2025-01" />
                </Suspense>
            </div>
        </main>
    );
}
