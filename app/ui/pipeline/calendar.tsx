import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchCalendarAppointments, insertCalendarAppointment } from '@/app/api/queryHandle/fetchApi';
import Modal from '@/app/ui/pipeline/modal';


interface Event {
    ID: number;
    NombreCitado: string;
    Telefono: string;
    Fecha: string; // ISO format (YYYY-MM-DD)
    Hora: string; // Format HH:mm
}

interface calendarProps {
    name: string;
    phone: string;
    id: number;
}

const Calendar: React.FC<calendarProps> = ({ name, phone, id }) => {

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [expandedTimeSlot, setExpandedTimeSlot] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0 = January, 1 = February, etc.
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [newEventTime, setNewEventTime] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [ModalMessage, setModalMessage] = useState('')
    const [ModalColor, setModalColor] = useState('')

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchCalendarAppointments(currentMonth + 1, currentYear);
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [currentMonth]); // Trigger only when currentMonth changes

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Day of the week (0 = Sunday, 1 = Monday, etc.)

    const handleDayClick = (day: number) => {
        const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(date);
        setExpandedTimeSlot(null); // Collapse any expanded time slot
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

    const addEvent = (time: string) => {
        setNewEventTime(time);
        setShowAddEventModal(true);
    };

    const confirmAddEvent = async () => {
        if (selectedDate && newEventTime) {
            const newEvent: Event = {
                ID: id, // Use the id from props instead of events.length
                NombreCitado: name,
                Telefono: phone,
                Fecha: selectedDate,
                Hora: newEventTime,
            };
            setEvents([...events, newEvent]);
            let msg = await insertCalendarAppointment(name, phone, selectedDate, newEventTime, id); // Add id parameter
            if (msg) {
                setModalMessage('Appointment set successfully');
                setModalColor('bg-green-500');
                setModalOpen(true);
                setTimeout(() => {
                    setModalOpen(false);
                    setModalMessage('');
                    setModalColor('');
                }, 2000);
            }
            setShowAddEventModal(false);
            setNewEventTime(null);
        }
    };

    const eventsForSelectedDate = selectedDate
        ? events.filter(event => event.Fecha === selectedDate)
        : [];

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const timeSlots = Array.from({ length: 8 }, (_, i) => {
        const hour = i + 9; // Start from 9
        return `${String(hour).padStart(2, '0')}:00`;
    });

    const toggleTimeSlot = (time: string) => {
        setExpandedTimeSlot(expandedTimeSlot === time ? null : time);
    };

    // Add function to check if a date has an appointment for current applicant
    const hasAppointmentOnDate = (day: number) => {
        const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.some(event =>
            event.Fecha === date &&
            event.NombreCitado === name &&
            event.Telefono === phone
        );
    };

    // Add function to check if this time slot has an appointment for current applicant
    const hasAppointmentInTimeSlot = (date: string, time: string) => {
        return events.some(event =>
            event.Fecha === date &&
            event.Hora === time &&
            event.NombreCitado === name &&
            event.Telefono === phone
        );
    };

    return (
        <div className="container mx-auto text-center mt-10">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handlePrevMonth}
                    className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                    &larr;
                </button>
                <h1 className="text-2xl font-bold dark:text-gray-200">
                    {monthNames[currentMonth]} {currentYear}
                </h1>
                <button
                    onClick={handleNextMonth}
                    className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                    &rarr;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 font-semibold text-gray-700 dark:text-gray-300">
                        {day}
                    </div>
                ))}
                {Array.from({ length: firstDayOfMonth }, (_, index) => (
                    <div key={`empty-${index}`} className="p-4"></div>
                ))}
                {Array.from({ length: daysInMonth }, (_, index) => {
                    const hasAppointment = hasAppointmentOnDate(index + 1);
                    return (
                        <div
                            key={index + 1}
                            className={`p-4 border rounded-lg cursor-pointer ${selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`
                                ? 'bg-red-500 text-white'
                                : hasAppointment
                                    ? 'bg-yellow-200 dark:bg-yellow-600 dark:text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                                }`}
                            onClick={() => handleDayClick(index + 1)}
                        >
                            <span className={hasAppointment ? 'font-bold' : ''}>
                                {index + 1}
                            </span>
                        </div>
                    );
                })}
            </div>

            {selectedDate && (
                <div className="mt-6 p-4 border rounded-lg bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Appointments for {selectedDate}</h2>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">Available Time Slots</h3>
                        <ul className="list-none">
                            {timeSlots.map((time, index) => {
                                const eventsInTimeSlot = eventsForSelectedDate.filter(event => event.Hora === time);
                                const isFull = eventsInTimeSlot.length >= 10;
                                const hasAppointment = hasAppointmentInTimeSlot(selectedDate, time);

                                return (
                                    <li
                                        key={index}
                                        className={`p-2 border rounded-lg mb-1 cursor-pointer ${isFull
                                            ? 'bg-red-500 text-white'
                                            : hasAppointment
                                                ? 'bg-yellow-200 dark:bg-yellow-600 dark:text-white font-bold'
                                                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                                            }`}
                                    >
                                        <div onClick={() => toggleTimeSlot(time)}>
                                            {new Date('1970-01-01T' + time + 'Z')
                                                .toLocaleTimeString('en-US',
                                                    { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
                                                )}
                                            {hasAppointment && ' (Your Appointment)'}
                                        </div>
                                        {!isFull && !hasAppointment && (
                                            <button
                                                onClick={() => addEvent(time)}
                                                className="mt-2 text-sm text-red-500 hover:underline"
                                            >
                                                Set Appointment
                                            </button>
                                        )}
                                        {expandedTimeSlot === time && (
                                            <ul className="mt-2 list-disc list-inside">
                                                {eventsInTimeSlot.length > 0 ? (
                                                    eventsInTimeSlot.map(event => (
                                                        <li key={event.ID} className={event.NombreCitado === name ? 'font-bold' : ''}>
                                                            <strong>{event.NombreCitado}</strong>: {event.Telefono}
                                                            {event.NombreCitado === name && ' (Your Appointment)'}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No Appointments in this time slot</li>
                                                )}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}

            {showAddEventModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-200">
                        <h2 className="text-xl font-semibold mb-4">Set Appointment</h2>
                        <p className="mb-4">Are you sure you want to set the appointment to {selectedDate} at {newEventTime}?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={confirmAddEvent}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowAddEventModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Modal isOpen={isModalOpen} color={ModalColor} message={ModalMessage} />
        </div>

    );
};

export default Calendar;
