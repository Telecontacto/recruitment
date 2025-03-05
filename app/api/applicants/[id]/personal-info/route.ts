import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function PUT(request: Request) {
  console.log('PUT request received at /api/applicants/[id]/personal-info');
  
  try {
    console.log('Parsing request body...');
    const data = await request.json();
    console.log('Request data:', data);

    if (!data.solicitorId) {
      console.error('Missing solicitorId in request');
      return NextResponse.json({ error: 'solicitorId is required' }, { status: 400 });
    }

    console.log('Preparing SQL query...');
    const query = `
      UPDATE ENTREVISTA_INICIAL
      SET name = @param1,
      phone = @param2,
      email = @param4,
      monFrom = @param5,
      monUntil = @param6,
      tueFrom = @param7,
      tueUntil = @param8,
      wedFrom = @param9,
      wedUntil = @param10,
      thuFrom = @param11,
      thuUntil = @param12,
      friFrom = @param13,
      friUntil = @param14,
      satFrom = @param15,
      satUntil = @param16,
      sunFrom = @param17,
      sunUntil = @param18
      WHERE solicitorId = @param3;
      SELECT @@ROWCOUNT as affectedRows;
    `;

    const params = [
        data.name,
        data.phone,
        data.solicitorId,
        data.email,
        data.monFrom,
        data.monUntil,
        data.tueFrom,
        data.tueUntil,
        data.wedFrom,
        data.wedUntil,
        data.thuFrom,
        data.thuUntil,
        data.friFrom,
        data.friUntil,
        data.satFrom,
        data.satUntil,
        data.sunFrom,
        data.sunUntil
    ];
    
    console.log('Executing query with params:', params);

    const result = await executeQuery<any[]>(query, params);
    console.log('Query result:', result);

    if (result && result[0]?.affectedRows === 0) {
      console.log('No records were updated');
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, affectedRows: result[0]?.affectedRows }, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      console.error('Detailed error in API route:', {
        error,
        message: error.message,
        stack: error.stack
      });
      return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    } else {
      console.error('Unknown error in API route:', error);
      return NextResponse.json({ error: 'Internal server error', details: 'Unknown error' }, { status: 500 });
    }
  }
}
