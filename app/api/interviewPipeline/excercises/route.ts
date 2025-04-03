import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';

export async function POST(request: Request) {
  try {
    // Get data from request body instead of search params
    const { data } = await request.json();

    if (!data.solicitorId) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    

    const query = `
            UPDATE RECLUTAMIENTO_SOLICITUDES
            SET Gramatica1 = @param2,
                Gramatica2 = @param3,
                Gramatica3 = @param4,
                Gramatica4 = @param5,
                Gramatica5 = @param6,
                Gramatica6 = @param7,
                Gramatica7 = @param8,
                Gramatica8 = @param9,
                Gramatica9 = @param10,
                Gramatica10 = @param11,
                Gramatica11 = @param12,
                Gramatica12 = @param13,
                Gramatica13 = @param14,
                Gramatica14 = @param15,
                Gramatica15 = @param16,
                Gramatica16 = @param17,
                Gramatica17 = @param18,
                Gramatica18 = @param19,
                Gramatica19 = @param20,
                Gramatica20 = @param21,
                Ejercicio1_1 = @param22,
                Ejercicio1_2 = @param23,
                Ejercicio2_1 = @param24,
                Ejercicio2_2 = @param25,
                Ejercicio2_3 = @param26
            WHERE ID = @param1;
            SELECT @@ROWCOUNT as affectedRows;
    `;
    const params = [data.solicitorId, data.gramatica1, data.gramatica2, data.gramatica3, data.gramatica4, data.gramatica5, data.gramatica6, data.gramatica7, data.gramatica8, data.gramatica9, data.gramatica10, data.gramatica11, data.gramatica12, data.gramatica13, data.gramatica14, data.gramatica15, data.gramatica16, data.gramatica17, data.gramatica18, data.gramatica19, data.gramatica20, data.llamada1_p1, data.llamada1_p2, data.llamada2_p1, data.llamada2_p2, data.llamada2_p3];

    const result = await executeQuery<any[]>(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
