import React, { useState } from 'react';

interface Event {
    id: number;
    title: string;
    description: string;
    date: string; // ISO format (YYYY-MM-DD)
}

const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([
        { id: 1, title: 'Meeting with Team', description: 'Discuss project updates', date: '2024-12-15' },
        { id: 2, title: 'Doctor Appointment', description: 'Annual check-up', date: '2024-12-15' },
        { id: 3, title: 'Birthday Party', description: 'Celebrate with friends!', date: '2024-12-20' },
    ]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0 = January, 1 = February, etc.
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Day of the week (0 = Sunday, 1 = Monday, etc.)

    const handleDayClick = (day: number) => {
        const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(date);
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const eventsForSelectedDate = selectedDate
        ? events.filter(event => event.date === selectedDate)
        : [];

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="container mx-auto text-center mt-10">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handlePrevMonth}
                    className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    &larr;
                </button>
                <h1 className="text-2xl font-bold">
                    {monthNames[currentMonth]} {currentYear}
                </h1>
                <button
                    onClick={handleNextMonth}
                    className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    &rarr;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 font-semibold text-gray-700">
                        {day}
                    </div>
                ))}
                {Array.from({ length: firstDayOfMonth }, (_, index) => (
                    <div key={`empty-${index}`} className="p-4"></div>
                ))}
                {Array.from({ length: daysInMonth }, (_, index) => (
                    <div
                        key={index + 1}
                        className={`p-4 border rounded-lg cursor-pointer ${selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}` ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={() => handleDayClick(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>

            {selectedDate && (
                <div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Events for {selectedDate}</h2>
                    {eventsForSelectedDate.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {eventsForSelectedDate.map(event => (
                                <li key={event.id}>
                                    <strong>{event.title}</strong>: {event.description}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No events for this date.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calendar;
