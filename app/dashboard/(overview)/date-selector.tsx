'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function DateSelector() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const today = new Date().toISOString().split('T')[0];

    const startDate = searchParams.get('startDate') || today;
    const endDate = searchParams.get('endDate') || today;

    const handleDateChange = (start: string, end: string) => {
        const params = new URLSearchParams();
        params.set('startDate', start);
        params.set('endDate', end);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex gap-4">
            <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1 dark:text-gray-300">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => handleDateChange(e.target.value, endDate)}
                    className="rounded-md border p-2 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 calendar-input"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1 dark:text-gray-300">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => handleDateChange(startDate, e.target.value)}
                    className="rounded-md border p-2 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 calendar-input"
                />
            </div>
        </div>
    );
}
