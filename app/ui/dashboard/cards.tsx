import { Card } from './card-ui';

export default function CardWrapper({ data }: { data: any }) {
  const cardNames = ['Facebook', 'Indeed', 'Instagram', 'LinkedIn', 'Web', 'ZipRecruiter', 'Perfil'];

  if (!data || !Array.isArray(data)) {
    return (
      <>
        <div className="bg-gray-200 p-4 rounded-md">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Total Applications Received</h1>
        </div>
        <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 bg-gray-200 p-4 rounded-md">
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

  const totalApplications = data.reduce((sum: number, source: { total: number }) => sum + source.total, 0);
  const resultMap = new Map(data.map((r: any) => [r.fuente.charAt(0).toUpperCase() + r.fuente.slice(1), r.total]));

  const completeResults = cardNames.map(name => ({
    fuente: name,
    total: resultMap.get(name) || 0
  }));

  const resultsWithTotal = [
    ...completeResults,
    { fuente: 'Total', total: totalApplications }
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
