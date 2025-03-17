import { Metadata } from 'next';
import Session from '@/app/api/user-data/session-data';
import DateRangePicker from './components/DateRangePicker';
import ReportData from '@/app/dashboard/report/components/ReportData';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Report Dashboard',
};

export default async function Page() {
  const session = await Session();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold mb-4">Report Dashboard</h1>

      <div className="mb-8">
        <DateRangePicker />
      </div>

      <Suspense fallback={<div>Loading report data...</div>}>
        <ReportData />
      </Suspense>
    </main>
  );
}

