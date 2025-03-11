import { useState, useCallback } from 'react';
import {
    KeyIcon,
    PaperAirplaneIcon,
    AcademicCapIcon,
    BookOpenIcon,
    HomeIcon,
    BuildingOfficeIcon,
    HomeModernIcon,
    MegaphoneIcon,
    WifiIcon,
    ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { updateQuestions } from '@/app/api/queryHandle/fetchApi';
import Modal from '@/app/ui/pipeline/modal';

interface QuestionsPanelProps {
    data: any;
    onUpdateInfo: (newInfo: any) => void;
    onUpdateSuccess: (message: string) => void;
}

export default function QuestionsPanel({ data, onUpdateInfo, onUpdateSuccess }: QuestionsPanelProps) {
    const [answers, setAnswers] = useState(data);
    const [isSaving, setIsSaving] = useState(false);

    //Modal configuration
    const [isModalOpen, setModalOpen] = useState(false);
    const [ModalMessage, setModalMessage] = useState('')
    const [ModalColor, setModalColor] = useState('')

    const handleInputChange = useCallback(async (field: string, value: string) => {
        const newAnswers = {
            ...answers,
            [field]: value
        };
        setAnswers(newAnswers);

        try {
            await updateQuestions(data.solicitorId, newAnswers);
            onUpdateSuccess('Info Updated Successfully');
            onUpdateInfo(newAnswers); // Update parent state
        } catch (error) {
            console.error('Failed to save questions:', error);
        }
    }, [answers, data.solicitorId, onUpdateInfo, onUpdateSuccess]);

    return (
        <>
            <div className="rounded-md bg-gray-200 p-4 md:p-6 dark:bg-gray-800">
                <div className='grid grid-cols-4 gap-2'>
                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            Do you have Transportation?
                        </label>
                        <div className="relative">
                            <select
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.transportation || ''}
                                onBlur={(e) => handleInputChange('transportation', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, transportation: e.target.value }))}
                            >
                                <option value=''>Select an option</option>
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                            </select>
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            Do you have a planned trip?
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.trip || 'No trip scheduled'}
                                onBlur={(e) => handleInputChange('trip', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, trip: e.target.value }))}
                                placeholder="Enter trip details or No"
                            />
                            <PaperAirplaneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            Are you a student?
                        </label>
                        <div className="relative">
                            <select
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.student || ''}
                                onBlur={(e) => handleInputChange('student', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, student: e.target.value }))}
                            >
                                <option value=''>Select an option</option>
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                            </select>
                            <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            Are you bilingual?
                        </label>
                        <div className="relative">
                            <select
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.bilingual || ''}
                                onBlur={(e) => handleInputChange('bilingual', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, bilingual: e.target.value }))}
                            >
                                <option value=''>Select an option</option>
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                            </select>
                            <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-2'>
                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            Which town do you reside?
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.town || ''}
                                onBlur={(e) => handleInputChange('town', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, town: e.target.value }))}
                                placeholder="Enter your town"
                            />
                            <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            Where did you send the form?
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.appliedWhere || ''}
                                onBlur={(e) => handleInputChange('appliedWhere', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, appliedWhere: e.target.value }))}
                                placeholder="Enter form source"
                            />
                            <MegaphoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            How did you learn about us?
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.knowledgeHow || ''}
                                onBlur={(e) => handleInputChange('knowledgeHow', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, knowledgeHow: e.target.value }))}
                                placeholder="Enter source"
                            />
                            <WifiIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-2'>
                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            Will you work on-site?
                        </label>
                        <div className="relative">
                            <select
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.onSite || ''}
                                onBlur={(e) => handleInputChange('onSite', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, onSite: e.target.value }))}
                            >
                                <option value=''>Select an option</option>
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                            </select>
                            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            Will you work remotely?
                        </label>
                        <div className="relative">
                            <select
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.remote || ''}
                                onBlur={(e) => handleInputChange('remote', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, remote: e.target.value }))}
                            >
                                <option value=''>Select an option</option>
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                            </select>
                            <HomeModernIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            Internet speed (If working remotely)
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.internetSpeed || ''}
                                onBlur={(e) => handleInputChange('internetSpeed', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, internetSpeed: e.target.value }))}
                                placeholder="Enter internet speed"
                            />
                            <ArrowDownTrayIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className='grid gap-2'>
                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            What caught your attention to work in a call center?
                        </label>
                        <div className="relative">
                            <textarea
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.callCenterInterest || ''}
                                onBlur={(e) => handleInputChange('callCenterInterest', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, callCenterInterest: e.target.value }))}
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            What is customer service for you?
                        </label>
                        <div className="relative">
                            <textarea
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.customerServiceDefinition || ''}
                                onBlur={(e) => handleInputChange('customerServiceDefinition', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, customerServiceDefinition: e.target.value }))}
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-lg font-medium">
                            Comments:
                        </label>
                        <div className="relative">
                            <textarea
                                className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={answers.comments || ''}
                                onBlur={(e) => handleInputChange('comments', e.target.value)}
                                onChange={(e) => setAnswers((prev: any) => ({ ...prev, comments: e.target.value }))}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} color={ModalColor} message={ModalMessage} />
        </>
    );
}
