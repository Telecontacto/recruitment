import Form from '@/app/ui/pipeline/edit-form';
import Breadcrumbs from '@/app/ui/pipeline/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { fetchApplicant } from '@/app/api/queryHandle/fetchApi'
import { montserrat } from '@/app/ui/fonts';
import ViewApplication from '@/app/ui/pipeline/view-tabs'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'View Applicant',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const applicantData = await fetchApplicant(id, '/api/editPipeline');

  const applicant = applicantData[0].Nombre

  return (
    <main className={montserrat.className}>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pipelines', href: '/dashboard/pipeline' },
          { label: `${applicant}`, href: `/dashboard/pipeline/${id}/view-applicant`, active: true },
        ]}
      />
      <ViewApplication data={applicantData} />
    </main>
  );
}