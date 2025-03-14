import React, { useState } from 'react';
import { updateAttempts, updateQualification } from '@/app/api/queryHandle/fetchApi';

interface Attempt {
    contacted: string;
    notes: string;
}

interface Qualification {
    qualifies: string;
    reason: string;
    campaign: string;
}

interface InitialData {
    attempt1?: string;
    attempt2?: string;
    attempt3?: string;
    attempt4?: string;
    action1?: string;
    action2?: string;
    action3?: string;
    action4?: string;
    notQualified: string;
    notQualifiedReason?: string;
    Campana?: string;
    solicitorId: number;
}

interface AttemptsTabProps {
    initialData: InitialData;
    onUpdateInfo: (newInfo: Partial<InitialData>) => void;
    onUpdateSuccess: (message: string) => void;
}

const AttemptsTab: React.FC<AttemptsTabProps> = ({
    initialData,
    onUpdateInfo,
    onUpdateSuccess
}) => {
    // Initialize states from initialData
    const [attempts, setAttempts] = useState([
        { contacted: initialData.attempt1 || '', notes: initialData.action1 || '' },
        { contacted: initialData.attempt2 || '', notes: initialData.action2 || '' },
        { contacted: initialData.attempt3 || '', notes: initialData.action3 || '' },
        { contacted: initialData.attempt4 || '', notes: initialData.action4 || '' }
    ]);

    // Fixed qualification state initialization
    const [qualification, setQualification] = useState<Qualification>(() => {
        let qualificationStatus = '';
        // Convert string 'true'/'false' to actual boolean for comparison
        const isNotQualified = initialData.notQualified === 'qualified' ? false : true;

        if (isNotQualified) {
            qualificationStatus = 'not_qualified';
        } else if (!isNotQualified && initialData.Campana) {
            qualificationStatus = 'qualified';
        }

        return {
            qualifies: qualificationStatus || '',
            reason: initialData.notQualifiedReason || '',
            campaign: initialData.Campana || ''
        };
    });

    // Add this new state for copy feedback
    const [copyFeedback, setCopyFeedback] = useState('');

    // Add this new function to handle copy
    const handleCopyLink = () => {
        const link = `https://reports.telecontacto.com/reclutamiento/Solicitud_Empleo_w.php?ID=${initialData.solicitorId}`;

        // Check if Clipboard API is available
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link)
                .then(() => {
                    setCopyFeedback('Link copied!');
                    setTimeout(() => setCopyFeedback(''), 2000); // Clear feedback after 2 seconds
                })
                .catch(() => {
                    // Fall back to textarea method if Clipboard API fails
                    copyWithFallback(link);
                });
        } else {
            // Use fallback method if Clipboard API is not available
            copyWithFallback(link);
        }
    };

    // Fallback copy method using textarea
    const copyWithFallback = (text: string) => {
        try {
            // Create temporary textarea element
            const textarea = document.createElement('textarea');
            textarea.value = text;

            // Make the textarea out of viewport
            textarea.style.position = 'fixed';
            textarea.style.left = '-999999px';
            textarea.style.top = '-999999px';
            document.body.appendChild(textarea);

            // Select and copy text
            textarea.focus();
            textarea.select();
            const successful = document.execCommand('copy');

            // Remove the temporary element
            document.body.removeChild(textarea);

            // Show feedback
            if (successful) {
                setCopyFeedback('Link copied!');
            } else {
                setCopyFeedback('Failed to copy');
            }
            setTimeout(() => setCopyFeedback(''), 2000);
        } catch (err) {
            setCopyFeedback('Failed to copy');
            setTimeout(() => setCopyFeedback(''), 2000);
            console.error('Failed to copy text: ', err);
        }
    };

    async function handleAttemptChange(index: number, field: string, value: string): Promise<void> {
        const updatedAttempts = [...attempts];
        updatedAttempts[index] = {
            ...updatedAttempts[index],
            [field]: value,
        };
        setAttempts(updatedAttempts);

        try {
            await updateAttempts(
                index + 1,
                updatedAttempts[index].contacted,
                updatedAttempts[index].notes,
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
        if (field === 'qualifies') {
            if (value === 'qualified') {
                updatedQualification.reason = '';
            } else if (value === 'not_qualified') {
                updatedQualification.campaign = '';
            }
        }

        try {
            await updateQualification(
                updatedQualification.qualifies,
                updatedQualification.reason,
                initialData.solicitorId,
                updatedQualification.campaign
            );

            setQualification(updatedQualification);
            onUpdateSuccess('Qualification Updated Successfully');

            // Update parent state with correct format
            onUpdateInfo({
                notQualified: updatedQualification.qualifies === 'not_qualified' ? 'true' : 'false',
                notQualifiedReason: updatedQualification.reason,
                Campana: updatedQualification.campaign
            });
        } catch (error) {
            console.error('Failed to update qualification:', error);
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
                        {qualification.qualifies === 'qualified' && (
                            <>
                                <div className="mt-4">
                                    <label className="mb-2 block text-lg font-medium dark:text-gray-300">
                                        Select Campaign
                                    </label>
                                    <select
                                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        value={qualification.campaign}
                                        onChange={(e) => handleQualificationChange('campaign', e.target.value)}
                                    >
                                        <option value="">Select Campaign</option>
                                        <option value='AAA'>AAA</option>
                                        <option value='Answering'>Answering</option>
                                        <option value='CDBG'>CDBG</option>
                                        <option value='Cosvi'>Cosvi</option>
                                        <option value='CVR'>CVR</option>
                                        <option value='Encuestas'>Encuestas</option>
                                        <option value='Humana'>Humana</option>
                                        <option value='Humana Stars'>Humana Stars</option>
                                        <option value='Medicaid'>Medicaid</option>
                                        <option value='Medicaid Providers'>Medicaid Providers</option>
                                        <option value='MTM'>MTM</option>
                                        <option value='MTM Dispatch'>MTM Dispatch</option>
                                        <option value='Nourished'>Nourished</option>
                                        <option value='PRFEDCU'>PRFEDCU</option>
                                        <option value='Sunnova'>Sunnova</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="mb-2 block text-lg font-medium dark:text-gray-300">
                                        If the applicant is qualified, but has not filled out the application, copy the link here and send it to them.
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleCopyLink}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
                                        >
                                            Copy Application Link
                                        </button>
                                        {copyFeedback && (
                                            <span className="text-sm text-green-500 dark:text-green-400">
                                                {copyFeedback}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
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
                        )}
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default AttemptsTab;