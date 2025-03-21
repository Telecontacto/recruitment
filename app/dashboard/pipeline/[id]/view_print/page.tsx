import { notFound } from 'next/navigation';
import { fetchApplicant } from '@/app/api/queryHandle/fetchApi';
import PdfViewer from './components/PdfViewer';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    try {
        if (!id) return notFound();

        const documentData = await fetchApplicant(id, '/api/viewPipeline');

        if (!documentData || documentData.length === 0) {
            return notFound();
        }

        return <PdfViewer data={documentData} />;
    } catch (error) {
        console.error('Error fetching data:', error);
        return notFound();
    }
}