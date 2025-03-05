import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import Modal from '../modal';
import { updateInterviewQuestions } from '@/app/api/queryHandle/fetchApi';

const RemoteQuestions = ({ data, onChange }: { data: any, onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) => {
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
            await updateInterviewQuestions(data.solicitorId, 'remote', newInfo);
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
        <>
            <div className="rounded-md bg-gray-200 p-4 md:p-6 dark:bg-gray-800">
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        What is your focus to maintain an effective communication and collaboration remotely?
                    </label>
                    <div className="relative">
                        <textarea
                            name="focusCommColab"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={data.focusCommColab || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        How do you manage and organize your time?
                    </label>
                    <div className="relative">
                        <textarea
                            name="timeHandle"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={data.timeHandle || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        How can you maintain the motivation and productivity from home?
                    </label>
                    <div className="relative">
                        <textarea
                            name="maintainMotivation"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={data.maintainMotivation || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        What is the key to guarantee that a project is successful when working remotely?
                    </label>
                    <div className="relative">
                        <textarea
                            name="keySuccessfulRemotely"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={data.keySuccessfulRemotely || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        How frequent do you lose power or internet connection in your area? Do you have the necessary backup to keep working without being interrupted? (Solar panels, Generators, etc.)
                    </label>
                    <div className="relative">
                        <textarea
                            name="electricitySolutions"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={data.electricitySolutions || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-lg font-medium">
                        What qualities you posess that make you an ideal candidate to work remotely?
                    </label>
                    <div className="relative">
                        <textarea
                            name="remoteQualities"
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={data.remoteQualities || ''}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            rows={3}
                        />
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} message={ModalMessage} color={ModalColor} />
        </>
    );
};

export default RemoteQuestions;
