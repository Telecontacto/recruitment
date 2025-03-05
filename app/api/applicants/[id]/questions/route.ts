import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function PUT(request: Request) {
  console.log('PUT request received at /api/applicants/[id]/questions');
  
  try {
    const data = await request.json();
    console.log('Request data:', data);

    if (!data.solicitorId) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // First update ENTREVISTA_INICIAL
    const initialQuery = `
      UPDATE ENTREVISTA_INICIAL WITH (ROWLOCK)
      SET transportation = @param1,
          trip = @param2,
          student = @param3,
          bilingual = @param4,
          onSite = @param5,
          remote = @param6,
          town = @param7,
          appliedWhere = @param8,
          knowledgeHow = @param9,
          internetSpeed = @param10,
          callCenterInterest = @param11,
          customerServiceDefinition = @param12,
          comments = @param13
      OUTPUT INSERTED.*
      WHERE solicitorId = @param14;
    `;
    
    const initialParams = [
      data.transportation || null,
      data.trip || null,
      data.student || null,
      data.bilingual || null,
      data.onSite || null,
      data.remote || null,
      data.town || null,
      data.appliedWhere || null,
      data.knowledgeHow || null,
      data.internetSpeed || null,
      data.callCenterInterest || null,
      data.customerServiceDefinition || null,
      data.comments || null,
      data.solicitorId
    ];

    const initialResult = await executeQuery<any[]>(initialQuery, initialParams);

    // Then update ENTREVISTA_PRESENCIAL
    const presencialQuery = `
      UPDATE ENTREVISTA_PRESENCIAL WITH (ROWLOCK)
      SET remote = @param1
      OUTPUT INSERTED.*
      WHERE solicitorId = @param2;
    `;

    const presencialParams = [data.remote || null, data.solicitorId];
    const presencialResult = await executeQuery<any[]>(presencialQuery, presencialParams);

    return NextResponse.json({
      success: true,
      data: {
        entrevistaUpdated: presencialResult.length > 0,
        evaluationUpdated: initialResult.length > 0,
        updates: {
          inicial: initialResult[0],
          presencial: presencialResult[0]
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    
    // Handle specific SQL Server errors
    const sqlError = error as any;
    if (sqlError.number) {
      return NextResponse.json({ 
        error: 'Database error', 
        details: sqlError.message,
        code: sqlError.number 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
