import { fetchReportData } from '@/app/api/queryHandle/fetchApi';

export default async function ReportData({
    searchParams,
}: {
    searchParams?: {
        startDate?: string;
        endDate?: string;
    };
}) {
    // If no dates are provided, don't fetch data
    if (!searchParams?.startDate || !searchParams?.endDate) {
        return (
            <div className="text-center p-8 bg-gray-50 rounded-md">
                <p className="text-gray-500">Select a date range and click "Generate Report" to view data</p>
            </div>
        );
    }

    // Fetch data based on date range
    const reportData = await fetchReportData();

    // Handle case when no data is found
    if (reportData.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 rounded-md">
                <p className="text-gray-500">No data found for the selected date range</p>
            </div>
        );
    }

    return "Report data goes here";
}
