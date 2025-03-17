'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DateRangePicker() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [startDate, setStartDate] = useState(
        searchParams.get('startDate') || getDefaultStartDate()
    );
    const [endDate, setEndDate] = useState(
        searchParams.get('endDate') || getDefaultEndDate()
    );

    function getDefaultStartDate() {
        // Default to one month ago
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().split('T')[0];
    }

    function getDefaultEndDate() {
        // Default to current date
        return new Date().toISOString().split('T')[0];
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Create a new URLSearchParams instance
        const params = new URLSearchParams(searchParams);
        params.set('startDate', startDate);
        params.set('endDate', endDate);

        // Update the URL with the new search params
        router.push(`?${params.toString()}`);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300">
            <div className="flex flex-col md:flex-row gap-4 dark:bg-gray-800 dark:text-gray-300">
                <div className="w-full flex items-end">
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition-colors"
                    >
                        Generate Report
                    </button>
                </div>
            </div>
        </form>
    );
}
