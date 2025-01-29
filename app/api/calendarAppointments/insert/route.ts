import { NextResponse } from 'next/server';
import { insertQuery } from '@/app/lib/data-mssql'; // Replace with your actual utility

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url); // Extract query parameters
    const name = searchParams.get('name'); // Get the `name` parameter
    const phone = searchParams.get('phone'); // Get the `phone` parameter
    const date = searchParams.get('date'); // Get the `date` parameter
    const time = searchParams.get('time'); // Get the `time` parameter

    if (!name || !phone || !date || !time) {
      return NextResponse.json({ error: 'Name, phone, date, and time are required.' }, { status: 400 });
    }

    console.log(`Inserting calendar appointment for ${date} at ${time}`);

    const query = `
      INSERT INTO CITAS (NombreCitado, Telefono, Fecha, Hora)
      OUTPUT inserted.ID
      VALUES (@param1, @param2, @param3, @param4)
    `;

    const params = [name, phone, date, time];

    const result = await insertQuery<any[]>(query, params);

    if (result.length > 0) {
      return NextResponse.json({ id: result[0].ID }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to insert appointment.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
