'use client';

import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ApplicationPreviewTab from './ApplicationPreviewTab';
import DetailedInfoTab from './DetailedInfoTab';
import InterviewInfoTab from './InterviewInfoTab';

interface ExportPdfProps {
    data: any;
    type: 'application' | 'details' | 'interview';
    formatDate?: (dateString: string) => string;
    name?: string;
}

export default function ExportPdf({ data, type, formatDate, name }: ExportPdfProps) {
    const [exporting, setExporting] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Default date formatter if not provided
    const defaultFormatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('default', { month: "2-digit", day: "2-digit", year: "numeric" });
    };

    const formatDateFunc = formatDate || defaultFormatDate;

    const exportAsPDF = async () => {
        if (!contentRef.current || exporting) return;

        try {
            setExporting(true);

            const contentElement = contentRef.current;
            const canvas = await html2canvas(contentElement, {
                scale: 2, // Higher scale for better quality
                useCORS: true, // Allow loading images from other domains
                logging: false, // Disable logging
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');

            // Determine orientation based on page dimensions
            const isPortrait = canvas.height > canvas.width;
            const orientation = isPortrait ? 'p' : 'l';

            // Create PDF at correct size
            const pdf = new jsPDF({
                orientation: orientation,
                unit: 'mm',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate ratio to fit the canvas to the PDF
            const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
            const imgWidth = canvas.width * ratio;
            const imgHeight = canvas.height * ratio;

            // Center the image on the PDF
            const x = (pdfWidth - imgWidth) / 2;
            const y = 10; // Add some margin at the top

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

            // Generate a filename with the application ID and date
            let applicantId = 'unknown';

            if (type === 'application') {
                applicantId = data[0]?.ID || 'unknown';
            } else if (type === 'details') {
                applicantId = data[0]?.solicitorId || 'unknown';
            } else {
                applicantId = data?.solicitorId || 'unknown';
            }

            // Use name if provided, otherwise use type for the first part
            const filePrefix = name
                ? name.replace(/\s+/g, '_') // Replace spaces with underscores
                : type.charAt(0).toUpperCase() + type.slice(1);

            // Add type to the filename if name is provided
            const typeString = type.charAt(0).toUpperCase() + type.slice(1);

            // Create filename with name/type and ID but without date
            const filename = name
                ? `${filePrefix}_${typeString}_${applicantId}.pdf`
                : `${filePrefix}_${applicantId}.pdf`;

            // Save the PDF
            pdf.save(filename);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF: ' + (error instanceof Error ? error.message : String(error)));
        } finally {
            setExporting(false);
        }
    };

    // Auto-trigger export when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!exporting) {
                exportAsPDF();
            }
        }, 800); // Give components time to render

        return () => clearTimeout(timer);
    }, []);

    if (exporting) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-lg">Generating PDF, please wait...</p>
                <p className="text-sm text-gray-500 mt-2">The download will start automatically when ready.</p>
            </div>
        );
    }

    return (
        <>
            <div>
                <h1 className="text-xl font-semibold">
                    Export Preview - {type === 'application' ? 'Application' : type === 'details' ? 'Detailed Information' : 'Interview Information'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    PDF export is being generated. You can also manually trigger the export:
                </p>
                <button
                    onClick={exportAsPDF}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                >
                    Generate PDF Now
                </button>
            </div>

            <div className="border border-gray-200 p-4 rounded-md" ref={contentRef}>
                {type === 'application' && (
                    <ApplicationPreviewTab
                        data={data}
                        formatDate={formatDateFunc}
                        showExportButton={false}
                    />
                )}

                {type === 'details' && (
                    <DetailedInfoTab
                        formattedData={data}
                        showExportButton={false}
                    />
                )}

                {type === 'interview' && (
                    <InterviewInfoTab
                        interviewData={data}
                        showExportButton={false}
                    />
                )}
            </div>
        </>
    );
}
