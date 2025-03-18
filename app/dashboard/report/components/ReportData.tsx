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

    return (
        <div className="bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
                Report: {searchParams.startDate} to {searchParams.endDate}
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Metric</th>
                            <th scope="col" className="px-6 py-3">Value</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((item, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-4">{item.date}</td>
                                <td className="px-6 py-4">{item.metric}</td>
                                <td className="px-6 py-4">{item.value}</td>
                                {/* Add more cells as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
