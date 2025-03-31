'use client';

import { Card } from './card-ui';
import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/app/translations';

interface CardsClientProps {
    cardNames: string[];
    results: null | Array<{ fuente: string; total: number }>;
}

export function CardsClient({ cardNames, results }: CardsClientProps) {
    const { language } = useLanguage();

    if (!results) {
        return (
            <>
                <div className="bg-gray-200 p-4 rounded-md">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        {getTranslation('applicationReceived', language)}
                    </h1>
                </div>
                <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 bg-gray-200 p-4 rounded-md">
                    {[...cardNames, 'Total'].map((name) => (
                        <Card
                            key={name}
                            title={name}
                            value={0}
                            type={name as 'Meta_business' | 'Indeed' | 'LinkedIn' | 'Web' | 'ZipRecruiter' | 'Perfil' | 'Empleos' | 'Feriaempleo' | 'Total'}
                        />
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <div className="bg-gray-200 p-4 rounded-md">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {getTranslation('applicationReceived', language)}
                </h1>
            </div>
            <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 bg-gray-200 p-4 rounded-md">
                {results.map((source) => (
                    <Card
                        key={source.fuente}
                        title={source.fuente}
                        value={source.total}
                        type={source.fuente as 'Meta_business' | 'Indeed' | 'LinkedIn' | 'Web' | 'ZipRecruiter' | 'Perfil' | 'Empleos' | 'Feriaempleo' | 'Total'}
                    />
                ))}
            </div>
        </>
    );
}
