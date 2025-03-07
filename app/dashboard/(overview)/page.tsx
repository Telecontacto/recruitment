import { auth } from '@/auth';
import { Metadata } from 'next';
import DashboardLayout from '@/app/ui/dashboard/dashboard-layout';
import DashboardContent from './dashboard-content';
import { fetchCardData } from '@/app/api/queryHandle/fetchApi';

export const metadata: Metadata = {
  title: 'Dashboard',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  try {
    const session = await auth();
    const params = await searchParams;
    const dateParam = typeof params?.date === 'string' ? params.date : '2025-03';
    const data = await fetchCardData(dateParam);

    return (
      <DashboardLayout
        userName={session?.user?.name}
        userRole={session?.user?.role}
      >
        <DashboardContent data={data} />
      </DashboardLayout>
    );
  } catch (error) {
    // Fallback to default date if there's an error
    const session = await auth();
    const data = await fetchCardData('2025-03');

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