'use client';
import Breadcrumbs from '@/app/ui/pipeline/breadcrumbs';
import StageSelector from '@/app/ui/pipeline/stage-selector';
import CloseButton from '@/app/ui/pipeline/close-button';
import ViewApplication from '@/app/ui/pipeline/review-tabs';
import { montserrat } from '@/app/ui/fonts';

export default function ViewApplicantWrapper({
    applicant,
    id,
    stageNumber,
    applicantData
}: {
    applicant: string;
    id: string;
    stageNumber: number;
    applicantData: any;
}) {
    console.log(applicantData);
    return (
        <main className={montserrat.className}>
            <div className="flex justify-between items-center mb-8">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Pipelines', href: '/dashboard/pipeline' },
                        { label: applicant, href: `/dashboard/pipeline/${id}/review-applicant`, active: true },
                    ]}
                />
                <div className="flex items-center gap-4">
                    <StageSelector
                        currentStage="review"
                        id={id}
                        canAdvance={stageNumber > 2}
                        stageNumber={stageNumber}
                    />
                    <CloseButton />
                </div>
            </div>
            <ViewApplication data={applicantData} />
        </main>
    );
}
