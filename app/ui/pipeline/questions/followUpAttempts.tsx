import React, { useState } from 'react';
import { updateFollowUp, updateQualificationFollowUp } from '@/app/api/queryHandle/fetchApi';

interface Attempt {
    contacted: string;
    notes: string;
    date: string;
}

interface Qualification {
    qualifies: string;
    reason: string;
}

interface InitialData {
    attempt1?: string;
    attempt2?: string;
    attempt3?: string;
    attempt4?: string;
    attempt5?: string;
    attempt6?: string;
    attempt7?: string;
    attempt8?: string;
    attempt9?: string;
    action1?: string;
    action2?: string;
    action3?: string;
    action4?: string;
    action5?: string;
    action6?: string;
    action7?: string;
    action8?: string;
    action9?: string;
    attempt1Date?: string;
    attempt2Date?: string;
    attempt3Date?: string;
    attempt4Date?: string;
    attempt5Date?: string;
    attempt6Date?: string;
    attempt7Date?: string;
    attempt8Date?: string;
    attempt9Date?: string;
    notQualified: string;
    notQualifiedReason?: string;
    solicitorId: number;
}

interface ExtendedAttemptsTabProps {
    initialData: InitialData;
    onUpdateInfo: (newInfo: Partial<InitialData>) => void;
    onUpdateSuccess: (message: string) => void;
}

const ExtendedAttemptsTab: React.FC<ExtendedAttemptsTabProps> = ({
    initialData,
    onUpdateInfo,
    onUpdateSuccess
}) => {
    // Add date formatting helper to handle timezone issues
    const formatDate = (dateString: string) => {
        if (!dateString) return '';

        // Parse the date and adjust for timezone to avoid the day-before issue
        const date = new Date(dateString);

        // Use the date components directly to create a timezone-agnostic date display
        return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
    };

    console.log(initialData);

    // Initialize attempts state with 9 attempts
    const [attempts, setAttempts] = useState<Attempt[]>([
        {
            contacted: initialData.attempt1 || '',
            notes: initialData.action1 || '',
            date: initialData.attempt1Date || ''
        },
        {
            contacted: initialData.attempt2 || '',
            notes: initialData.action2 || '',
            date: initialData.attempt2Date || ''
        },
        {
            contacted: initialData.attempt3 || '',
            notes: initialData.action3 || '',
            date: initialData.attempt3Date || ''
        },
        {
            contacted: initialData.attempt4 || '',
            notes: initialData.action4 || '',
            date: initialData.attempt4Date || ''
        },
        {
            contacted: initialData.attempt5 || '',
            notes: initialData.action5 || '',
            date: initialData.attempt5Date || ''
        },
        {
            contacted: initialData.attempt6 || '',
            notes: initialData.action6 || '',
            date: initialData.attempt6Date || ''
        },
        {
            contacted: initialData.attempt7 || '',
            notes: initialData.action7 || '',
            date: initialData.attempt7Date || ''
        },
        {
            contacted: initialData.attempt8 || '',
            notes: initialData.action8 || '',
            date: initialData.attempt8Date || ''
        },
        {
            contacted: initialData.attempt9 || '',
            notes: initialData.action9 || '',
            date: initialData.attempt9Date || ''
        }
    ]);

    // Initialize qualification state properly
    const [qualification, setQualification] = useState(() => {
        // Parse the string 'true'/'false' to boolean
        const isNotQualified = initialData.notQualified === 'true';
        let qualificationStatus = '';

        if (isNotQualified) {
            qualificationStatus = 'not_qualified';
        } else if (!isNotQualified) {
            qualificationStatus = 'qualified';
        }

        return {
            qualifies: qualificationStatus || '',
            reason: initialData.notQualifiedReason || ''
        };
    });

    async function handleAttemptChange(index: number, field: string, value: string): Promise<void> {
        const updatedAttempts = [...attempts];
        updatedAttempts[index] = {
            ...updatedAttempts[index],
            [field]: value,
        };
        setAttempts(updatedAttempts);

        try {
            await updateFollowUp(
                index + 1,
                updatedAttempts[index].contacted,
                updatedAttempts[index].notes,
                updatedAttempts[index].date,
                initialData.solicitorId
            );
            onUpdateSuccess('Attempt Updated Successfully');
            onUpdateInfo({
                [`attempt${index + 1}`]: updatedAttempts[index].contacted,
                [`action${index + 1}`]: updatedAttempts[index].notes
            });
        } catch (error) {
            console.error('Failed to update attempt:', error);
            setAttempts(attempts);
        }
    }

    async function handleQualificationChange(field: string, value: string): Promise<void> {
        const updatedQualification = {
            ...qualification,
            [field]: value
        };

        // Handle field clearing based on qualification status
        if (field === 'qualifies' && value === 'qualified') {
            updatedQualification.reason = '';
        }

        try {
            await updateQualificationFollowUp(
                updatedQualification.qualifies,
                updatedQualification.reason,
                initialData.solicitorId,
                '' // Empty campaign since it's no longer needed
            );

            setQualification(updatedQualification);
            onUpdateSuccess('Qualification Updated Successfully');

            // Update parent state with correct format
            onUpdateInfo({
                notQualified: updatedQualification.qualifies === 'not_qualified' ? 'true' : 'false',
                notQualifiedReason: updatedQualification.reason
            });
        } catch (error) {
            console.error('Failed to update qualification:', error);
        }
    }

    const isUnsuccessful = (attempt: Attempt) => {
        return (attempt.contacted === 'no_answer') || (attempt.contacted === 'contacted' && ['will_call_back', 'hang_up'].includes(attempt.notes));
    };

    const isSuccessful = (attempt: Attempt) => {
        return attempt.contacted === 'contacted' && ['rescheduled_interview', 'not_interested', 'not_qualified'].includes(attempt.notes);
    };

    // Determine if follow-up is still required even after successful contact
    const requiresFollowUp = (attempt: Attempt) => {
        // Show next attempt for rescheduled interviews since they require follow-up
        return attempt.contacted === 'contacted' && attempt.notes === 'rescheduled_interview';
    };

    const shouldShowAttempt = (index: number) => {
        if (index === 0) return true;
        if (!attempts[index - 1].contacted) return false;

        // Show next attempt if previous attempt was unsuccessful OR 
        // if it was successful but still requires follow-up (like rescheduled interview)
        return isUnsuccessful(attempts[index - 1]) || requiresFollowUp(attempts[index - 1]);
    };

    // New function to check for 3 consecutive failures
    const hasThreeConsecutiveFailures = () => {
        for (let i = 0; i <= attempts.length - 3; i++) {
            if (attempts[i].contacted &&
                attempts[i + 1].contacted &&
                attempts[i + 2].contacted &&
                isUnsuccessful(attempts[i]) &&
                isUnsuccessful(attempts[i + 1]) &&
                isUnsuccessful(attempts[i + 2])) {
                return true;
            }
        }
        return false;
    };

    const showQualification = () => {
        const allAttemptsFilled = attempts.every(attempt => attempt.contacted !== '');
        const hasSuccessfulAttempt = attempts.some(isSuccessful);
        const threeConsecutiveFailures = hasThreeConsecutiveFailures();

        return allAttemptsFilled || hasSuccessfulAttempt || threeConsecutiveFailures;
    };

    const getNotesOptions = (contactStatus: string) => {
        switch (contactStatus) {
            case 'contacted':
                return [
                    { value: '', label: 'Select reason' },
                    { value: 'rescheduled_interview', label: 'Re-scheduled Interview' },
                    { value: 'will_call_back', label: 'Will Call Back' },
                    { value: 'not_interested', label: 'Not Interested' },
                    { value: 're_hire', label: 'Re-hire Evaluation' },
                    { value: 'hang_up', label: 'Hung Up' },
                    { value: 'not_qualified', label: 'Not Qualified' },
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
            <h3 className="mb-4 text-lg font-medium dark:text-gray-200">Follow Up Attempts to Contact Applicant</h3>
            {attempts.map((attempt, index) => (
                shouldShowAttempt(index) && (
                    <div key={index} className="mb-4">
                        <label className="mb-2 block text-lg font-medium dark:text-gray-300">
                            Attempt {index + 1}{attempt.date && ` - ${formatDate(attempt.date)}`}
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
                    <h3 className="mb-4 text-lg font-medium dark:text-gray-200">
                        {hasThreeConsecutiveFailures()
                            ? "Qualification Assessment (3 Consecutive Unsuccessful Attempts)"
                            : "Qualification Assessment"}
                    </h3>
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
                        {qualification.qualifies === 'not_qualified' && (
                            <div>
                                <label className="mb-2 block text-lg font-medium dark:text-gray-300">
                                    Reason (if not qualified)
                                </label>
                                <select
                                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    value={qualification.reason}
                                    onChange={(e) => handleQualificationChange('reason', e.target.value)}
                                    disabled={qualification.qualifies !== 'not_qualified'}
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
                                    <option value="multiple_trips">Multiple trips</option>
                                    <option value="trip_close_onboarding">Trip close to Onboarding</option>
                                    <option value="no_response">Hung Up / Does Not Answer</option>
                                    <option value="no_show">Did Not Arrive to Onboarding / Interview (Multiple Opportunities)</option>
                                    <option value="no_consistency">No Consistency in Employments</option>
                                    <option value="applied_accidentally">Applied Accidentally</option>
                                    <option value="other_job">Found Another Job</option>
                                    <option value="duplicate">Duplicate</option>
                                    <option value="worked_before_nq">Already Worked With Us (NQ)</option>
                                    <option value="multiple_attempts">Multiple Attempts</option>
                                    <option value="currently_with_us">Currently is an empolyee of Telecontacto</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExtendedAttemptsTab;
