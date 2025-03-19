import { Metadata } from 'next';
import Session from '@/app/api/user-data/session-data';
import DateRangePicker from './components/DateRangePicker';
import ReportData from '@/app/dashboard/report/components/ReportData';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Report Dashboard',
};

// Helper functions for default dates
function getDefaultStartDate() {
  const date = new Date();
  date.setDate(date.getDate() - 2);
  return date.toISOString().split('T')[0];
}

function getDefaultEndDate() {
  return new Date().toISOString().split('T')[0];
}

export default async function Page() {
  const session = await Session();

  // Create default date params
  const defaultParams = {
    startDate: getDefaultStartDate(),
    endDate: getDefaultEndDate()
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold mb-4">Report Dashboard</h1>

      <div className="mb-8">
        <DateRangePicker />
      </div>

      <Suspense fallback={<div className="text-center p-8">Loading report data...</div>}>
        <ReportData searchParams={defaultParams} />
      </Suspense>
    </main>
  );
}

