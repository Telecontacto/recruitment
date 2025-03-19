import { fetchReportData } from '@/app/api/queryHandle/fetchApi';
import ReportDataTable from '@/app/dashboard/report/components/ReportDataTable';

export default async function ReportData({
    searchParams
}: {
    searchParams?: {
        startDate?: string;
        endDate?: string;
    };
}) {
    // Safe way to access searchParams properties
    const startDate = searchParams ? searchParams.startDate : undefined;
    const endDate = searchParams ? searchParams.endDate : undefined;

    // Fetch data using the date range - pass the raw values to fetchReportData
    const reportData = await fetchReportData(startDate, endDate);

    // Handle case when no data is found
    if (!reportData || reportData.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 rounded-md dark:bg-gray-700 dark:text-gray-200">
                <p className="text-gray-500 dark:text-gray-300">No data found for the selected timeframe</p>
            </div>
        );
    }

    // Format the date range for display
    const displayStartDate = startDate || new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const displayEndDate = endDate || new Date().toISOString().split('T')[0];

    return (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 dark:text-white rounded-md p-4">
            <h2 className="text-xl font-bold mb-4">
                Recruiter Performance Report ({displayStartDate} to {displayEndDate})
            </h2>

            <ReportDataTable data={reportData} />
        </div>
    );
}
