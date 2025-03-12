import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';
import { attendantStatus } from '@/app/lib/definitions';

export async function POST(request: Request) {
  console.log('API route started');
  try {
    const body = await request.json();
    const { startDate, endDate } = body;
    console.log('Received dates:', { startDate, endDate });

    if (!startDate || !endDate) {
      console.log('Error: Start date or end date is missing');
      return NextResponse.json({ error: 'Both start date and end date are required' }, { status: 400 });
    }

    const query = `
      SELECT 
        a.nombre,
        a.id,
        a.statussolicitud,
        a.printed,
        a.proyecto
      FROM
        RECLUTAMIENTO_SOLICITUDES a
      WHERE
        cast(a.fecha as date) between @param1 and @param2
        and a.fuente != 'whatsapp'
      ORDER BY
        a.fecha DESC
    `;
    const params = [startDate, endDate];
    console.log('Executing query with params:', params);

    const result = await executeQuery<attendantStatus[]>(query, params);
    console.log(`Query completed successfully. Found ${result.length} records`);
    
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Detailed error in API route:', {
      message: error instanceof Error ? error.message : 'An unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
