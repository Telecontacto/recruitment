import { Metadata } from 'next';
import Session from '@/app/api/user-data/session-data';
import DateRangePicker from './components/DateRangePicker';
import ReportData from '@/app/dashboard/report/components/ReportData';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Report Dashboard',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await Session();

  // Extract and type the search params we need
  const typedSearchParams = {
    startDate: typeof searchParams?.startDate === 'string' ? searchParams.startDate : undefined,
    endDate: typeof searchParams?.endDate === 'string' ? searchParams.endDate : undefined
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold mb-4">Report Dashboard</h1>

      <div className="mb-8">
        <DateRangePicker />
      </div>

      <Suspense fallback={<div className="text-center p-8">Loading report data...</div>}>
        <ReportData searchParams={typedSearchParams} />
      </Suspense>
    </main>
  );
}

