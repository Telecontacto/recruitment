import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function POST(request: Request) {
  try {
    const { status, reason, id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const query = `
            UPDATE ENTREVISTA_INICIAL 
            SET notQualified = @param1,
                notQualifiedReason = @param2
            WHERE solicitorId = @param3;
            SELECT @@ROWCOUNT as affectedRows;
    `;
    const params = [status, reason, id];

    const result = await executeQuery<any[]>(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
