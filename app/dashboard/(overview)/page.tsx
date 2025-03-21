import { Metadata } from 'next';
import DashboardLayout from '@/app/ui/dashboard/dashboard-layout';
import DashboardContent from './dashboard-content';
import Session from '@/app/api/user-data/session-data';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const session = await Session();

  return (
    <DashboardLayout
      userName={session?.user?.name}
      userRole={session?.user?.role}
    >
      <DashboardContent />
    </DashboardLayout>
  );
}

