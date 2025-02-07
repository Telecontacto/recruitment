import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate'); // Format: "YYYY-MM"

    if (!startDate) {
      return NextResponse.json({ error: 'Start date is required.' }, { status: 400 });
    }

    // Split the startDate into year and month
    const [year, month] = startDate.split('-');

    if (!year || !month) {
      return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM' }, { status: 400 });
    }

    console.log(`Fetching data for year: ${year}, month: ${month}`);

    const query = `
      select fuente, count(*) as total from RECLUTAMIENTO_SOLICITUDES
      where cast(timestamp as date) between @param1 and @param2
      group by fuente
      order by fuente
    `;

    const firstDayOfMonth = `${year}-${month}-01`;
    const lastDayOfMonth = `${year}-${month}-${new Date(parseInt(year), parseInt(month), 0).getDate()}`;

    const params = [
      firstDayOfMonth,
      lastDayOfMonth
    ];

    console.log(firstDayOfMonth, lastDayOfMonth);

    const result = await executeQuery<any[]>(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
