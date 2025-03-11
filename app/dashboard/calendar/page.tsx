import CalendarWrapper from "@/app/ui/calendar/calendar-wrapper";
import { montserrat } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Calendar',
};

export default function Page() {
    return (
        <main className={`${montserrat.className}`}>
            <h1 className="mb-4 text-xl md:text-2xl">
                Appointment Calendar
            </h1>
            <CalendarWrapper />
        </main>
    );
}