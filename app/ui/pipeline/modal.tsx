import { useState, useEffect } from "react";
import { ModalProps, DeleteModalProps, HRModalProps, CreateApplicantModalProps } from '@/app/lib/definitions';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { montserrat } from '@/app/ui/fonts'

export default function Modal({ isOpen, color, message }: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Match the duration of the fade-out transition
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null; // Prevent rendering when the modal is hidden

    return (
        <div
            className={`${montserrat.className} fixed bottom-4 right-4 z-50 max-w-sm overflow-hidden rounded-lg ${color} shadow-lg transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                }`}
            role="alert"
        >
            <div className="w-full px-4 py-3">
                <h3 className="text-base font-semibold text-white">
                    {message}
                </h3>
            </div>
        </div>
    );
}

export function DeleteModal({ isOpen, onClose, validateDelete }: DeleteModalProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-2000/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className={`${montserrat.className} fixed inset-0 z-10 w-screen overflow-y-auto`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-gray-800 dark:text-gray-300">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-gray-300">
                                        Delete Applicant
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Are you sure you want to delete this applicant?
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => validateDelete("Confirm")}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => validateDelete("Cancel")}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export function HireRejectedModal({ isOpen, onClose, validateAnswer }: HRModalProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-2000/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className={`${montserrat.className} fixed inset-0 z-10 w-screen overflow-y-auto`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-gray-800 dark:text-gray-300">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-gray-300">
                                        Is this Applicant hired or rejected?
                                    </DialogTitle>
                                </div>
                                <button
                                    onClick={() => validateAnswer("Cancel")}
                                    className="absolute top-2 right-2 text-black hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-500"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-800 dark:text-gray-300">
                            <button
                                type="button"
                                onClick={() => validateAnswer("5")}
                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black sm:ml-3 sm:w-auto"
                            >
                                Hired
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => validateAnswer("0")}
                                className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-200 hover:text-black sm:mt-0 sm:w-auto"
                            >
                                Rejected
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export function CreateApplicantModal({ isOpen, onClose, onSubmit, user }: CreateApplicantModalProps) {
    const initialFormState = {
        name: '',
        email: '',
        phone: '',
        source: '',
        stage: '2',
        document: null as File | null,
        documentPath: '',
        assignRecruiter: user,
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isUploading, setIsUploading] = useState(false);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen, user]);

    // Function to reset form data
    const resetForm = () => {
        setFormData({
            ...initialFormState,
            assignRecruiter: user, // Keep the current user
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            if (formData.document) {
                const uploadFormData = new FormData();
                // Change 'document' to 'file' to match API expectations
                uploadFormData.append('file', formData.document);

                console.log('Sending file:', formData.document.name);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Upload failed');
                }

                const { file_path, file_name, file_id } = await response.json();

                console.log('Upload response:', { file_path, file_name, file_id });

                // Submit the form with the remote file information
                const submitData = {
                    ...formData,
                    documentPath: file_path,
                    documentId: file_id,
                    document: file_name
                };

                onSubmit(submitData);

            } else {
                onSubmit(formData);
            }
            resetForm(); // Reset form after successful submission
            onClose();
        } catch (error) {
            console.error('Error uploading file:', error);
            // Add error notification here
            alert('Failed to upload file. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-2000/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className={`${montserrat.className} fixed inset-0 z-10 w-screen overflow-y-auto`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 dark:bg-gray-800 dark:text-gray-300">
                                <div className="space-y-4">
                                    <DialogTitle as="h3" className="text-lg font-semibold text-gray-900 dark:text-gray-300">
                                        Add New Applicant
                                    </DialogTitle>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="mt-1 w-full rounded-md border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="mt-1 w-full rounded-md border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                        <input
                                            type="tel"
                                            required
                                            className="mt-1 w-full rounded-md border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Where did the applicant solicited from?</label>
                                        <select
                                            required
                                            className="mt-1 w-full rounded-md border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                            value={formData.source}
                                            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                        >
                                            <option value="">Select an option</option>
                                            <option value="meta">Facebook/Instagram</option>
                                            <option value="indeed">Indeed</option>
                                            <option value="empleos">Employment (Inbox)</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="perfil">Perfil</option>
                                            <option value="web">Web</option>
                                            <option value="ziprecruiter">ZipRecruiter</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resume</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                document: e.target.files ? e.target.files[0] : null
                                            })}
                                            className="mt-1 w-full p-2"
                                        />
                                        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                                            Accepted formats: PDF, DOC, DOCX (Max size: 10MB)
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-200 dark:bg-gray-800 dark:text-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:bg-gray-400"
                                >
                                    {isUploading ? 'Uploading...' : 'Add Applicant'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

// Add new interface for AppointmentDetailsModal
interface AppointmentDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: {
        ID: number;
        NombreCitado: string;
        Telefono: string;
        Fecha: string;
        Hora: string;
        Status?: string;
    } | null;
    onSave?: (updatedAppointment: any) => Promise<void>;
}

export function AppointmentDetailsModal({ isOpen, onClose, appointment, onSave }: AppointmentDetailsModalProps) {
    const [editedStatus, setEditedStatus] = useState<string>('');
    const [editedDate, setEditedDate] = useState<string>('');
    const [editedTime, setEditedTime] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [scheduleCount, setScheduleCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Available status options
    const statusOptions = [
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'canceled', label: 'Canceled' },
        { value: 'reschedule', label: 'Reschedule', disabled: scheduleCount >= 3 },
        { value: 'no_show', label: 'No Show' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'walkin', label: 'Walk-in' },
        { value: 'follow_up', label: 'Follow Up' },
    ];

    // Fetch the number of interviews scheduled for this applicant
    useEffect(() => {
        async function fetchScheduleCount() {
            if (!appointment || !isOpen) return;

            setIsLoading(true);
            try {
                const response = await fetch(`/api/calendarAppointments/count?id=${appointment.ID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch schedule count');
                }
                const data = await response.json();
                setScheduleCount(data[0].total || 0);
            } catch (error) {
                console.error('Error fetching schedule count:', error);
                // Don't set error message to avoid confusion with the main functionality
            } finally {
                setIsLoading(false);
            }
        }

        fetchScheduleCount();
    }, [appointment, isOpen]);

    // Initialize form values when appointment changes
    useEffect(() => {
        if (appointment) {
            setEditedStatus(appointment.Status || '');
            setEditedDate(appointment.Fecha);
            setEditedTime(appointment.Hora);
            setErrorMessage(null);
        }
    }, [appointment]);

    if (!isOpen || !appointment) return null;

    const handleSave = async () => {
        if (!onSave) return;

        setIsSaving(true);
        setErrorMessage(null);

        try {
            await onSave({
                ...appointment,
                Status: editedStatus,
                Fecha: editedDate,
                Hora: editedTime
            });
            onClose();
        } catch (error) {
            console.error('Error saving appointment:', error);
            setErrorMessage('Failed to save changes. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-2000/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className={`${montserrat.className} fixed inset-0 z-10 w-screen overflow-y-auto`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-200">
                            <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>

                            {errorMessage && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="mb-4">
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Solicitor ID</label>
                                    <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded">{appointment.ID}</div>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded">{appointment.NombreCitado}</div>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                    <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded">{appointment.Telefono}</div>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                    {isLoading ? (
                                        <div className="mt-1 p-2 text-gray-500">Loading schedule data...</div>
                                    ) : (
                                        <>
                                            <select
                                                value={editedStatus}
                                                onChange={(e) => setEditedStatus(e.target.value)}
                                                className="mt-1 w-full rounded-md border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                            >
                                                <option value="">-- Select Status --</option>
                                                {statusOptions.map((option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                        disabled={option.disabled}
                                                    >
                                                        {option.label} {option.value === 'reschedule' && scheduleCount >= 3 ? '(Limit Reached)' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                            {scheduleCount >= 3 && (
                                                <p className="text-xs text-amber-600 mt-1 dark:text-amber-400">
                                                    This applicant has already rescheduled {scheduleCount} times. No more reschedules are allowed.
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                                    <input
                                        type="date"
                                        value={editedDate}
                                        onChange={(e) => setEditedDate(e.target.value)}
                                        className="mt-1 w-full rounded-md border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                                    <input
                                        type="time"
                                        value={editedTime}
                                        onChange={(e) => setEditedTime(e.target.value)}
                                        className="mt-1 w-full rounded-md border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={onClose}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                {onSave && (
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded disabled:bg-red-300"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}


