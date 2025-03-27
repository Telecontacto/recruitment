import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import Modal from '../modal';
import { updateInterviewQuestions } from '@/app/api/queryHandle/fetchApi';

const InterviewComments = ({ data, onChange }: { data: any, onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ModalMessage, setModalMessage] = useState('');
    const [ModalColor, setModalColor] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e);
    };

    const handleInputBlur = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            await updateInterviewQuestions(data.solicitorId, 'comments', newInfo);
            setIsModalOpen(true);
            setModalMessage('Info Updated Successfully');
            setModalColor('bg-green-500');
        } catch (error) {
            console.error('Failed to save:', error);
        } finally {
            setIsSaving(false);
            setTimeout(() => {
                setIsModalOpen(false);
                setModalMessage('');
                setModalColor('');
            }, 2000);
        }
    }, [data.solicitorId]);

    // If you need to debug data changes, use useEffect instead of console.log
    useEffect(() => {
        // This will only run when data actually changes
        //console.log('CallCenterQuestions data changed:', data);
    }, [isSaving]);

    return (
        <div className="rounded-md bg-gray-200 p-4 md:p-6 dark:bg-gray-800">
            <div className="mb-4">
                <label className="mb-2 block text-lg font-medium">
                    Test Scores
                </label>
                <div className='grid grid-cols-2 gap-2 mb-4'>
                    <div className='relative'>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Typing Test Score:</label>
                        <input
                            type="text"
                            name="typingScore"
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            value={data.typingScore || ''}
                            className="mt-1 block w-full cursor-text rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            placeholder="Enter score or WPM"
                        />
                    </div>
                    <div className='relative'>
                        <label className="text-sm text-gray-600 dark:text-gray-400">English Test Score:</label>
                        <input
                            type="text"
                            name="englishScore"
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            value={data.englishScore || ''}
                            className="mt-1 block w-full cursor-text rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            placeholder="Enter score"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <label className="mb-2 block text-lg font-medium">
                    First Interview Comments
                </label>
                <div className="relative">
                    <textarea
                        name="firstInterviewComments"
                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        value={data.firstInterviewComments || ''}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        rows={3}
                    />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='relative'>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Interviewer:</label>
                        <input
                            type="text"
                            name="firstInterviewName"
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            value={data.firstInterviewName || ''}
                            className="mt-1 block w-full cursor-text rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        />
                    </div>
                    <div className='relative'>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Date:</label>
                        <input
                            type="text"
                            name="firstInterviewDate"
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            value={data.firstInterviewDate || ''}
                            className="mt-1 block w-full cursor-text rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <label className="mb-2 block text-lg font-medium">
                    Second Interview Comments
                </label>
                <div className="relative">
                    <textarea
                        name="secondInterviewComments"
                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        value={data.secondInterviewComments || ''}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        rows={3}
                    />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='relative'>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Interviewer:</label>
                        <input
                            type="text"
                            name="secondInterviewName"
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            value={data.secondInterviewName || ''}
                            className="mt-1 block w-full cursor-text rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        />
                    </div>
                    <div className='relative'>
                        <label className="text-sm text-gray-600 dark:text-gray-400">Date:</label>
                        <input
                            type="text"
                            name="secondInterviewDate"
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            value={data.secondInterviewDate || ''}
                            className="mt-1 block w-full cursor-text rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        />
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} message={ModalMessage} color={ModalColor} />
        </div>
    );
};

export default InterviewComments;
