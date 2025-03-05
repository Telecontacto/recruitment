import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function PUT(request: Request) {
  console.log('PUT request received at /api/assignRecruiter');
  
  try {
    console.log('Parsing request body...');
    const data = await request.json();
    console.log('Received data:', {
      applicantId: data.applicantId,
      recruiter: data.recruiter
    });

    if (!data.applicantId || !data.recruiter) {
      console.error('Missing required fields:', { data });
      return NextResponse.json(
        { error: 'applicantId and recruiter are required' }, 
        { status: 400 }
      );
    }

    console.log('Preparing SQL query for recruiter assignment...');
    const query = `
      UPDATE RECLUTAMIENTO_SOLICITUDES 
      SET Entrevistador = @param1
      WHERE ID = @param2;
      SELECT @@ROWCOUNT as affectedRows;
    `;
    
    const params = [data.recruiter, data.applicantId];
    console.log('Executing query with params:', {
      recruiter: data.recruiter,
      applicantId: data.applicantId
    });

    const result = await executeQuery<any[]>(query, params);
    console.log('Query execution result:', result);

    if (result && result[0]?.affectedRows === 0) {
      console.warn('No records were updated');
      return NextResponse.json(
        { message: 'No records were updated' }, 
        { status: 404 }
      );
    }

    console.log('Successfully updated recruiter assignment');
    return NextResponse.json(
      { message: 'Recruiter assigned successfully', result }, 
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof Error) {
      console.error('Detailed error in assignRecruiter route:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      return NextResponse.json(
        { error: 'Internal server error', details: error.message }, 
        { status: 500 }
      );
    } else {
      console.error('Unknown error in assignRecruiter route:', error);
      return NextResponse.json(
        { error: 'Internal server error', details: 'Unknown error' }, 
        { status: 500 }
      );
    }
  }
}
