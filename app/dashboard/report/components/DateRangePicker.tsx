'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DateRangePicker() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Helper functions to get default dates
    function getDefaultStartDate() {
        const date = new Date();
        date.setDate(date.getDate() - 2);
        return date.toISOString().split('T')[0];
    }

    function getDefaultEndDate() {
        return new Date().toISOString().split('T')[0];
    }

    // Default to last 7 days if no dates are provided
    const [startDate, setStartDate] = useState(
        searchParams.get('startDate') || getDefaultStartDate()
    );
    const [endDate, setEndDate] = useState(
        searchParams.get('endDate') || getDefaultEndDate()
    );

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Create a new URLSearchParams instance
        const params = new URLSearchParams();
        params.set('startDate', startDate);
        params.set('endDate', endDate);

        // Update the URL with the new search params
        router.push(`?${params.toString()}`);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-sm mb-6 dark:bg-gray-800 dark:text-gray-300">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                    <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                        End Date
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div className="w-full md:w-1/3 flex items-end">
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition-colors"
                    >
                        Filter
                    </button>
                </div>
            </div>
        </form>
    );
}
