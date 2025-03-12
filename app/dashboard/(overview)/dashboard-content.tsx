'use client';

import CardWrapper from '@/app/ui/dashboard/cards';
import { montserrat } from '@/app/ui/fonts';
import DateSelector from './date-selector';

export default function DashboardContent({ data }: { data: any[] }) {
    return (
        <main className={`${montserrat.className}`}>
            <div className="flex items-center justify-between mb-4">
                <DateSelector />
            </div>
            <div className="bg-gray-200 p-4 rounded-md">
                <CardWrapper data={data} />
            </div>
        </main>
    );
}
