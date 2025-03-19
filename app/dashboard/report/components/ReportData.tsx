'use client';

import { fetchReportData } from '@/app/api/queryHandle/fetchApi';
import ReportDataTable from '@/app/dashboard/report/components/ReportDataTable';
import { useDateContext } from '@/app/context/DateContext';
import { useEffect, useState } from 'react';

export default function ReportData() {
    const { startDate, endDate } = useDateContext();
    const [reportData, setReportData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const data = await fetchReportData(startDate, endDate);
                setReportData(data || []);
            } catch (error) {
                console.error('Error fetching report data:', error);
                setReportData([]);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [startDate, endDate]);

    if (loading) {
        return <div className="text-center p-8">Loading report data...</div>;
    }

    // Handle case when no data is found
    if (!reportData || reportData.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 rounded-md dark:bg-gray-700 dark:text-gray-200">
                <p className="text-gray-500 dark:text-gray-300">No data found for the selected timeframe</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 dark:text-white rounded-md p-4">
            <h2 className="text-xl font-bold mb-4">
                Recruiter Performance Report ({startDate} to {endDate})
            </h2>

            <ReportDataTable data={reportData} />
        </div>
    );
}
