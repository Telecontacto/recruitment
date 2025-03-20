import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchCalendarAppointments, updateCalendarAppointment } from '@/app/api/queryHandle/fetchApi';
import Modal, { AppointmentDetailsModal } from '@/app/ui/pipeline/modal';
import {
    PencilSquareIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface Event {
    ID: number;
    NombreCitado: string;
    Telefono: string;
    Fecha: string; // ISO format (YYYY-MM-DD)
    Hora: string; // Format HH:mm
    Status?: string; // Added Status field which might be optional
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
    const [isModalOpen, setModalOpen] = useState(false);
    const [ModalMessage, setModalMessage] = useState('');
    const [ModalColor, setModalColor] = useState('');
    // New state variables for edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Event | null>(null);

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

    const handleEditAppointment = (event: Event) => {
        setSelectedAppointment(event);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedAppointment(null);
    };

    const handleSaveAppointment = async (updatedAppointment: Event) => {
        try {
            // Await the API call to update the appointment
            await updateCalendarAppointment(updatedAppointment);

            // Refresh appointments data after update to ensure state is in sync with backend
            const refreshedData = await fetchCalendarAppointments(currentMonth + 1, currentYear);
            setEvents(refreshedData);

            // Close the edit modal
            closeEditModal();

            // Show success message
            setModalMessage('Appointment updated successfully');
            setModalColor('bg-green-500');
            setModalOpen(true);

            // Hide success message after a delay
            setTimeout(() => {
                setModalOpen(false);
                setModalColor('');
                setModalMessage('');
            }, 3000);

        } catch (error) {
            console.error('Failed to update appointment:', error);

            // Show error message
            setModalMessage('Failed to update appointment');
            setModalColor('bg-red-500');
            setModalOpen(true);

            // Hide error message after a delay
            setTimeout(() => {
                setModalOpen(false);
            }, 3000);

            throw error; // Re-throw to let the modal component handle it
        }
    };

    // Helper function to determine name color based on status
    const getStatusColor = (status: string | undefined) => {
        if (!status) return ''; // Default for null/undefined status - use the default text color

        // Convert to lowercase for case-insensitive comparison
        const statusLower = status.toLowerCase();

        if (statusLower.includes('canceled')) return 'text-blue-600';
        if (statusLower.includes('confirmed')) return 'text-green-600';
        if (statusLower.includes('reschedule')) return 'text-orange-600';
        if (statusLower.includes('no_show') || statusLower.includes('no_show')) return 'text-red-600';
        if (statusLower.includes('saturday')) return 'text-purple-600';
        if (statusLower.includes('walkin')) return 'text-pink-600';
        if (statusLower.includes('follow_up')) return 'text-yellow-600';

        // Return empty string for other status values to use default text color
        return '';
    };

    return (
        <div className="container mx-auto text-center mt-10 bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-md">
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
                        <ul className="list-none space-y-2">
                            {timeSlots.map((time, index) => {
                                const eventsInTimeSlot = eventsForSelectedDate.filter(event => event.Hora === time);
                                const isFull = eventsInTimeSlot.length >= 10;
                                const hasAppointment = hasAppointmentInTimeSlot(selectedDate, time);

                                return (
                                    <li
                                        key={index}
                                        className={`p-2 border rounded-lg cursor-pointer ${isFull
                                            ? 'bg-red-500 text-white'
                                            : hasAppointment
                                                ? 'bg-yellow-200 dark:bg-yellow-600 dark:text-white font-bold'
                                                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                                            }`}
                                    >
                                        <div onClick={() => toggleTimeSlot(time)} className="font-medium">
                                            {new Date('1970-01-01T' + time + 'Z')
                                                .toLocaleTimeString('en-US',
                                                    { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
                                                )}
                                            {hasAppointment && ' (Your Appointment)'}
                                        </div>

                                        {expandedTimeSlot === time && eventsInTimeSlot.length > 0 && (
                                            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                                                <p className="text-sm font-medium mb-1 text-left">Appointments:</p>
                                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                                    {eventsInTimeSlot.map(event => (
                                                        <li
                                                            key={event.ID}
                                                            className={`py-2 flex justify-between items-center ${event.NombreCitado === name ? 'font-bold' : ''
                                                                }`}
                                                        >
                                                            <div className="text-left">
                                                                <strong className={clsx(
                                                                    getStatusColor(event.Status),
                                                                    'transition-colors duration-200'
                                                                )}>
                                                                    {event.NombreCitado}
                                                                </strong>
                                                                : {event.Telefono}
                                                                {event.Status && (
                                                                    <span className="text-xs ml-2">
                                                                        {event.Status}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleEditAppointment(event);
                                                                }}
                                                                className="bg-red-600 hover:bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center"
                                                            >
                                                                <PencilSquareIcon className="h-4 w-4 mr-1" />
                                                                Edit
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {expandedTimeSlot === time && eventsInTimeSlot.length === 0 && (
                                            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 text-left">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    No appointments in this time slot
                                                </p>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}

            <AppointmentDetailsModal
                isOpen={showEditModal}
                onClose={closeEditModal}
                appointment={selectedAppointment}
                onSave={handleSaveAppointment}
            />

            <Modal isOpen={isModalOpen} color={ModalColor} message={ModalMessage} />
        </div>
    );
};

export default Calendar;
