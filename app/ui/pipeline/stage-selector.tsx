'use client';
import { useRouter } from 'next/navigation';

interface StageSelectorProps {
    currentStage: 'view' | 'review' | 'interview' | 'offer' | 'hired';
    id: string;
    canAdvance: boolean;
    stageNumber: number; // Add this to track current pipeline stage
}

export default function StageSelector({ currentStage, id, canAdvance, stageNumber }: StageSelectorProps) {
    const router = useRouter();

    const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStage = event.target.value;
        router.push(`/dashboard/pipeline/${id}/${newStage}-applicant`);
    };

    return (
        <div className="flex items-center space-x-2">
            <label className="text-sm font-medium dark:text-gray-300">Pipeline Stage:</label>
            <select
                className="rounded-md border border-gray-200 py-1 px-2 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                value={currentStage}
                onChange={handleStageChange}
            >
                <option value="view">Application Received</option>
                {(currentStage === 'review' || stageNumber >= 2) && (
                    <option value="review">First Interview by Phone</option>
                )}
                {(currentStage === 'interview' || stageNumber >= 3) && (
                    <option value="interview">Interview On Site</option>
                )}
                {(currentStage === 'offer' || stageNumber >= 4) && (
                    <option value="offer">Job Offer</option>
                )}
                {(currentStage === 'hired' || stageNumber >= 5) && (
                    <option value="hired">Hired/Rejected</option>
                )}
            </select>
        </div>
    );
}
