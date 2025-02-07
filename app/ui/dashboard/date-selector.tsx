'use client';

import { useState } from 'react';

export default function DateSelector({ onDateChange }: { onDateChange: (date: string) => void }) {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 7));

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setDate(newDate);
        onDateChange(newDate);
    };

    return (
        <div className="relative mb-4">
            <input
                id="date"
                name="date"
                type="month"
                value={date}
                onChange={handleDateChange}
                className="peer block cursor-text rounded-md border border-gray-200 py-2 pl-10 bg-white text-black dark:bg-gray-800 dark:text-white"
            />
        </div>
    );
}
