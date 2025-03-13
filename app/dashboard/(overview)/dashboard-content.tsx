'use client';

import CardWrapper from '@/app/ui/dashboard/cards';
import { montserrat } from '@/app/ui/fonts';
import DateSelector from './date-selector';
import { useState } from 'react';

export default function DashboardContent() {
    // Get yesterday's date for the initial state
    const getYesterday = () => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return formatDate(today);
    };

    // Format date as YYYY-MM-DD
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const yesterday = getYesterday();

    const [selectedDate, setSelectedDate] = useState({
        startDate: yesterday,
        endDate: yesterday
    });

    const handleDateChange = (startDate: string, endDate: string) => {
        setSelectedDate({ startDate, endDate });
    };

    return (
        <main className={`${montserrat.className}`}>
            <div className="flex items-center justify-between mb-4">
                <DateSelector onDateChange={handleDateChange} selectedDate={selectedDate} />
            </div>
            <div className="bg-gray-200 p-4 rounded-md">
                <CardWrapper startDate={selectedDate.startDate} endDate={selectedDate.endDate} />
            </div>
        </main>
    );
}
