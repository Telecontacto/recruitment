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
            SET academicGrade = @param1,
                distinguishedQualities = @param2,
                firstCompany = @param3,
                firstTask = @param4,
                firstTermination = @param5,
                secondCompany = @param6,
                secondTask = @param7,
                secondTermination = @param8,
                thirdCompany = @param9,
                thirdTask = @param10,
                thirdTermination = @param11,
                viewSelf = @param12,
                multitask = @param13
            WHERE solicitorId = @param14;
            SELECT @@ROWCOUNT as affectedRows;
    `;
    const params = [data.academicGrade, data.distinguishedQualities, data.firstCompany, data.firstTask, data.firstTermination, data.secondCompany, data.secondTask, data.secondTermination, data.thirdCompany, data.thirdTask, data.thirdTermination, data.viewSelf, data.multitask, data.solicitorId];
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
