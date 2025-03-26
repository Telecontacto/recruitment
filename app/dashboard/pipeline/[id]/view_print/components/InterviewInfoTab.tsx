import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InterviewInfoTabProps {
    interviewData: any;
    showExportButton?: boolean;
}

const InterviewInfoTab: React.FC<InterviewInfoTabProps> = ({
    interviewData,
    showExportButton = true
}) => {
    const [exporting, setExporting] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    if (!interviewData) {
        return (
            <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4 mx-auto"></div>
                <p className="text-lg">Loading interview data...</p>
            </div>
        );
    }

    // Helper function to render a section with title and content
    const renderSection = (title: string, data: any, fields: { label: string, key: string }[]) => (
        <div key={title} className="mb-8">
            <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2 dark:bg-gray-700">{title}</h2>
            <div className="rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {fields.map((field, index) => (
                        <div key={index} className={field.key.includes('Comments') ? "col-span-2" : ""}>
                            <p className="font-medium text-gray-600 dark:text-gray-400">{field.label}</p>
                            <p className={`mt-1 ${field.key.includes('Comments') ? "p-2 bg-gray-50 dark:bg-gray-700 rounded" : ""}`}>
                                {data[field.key] || 'N/A'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Define sections based on interview-tabs structure
    const sections = [
        {
            title: "Interview Questions",
            fields: [
                { label: "Academic Grade", key: "academicGrade" },
                { label: "Distinguished Qualities", key: "distinguishedQualities" },
                { label: "Short Term Goal / 5 Year Plan", key: "viewSelf" },
                { label: "Multitasking Ability", key: "multitask" }
            ]
        },
        {
            title: "Call Center Questions",
            fields: [
                { label: "Client Satisfaction Definition", key: "clientSatisfaction" },
                { label: "Agent Attributes", key: "agentAttributes" },
                { label: "Key for Call Center Success", key: "keyCallCenterSuccess" },
                { label: "Steps to Initialize Conversation", key: "stepsInitializeConversation" },
                { label: "Computer Skills Rating (1-10)", key: "clasifyMultipleApps" },
                { label: "Problem Solving Example", key: "problemSolving" },
                { label: "Handling Negative Comments", key: "handleNegativeComments" },
                { label: "Steps for Unsatisfied Clients", key: "stepsHandleInsatisfaction" },
                { label: "Handling Angry Customers", key: "handleAngryCustomer" },
                { label: "Empathy Definition & Application", key: "empathyDescription" }
            ]
        },
        {
            title: "Clarification Questions",
            fields: [
                { label: "Trip Clarification", key: "clarifyTrip" },
                { label: "Appointment Clarification", key: "clarifyAppointment" },
                { label: "Transportation Clarification", key: "clarifyTransportation" },
                { label: "Other Clarifications", key: "clarifyOther" }
            ]
        },
        {
            title: "Remote Work Questions",
            fields: [
                { label: "Remote Communication Focus", key: "focusCommColab" },
                { label: "Time Management", key: "timeHandle" },
                { label: "Maintaining Motivation at Home", key: "maintainMotivation" },
                { label: "Key to Remote Project Success", key: "keySuccessfulRemotely" },
                { label: "Power/Internet Reliability & Backup", key: "electricitySolutions" },
                { label: "Remote Work Qualities", key: "remoteQualities" }
            ]
        },
        {
            title: "Interview Comments & Test Results",
            fields: [
                { label: "Typing Test Score", key: "typingScore" },
                { label: "English Test Score", key: "englishScore" },
                { label: "First Interview Comments", key: "firstInterviewComments" },
                { label: "First Interview Conducted By", key: "firstInterviewName" },
                { label: "First Interview Date", key: "firstInterviewDate" },
                { label: "Second Interview Comments", key: "secondInterviewComments" },
                { label: "Second Interview Conducted By", key: "secondInterviewName" },
                { label: "Second Interview Date", key: "secondInterviewDate" }
            ]
        }
    ];

    // Work Experience section (handled separately due to its structure)
    const renderWorkExperience = () => {
        const indexToString = (index: number) => {
            return ['first', 'second', 'third'][index];
        };

        return (
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2 dark:bg-gray-700">Work Experience</h2>
                <div className="rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
                    {[0, 1, 2].map((index) => {
                        const prefix = indexToString(index);
                        const companyKey = `${prefix}Company`;

                        // Only render if there's company data
                        if (!interviewData[companyKey]) return null;

                        return (
                            <div key={index} className="mb-6 pb-6 border-b last:border-b-0 dark:border-gray-700">
                                <h3 className="font-semibold text-lg mb-3">{`${prefix.charAt(0).toUpperCase() + prefix.slice(1)} Employment`}</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Company</p>
                                        <p className="mt-1">{interviewData[companyKey] || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Tasks</p>
                                        <p className="mt-1">{interviewData[`${prefix}Task`] || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Termination Reason</p>
                                        <p className="mt-1">{interviewData[`${prefix}Termination`] || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // PDF export function
    const exportAsPDF = async () => {
        if (!contentRef.current || exporting) return;

        try {
            setExporting(true);

            // Get the element to be captured
            const element = contentRef.current;

            // Calculate the total height of the content
            const totalHeight = element.scrollHeight;
            const totalWidth = element.scrollWidth;

            // Create a PDF with custom dimensions to better fit the content
            const pdf = new jsPDF({
                orientation: totalWidth > totalHeight ? 'l' : 'p',
                unit: 'pt',
                format: [totalWidth + 40, totalHeight + 40] // Add margins
            });

            // Create canvas from the component with higher quality settings
            const canvas = await html2canvas(element, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                windowWidth: totalWidth,
                windowHeight: totalHeight,
                logging: true
            });

            // Convert canvas to image and add to PDF
            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            // Add image to PDF, fitting the entire page
            pdf.addImage(
                imgData,
                'JPEG',
                20, // left margin
                20, // top margin
                totalWidth,
                totalHeight
            );

            // Save the PDF
            const applicantId = interviewData.solicitorId || 'unknown';
            const date = new Date().toISOString().slice(0, 10);
            pdf.save(`Interview_${applicantId}_${date}.pdf`);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF: ' + (error instanceof Error ? error.message : String(error)) +
                '\nTry using browser print function instead.');
        } finally {
            setExporting(false);
        }
    };

    if (exporting) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-lg">Generating PDF... Please wait...</p>
            </div>
        );
    }

    return (
        <div ref={contentRef} className="space-y-6">
            {/* Header for this tab */}
            <div className="flex justify-between items-center mb-8 print:mb-4 border-b pb-4">
                <div className="flex items-center">
                    {/* <div className="mr-4">
                        <img src="https://reports.telecontacto.com/images/Telecontacto_Logo_Solid.png" alt="Company Logo" width={80} height={80} />
                    </div> */}
                    <div>
                        <h1 className="text-2xl font-bold">Interview Information</h1>
                        <p className="text-gray-600 dark:text-gray-400">Applicant: {interviewData.name || 'N/A'}</p>
                        <p className="text-gray-600 dark:text-gray-400">ID: {interviewData.solicitorId || 'N/A'}</p>
                    </div>
                </div>
                {showExportButton && (
                    <div className="print:hidden">
                        <button
                            onClick={exportAsPDF}
                            disabled={exporting}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 disabled:bg-gray-400"
                        >
                            {exporting ? 'Exporting...' : 'Export as PDF'}
                        </button>
                    </div>
                )}
            </div>

            {/* Work Experience (special section with different structure) */}
            {renderWorkExperience()}

            {/* Render all other sections */}
            {sections.map((section, index) => {
                // Skip Remote Work section if applicant doesn't want to work remotely
                if (section.title === "Remote Work Questions" && interviewData.remote === 'No') {
                    return null;
                }
                return renderSection(section.title, interviewData, section.fields);
            })}
        </div>
    );
};

export default InterviewInfoTab;
