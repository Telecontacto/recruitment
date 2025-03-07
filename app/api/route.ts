import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql'; // Replace with your actual utility
import { attendantStatus } from '@/app/lib/definitions'; // Replace with your type definitions

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url); // Extract query parameters
    const startDate = searchParams.get('startDate'); // Get the `startDate` parameter

    if (!startDate) {
      return NextResponse.json({ error: 'Start date is required' }, { status: 400 });
    }

    const query = `
      SELECT 
        a.nombre,
        a.id,
        a.statussolicitud,
        a.printed
      FROM
        RECLUTAMIENTO_SOLICITUDES a
      WHERE
        cast(a.fecha as date) like @param1
        and a.fuente != 'whatsapp'
      ORDER BY
        a.fecha DESC
    `;
    const params = [`${startDate}%`];

    const result = await executeQuery<attendantStatus[]>(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
