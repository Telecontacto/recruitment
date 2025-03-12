import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') ?? '2025-03-01';
    const endDate = searchParams.get('endDate') ?? '2025-03-31';

    console.log('Received dates:', { startDate, endDate });

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Both start date and end date are required.' }, { status: 400 });
    }

    const query = `
      select fuente, count(*) as total from RECLUTAMIENTO_SOLICITUDES
      where cast(timestamp as date) between @param1 and @param2
      and fuente != 'whatsapp'
      group by fuente
      order by fuente
    `;

    const params = [startDate, endDate];

    console.log('Date range:', startDate, endDate);

    const result = await executeQuery<any[]>(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
