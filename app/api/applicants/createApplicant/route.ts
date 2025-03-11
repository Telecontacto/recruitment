import { NextResponse } from 'next/server';
import { insertQuery } from '@/app/lib/data-mssql';

export async function POST(request: Request) {
  try {
    console.log('Starting POST request processing...');
    const data = await request.json();
    const { name, phone, email, stage, source, document, documentId } = data;
    const date = new Date();

    console.log('Validated data:', { name, phone, email, stage, source, document, documentId });

    if (!name || !phone || !email || !source || !document) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json({ error: 'Name, Phone, Email, Source or Resume is required' }, { status: 400 });
    }

    const resume = `${documentId}-${document}`;
    console.log('Generated resume filename:', resume);

    // First query - Insert applicant and get ID
    console.log('Attempting to insert applicant...');
    const applicantQuery = `
      INSERT INTO RECLUTAMIENTO_SOLICITUDES (Nombre, Celular, Fecha, Email, StatusSolicitud, fuente, nombreDocumento)
      OUTPUT inserted.ID
      VALUES (@param1, @param2, @param3, @param4, @param5, @param6, @param7)
    `;

    const applicantParams = [name, phone, date, email, stage, source, resume];
    console.log('Applicant query params:', applicantParams);
    const applicantResult = await insertQuery<any[]>(applicantQuery, applicantParams);
    console.log('Applicant insert result:', applicantResult);

    if (!applicantResult || applicantResult.length === 0) {
      console.log('Failed to insert applicant: No ID returned');
      return NextResponse.json({ error: 'Failed to insert applicant.' }, { status: 500 });
    }

    const applicantId = applicantResult[0].ID;
    console.log('Successfully inserted applicant with ID:', applicantId);

    // Second query - Insert into initial tracking
    console.log('Attempting to insert initial tracking...');
    const initialQuery = `
      INSERT INTO ENTREVISTA_INICIAL (solicitorId, status, name, phone, email)
      OUTPUT inserted.ID
      VALUES (@param1, @param2, @param3, @param4, @param5)
    `;

    await insertQuery(initialQuery, [applicantId, '2', name, phone, email]);
    console.log('Successfully inserted initial tracking');

    // Third query - Insert Interview attempt
    console.log('Attempting to insert interview record...');
    const interviewQuery = `
      INSERT INTO ENTREVISTA_PRESENCIAL (solicitorId, status, name, phone, email)
      OUTPUT inserted.ID
      VALUES (@param1, @param2, @param3, @param4, @param5)
    `;

    await insertQuery(interviewQuery, [applicantId, 2, name, phone, email]);
    console.log('Successfully inserted interview record');

    console.log('All operations completed successfully');
    return NextResponse.json({ 
      id: applicantId, 
      ok: true,
      message: 'Applicant and related records created successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
