import { fetchApplicant } from '@/app/api/queryHandle/fetchApi';
import ViewApplicantWrapper from '@/app/ui/pipeline/review-applicant-wrapper';
import { Metadata } from 'next';
import Session from '@/app/api/user-data/session-data';

export const metadata: Metadata = {
  title: 'Review Applicant',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const applicantData = await fetchApplicant(id, '/api/reviewPipeline');
  const applicant = applicantData[0] ? applicantData[0].name : 'Applicant';
  const stageNumber = applicantData[0] ? parseInt(applicantData[0].Status) : 0;
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