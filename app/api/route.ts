import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';
import { attendantStatus } from '@/app/lib/definitions';

export async function GET(request: Request) {
  console.log('API route started');
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    console.log('Received startDate:', startDate);

    if (!startDate) {
      console.log('Error: Start date is missing');
      return NextResponse.json({ error: 'Start date is required' }, { status: 400 });
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
        cast(a.fecha as date) like @param1
        and a.fuente != 'whatsapp'
      ORDER BY
        a.fecha DESC
    `;
    const params = [`${startDate}%`];
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
