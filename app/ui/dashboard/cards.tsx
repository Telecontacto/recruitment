import { fetchCardData } from '@/app/api/queryHandle/fetchApi';
import { Card } from './card-ui';

export default async function CardWrapper({ date }: { date: string }) {
  const results = await fetchCardData(date);
  const cardNames = ['Facebook', 'Indeed', 'Instagram', 'LinkedIn', 'Web', 'ZipRecruiter', 'Perfil'];

  if (!results) {
    // If no results, return all cards with dashes
    return (
      <>
        <div className="bg-gray-200 p-4 rounded-md">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Total Applications Received</h1>
        </div>
        <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 bg-gray-200 p-4 rounded-md">
          {[...cardNames, 'Total'].map((name) => (
            <Card
              key={name}
              title={name}
              value={0}
              type={name as 'Facebook' | 'Indeed' | 'Instagram' | 'LinkedIn' | 'Web' | 'ZipRecruiter' | 'Perfil' | 'Total'}
            />
          ))}
        </div>
      </>
    );
  }

  // Calculate total sum from existing results
  const totalApplications = results.reduce((sum: number, source: { total: number }) => sum + source.total, 0);

  // Create a map of existing results
  interface Result {
    fuente: string;
    total: number;
  }

  const resultMap: Map<string, number> = new Map<string, number>(results.map((r: Result) => [r.fuente, r.total]));

  // Create complete results array with all card types
  const completeResults = cardNames.map(name => ({
    fuente: name,
    total: resultMap.get(name) || 0
  }));

  // Add total to results
  const resultsWithTotal = [
    ...completeResults,
    {
      fuente: 'Total',
      total: totalApplications
    }
  ];

  return (
    <>
      <div className="bg-gray-200 p-4 rounded-md">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Total Applications Received</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 bg-gray-200 p-4 rounded-md">
        {resultsWithTotal.map((source) => (
          <Card
            key={source.fuente}
            title={source.fuente}
            value={source.total}
            type={source.fuente as 'Facebook' | 'Indeed' | 'Instagram' | 'LinkedIn' | 'Web' | 'ZipRecruiter' | 'Perfil' | 'Total'}
          />
        ))}
      </div>
    </>
  );
}
