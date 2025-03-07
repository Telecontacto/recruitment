'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function DateSelector() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentDate = searchParams.get('date') || '2025-03';

    const handleDateChange = (newDate: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('date', newDate);
        router.push(`?${params.toString()}`);
    };

    return (
        <input
            type="month"
            value={currentDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="rounded-md border p-2 mb-4 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 calendar-input"
        />
    );
}
