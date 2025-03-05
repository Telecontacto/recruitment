import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import Modal from '../modal';
import { updateInterviewQuestions } from '@/app/api/queryHandle/fetchApi';

const ClarificationQuestions = ({ data, onChange }: { data: any, onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) => {
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
            await updateInterviewQuestions(data.solicitorId, 'clarification', newInfo);
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
            <div className="p-4">
                <table className="w-full mt-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2" colSpan={2}>Clarifications</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2 w-1/4">Trips</td>
                            <td className="border px-4 py-2 w-3/4">
                                <textarea
                                    name="clarifyTrip"
                                    value={data.clarifyTrip || ''}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    rows={3}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 w-1/4">Appointments</td>
                            <td className="border px-4 py-2 w-3/4">
                                <textarea
                                    name="clarifyAppointment"
                                    value={data.clarifyAppointment || ''}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    rows={3}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 w-1/4">Transportation</td>
                            <td className="border px-4 py-2 w-3/4">
                                <textarea
                                    name="clarifyTransportation"
                                    value={data.clarifyTransportation || ''}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    rows={3}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2 w-1/4">Others</td>
                            <td className="border px-4 py-2 w-3/4">
                                <textarea
                                    name="clarifyOther"
                                    value={data.clarifyOther || ''}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    rows={3}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} message={ModalMessage} color={ModalColor} />
        </>
    );
};

export default ClarificationQuestions;
