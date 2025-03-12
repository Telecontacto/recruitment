'use client';

interface DateSelectorProps {
    onDateChange: (startDate: string, endDate: string) => void;
    selectedDate: {
        startDate: string;
        endDate: string;
    };
}

export default function DateSelector({ onDateChange, selectedDate }: DateSelectorProps) {
    const today = new Date().toISOString().split('T')[0];

    const startDate = selectedDate.startDate || today;
    const endDate = selectedDate.endDate || today;

    return (
        <div className="flex gap-4">
            <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1 dark:text-gray-300">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onDateChange(e.target.value, endDate)}
                    className="rounded-md border p-2 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 calendar-input"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1 dark:text-gray-300">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => onDateChange(startDate, e.target.value)}
                    className="rounded-md border p-2 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 calendar-input"
                />
            </div>
        </div>
    );
}
