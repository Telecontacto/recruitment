import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql'; // Replace with your actual utility

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url); // Extract query parameters
    const id = searchParams.get('id'); // Get the `startDate` parameter

    if (!id) {
      return NextResponse.json({ error: 'Start date is required' }, { status: 400 });
    }

    const query = `
      SELECT *
      FROM
        RECLUTAMIENTO_SOLICITUDES a
      WHERE
        id =  @param1
      ORDER BY
        a.fecha DESC
    `;
    const params = [id];

    const result = await executeQuery<any[]>(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
