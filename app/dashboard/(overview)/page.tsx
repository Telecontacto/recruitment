import { auth } from '@/auth';
import { Metadata } from 'next';
import DashboardLayout from '@/app/ui/dashboard/dashboard-layout';
import DashboardContent from './dashboard-content';
import { fetchCardData } from '@/app/api/queryHandle/fetchApi';
import DateParamsHandler from './components/DateParamsHandler';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const today = new Date().toISOString().split('T')[0];

  // Await searchParams before using
  const resolvedParams = await Promise.resolve(searchParams);

  try {
    // Process search parameters at the top level
    const startDate = typeof resolvedParams?.startDate === 'string'
      ? resolvedParams.startDate
      : today;

    const endDate = typeof resolvedParams?.endDate === 'string'
      ? resolvedParams.endDate
      : today;

    const data = await fetchCardData(startDate, endDate);

    return (
      <DashboardLayout
        userName={session?.user?.name}
        userRole={session?.user?.role}
      >
        <DashboardContent data={data} />
      </DashboardLayout>
    );
  } catch (error) {
    const data = await fetchCardData(today, today);
    return (
      <DashboardLayout
        userName={session?.user?.name}
        userRole={session?.user?.role}
      >
        <DashboardContent data={data} />
      </DashboardLayout>
    );
  }
}