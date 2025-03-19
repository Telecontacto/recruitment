'use client';

import React from 'react';

type ReportRow = {
    Recruiter: string;
    No_Calls: number;
    Total_Attempt1_No_Answer: number;
    Total_Attempt2_No_Answer: number;
    Total_Attempt3_No_Answer: number;
    Total_Citados: number;
};

export default function ReportDataTable({ data }: { data: ReportRow[] }) {
    // Calculate totals for each numeric column
    const totals = data.reduce(
        (acc, row) => {
            return {
                No_Calls: acc.No_Calls + row.No_Calls,
                Total_Attempt1_No_Answer: acc.Total_Attempt1_No_Answer + row.Total_Attempt1_No_Answer,
                Total_Attempt2_No_Answer: acc.Total_Attempt2_No_Answer + row.Total_Attempt2_No_Answer,
                Total_Attempt3_No_Answer: acc.Total_Attempt3_No_Answer + row.Total_Attempt3_No_Answer,
                Total_Citados: acc.Total_Citados + row.Total_Citados,
            };
        },
        {
            No_Calls: 0,
            Total_Attempt1_No_Answer: 0,
            Total_Attempt2_No_Answer: 0,
            Total_Attempt3_No_Answer: 0,
            Total_Citados: 0,
        }
    );

    return (
        <table className="min-w-full bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white">
            <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 dark:text-white">
                    <th className="py-2 px-4 border">Recruiter</th>
                    <th className="py-2 px-4 border">No Calls</th>
                    <th className="py-2 px-4 border">Attempt 1 - No Answer</th>
                    <th className="py-2 px-4 border">Attempt 2 - No Answer</th>
                    <th className="py-2 px-4 border">Attempt 3 - No Answer</th>
                    <th className="py-2 px-4 border">Total Appointments</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800 dark:text-white' : 'bg-white dark:bg-gray-600 dark:text-white'}>
                        <td className="py-2 px-4 border">{row.Recruiter}</td>
                        <td className="py-2 px-4 border text-center">{row.No_Calls}</td>
                        <td className="py-2 px-4 border text-center">{row.Total_Attempt1_No_Answer}</td>
                        <td className="py-2 px-4 border text-center">{row.Total_Attempt2_No_Answer}</td>
                        <td className="py-2 px-4 border text-center">{row.Total_Attempt3_No_Answer}</td>
                        <td className="py-2 px-4 border text-center">{row.Total_Citados}</td>
                    </tr>
                ))}
                {/* Total row */}
                <tr className="bg-gray-200 dark:bg-gray-800 font-bold">
                    <td className="py-2 px-4 border">Total</td>
                    <td className="py-2 px-4 border text-center">{totals.No_Calls}</td>
                    <td className="py-2 px-4 border text-center">{totals.Total_Attempt1_No_Answer}</td>
                    <td className="py-2 px-4 border text-center">{totals.Total_Attempt2_No_Answer}</td>
                    <td className="py-2 px-4 border text-center">{totals.Total_Attempt3_No_Answer}</td>
                    <td className="py-2 px-4 border text-center">{totals.Total_Citados}</td>
                </tr>
            </tbody>
        </table>
    );
}
