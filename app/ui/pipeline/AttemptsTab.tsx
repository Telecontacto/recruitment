import React, { useState } from 'react';
import { updateAttempts, updateQualification } from '@/app/api/queryHandle/fetchApi';

interface Attempt {
    contacted: string;
    notes: string;
}

interface AttemptsTabProps {
    initialData: any;
    onUpdateSuccess: (message: string) => void;
}

const AttemptsTab: React.FC<AttemptsTabProps> = ({
    initialData,
    onUpdateSuccess
}) => {
    // Initialize states from initialData
    const [attempts, setAttempts] = useState([
        { contacted: initialData.attempt1 || '', notes: initialData.action1 || '' },
        { contacted: initialData.attempt2 || '', notes: initialData.action2 || '' },
        { contacted: initialData.attempt3 || '', notes: initialData.action3 || '' },
        { contacted: initialData.attempt4 || '', notes: initialData.action4 || '' }
    ]);

    const [qualification, setQualification] = useState({
        qualifies: initialData.notQualified || '',
        reason: initialData.notQualifiedReason || '',
    });

    async function handleAttemptChange(index: number, field: string, value: string): Promise<void> {
        const updatedAttempts = [...attempts];
        updatedAttempts[index] = {
            ...updatedAttempts[index],
            [field]: value,
        };
        setAttempts(updatedAttempts);

        if (updatedAttempts[index].contacted || updatedAttempts[index].notes) {
            try {
                await updateAttempts(
                    index + 1,
                    updatedAttempts[index].contacted,
                    updatedAttempts[index].notes,
                    initialData.solicitorId
                );
                onUpdateSuccess('Attempt Updated Successfully');
            } catch (error) {
                console.error('Failed to update attempt:', error);
                setAttempts(attempts);
            }
        }
    }

    async function handleQualificationChange(field: string, value: string): Promise<void> {
        const updatedQualification = {
            ...qualification,
            [field]: value
        };
        setQualification(updatedQualification);

        if (updatedQualification.qualifies) {
            try {
                if (updatedQualification.qualifies === 'qualified') {
                    updatedQualification.reason = '';
                }
                await updateQualification(
                    updatedQualification.qualifies,
                    updatedQualification.reason,
                    initialData.solicitorId
                );
                onUpdateSuccess('Qualification Updated Successfully');
            } catch (error) {
                console.error('Failed to update qualification:', error);
                setQualification(qualification);
            }
        }
    }

    const isUnsuccessful = (attempt: Attempt) => {
        return ['no_answer', 'wrong_number', 'voicemail'].includes(attempt.contacted);
    };

    const isSuccessful = (attempt: Attempt) => {
        return attempt.contacted === 'contacted';
    };

    const shouldShowAttempt = (index: number) => {
        if (index === 0) return true;
        if (!attempts[index - 1].contacted) return false;
        return isUnsuccessful(attempts[index - 1]);
    };

    const showQualification = () => {
        const allAttemptsFilled = attempts.every(attempt => attempt.contacted !== '');
        const hasSuccessfulAttempt = attempts.some(isSuccessful);
        return allAttemptsFilled || hasSuccessfulAttempt;
    };

    const getNotesOptions = (contactStatus: string) => {
        switch (contactStatus) {
            case 'contacted':
                return [
                    { value: '', label: 'Select reason' },
                    { value: 'scheduled_interview', label: 'Scheduled Interview' },
                    { value: 'will_call_back', label: 'Will Call Back' },
                    { value: 'not_interested', label: 'Not Interested' }
                ];
            case 'no_answer':
                return [
                    { value: '', label: 'Select reason' },
                    { value: 'family_message', label: 'Message left with family member' },
                    { value: 'no_Answer1', label: 'No Answer (No Voicemail, WA, Email and message through Recruit Portal' },
                    { value: 'no_Answer2', label: 'No Answer (No Voicemail, and message through Recruit Portal' },
                    { value: 'no_Answer3', label: 'No Answer (No Voicemail, Email and message through Recruit Portal' },
                    { value: 'no_Answer4', label: 'No Answer (Left Voicemail, WA, Email and message through Recruit Portal' },
                    { value: 'no_Answer5', label: 'No Answer (Left Voicemail, Email and message through Recruit Portal' },
                    { value: 'no_Answer6', label: 'No Answer (Left Voicemail, and message through Recruit Portal' },
                    { value: 'out_Of_Service1', label: 'No Answer (WA, Email and message through Recruit Portal' },
                    { value: 'out_Of_Service2', label: 'No Answer (Email and message through Recruit Portal' },
                    { value: 'out_Of_Service3', label: 'No Answer (Message through Recruit Portal' },
                ];
            default:
                return [{ value: '', label: 'Select status first' }];
        }
    };

    return (
        <div className="rounded-md bg-gray-200 p-4 md:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium dark:text-gray-200">Attempts to Contact Applicant</h3>
            {attempts.map((attempt, index) => (
                shouldShowAttempt(index) && (
                    <div key={index} className="mb-4">
                        <label className="mb-2 block text-lg font-medium dark:text-gray-300">
                            Attempt {index + 1}
                        </label>
                        <div className="flex items-center space-x-4">
                            <select
                                className="peer block w-1/4 cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={attempt.contacted || ''}
                                onChange={(e) => handleAttemptChange(index, 'contacted', e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="contacted">Contacted</option>
                                <option value="no_answer">No Answer</option>
                            </select>
                            <select
                                className="peer block w-3/4 cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={attempt.notes || ''}
                                onChange={(e) => handleAttemptChange(index, 'notes', e.target.value)}
                                disabled={!attempt.contacted}
                            >
                                {getNotesOptions(attempt.contacted).map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )
            ))}

            {showQualification() && (
                <div className="mt-8 border-t pt-6 border-gray-300 dark:border-gray-600">
                    <h3 className="mb-4 text-lg font-medium dark:text-gray-200">Qualification Assessment</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-lg font-medium dark:text-gray-300">
                                Qualification Status
                            </label>
                            <select
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={qualification.qualifies}
                                onChange={(e) => handleQualificationChange('qualifies', e.target.value)}
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
                            <select
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                value={qualification.reason}
                                onChange={(e) => handleQualificationChange('reason', e.target.value)}
                                disabled={!qualification.qualifies || qualification.qualifies === 'qualified'}
                            >
                                <option value="">Select Reason</option>
                                <option value="work_full_time">Cannot Work Full-Time</option>
                                <option value="work_onsite">Cannot Work Onsite (Searching Remote Only)</option>
                                <option value="lives_far_no_transport">Lives Far and Cannot Transport</option>
                                <option value="complicated_schedule">Complicated Schedule (Student, Limited, Part-Time)</option>
                                <option value="no_transport">No Transport</option>
                                <option value="currently_cannot_work">Currently Cannot Work</option>
                                <option value="ask_more_salary">Asks More than We Ask For (Salary)</option>
                                <option value="ask_more_medical">Asks More than We Ask For (Medical Plan)</option>
                                <option value="fails_requirements">Does Not Meet the Necessary Requirements</option>
                                <option value="not_interested_salary">Not Interested (Salary)</option>
                                <option value="not_interested_employment">Not Interested (Remote / Hybrid Employment)</option>
                                <option value="arrogant_unprofessional">Arrogant Attitude & Unprofessional</option>
                                <option value="over_qualified">Over Qualified</option>
                                <option value="not_flow_interview">Did Not Flow in the Interview</option>
                                <option value="not_live_pr">Does Not Live in PR</option>
                                <option value="no_response">Hung Up / Does Not Answer</option>
                                <option value="no_show">Did Not Arrive to Onboarding / Interview (Multiple Opportunities)</option>
                                <option value="no_consistency">No Consistency in Employments</option>
                                <option value="applied_accidentally">Applied Accidentally</option>
                                <option value="other_job">Found Another Job</option>
                                <option value="duplicate">Duplicate</option>
                                <option value="worked_before_nq">Already Worked With Us (NQ)</option>
                                <option value="multiple_attempts">Multiple Attempts</option>
                            </select>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default AttemptsTab;