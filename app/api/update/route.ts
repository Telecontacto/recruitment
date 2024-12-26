import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql'; // Replace with your actual utility
import { changeAttendantStatus } from '@/app/lib/definitions'; // Replace with your type definitions

export async function POST(request: Request) {
    try {
        const { searchParams } = new URL(request.url); // Extract query parameters
        const id = searchParams.get('ID'); // Get the `startDate` parameter
        const stage = searchParams.get('stage'); // Get the `startDate` parameter

        if (!id || !stage) {
          return NextResponse.json(
              { error: 'Missing required parameters: ID or stage' },
              { status: 400 }
          );
        }
      
        const query = `
          UPDATE RECLUTAMIENTO_SOLICITUDES SET
          StatusSolicitud = @param1
          OUTPUT inserted.StatusSolicitud
          WHERE
            ID = @param2
        `;
        const params = [stage, id];
    
        const result = await executeQuery<changeAttendantStatus[]>(query, params);
        return NextResponse.json(result, { status: 200 });
    
      } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
      }
  }