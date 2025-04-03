import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql'; // Replace with your actual utility

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url); // Extract query parameters
    const id = searchParams.get('id'); // Get the `startDate` parameter

    if (!id) {
      return NextResponse.json({ error: 'Start date is required' }, { status: 400 });
    }

    const query = `
      SELECT 
        ID as solicitorId,
        Gramatica1 as gramatica1,
        Gramatica2 as gramatica2,
        Gramatica3 as gramatica3,
        Gramatica4 as gramatica4,
        Gramatica5 as gramatica5,
        Gramatica6 as gramatica6,
        Gramatica7 as gramatica7,
        Gramatica8 as gramatica8,
        Gramatica9 as gramatica9,
        Gramatica10 as gramatica10,
        Gramatica11 as gramatica11,
        Gramatica12 as gramatica12,
        Gramatica13 as gramatica13,
        Gramatica14 as gramatica14,
        Gramatica15 as gramatica15,
        Gramatica16 as gramatica16,
        Gramatica17 as gramatica17,
        Gramatica18 as gramatica18,
        Gramatica19 as gramatica19,
        Gramatica20 as gramatica20,
        Ejercicio1_1 as llamada1_p1,
        Ejercicio1_2 as llamada1_p2,
        Ejercicio2_1 as llamada2_p1,
        Ejercicio2_2 as llamada2_p2,
        Ejercicio2_3 as llamada2_p3
      FROM
        RECLUTAMIENTO_SOLICITUDES
      WHERE
        ID =  @param1
    `;
    const params = [id];

    const result = await executeQuery<any[]>(query, params);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
