import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function POST(request: Request) {
  try {
    const { startDate, endDate, recruiters } = await request.json();

    if (!startDate || !recruiters || !Array.isArray(recruiters) || recruiters.length === 0) {
      return NextResponse.json(
        { error: 'Start date and recruiters array are required' }, 
        { status: 400 }
      );
    }

    // Use provided endDate or default to current date
    const effectiveEndDate = endDate || new Date().toISOString().split('T')[0];

    // Initialize results object
    const results = [];

    // Run query for each recruiter
    for (const recruiter of recruiters) {
      const query = `
        SELECT 
          '${recruiter}' AS Recruiter,
          COUNT(CASE WHEN a.Attempt1 IS NULL OR a.Attempt1 = '' THEN 1 END) AS No_Calls,
          COUNT(CASE WHEN a.Attempt1 = 'no_answer' THEN 1 END) AS Total_Attempt1_No_Answer,
          COUNT(CASE WHEN a.Attempt2 = 'no_answer' THEN 1 END) AS Total_Attempt2_No_Answer,
          COUNT(CASE WHEN a.Attempt3 = 'no_answer' THEN 1 END) AS Total_Attempt3_No_Answer,
          COUNT(DISTINCT c.ID) AS Total_Citados
        FROM ENTREVISTA_INICIAL a
        INNER JOIN RECLUTAMIENTO_SOLICITUDES b ON a.solicitorId = b.ID
        LEFT JOIN CITAS c ON c.solicitorId = b.ID 
            AND CAST(c.fecha AS DATE) >= CAST(GETDATE() AS DATE) 
            AND c.CitadoA = @param1
        WHERE CAST(b.fecha AS DATE) BETWEEN @param2 AND @param3
        AND b.entrevistador = @param1
      `;
      
      const params = [
        recruiter,
        startDate,
        effectiveEndDate
      ];

      const result = await executeQuery<any[]>(query, params);
      
      // Add the recruiter's data to the results array
      if (result && result[0]) {
        results.push(result[0]);
      }
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Keep the GET method for backward compatibility or remove if not needed
export async function GET() {
  return NextResponse.json(
    { error: 'This endpoint requires a POST request with recruiters and startDate' }, 
    { status: 405 }
  );
}
