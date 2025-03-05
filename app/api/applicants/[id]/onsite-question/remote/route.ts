import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function PUT(request: Request) {
  console.log('PUT request received at /api/applicants/[id]/questions');
  
  try {
    console.log('Parsing request body...');
    const data = await request.json();
    console.log('Request data:', data);

    if (!data.solicitorId) {
      console.error('Missing ID in request');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    console.log('Preparing SQL query...');
    const query = `
            UPDATE ENTREVISTA_PRESENCIAL 
            SET focusCommColab = @param1,
                timeHandle = @param2,
                maintainMotivation = @param3,
                keySuccessfulRemotely = @param4,
                electricitySolutions = @param5,
                remoteQualities = @param6
            WHERE solicitorId = @param7;
            SELECT @@ROWCOUNT as affectedRows;
    `;
    const params = [data.focusCommColab, data.timeHandle, data.maintainMotivation, data.keySuccessfulRemotely, data.electricitySolutions, data.remoteQualities, data.solicitorId];
    console.log('Executing query with params:', params);

    const result = await executeQuery<any[]>(query, params);
    console.log('Query result:', result);

    return NextResponse.json(result, { status: 200 });

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
