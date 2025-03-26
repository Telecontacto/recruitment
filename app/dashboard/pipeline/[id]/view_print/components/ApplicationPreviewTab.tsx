import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ApplicationPreviewTabProps {
    data: any[];
    formatDate: (dateString: string) => string;
    showExportButton?: boolean;
}

const ApplicationPreviewTab: React.FC<ApplicationPreviewTabProps> = ({
    data,
    formatDate,
    showExportButton = true
}) => {
    const [exporting, setExporting] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const availabilityWeek = [{
        "Monday": `${data[0].LunesDesde || 'N/A'} - ${data[0].LunesHasta || 'N/A'}`,
        "Tuesday": `${data[0].MartesDesde || 'N/A'} - ${data[0].MartesHasta || 'N/A'}`,
        "Wednesday": `${data[0].MiercolesDesde || 'N/A'} - ${data[0].MiercolesHasta || 'N/A'}`,
        "Thursday": `${data[0].JuevesDesde || 'N/A'} - ${data[0].JuevesHasta || 'N/A'}`,
        "Friday": `${data[0].ViernesDesde || 'N/A'} - ${data[0].ViernesHasta || 'N/A'}`,
        "Saturday": `${data[0].SabadoDesde || 'N/A'} - ${data[0].SabadoHasta || 'N/A'}`,
        "Sunday": `${data[0].DomingoDesde || 'N/A'} - ${data[0].DomingoHasta || 'N/A'}`,
    }];

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
            const applicantId = data[0]?.ID || 'unknown';
            const date = new Date().toISOString().slice(0, 10);
            const filename = `Application_${applicantId}_${date}.pdf`;

            // Save the PDF
            pdf.save(filename);
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
        <div ref={contentRef}>
            {/* Header with Logo and Title */}
            <div className="flex justify-between items-center mb-8 print:mb-4 border-b pb-4">
                <div className="flex items-center">
                    {/* <div className="mr-4">
                        <img src="https://reports.telecontacto.com/images/Telecontacto_Logo_Solid.png" alt="Company Logo" width={80} height={80} />
                    </div> */}
                    <div>
                        <h1 className="text-2xl font-bold">Application Details</h1>
                        <p className="text-gray-600 dark:text-gray-400">Application ID: {data[0].ID}</p>
                        <p className="text-gray-600 dark:text-gray-400">Submitted: {formatDate(data[0].Fecha)}</p>
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
            <section className="mb-8 print:mb-4">
                <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2 print:bg-gray-200 dark:bg-gray-700">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4 print:grid-cols-2">
                    <div>
                        <p className="font-semibold">Name:</p>
                        <p>{data[0].Nombre || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Phone Number:</p>
                        <p>{data[0].Celular || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Email:</p>
                        <p>{data[0].Email || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Date of Application:</p>
                        <p>{formatDate(data[0].Fecha)}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="font-semibold">Physical Address:</p>
                        <p>{data[0].Direccion || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Minor:</p>
                        <p>{data[0].Menor || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Convicted:</p>
                        <p>{data[0].Convicto || 'N/A'}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4 print:grid-cols-3">
                    <div className="border p-3 rounded">
                        <h3 className="font-semibold mb-2">Emergency Contact</h3>
                        <p><span className="font-medium">Name:</span> {data[0].ParentezcoContactoEmergencia || 'N/A'}</p>
                        <p><span className="font-medium">Phone:</span> {data[0].TelEmergencia || 'N/A'}</p>
                    </div>
                    <div className="border p-3 rounded">
                        <h3 className="font-semibold mb-2">Family Members</h3>
                        <p><span className="font-medium">Family at company:</span> {data[0].Familiares || 'N/A'}</p>
                        <p><span className="font-medium">Name/Kinship:</span> {data[0].PuestoFamiliar || 'N/A'}</p>
                    </div>
                    <div className="border p-3 rounded">
                        <h3 className="font-semibold mb-2">Planned Trips</h3>
                        <p><span className="font-medium">Has planned trips:</span> {data[0].Viaje || 'N/A'}</p>
                        <p><span className="font-medium">Trip date:</span> {data[0].FechaViaje || 'N/A'}</p>
                    </div>
                </div>
            </section>

            {/* Work & Hours Information */}
            <section className="mb-8 print:mb-4 page-break-before">
                <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2 print:bg-gray-200 dark:bg-gray-700">Work & Hours Information</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="font-semibold">Position Applied For:</p>
                        <p>{data[0].PuestoSolicitado || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Available Start Date:</p>
                        <p>{data[0].FechaDisponibilidad || 'N/A'}</p>
                    </div>
                </div>

                <h3 className="font-semibold mb-2">Weekly Availability</h3>
                <div className="grid grid-cols-7 gap-2 border p-3 rounded">
                    {Object.entries(availabilityWeek[0]).map(([day, hours]) => (
                        <div key={day} className="text-center">
                            <p className="font-medium">{day}</p>
                            <p>{hours}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Languages & Education */}
            <section className="mb-8 print:mb-4">
                <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2 print:bg-gray-200 dark:bg-gray-700">Languages & Education</h2>

                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="border p-3 rounded mb-4">
                    <table className="w-full border-collapse mb-4">
                        <thead>
                            <tr className="bg-gray-50 dark:text-white dark:border-gray-600 dark:bg-gray-800">
                                <th className="p-2 border"></th>
                                <th className="p-2 border text-center" colSpan={3}>Spanish</th>
                                <th className="p-2 border text-center" colSpan={3}>English</th>
                            </tr>
                            <tr className="bg-gray-50 dark:text-white dark:border-gray-600 dark:bg-gray-800">
                                <th className="p-2 border"></th>
                                <th className="p-2 border text-center">Fluent</th>
                                <th className="p-2 border text-center">Good</th>
                                <th className="p-2 border text-center">Regular</th>
                                <th className="p-2 border text-center">Fluent</th>
                                <th className="p-2 border text-center">Good</th>
                                <th className="p-2 border text-center">Regular</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border font-medium">Speaking</td>
                                <td className="p-2 border text-center">{data[0].HablaEspanol === 'Con fluidez' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].HablaEspanol === 'Bien' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].HablaEspanol === 'Regular' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].HablaIngles === 'Con fluidez' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].HablaIngles === 'Bien' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].HablaIngles === 'Regular' ? '✓' : ''}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">Writing</td>
                                <td className="p-2 border text-center">{data[0].EscribeEspanol === 'Con fluidez' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].EscribeEspanol === 'Bien' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].EscribeEspanol === 'Regular' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].EscribeIngles === 'Con fluidez' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].EscribeIngles === 'Bien' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].EscribeIngles === 'Regular' ? '✓' : ''}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">Reading</td>
                                <td className="p-2 border text-center">{data[0].LeeEspanol === 'Con fluidez' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].LeeEspanol === 'Bien' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].LeeEspanol === 'Regular' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].LeeIngles === 'Con fluidez' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].LeeIngles === 'Bien' ? '✓' : ''}</td>
                                <td className="p-2 border text-center">{data[0].LeeIngles === 'Regular' ? '✓' : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="font-semibold mb-2">Education</h3>
                <div className="border p-3 rounded">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:text-white dark:border-gray-600 dark:bg-gray-800">
                                <th className="p-2 border">Level</th>
                                <th className="p-2 border">Name & Location</th>
                                <th className="p-2 border">Degree & Concentration</th>
                                <th className="p-2 border">Graduated</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border font-medium">High School</td>
                                <td className="p-2 border">{data[0].nombreSuperior || 'N/A'}</td>
                                <td className="p-2 border">{data[0].gradoSuperior || 'N/A'}</td>
                                <td className="p-2 border">{data[0].graduoSuperior || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">University</td>
                                <td className="p-2 border">{data[0].nombreUniversidad || 'N/A'}</td>
                                <td className="p-2 border">{data[0].gradoUniversidad || 'N/A'}</td>
                                <td className="p-2 border">{data[0].graduoUniversidad || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">Other</td>
                                <td className="p-2 border">{data[0].nombreOtro || 'N/A'}</td>
                                <td className="p-2 border">{data[0].gradoOtro || 'N/A'}</td>
                                <td className="p-2 border">{data[0].graduoOtro || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Previous Employment */}
            <section className="mb-8 print:mb-4 page-break-before">
                <h2 className="text-xl font-bold mb-4 bg-gray-100 p-2 print:bg-gray-200 dark:bg-gray-700">Previous Employment</h2>
                <div className="border p-3 rounded">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:text-white dark:border-gray-600 dark:bg-gray-800">
                                <th className="p-2 border">Information</th>
                                <th className="p-2 border">First Employment</th>
                                <th className="p-2 border">Second Employment</th>
                                <th className="p-2 border">Third Employment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border font-medium">Company</td>
                                <td className="p-2 border">{data[0].Compania1 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Compania2 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Compania3 || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">Supervisor</td>
                                <td className="p-2 border">{data[0].Supervisor1 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Supervisor2 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Supervisor3 || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">Phone</td>
                                <td className="p-2 border">{data[0].Telefono1 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Telefono2 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Telefono3 || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">Address</td>
                                <td className="p-2 border">{data[0].Direccion1 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Direccion2 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Direccion3 || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">Employment Date</td>
                                <td className="p-2 border">{data[0].Empleo1Desde || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Empleo2Desde || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Empleo3Desde || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">Position</td>
                                <td className="p-2 border">{data[0].Titulo1 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Titulo2 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Titulo3 || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">Reason for Leaving</td>
                                <td className="p-2 border">{data[0].RazonTerminar1 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].RazonTerminar2 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].RazonTerminar3 || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-medium">Responsibilities</td>
                                <td className="p-2 border">{data[0].Responsabilidades1 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Responsabilidades2 || 'N/A'}</td>
                                <td className="p-2 border">{data[0].Responsabilidades3 || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-8 pt-4 border-t text-center text-gray-500 text-sm print:mt-4 dark:text-gray-400">
                <p>Application ID: {data[0].ID} • Generated on: {new Date().toLocaleDateString()}</p>
                <p>This document is confidential and for internal use only.</p>
            </footer>
        </div>
    );
};

export default ApplicationPreviewTab;
