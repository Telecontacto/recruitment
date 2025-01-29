import React from 'react';

interface Attempt {
    contacted: string;
    notes: string;
}

interface AttemptsTabProps {
    attempts: Attempt[];
    handleAttemptChange: (index: number, field: string, value: string) => void;
}

const AttemptsTab: React.FC<AttemptsTabProps> = ({ attempts, handleAttemptChange }) => {
    return (
        <div className="rounded-md bg-gray-200 p-4 md:p-6">
            <h3 className="mb-4 text-lg font-medium">Attempts to Contact Applicant</h3>
            {attempts.map((attempt, index) => (
                <div key={index} className="mb-4">
                    <label className="mb-2 block text-lg font-medium">Attempt {index + 1}</label>
                    <div className="flex items-center space-x-4">
                        <select
                            className="peer block w-1/4 cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                            value={attempt.contacted}
                            onChange={(e) => handleAttemptChange(index, 'contacted', e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <input
                            type="text"
                            className="peer block w-3/4 cursor-text rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Notes"
                            value={attempt.notes}
                            onInput={(e) => handleAttemptChange(index, 'notes', (e.currentTarget as HTMLInputElement).value)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AttemptsTab;