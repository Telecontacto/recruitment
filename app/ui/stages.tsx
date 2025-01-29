'use client';
import { montserrat } from '@/app/ui/fonts';

export function Pipeline({
  title,
}: {
  title: string;
}) {
  return (
    <>
      <div className="stages text-center">
        <div className="stage">
          <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>{title}</h2>
        </div>
      </div>
    </>
  );
}

export function Pipelines() {
  return (
    <>
      <Pipeline title="Received" />
      <Pipeline title="In Review" />
      <Pipeline title="Interview" />
      <Pipeline title="Offered" />
      <Pipeline title="Hired/Rejected" />
    </>
  );
}
/* 
import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
  } from '@heroicons/react/24/outline';
  import { fetchCardData } from '@/app/lib/data';
  import { lusitana } from '@/app/ui/fonts';
  
  const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
  };
  
  export default async function CardWrapper() {
    const {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    } = await fetchCardData();
    return (
      <>
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" />
      </>
    );
  }
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-200 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {value}
        </p>
      </div>
    );
  }
   */