'use client';

import SideNav from '@/app/ui/dashboard/sidenav';
export const experimental_ppr = true;
import Snowfall from '@/app/ui/snowflakes';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Snowfall />
      </div>
      <div className="relative z-10 flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}