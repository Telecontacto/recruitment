import { fetchCardData } from '@/app/api/queryHandle/fetchApi';
import { Card } from './card-ui';

export default async function CardWrapper({ date }: { date: string }) {
  const results = await fetchCardData(date);

  if (!results || results.length === 0) {
    return <div>No data available</div>;
  }

  // Calculate total sum
  const totalApplications = results.reduce((sum: number, source: { total: number }) => sum + source.total, 0);

  // Add total to results
  const resultsWithTotal = [
    ...results,
    {
      fuente: 'Total',
      total: totalApplications
    }
  ];

  return (
    <>
      <div className="bg-gray-200 p-4 rounded-md">
        <h1 className="text-2xl font-semibold text-gray-800">Total Applications Received</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-5 lg:grid-cols-6 bg-gray-200 p-4 rounded-md">
        {resultsWithTotal.map((source: { fuente: string; total: number }) => (
          <Card
            key={source.fuente}
            title={source.fuente}
            value={source.total}
            type={source.fuente as 'Facebook' | 'Indeed' | 'Instagram' | 'LinkedIn' | 'Web' | 'Total'}
          />
        ))}
      </div>
    </>
  );
}
