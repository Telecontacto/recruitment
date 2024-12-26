import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql'; // Replace with your actual utility
import { deleteApplicant } from '@/app/lib/definitions'; // Replace with your type definitions

export async function POST(request: Request) {
    try {
        const { searchParams } = new URL(request.url); // Extract query parameters
        const id = searchParams.get('ID'); // Get the `startDate` parameter

        if (!id) {
          return NextResponse.json(
              { error: 'Missing required parameters: ID' },
              { status: 400 }
          );
        }
      
        const query = `
          DELETE FROM RECLUTAMIENTO_SOLICITUDES
          OUTPUT DELETED.ID
          WHERE ID = @param1
        `;
        const params = [id];
    
        const result = await executeQuery<deleteApplicant[]>(query, params);
        return NextResponse.json(result, { status: 200 });
    
      } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
      }
  }