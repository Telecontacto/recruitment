import { UserCircleIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useState, useCallback } from 'react';
import Modal from '@/app/ui/pipeline/modal';
import { updatePersonalInfo } from '@/app/api/queryHandle/fetchApi';

interface ScheduleInputsProps {
    day: string;
    from: string;
    to: string;
    onChange: (day: string, field: string, value: string) => void;
    onBlur: (day: string, field: string, value: string) => void;
}

const ScheduleInputs: React.FC<ScheduleInputsProps> = ({ day, from, to, onChange, onBlur }) => {
    return (
        <div key={day} className='mb-4'>
            <label className='mb-2 block text-sm font-medium dark:text-gray-300'>{day}</label>
            <div className="relative">
                From: <input
                    className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    name={`${day}From`}
                    value={from || ''}
                    onChange={(e) => onChange(day, 'from', e.target.value)}
                    onBlur={(e) => onBlur(day, 'from', e.target.value)}
                />
                Until: <input
                    className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    name={`${day}Until`}
                    value={to || ''}
                    onChange={(e) => onChange(day, 'to', e.target.value)}
                    onBlur={(e) => onBlur(day, 'to', e.target.value)}
                />
            </div>
        </div>
    );
};

export default function PersonalInfoPanel({ data }: { data: any }) {
    const [info, setInfo] = useState(data);
    const [isSaving, setIsSaving] = useState(false);

    //Modal configuration
    const [isModalOpen, setModalOpen] = useState(false);
    const [ModalMessage, setModalMessage] = useState('')
    const [ModalColor, setModalColor] = useState('')

    const saveChanges = useCallback(async (newInfo: any) => {
        try {
            setIsSaving(true);
            await updatePersonalInfo(info.solicitorId, newInfo);
            setModalMessage('Info Updated Successfully');
            setModalColor('bg-green-500');
            setModalOpen(true);
        } catch (error) {
            console.error('Failed to save personal info:', error);
        } finally {
            setIsSaving(false);
            setTimeout(() => {
                setModalOpen(false);
                setModalMessage('');
                setModalColor('');
            }, 2000);
        }
    }, [info.solicitorId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleInputBlur = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newInfo = {
            ...info,
            [name]: value
        };
        await saveChanges(newInfo);
    };

    const handleScheduleChange = (day: string, field: string, value: string) => {
        const fieldName = `${day.slice(0, 3).toLowerCase()}${field === 'from' ? 'From' : 'Until'}`;
        setInfo((prev: any) => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleScheduleBlur = async (day: string, field: string, value: string) => {
        const fieldName = `${day.toLowerCase()}${field === 'from' ? 'From' : 'Until'}`;
        const newInfo = {
            ...info,
            [fieldName]: value
        };
        await saveChanges(newInfo);
    };

    return (
        <>
            <div className="rounded-md bg-gray-200 p-4 md:p-6 dark:bg-gray-800">
                <div className='grid grid-cols-3 gap-2'>
                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium dark:text-gray-200">Name</label>
                        <div className="relative">
                            <input
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                name="name"
                                value={info.name}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium dark:text-gray-200">Phone Number</label>
                        <div className="relative">
                            <input
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                name="phone"
                                value={info.phone}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                            />
                            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium dark:text-gray-200">Email</label>
                        <div className="relative">
                            <input
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                name="email"
                                value={info.email}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                            />
                            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>
                </div>

                <fieldset>
                    <legend className="mb-2 block text-lg font-medium dark:text-gray-200">
                        Week Schedule Availability
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 dark:bg-gray-700 dark:border-gray-600">
                        <div className='grid grid-cols-4 gap-2'>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <ScheduleInputs
                                    key={day}
                                    day={day}
                                    from={info[`${day.slice(0, 3).toLowerCase()}From`]}
                                    to={info[`${day.slice(0, 3).toLowerCase()}Until`]}
                                    onChange={handleScheduleChange}
                                    onBlur={handleScheduleBlur}
                                />
                            ))}
                        </div>
                    </div>
                </fieldset>

                {isSaving && (
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Saving changes...
                    </div>
                )}
            </div>
            <Modal isOpen={isModalOpen} color={ModalColor} message={ModalMessage} />
        </>
    );
}
