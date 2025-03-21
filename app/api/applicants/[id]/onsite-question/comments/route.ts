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
            SET firstInterviewComments = @param1,
                firstInterviewName = @param2,
                firstInterviewDate = @param3,
                secondInterviewComments = @param4,
                secondInterviewName = @param5,
                secondInterviewDate = @param6,
                englishScore = @param7,
                typingScore = @param8
            WHERE solicitorId = @param9;
            SELECT @@ROWCOUNT as affectedRows;
    `;
    const params = [data.firstInterviewComments, data.firstInterviewName, data.firstInterviewDate, data.secondInterviewComments, data.secondIntereviewName, data.secondInterviewDate, data.englishScore, data.typingScore, data.solicitorId];
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
