import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql'; // Replace with your actual utility

export async function POST(request: Request) {
    console.log('POST request to /api/calendarAppointments/update', request);
  try {
      // Get data from request body instead of search params
      const { Status, ID } = await request.json();
  
      if (!ID) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
      }

      const query = `
              UPDATE CITAS 
              SET Status = @param1
              WHERE solicitorId = @param2;
              SELECT @@ROWCOUNT as affectedRows;
      `;

      const params = [Status, ID];
  
      const result = await executeQuery<any[]>(query, params);
      return NextResponse.json(result, { status: 200 });
  
    } catch (error) {
      console.error('Error in API route:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
