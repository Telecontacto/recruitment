import { fetchApplicant } from '@/app/api/queryHandle/fetchApi';
import ViewApplicantWrapper from '@/app/ui/pipeline/interview-applicant-wrapper';
import { Metadata } from 'next';
import Session from '@/app/api/user-data/session-data';

export const metadata: Metadata = {
  title: 'Interview Applicant',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const applicantData = await fetchApplicant(id, '/api/interviewPipeline');
  const applicant = applicantData[0].name;
  const stageNumber = parseInt(applicantData[0].status);

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