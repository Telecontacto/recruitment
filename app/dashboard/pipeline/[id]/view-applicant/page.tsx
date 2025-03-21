import { fetchApplicant } from '@/app/api/queryHandle/fetchApi';
import ViewApplicantWrapper from '@/app/ui/pipeline/view-applicant-wrapper';
import { Metadata } from 'next';
import Session from '@/app/api/user-data/session-data';

export const metadata: Metadata = {
  title: 'View Applicant',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const applicantData = await fetchApplicant(id, '/api/viewPipeline');
  const applicant = applicantData[0].Nombre;
  const stageNumber = parseInt(applicantData[0].StatusSolicitud);
  const session = await Session();

  return (
    <ViewApplicantWrapper
      applicant={applicant}
      id={id}
      stageNumber={stageNumber}
      applicantData={applicantData}
      session={session}
    />
  );
}