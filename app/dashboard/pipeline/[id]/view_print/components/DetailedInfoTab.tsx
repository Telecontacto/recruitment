import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DetailedInfoTabProps {
    formattedData: any;
    showExportButton?: boolean;
}

const DetailedInfoTab: React.FC<DetailedInfoTabProps> = ({
    formattedData,
    showExportButton = true
}) => {
    const [exporting, setExporting] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    if (!formattedData) {
        return (
            <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4 mx-auto"></div>
                <p className="text-lg">Loading applicant data...</p>
            </div>
        );
    }

    // Format date helper function
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    // Convert boolean strings to readable text
    const formatBoolean = (value: string) => {
        if (value === 'true' || value === 'Yes') return 'Yes';
        if (value === 'false' || value === 'No') return 'No';
        return value || 'N/A';
    };

    // Format attempt status for display
    const formatAttemptStatus = (status: string) => {
        if (!status) return 'N/A';

        const statusMap: { [key: string]: string } = {
            'contacted': 'Contacted',
            'no_answer': 'No Answer',
            'will_call_back': 'Will Call Back',
            'scheduled_interview': 'Scheduled Interview',
            'not_interested': 'Not Interested',
            'hang_up': 'Hung Up',
            'not_qualified': 'Not Qualified',
            'family_message': 'Message Left with Family Member',
            're_hire': 'Re-hire Evaluation'
        };

        return statusMap[status] || status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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
            const applicantId = formattedData[0]?.solicitorId || 'unknown';
            const date = new Date().toISOString().slice(0, 10);
            pdf.save(`Details_${applicantId}_${date}.pdf`);

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
            {/* Add a header for the combined PDF */}
            <div className="flex justify-between items-center mb-8 print:mb-4 border-b pb-4">
                <div className="flex items-center">
                    {/* <div className="mr-4">
                        <img src="https://reports.telecontacto.com/images/Telecontacto_Logo_Solid.png" alt="Company Logo" width={80} height={80} />
                    </div> */}
                    <div>
                        <h1 className="text-2xl font-bold">Detailed Application Information</h1>
                        <p className="text-gray-600 dark:text-gray-400">Application ID: {formattedData[0].solicitorId || 'N/A'}</p>
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

            {/* Personal Information */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2 dark:bg-gray-700">Personal Information</h2>
                <div className="rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Name</p>
                            <p className="mt-1">{formattedData[0].name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Phone Number</p>
                            <p className="mt-1">{formattedData[0].phone || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Email</p>
                            <p className="mt-1">{formattedData[0].email || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold mb-3 text-lg">Weekly Availability</h3>
                        <div className="grid grid-cols-7 gap-2 bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                            <div className="text-center">
                                <p className="font-medium">Monday</p>
                                <p>{formattedData[0].monFrom || 'N/A'} - {formattedData[0].monUntil || 'N/A'}</p>
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Tuesday</p>
                                <p>{formattedData[0].tueFrom || 'N/A'} - {formattedData[0].tueUntil || 'N/A'}</p>
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Wednesday</p>
                                <p>{formattedData[0].wedFrom || 'N/A'} - {formattedData[0].wedUntil || 'N/A'}</p>
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Thursday</p>
                                <p>{formattedData[0].thuFrom || 'N/A'} - {formattedData[0].thuUntil || 'N/A'}</p>
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Friday</p>
                                <p>{formattedData[0].friFrom || 'N/A'} - {formattedData[0].friUntil || 'N/A'}</p>
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Saturday</p>
                                <p>{formattedData[0].satFrom || 'N/A'} - {formattedData[0].satUntil || 'N/A'}</p>
                            </div>
                            <div className="text-center">
                                <p className="font-medium">Sunday</p>
                                <p>{formattedData[0].sunFrom || 'N/A'} - {formattedData[0].sunUntil || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Screening Questions */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2 dark:bg-gray-700">Screening Questions</h2>
                <div className="rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Do you have Transportation?</p>
                            <p className="mt-1">{formatBoolean(formattedData[0].transportation)}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Do you have a planned trip?</p>
                            <p className="mt-1">{formattedData[0].trip || 'No trip scheduled'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Are you a student?</p>
                            <p className="mt-1">{formatBoolean(formattedData[0].student)}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Are you bilingual?</p>
                            <p className="mt-1">{formatBoolean(formattedData[0].bilingual)}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Which town do you reside?</p>
                            <p className="mt-1">{formattedData[0].town || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Where did you send the form?</p>
                            <p className="mt-1">{formattedData[0].appliedWhere || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">How did you learn about us?</p>
                            <p className="mt-1">{formattedData[0].knowledgeHow || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Internet speed (If working remotely)</p>
                            <p className="mt-1">{formattedData[0].internetSpeed || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Will you work on-site?</p>
                            <p className="mt-1">{formatBoolean(formattedData[0].onSite)}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Will you work remotely?</p>
                            <p className="mt-1">{formatBoolean(formattedData[0].remote)}</p>
                        </div>
                    </div>

                    <div className="mt-4 space-y-4">
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">What caught your attention to work in a call center?</p>
                            <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded">{formattedData[0].callCenterInterest || 'No answer provided'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">What is customer service for you?</p>
                            <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded">{formattedData[0].customerServiceDefinition || 'No answer provided'}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600 dark:text-gray-400">Comments</p>
                            <p className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded">{formattedData[0].comments || 'No comments provided'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Attempts */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2 dark:bg-gray-700">Contact Attempts</h2>
                <div className="rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
                    <div className="space-y-4">
                        {/* Show each attempt if there's data */}
                        {formattedData[0].attempt1 && (
                            <div className="border-b pb-3 mb-3 dark:border-gray-700">
                                <h3 className="font-semibold text-lg mb-2">Attempt 1 {formattedData[0].attempt1Date && `- ${formatDate(formattedData[0].attempt1Date)}`}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Status</p>
                                        <p className="mt-1">{formatAttemptStatus(formattedData[0].attempt1)}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Result</p>
                                        <p className="mt-1">{formatAttemptStatus(formattedData[0].action1)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {formattedData[0].attempt2 && (
                            <div className="border-b pb-3 mb-3 dark:border-gray-700">
                                <h3 className="font-semibold text-lg mb-2">Attempt 2 {formattedData[0].attempt2Date && `- ${formatDate(formattedData[0].attempt2Date)}`}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Status</p>
                                        <p className="mt-1">{formatAttemptStatus(formattedData[0].attempt2)}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Result</p>
                                        <p className="mt-1">{formatAttemptStatus(formattedData[0].action2)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {formattedData[0].attempt3 && (
                            <div className="border-b pb-3 mb-3 dark:border-gray-700">
                                <h3 className="font-semibold text-lg mb-2">Attempt 3 {formattedData[0].attempt3Date && `- ${formatDate(formattedData[0].attempt3Date)}`}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Status</p>
                                        <p className="mt-1">{formatAttemptStatus(formattedData[0].attempt3)}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Result</p>
                                        <p className="mt-1">{formatAttemptStatus(formattedData[0].action3)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {formattedData[0].attempt4 && (
                            <div className="border-b pb-3 mb-3 dark:border-gray-700">
                                <h3 className="font-semibold text-lg mb-2">Attempt 4 {formattedData[0].attempt4Date && `- ${formatDate(formattedData[0].attempt4Date)}`}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Status</p>
                                        <p className="mt-1">{formatAttemptStatus(formattedData[0].attempt4)}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-600 dark:text-gray-400">Result</p>
                                        <p className="mt-1">{formatAttemptStatus(formattedData[0].action4)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Qualification Status */}
                        <div className="mt-4 pt-3 border-t dark:border-gray-700">
                            <h3 className="font-semibold text-lg mb-3">Qualification Assessment</h3>

                            {formattedData[0].notQualified === 'true' ? (
                                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                                    <p className="font-semibold text-red-700 dark:text-red-400">Not Qualified</p>
                                    <p className="mt-1">Reason: {formatAttemptStatus(formattedData[0].notQualifiedReason) || 'No reason specified'}</p>
                                </div>
                            ) : formattedData[0].Campana ? (
                                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                                    <p className="font-semibold text-green-700 dark:text-green-400">Qualified</p>
                                    <p className="mt-1">Campaign: {formattedData[0].Campana}</p>
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">No qualification assessment has been made yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedInfoTab;
