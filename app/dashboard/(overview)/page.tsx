/* import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'; */
import CardWrapper from '@/app/ui/dashboard/cards';
import { montserrat } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import DateSelector from '@/app/ui/dashboard/date-selector';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <main className={`${montserrat.className}`}>
      <h1 className="mb-4 text-xl md:text-2xl">
        Dashboard
      </h1>
      {/* <DateSelector onDateChange={(date) => {
        // This will be handled by the client component
      }} /> */}
      <div className="bg-gray-200 p-4 rounded-md">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper date="2025-01" />
        </Suspense>
      </div>
      {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
    </main>
  );
}