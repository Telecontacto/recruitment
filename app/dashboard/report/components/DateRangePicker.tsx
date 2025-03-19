'use client';

import { useDateContext } from '@/app/context/DateContext';
import { useRouter } from 'next/navigation';

export default function DateRangePicker() {
    const { startDate, endDate, setStartDate, setEndDate } = useDateContext();
    const router = useRouter();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Force a refresh so that ReportData will re-render with new dates
        router.refresh();
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
            </div>
        </form>
    );
}
