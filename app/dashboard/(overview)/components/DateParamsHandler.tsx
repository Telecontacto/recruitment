import { ReactNode } from 'react';

interface DateParamsHandlerProps {
    searchParams?: { [key: string]: string | string[] | undefined };
    children: (startDate: string, endDate: string) => ReactNode;
}

export default async function DateParamsHandler({ searchParams, children }: DateParamsHandlerProps) {
    const today = new Date().toISOString().split('T')[0];

    // Ensure searchParams is fully resolved before accessing its properties
    const params = await Promise.resolve(searchParams);

    const startDate = typeof params?.startDate === 'string'
        ? params.startDate
        : today;

    const endDate = typeof params?.endDate === 'string'
        ? params.endDate
        : today;

    return <>{children(startDate, endDate)}</>;
}
