import { notFound } from 'next/navigation';
import { fetchApplicant } from '@/app/api/queryHandle/fetchApi';
import PdfViewer from './components/PdfViewer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Print Applicant',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    try {
        if (!id) return notFound();

        const applicationPreview = await fetchApplicant(id, '/api/viewPipeline');
        const applicationReview = await fetchApplicant(id, '/api/reviewPipeline');
        const applicationInterview = await fetchApplicant(id, '/api/interviewPipeline');

        if (!applicationPreview || applicationPreview.length === 0) {
            return notFound();
        }

        return <PdfViewer prevdata={applicationPreview} revdata={applicationReview} intdata={applicationInterview} />;
    } catch (error) {
        console.error('Error fetching data:', error);
        return notFound();
    }
}