import { auth } from '@/auth';
import { Metadata } from 'next';
import DashboardLayout from '@/app/ui/dashboard/dashboard-layout';
import DashboardContent from './dashboard-content';
import { fetchCardData } from '@/app/api/queryHandle/fetchApi';

export const metadata: Metadata = {
  title: 'Dashboard',
};

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams = {} }: PageProps) {
  const session = await auth();
  const today = new Date().toISOString().split('T')[0];

  const startDate = typeof searchParams.startDate === 'string'
    ? searchParams.startDate
    : today;

  const endDate = typeof searchParams.endDate === 'string'
    ? searchParams.endDate
    : today;

  try {
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
    // Fallback to current date if there's an error
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