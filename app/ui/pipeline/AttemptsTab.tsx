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
        <div className="rounded-md bg-gray-200 p-4 md:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium dark:text-gray-200">Attempts to Contact Applicant</h3>
            {attempts.map((attempt, index) => (
                <div key={index} className="mb-4">
                    <label className="mb-2 block text-lg font-medium dark:text-gray-300">Attempt {index + 1}</label>
                    <div className="flex items-center space-x-4">
                        <select
                            className="peer block w-1/4 cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            value={attempt.contacted}
                            onChange={(e) => handleAttemptChange(index, 'contacted', e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <input
                            type="text"
                            className="peer block w-3/4 cursor-text rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            placeholder="Notes"
                            value={attempt.notes}
                            onInput={(e) => handleAttemptChange(index, 'notes', (e.currentTarget as HTMLInputElement).value)}
                        />
                    </div>
                </div>
            ))}

            {/* New Qualification Section */}
            <div className="mt-8 border-t pt-6 border-gray-300 dark:border-gray-600">
                <h3 className="mb-4 text-lg font-medium dark:text-gray-200">Qualification Assessment</h3>
                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-lg font-medium dark:text-gray-300">
                            Qualification Status
                        </label>
                        <select
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            defaultValue=""
                        >
                            <option value="">Select Status</option>
                            <option value="qualified">Qualified</option>
                            <option value="not_qualified">Not Qualified</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-2 block text-lg font-medium dark:text-gray-300">
                            Reason (if not qualified)
                        </label>
                        <textarea
                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            rows={4}
                            placeholder="Please provide the reason why the applicant did not qualify..."
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttemptsTab;