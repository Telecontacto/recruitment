import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql'; // Replace with your actual utility

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url); // Extract query parameters
    const id = searchParams.get('id'); 

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    console.log(`Fetching calendar appointments for ${id}`);

    const query = `
      SELECT COUNT(*) as total
      FROM CITAS a
      WHERE a.solicitorId = @param1
    `;

    const params = [id]; // Use the date with a wildcard for the LIKE clause

    const result = await executeQuery<any[]>(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
