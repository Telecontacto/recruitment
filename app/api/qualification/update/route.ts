import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function POST(request: Request) {
  try {
    const { status, reason, campaign, id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const query = `
            UPDATE RECLUTAMIENTO_SOLICITUDES
            SET proyecto = @param1
            WHERE ID = @param2;
            SELECT @@ROWCOUNT as affectedRows;
    `;
    const params = [campaign, id];

    const result = await executeQuery<any[]>(query, params);

    const queryInitial = `
            UPDATE ENTREVISTA_INICIAL 
            SET notQualified = @param1,
                notQualifiedReason = @param2,
                Campana = @param3
            WHERE solicitorId = @param4;
            SELECT @@ROWCOUNT as affectedRows;
    `;
    const paramsInitial = [status, reason, campaign, id];

    const resultInitial = await executeQuery<any[]>(queryInitial, paramsInitial);
    return NextResponse.json(resultInitial, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
