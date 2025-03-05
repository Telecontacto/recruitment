import { auth } from '@/auth';
import CardWrapper from '@/app/ui/dashboard/cards';
import { montserrat } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import DashboardLayout from '@/app/ui/dashboard/dashboard-layout';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const session = await auth();

  return (
    <DashboardLayout
      className={montserrat.className}
      userName={session?.user?.name}
      userRole={session?.user?.role}
    >
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper date="2025-01" />
      </Suspense>
    </DashboardLayout>
  );
}