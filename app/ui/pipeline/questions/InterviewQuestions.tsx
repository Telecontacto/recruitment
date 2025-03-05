import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import { UserCircleIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Modal from '@/app/ui/pipeline/modal';
import { updateInterviewQuestions } from '@/app/api/queryHandle/fetchApi';

const InterviewQuestions = ({ data, onChange }: { data: any, onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void }) => {
    const [isSaving, setIsSaving] = useState(false);
    // Modal configuration
    const [isModalOpen, setModalOpen] = useState(false);
    const [ModalMessage, setModalMessage] = useState('');
    const [ModalColor, setModalColor] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        onChange(e);
    };

    const handleInputBlur = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newInfo = {
            ...data,
            [name]: value
        };
        await saveChanges(newInfo);
    };

    const saveChanges = useCallback(async (newInfo: any) => {
        try {
            setIsSaving(true);
            await updateInterviewQuestions(data.solicitorId, 'interview', newInfo);
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
    }, [data.solicitorId]);

    // Use data directly from props instead of local state
    const info = data;

    // If you need to debug data changes, use useEffect instead of console.log
    useEffect(() => {
        // This will only run when data actually changes
        //console.log('CallCenterQuestions data changed:', data);
    }, [isSaving]);

    const indexToString = (index: number) => {
        switch (index) {
            case 0:
                return 'first';
            case 1:
                return 'second';
            case 2:
                return 'third';
            default:
                return '';
        }
    };

    return (
        <>
            <div className="rounded-md bg-gray-200 p-4 md:p-6 dark:bg-gray-800">
                <div className='grid grid-cols-2 gap-2'>
                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium dark:text-gray-200">What is your last academic grade?</label>
                        <div className="relative">
                            <select
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                name="academicGrade"
                                value={info.academicGrade || ''}
                                onChange={(e) => handleInputChange(e)}
                                onBlur={(e) => handleInputBlur(e)}
                            >
                                <option value="">Select an option</option>
                                <option value="High School">High School</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Master">Master</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium dark:text-gray-200">What qualities do you posess that distinguishes from the other candidates?</label>
                        <div className="relative">
                            <textarea
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                name="distinguishedQualities"
                                value={info.distinguishedQualities || ''}
                                onChange={(e) => handleInputChange(e)}
                                onBlur={(e) => handleInputBlur(e)}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>
                <fieldset className="mb-4">
                    <legend className="mb-2 block text-lg font-medium dark:text-gray-200">
                        Work Experience Prior
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 dark:bg-gray-700 dark:border-gray-600">
                        {Array.from({ length: 3 }).map((_, index) => {
                            const indexString = indexToString(index);
                            return (
                                <div key={index} className='grid grid-cols-3 gap-2 mb-4'>
                                    <div className="mb-4">
                                        <label className='mb-2 block text-sm font-medium dark:text-gray-300'>Company</label>
                                        <div className="relative">
                                            <input
                                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                                name={`${indexString}Company`}
                                                id={`${indexString}Company`}
                                                defaultValue={info[`${indexString}Company`]}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => handleInputBlur(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className='mb-2 block text-sm font-medium dark:text-gray-300'>Tasks</label>
                                        <div className="relative">
                                            <textarea
                                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                                name={`${indexString}Task`}
                                                id={`${indexString}Task`}
                                                defaultValue={info[`${indexString}Task`]}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => handleInputBlur(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className='mb-2 block text-sm font-medium dark:text-gray-300'>Termination Reason</label>
                                        <div className="relative">
                                            <textarea
                                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                                name={`${indexString}Termination`}
                                                id={`${indexString}Termination`}
                                                defaultValue={info[`${indexString}Termination`]}
                                                onChange={(e) => handleInputChange(e)}
                                                onBlur={(e) => handleInputBlur(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </fieldset>
                <div className='grid gap-2'>
                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium dark:text-gray-200">
                            What is your short term goal? Where do you see yourself in 5 years?
                        </label>
                        <div className="relative">
                            <textarea
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                name="viewSelf"
                                value={info.viewSelf || ''}
                                onChange={(e) => handleInputChange(e)}
                                onBlur={(e) => handleInputBlur(e)}
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium dark:text-gray-200">
                            How do you feel working various tasks at the same time?
                        </label>
                        <div className="relative">
                            <select
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                name="multitask"
                                value={info.multitask || ''}
                                onChange={(e) => handleInputChange(e)}
                                onBlur={(e) => handleInputBlur(e)}
                            >
                                <option value=''>Select an option</option>
                                <option value='Good'>Good</option>
                                <option value='Regular'>Regular</option>
                                <option value='Cannot do it'>Cannot do it</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} message={ModalMessage} color={ModalColor} />
        </>
    );
};

export default InterviewQuestions;
