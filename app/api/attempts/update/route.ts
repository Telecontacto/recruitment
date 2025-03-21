import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function POST(request: Request) {
  try {
    // Get data from request body instead of search params
    const { attemptNumber, status, notes, id } = await request.json();
    
    const attempt = `attempt${attemptNumber}`;
    const action = `action${attemptNumber}`;
    const date = `attempt${attemptNumber}Date`;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const query = `
            UPDATE ENTREVISTA_INICIAL 
            SET ${attempt} = @param1,
                ${action} = @param2,
                ${date} = GETDATE()
            WHERE solicitorId = @param3;
            SELECT @@ROWCOUNT as affectedRows;
    `;
    const params = [status, notes, id];

    const result = await executeQuery<any[]>(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
