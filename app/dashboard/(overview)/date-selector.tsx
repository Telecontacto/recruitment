'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function DateSelector() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startDate = searchParams.get('startDate') || new Date().toISOString().split('T')[0];
    const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0];

    const handleDateChange = (start: string, end: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('startDate', start);
        params.set('endDate', end);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex gap-4">
            <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange(e.target.value, endDate)}
                className="rounded-md border p-2 mb-4 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 calendar-input"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange(startDate, e.target.value)}
                className="rounded-md border p-2 mb-4 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 calendar-input"
            />
        </div>
    );
}
