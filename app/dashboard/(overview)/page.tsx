import { auth } from '@/auth';
import { Metadata } from 'next';
import DashboardLayout from '@/app/ui/dashboard/dashboard-layout';
import DashboardContent from './dashboard-content';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const session = await auth();
  return (
    <DashboardLayout
      userName={session?.user?.name}
      userRole={session?.user?.role}
    >
      <DashboardContent />
    </DashboardLayout>
  );
}

