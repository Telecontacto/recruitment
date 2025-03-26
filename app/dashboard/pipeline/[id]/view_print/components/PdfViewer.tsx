'use client';

import React, { useState } from 'react';
import ApplicationPreviewTab from './ApplicationPreviewTab';
import DetailedInfoTab from './DetailedInfoTab';
import InterviewInfoTab from './InterviewInfoTab';
import ExportPdf from './ExportPdf';
import { montserrat } from '@/app/ui/fonts';

export default function PdfViewer({ prevdata, revdata, intdata }: { prevdata: any[], revdata: any[], intdata?: any[] }) {
    const [activeTab, setActiveTab] = useState(0);
    const [showExportView, setShowExportView] = useState(false);

    // Print functionality
    const printCurrentTab = () => {
        window.print();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('default', { month: "2-digit", day: "2-digit", year: "numeric" });
    };

    // Toggle between main view and export view
    const handleExportClick = () => {
        setShowExportView(true);
    };

    const handleBackToTabs = () => {
        setShowExportView(false);
    };

    if (showExportView) {
        // In export view, pass the data for the currently active tab
        const activeData = activeTab === 0 ? prevdata :
            activeTab === 1 ? revdata :
                intdata && intdata.length > 0 ? intdata[0] : null;

        const exportType = activeTab === 0 ? 'application' :
            activeTab === 1 ? 'details' : 'interview';

        return (
            <>
                <button
                    onClick={handleBackToTabs}
                    className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                    ← Back to Tabs
                </button>

                <ExportPdf
                    data={activeData}
                    type={exportType}
                    formatDate={formatDate}
                    name={prevdata[0]?.Nombre}
                />
            </>
        );
    }

    return (
        <div className={`${montserrat.className} p-8 max-w-6xl mx-auto print:p-4 print:max-w-none bg-white shadow-md print:shadow-none dark:bg-gray-800 dark:text-white`}>
            {/* Tab Navigation */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 mb-6 print:hidden">
                <div className="flex">
                    <button
                        className={`py-2 px-4 mr-2 focus:outline-none ${activeTab === 0
                            ? 'border-b-2 border-red-600 font-medium text-red-600 dark:text-red-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        onClick={() => setActiveTab(0)}
                    >
                        Application Preview
                    </button>
                    <button
                        className={`py-2 px-4 mr-2 focus:outline-none ${activeTab === 1
                            ? 'border-b-2 border-red-600 font-medium text-red-600 dark:text-red-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        onClick={() => setActiveTab(1)}
                    >
                        Detailed Information
                    </button>
                    {intdata && intdata.length > 0 && (
                        <button
                            className={`py-2 px-4 mr-2 focus:outline-none ${activeTab === 2
                                ? 'border-b-2 border-red-600 font-medium text-red-600 dark:text-red-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            onClick={() => setActiveTab(2)}
                        >
                            Interview Information
                        </button>
                    )}
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handleExportClick}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                        Export as PDF
                    </button>
                    {/* <button
                        onClick={printCurrentTab}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    >
                        Print (Browser)
                    </button> */}
                </div>
            </div>

            {/* Visible tab based on selection */}
            <div className={activeTab === 0 ? "block" : "hidden"} id="application-tab">
                <ApplicationPreviewTab
                    data={prevdata}
                    formatDate={formatDate}
                    showExportButton={false} // Hide individual export button since we're using the main one
                />
            </div>

            <div className={activeTab === 1 ? "block" : "hidden"} id="detailed-tab">
                <DetailedInfoTab
                    formattedData={revdata}
                    showExportButton={false} // Hide individual export button
                />
            </div>

            {intdata && intdata.length > 0 && (
                <div className={activeTab === 2 ? "block" : "hidden"} id="interview-tab">
                    <InterviewInfoTab
                        interviewData={intdata[0]}
                        showExportButton={false} // Hide individual export button
                    />
                </div>
            )}

            {/* Print Styles - These will only apply when printing */}
            <style jsx global>{`
                @media print {
                    body {
                        font-size: 12pt;
                        color: black;
                    }
                    
                    section {
                        break-inside: avoid;
                    }
                    
                    .page-break-before {
                        page-break-before: always;
                    }
                    
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
                    
                    th, td {
                        border: 1px solid #ddd;
                        padding: 4pt;
                    }

                    th {
                        background-color: #f2f2f2 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    
                    h2 {
                        font-size: 14pt;
                        margin-bottom: 8pt;
                        background-color: #f2f2f2 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    
                    h3 {
                        font-size: 12pt;
                        margin-bottom: 6pt;
                    }
                    
                    .print:hidden {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}
