import { ChangeEvent } from 'react';
import Modal from '@/app/ui/pipeline/modal';
import { useState, useCallback, useEffect } from 'react';
import { updateInterviewQuestions } from '@/app/api/queryHandle/fetchApi';

const CallCenterQuestions = ({
    data,
    onChange
}: {
    data: any,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}) => {
    const [isSaving, setIsSaving] = useState(false);

    // Modal configuration
    const [isModalOpen, setModalOpen] = useState(false);
    const [ModalMessage, setModalMessage] = useState('');
    const [ModalColor, setModalColor] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        onChange(e);
    };

    const handleRadioChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const syntheticEvent = {
            target: {
                name,
                value: value.toString()
            }
        } as ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);

        // Save changes immediately for radio buttons
        const newInfo = {
            ...data,
            [name]: value.toString()
        };
        await saveChanges(newInfo);
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
            await updateInterviewQuestions(data.solicitorId, 'call-center', newInfo);
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

    // Add this helper function at the top of your component
    const compareValues = (value1: string | number | undefined, value2: string | number): boolean => {
        if (value1 === undefined) return false;
        return value1.toString() === value2.toString();
    };

    return (
        <>
            <div className="rounded-md bg-gray-200 p-4 md:p-6 dark:bg-gray-800">
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        In your own words, what does the term "Client Satisfaction" mean?
                    </label>
                    <div className="relative">
                        <textarea
                            name="clientSatisfaction"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={info.clientSatisfaction || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        What are the most valuable attributes that a customer service agent should have?
                    </label>
                    <div className="relative">
                        <textarea
                            name="agentAttributes"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={info.agentAttributes || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        What is the key for success in a Call Center?
                    </label>
                    <div className="relative">
                        <textarea
                            name="keyCallCenterSuccess"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={info.keyCallCenterSuccess || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        Mention at least four steps to Initialize a conversation with a client.
                    </label>
                    <div className="relative">
                        <textarea
                            name="stepsInitializeConversation"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={info.stepsInitializeConversation || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        Using a scale from 1 to 10, how would you rate your skills using a computer and handling various applications at once?
                    </label>
                    <div className="relative">
                        <div className="flex space-x-0">
                            {[...Array(10)].map((_, index) => {
                                const currentValue = (index + 1).toString();
                                return (
                                    <label
                                        key={index}
                                        className={`flex items-center justify-center w-full h-10 bg-white border border-gray-300 cursor-pointer dark:bg-gray-700 dark:border-gray-600 
                                            ${index === 0 ? 'rounded-l-md' : ''} 
                                            ${index === 9 ? 'rounded-r-md' : ''} 
                                            ${compareValues(info.clasifyMultipleApps, currentValue) ? 'bg-[#233239] dark:bg-[#e51e25] text-white' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="clasifyMultipleApps"
                                            value={currentValue}
                                            checked={compareValues(info.clasifyMultipleApps, currentValue)}
                                            onChange={handleRadioChange}
                                            className="sr-only"
                                        />
                                        <span className="w-full text-center">{currentValue}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        Have you ever had a situation in your area of work? What was the problem and how did you solve it?
                    </label>
                    <div className="relative">
                        <textarea
                            name="problemSolving"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={info.problemSolving || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        How do you manage a client's negative comments?
                    </label>
                    <div className="relative">
                        <textarea
                            name="handleNegativeComments"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={info.handleNegativeComments || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        What steps would you take to treat an unsatisfied client?
                    </label>
                    <div className="relative">
                        <textarea
                            name="stepsHandleInsatisfaction"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={info.stepsHandleInsatisfaction || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        If you were to receive a call from a client who is angry and upset, how would you handle the situation?
                    </label>
                    <div className="relative">
                        <textarea
                            name="handleAngryCustomer"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={info.handleAngryCustomer || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        What does the word "Empathy" mean to you and how do you apply it on your daily life?
                    </label>
                    <div className="relative">
                        <textarea
                            name="empathyDescription"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={info.empathyDescription || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
            </div >
            <Modal isOpen={isModalOpen} message={ModalMessage} color={ModalColor} />
        </>
    );
};

export default CallCenterQuestions;
