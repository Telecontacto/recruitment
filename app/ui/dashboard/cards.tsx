import { Card } from './card-ui';
import { useEffect, useState } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { fetchCardData } from '@/app/api/queryHandle/fetchApi';

export default function CardWrapper({ startDate, endDate }: { startDate: string, endDate: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cardNames = ['Facebook', 'Indeed', 'Instagram', 'LinkedIn', 'Web', 'ZipRecruiter', 'Perfil'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetchCardData(startDate, endDate);
        console.log('Response:', response);
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  if (loading) {
    return <div>
      <div className="bg-gray-200 p-4 rounded-md">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Total Applications Received</h1>
      </div>
      <CardsSkeleton />
    </div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return renderEmptyCards(cardNames);
  }

  const totalApplications = data.reduce((sum: number, source: { total: number }) => sum + source.total, 0);
  const resultMap = new Map(data.map((r: any) => [r.fuente.charAt(0).toUpperCase() + r.fuente.slice(1), r.total]));

  const completeResults = [
    ...cardNames.map(name => ({
      fuente: name,
      total: resultMap.get(name) || 0
    })),
    { fuente: 'Total', total: totalApplications }
  ];

  return (
    <>
      <div className="bg-gray-200 p-4 rounded-md">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Total Applications Received</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 bg-gray-200 p-4 rounded-md">
        {completeResults.map((source) => (
          <Card
            key={source.fuente}
            title={source.fuente}
            value={source.total}
            type={source.fuente as any}
          />
        ))}
      </div>
    </>
  );
}

function renderEmptyCards(cardNames: string[]) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Total Applications Received</h1>
      <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 bg-gray-200 p-4 rounded-md">
        {[...cardNames, 'Total'].map((name) => (
          <Card
            key={name}
            title={name}
            value={0}
            type={name as any}
          />
        ))}
      </div>
    </>
  );
}
