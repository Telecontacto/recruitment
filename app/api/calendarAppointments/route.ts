import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql'; // Replace with your actual utility

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url); // Extract query parameters
    const month = searchParams.get('month'); // Get the `month` parameter
    const year = searchParams.get('year'); // Get the `year` parameter

    if (!month || !year) {
      return NextResponse.json({ error: 'Month and year are required.' }, { status: 400 });
    }

    const formattedMonth = month.length === 1 ? `0${month}` : month;
    const date = `${year}-${formattedMonth}`;

    console.log(`Fetching calendar appointments for ${date}`);

    const query = `
      SELECT solicitorId as ID, NombreCitado, Telefono, Fecha, Hora, Status, CitadoA
      FROM CITAS a
      WHERE CAST(a.fecha AS DATE) LIKE @param1
      ORDER BY a.fecha DESC
    `;

    const params = [`${date}%`]; // Use the date with a wildcard for the LIKE clause

    const result = await executeQuery<any[]>(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
