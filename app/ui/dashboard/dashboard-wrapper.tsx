'use client';

import { useState } from 'react';
import CardWrapper from './cards';
import DateSelector from './date-selector';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';

export default function DashboardWrapper() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 7));

    return (
        <>
            <DateSelector onDateChange={setSelectedDate} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 bg-gray-200 p-4 rounded-md">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper date={selectedDate} />
                </Suspense>
            </div>
        </>
    );
}
