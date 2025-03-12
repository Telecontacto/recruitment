'use client';

import CardWrapper from '@/app/ui/dashboard/cards';
import { montserrat } from '@/app/ui/fonts';
import DateSelector from './date-selector';
import { useState } from 'react';

export default function DashboardContent() {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState({
        startDate: today,
        endDate: today
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
